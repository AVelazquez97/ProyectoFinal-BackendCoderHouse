// mostrar u ocultar campos de busqueda
const filterSelect = document.querySelector('#options-search');
const searchByName = document.querySelector('#search-by-name'),
  searchByCategory = document.querySelector('#search-by-category'),
  searchByCode = document.querySelector('#search-by-code'),
  searchByPrice = document.querySelector('#search-by-price'),
  searchByStock = document.querySelector('#search-by-stock'),
  formSearchBtns = document.querySelector('#form-search-btns');

filterSelect.addEventListener('change', () => {
  switch (filterSelect.value) {
    case '1': // Filtrado de productos por nombre
      searchByName.setAttribute('style', 'display: flex;');
      searchByCategory.setAttribute('style', 'display: none;');
      searchByCode.setAttribute('style', 'display: none;');
      searchByPrice.setAttribute('style', 'display: none;');
      searchByStock.setAttribute('style', 'display: none;');
      formSearchBtns.setAttribute('style', 'display: block;');
      clearInputsSearchForm();
      break;
    case '2': // Filtrado de productos por categoría
      searchByName.setAttribute('style', 'display: none;');
      searchByCategory.setAttribute('style', 'display: flex;');
      searchByCode.setAttribute('style', 'display: none;');
      searchByPrice.setAttribute('style', 'display: none;');
      searchByStock.setAttribute('style', 'display: none;');
      formSearchBtns.setAttribute('style', 'display: block;');
      clearInputsSearchForm();
      break;
    case '3': // Filtrado de productos por código
      searchByName.setAttribute('style', 'display: none;');
      searchByCategory.setAttribute('style', 'display: none;');
      searchByCode.setAttribute('style', 'display: flex;');
      searchByPrice.setAttribute('style', 'display: none;');
      searchByStock.setAttribute('style', 'display: none;');
      formSearchBtns.setAttribute('style', 'display: block;');
      clearInputsSearchForm();
      break;
    case '4': // Filtrado de productos por precio
      searchByName.setAttribute('style', 'display: none;');
      searchByCategory.setAttribute('style', 'display: none;');
      searchByCode.setAttribute('style', 'display: none;');
      searchByPrice.setAttribute('style', 'display: flex; gap: 5px;');
      searchByStock.setAttribute('style', 'display: none;');
      formSearchBtns.setAttribute('style', 'display: block;');
      clearInputsSearchForm();
      break;
    case '5': // Filtrado de productos por stock
      searchByName.setAttribute('style', 'display: none;');
      searchByCategory.setAttribute('style', 'display: none;');
      searchByCode.setAttribute('style', 'display: none;');
      searchByPrice.setAttribute('style', 'display: none;');
      searchByStock.setAttribute('style', 'display: flex; gap: 5px;');
      formSearchBtns.setAttribute('style', 'display: block;');
      clearInputsSearchForm();
      break;
  }
});

// filtrado de productos
const formSearch = document.querySelector('#form-search');

formSearch.onsubmit = async (e) => {
  e.preventDefault();

  let formDataSearch = new FormData(formSearch);

  const formSearchData = {
    name: formDataSearch.get('input-search-name'),
    category: formDataSearch.get('input-search-category'),
    code: formDataSearch.get('input-search-code'),
    minPrice: formDataSearch.get('input-search-min-price'),
    maxPrice: formDataSearch.get('input-search-max-price'),
    minStock: formDataSearch.get('input-search-min-stock'),
    maxStock: formDataSearch.get('input-search-max-stock'),
  };

  try {
    url =
      `/api/productos/busqueda?name=${formSearchData.name}` +
      `&category=${formSearchData.category}` +
      `&code=${formSearchData.code}` +
      `&minPrice=${formSearchData.minPrice}` +
      `&maxPrice=${formSearchData.maxPrice}` +
      `&minStock=${formSearchData.minStock}` +
      `&maxStock=${formSearchData.maxStock}`;
    const response = await fetch(url);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
};

const clearFilters = async () => {
  searchByName.setAttribute('style', 'display: none;');
  searchByCategory.setAttribute('style', 'display: none;');
  searchByCode.setAttribute('style', 'display: none;');
  searchByPrice.setAttribute('style', 'display: none;');
  searchByStock.setAttribute('style', 'display: none;');
  formSearchBtns.setAttribute('style', 'display: none;');
  await viewProducts();
};

const clearInputsSearchForm = () => {
  document.getElementById('input-search-name').value = '';
  document.getElementById('input-search-category').value = '';
  document.getElementById('input-search-code').value = '';
  document.getElementById('input-search-min-price').value = '';
  document.getElementById('input-search-max-price').value = '';
  document.getElementById('input-search-min-stock').value = '';
  document.getElementById('input-search-max-stock').value = '';
};
