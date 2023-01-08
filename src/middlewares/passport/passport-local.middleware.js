import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import { LoggerError, LoggerWarn, LoggerInfo } from '../../config/log4.js';
import { PERSISTENCY } from '../../config/index.js';

// import User from '../../models/mongoose/users.model.js';// Se va

let userDAO;

(async () => {
  try {
    userDAO = await DAOFactory.getPersistency('users', PERSISTENCY);
    return userDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userDAO.getUserByEmail({ email });
        if (user) {
          LoggerWarn.warn(
            'El usuario con el mail indicado ya está registrado.'
          );
          return done(
            {
              error: 'El usuario con el mail indicado ya está registrado.',
            },
            false
          );
        }

        const { fullName, age, phone, address } = req.body;
        let photo = req.file === undefined ? null : req.file.filename;

        const newUser = {
          email,
          fullName,
          age,
          password: encryptPassword(password),
          phone,
          address,
          photo,
        };
        try {
          const createdUser = await userDAO.createUser(newUser);
          LoggerInfo.info('El registro se ha realizado exitosamente.');
          return done(null, createdUser, {
            success: 'El registro se ha realizado exitosamente.',
          });
        } catch (error) {
          LoggerError.error(`Error creando el usuario: ${error}`);
          return done({
            error: `Error creando el usuario: ${error}`,
          });
        }
      } catch (error) {
        LoggerError.error(`Falló el registro de usuario: ${error}`);
        return done({
          error: `Falló el registro de usuario: ${error}`,
        });
      }
    }
  )
);

const comparePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await userDAO.getUserByEmail({ email });
        if (!user) {
          LoggerWarn.warn('No existe el usuario con el mail indicado.');
          return done(
            'Error al iniciar sesión: No existe el usuario con el mail ingresado.',
            false
          );
        }
        if (!comparePassword(user, password)) {
          LoggerWarn.warn('La contraseña no coincide.');
          return done('Error al iniciar sesión: La contraseña no coincide.', false);
        }
        return done(null, user);
      } catch (error) {
        LoggerError.error(`Error iniciando sesión: ${error}`);
        return done(`Error iniciando sesión: ${error}`);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userDAO.getUserById(id);
  done(null, user);
});

export default passport;
