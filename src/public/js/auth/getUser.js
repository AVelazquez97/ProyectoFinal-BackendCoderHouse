(async () => {
  try {
    let template = '';
    const response = await fetch('/api/usuario');
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      let fotoUrl =
        data.photo === null
          ? 'https://via.placeholder.com/150x150?text=noImage'
          : '/img/' + data.photo;

      template = `
      <div class="dropdown-center">
        <button class="btn btn-dark dropdown-toggle"
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          <img src="${fotoUrl}" width="40" height="40" class="rounded-circle">
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark text-end">
          <li><small class="dropdown-item">${data.email}</small></li>
          <li><small class="dropdown-item">${data.fullName}</small></li>
          <li><small class="dropdown-item">${data.phone}</small></li>
          <li><small class="dropdown-item">${data.address}</small></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="orders.html">Mis ordenes</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/" onclick="logout()">Cerrar sesión</a></li>
        </ul>
      </div>
    `;
    } else {
      template = `
      <div id="to-login-to-signup" class="text-end">
        <a
          href="login.html"
          type="button"
          class="btn btn-light"
        >
          Iniciar sesión
        </a>
        <a href="signup.html" type="button" class="btn btn-warning">
          Registrarse
        </a>
      </div>
    `;
    }
    document.getElementById('user').innerHTML = template;
  } catch (error) {
    console.log(error);
  }
})();

const getUserId = async () => {
  try {
    const response = await fetch('/api/usuario');
    const user = await response.json();

    if (Object.keys(user)[0] !== 'error') {
      return user.id; 
    } else {
      throw new Error(`Error: ${user.error} - Description: ${user.description}`);
    }
  } catch (error) {
    console.error(error);
  }
}