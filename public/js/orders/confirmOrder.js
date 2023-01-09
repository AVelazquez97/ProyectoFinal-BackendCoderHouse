const confirmOrder = async (id) => {
  try {
    const response = await fetch(`/api/ordenes/${id}`, {
      method: 'PUT',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      await Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
      viewOrders();
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
