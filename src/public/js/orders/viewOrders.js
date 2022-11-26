const orderList = document.querySelector('#order-list');

const renderOrders = async () => {
  try {
    const response = await fetch('/ordenes/listar', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.length) {
      const template = data
        .map(
          (order) => `
            <tr>
              <td>
                <details>
                  <summary class="mb-2">Productos</summary>
                    ${order.productos
                      .map(
                        (item) => `
                          <small>${item.name} - Cant: ${item.qty} - PU: $ ${item.price}</small>
                          <hr class="dropdown-divider">
                        `
                      )
                      .join('')
                    }
                </details>
              </td>
              <td>${order.email}</td>
              <td>${order.address}</td>
              <td>
                  <span id="status" class="badge ${
                    order.status === 'Generada' ? 'bg-secondary' : 'bg-success'
                  }">${order.status}</span>
              </td>
              <td>${order.timestamp}</td>
              <td width="20px">
                  <button 
                    class="btn btn-sm btn-light" 
                    type="button" 
                    onclick="confirmOrder('${order.id}')"
                  >
                    Confirmar
                  </button>
              </td>
              <td width="20px">
                <button 
                  class="btn btn-sm btn-danger" 
                  type="button" 
                  onclick="deleteOrder('${order.id}')"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          `
        )
        .join('');
      orderList.innerHTML = template;
    } else {
      const template = `
        <tfoot>
          <td colspan="6">No hay ordenes generadas</td>
        </foot>
      `;
      orderList.innerHTML = template;
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await renderOrders();
})();
