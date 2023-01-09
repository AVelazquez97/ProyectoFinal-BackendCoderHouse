const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      await Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
      viewProducts();
    } else {
      Swal.fire({
        icon: 'error',
        text: `${data.error} ${data.description}`,
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};