const createCart = async () => {
  try {
    const response = await fetch('/api/carrito', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({}),
    });
    const data = await response.json();
    if (Object.keys(data)[0] != 'error') {
      alert(data.msg); //debería retornar el id del carrito creado
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};



const addToCart = async (idProduct) => {
  try {
    const response = await fetch(
      `/api/carrito/${idCart}/productos/${idProduct}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ quantity: 1 }),
      }
    );
    const data = await response.json();
    if (Object.keys(data)[0] != 'error') {
      alert(data.msg);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
