const deleteOrder = async (id) => {
  try {
    const response = await fetch(`/ordenes/borrar/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'delete',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert('La orden ha sido eliminada');
      renderOrders();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
