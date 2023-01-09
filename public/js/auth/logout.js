const logout = async () => {
  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
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
      console.log(data);
      throw new Error(data);
    }
  } catch (error) {
    console.log(error);
  }
};
