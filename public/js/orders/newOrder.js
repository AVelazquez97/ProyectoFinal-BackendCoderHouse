const newOrder = async () => {
  try {
    const response = await fetch('/api/ordenes/', {
      method: 'POST',
      body: null
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      await Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
      viewCartProducts();
    } else {
      Swal.fire({
        icon: 'error',
        text: data.error,
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};