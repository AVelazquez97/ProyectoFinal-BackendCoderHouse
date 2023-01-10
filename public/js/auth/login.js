const loginForm = document.querySelector('#login-form');

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  let formData = new FormData(loginForm);
  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (Object.keys(data)[0] === 'success') {
      await Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.replace('/');
    } else {
      if (Object.keys(data)[0] === 'errors') {
        let errorsTemplate = data.errors
          .map((error) => {
            return error.msg;
          })
          .join('</br>');
        Swal.fire({
          icon: 'error',
          html: errorsTemplate,
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: data.error,
          showConfirmButton: true,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
