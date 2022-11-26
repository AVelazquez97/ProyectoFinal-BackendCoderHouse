const confirmOrder = async (id) => {
  try {
    const response = await fetch(`/ordenes/confirmar/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      method: 'PUT',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert('La orden ha sido confirmada');
      renderOrders();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
