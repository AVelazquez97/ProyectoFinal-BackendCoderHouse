const createCart = async () => {
  try {
    const clientId = await getUserId();
    const response = await fetch(`api/carrito/${clientId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: null,
    });
    const data = await response.json();
    if (Object.keys(data)[0] === 'error') {
      return data.error;
    }

    return data.id;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (productId) => {
  try {
    const cartId = await createCart();

    const response = await fetch(
      `/api/carrito/${cartId}/productos/${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ quantity: 1 }),
      }
    );
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
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
