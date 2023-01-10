const formAddProduct = document.querySelector('#form-add-product'),
  inputName = document.getElementById('name'),
  inputCategory = document.getElementById('category'),
  inputDescription = document.getElementById('description'),
  inputCode = document.getElementById('code'),
  inputThumbnail = document.getElementById('thumbnail'),
  inputPrice = document.getElementById('price'),
  inputStock = document.getElementById('stock');

formAddProduct.onsubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: inputName.value,
    category: inputCategory.value,
    description: inputDescription.value,
    code: inputCode.value,
    thumbnail: inputThumbnail.value,
    price: inputPrice.value,
    stock: inputStock.value,
  };

  try {
    const response = await fetch('api/productos/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (Object.keys(data)[0] === 'success') {
      await Swal.fire({
        icon: 'success',
        title: data.success,
        showConfirmButton: false,
        timer: 1500,
      });
      viewProducts();
      const btn = document.querySelector('#btn-cancel-add');
      btn.click();
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
          text: `${data.error} ${data.description}`,
          showConfirmButton: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const btnCancelAdd = document.querySelector('#btn-cancel-add');
btnCancelAdd.addEventListener('click', () => {
  formAddProduct.reset();
});
