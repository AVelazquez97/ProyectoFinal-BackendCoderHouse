import twilio from 'twilio';
import { TWILIO_CREDENTIALS } from '../config/index.js';
import { LoggerError, LoggerInfo } from '../config/log4.js';

const client = twilio(TWILIO_CREDENTIALS.accountSid, TWILIO_CREDENTIALS.authToken);

try {
  const message = await client.messages.create({
    from: TWILIO_CREDENTIALS.from,
    to: TWILIO_CREDENTIALS.to,
    body: 'Hola alito!',
  });
  LoggerInfo.info("¡WPP enviado con éxito!")
} catch (error) {
  LoggerError.error(error);
}
