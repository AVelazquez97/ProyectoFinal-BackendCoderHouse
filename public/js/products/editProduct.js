const formEditProduct = document.querySelector('#form-edit-product'),
  inputEditName = document.getElementById('edit-name'),
  inputEditCategory = document.getElementById('edit-category'),
  inputEditDescription = document.getElementById('edit-description'),
  inputEditCode = document.getElementById('edit-code'),
  inputEditThumbnail = document.getElementById('edit-thumbnail'),
  inputEditPrice = document.getElementById('edit-price'),
  inputEditStock = document.getElementById('edit-stock');

const editProduct = async (id) => {
  try {
    const response = await fetch(`/api/productos/listado/${id}`);
    const data = await response.json();

    inputEditName.setAttribute('value', `${data.name}`);
    inputEditCategory.setAttribute('value', `${data.category}`);
    inputEditDescription.setAttribute('value', `${data.description}`);
    inputEditCode.setAttribute('value', `${data.code}`);
    inputEditThumbnail.setAttribute('value', `${data.thumbnail}`);
    inputEditPrice.setAttribute('value', `${data.price}`);
    inputEditStock.setAttribute('value', `${data.stock}`);

    formEditProduct.onsubmit = async (e) => {
      e.preventDefault();

      const formData = {
        name: inputEditName.value,
        category: inputEditCategory.value,
        description: inputEditDescription.value,
        code: inputEditCode.value,
        thumbnail: inputEditThumbnail.value,
        price: inputEditPrice.value,
        stock: inputEditStock.value,
      };

      try {
        const response = await fetch(`/api/productos/${data.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (Object.keys(result)[0] === 'success') {
          alert(result.success);
          viewProducts();
          const btn = document.querySelector('#btn-cancel-edit');
          btn.click();
        } else {
          if (Object.keys(result)[0] === 'errors') {
            let errorsTemplate = result.errors
              .map((error) => {
                return error.msg;
              })
              .join('\n');
            alert(errorsTemplate);
          } else {
            alert(`${result.error} ${result.description}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  } catch (error) {
    console.log(error);
  }
};

const btnCancelEdit = document.querySelector('#btn-cancel-edit');
btnCancelEdit.addEventListener('click', () => {
  formEditProduct.reset();
});
