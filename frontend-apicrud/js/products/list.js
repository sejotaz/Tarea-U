const tableBody = document.getElementById('productList');
const userToken = localStorage.getItem('token');
const inputSearch = document.getElementById('search');
const modalContent = document.getElementById('exampleModal');

let dataProduct = [];

const deleteMessage = async (idMessage) => {
  console.log(idMessage);
  try {
    const res = await fetch(`http://localhost:4100/api/v1/product/delete/${idMessage}`, {
      method: 'PATCH',
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => json && window.location.reload() );
  } catch (error) {
    console.error(error);
  }
};

function editarProducto(product) {
  // Llena los campos del formulario en el modal con los datos del producto
  document.getElementById('idProduct').value = product._id;
  document.getElementById('nameProduct').value = product.productName;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity;
}

function guardarCambios() {
  // Aquí puedes obtener los valores actualizados de los campos del formulario en el modal
  var id = document.getElementById('idProduct').value;
  var productName = document.getElementById('nameProduct').value;
  var price = document.getElementById('price').value;
  var quantity = document.getElementById('quantity').value;

  // Aquí puedes hacer una solicitud HTTP para guardar los cambios (p. ej., con fetch)
  // En este ejemplo, simplemente mostraremos los datos en la consola
  console.log("ID:", id);
  console.log("Nombre del Producto:", productName);
  console.log("Precio:", price);
  console.log("Cantidad:", quantity);

  // Aquí puedes cerrar el modal si es necesario
  $('#exampleModal').modal('hide');
}

const getProductList = async (name = '') => {

  const finalUrl = name ? `http://localhost:4100/api/v1/product/query/byname/${name}` : `http://localhost:4100/api/v1/product/query/`;

  try {
    const res = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dataProduct = json);
    
    // Limpia la tabla antes de agregar nuevos datos
    tableBody.innerHTML = '';
    
    if (dataProduct.length) {

      dataProduct.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td class="idProd">${item._id}</td>
          <td class="productName">${item.productName}</td>
          <td class="price">${item.price}</td>
          <td class="quantity">${item.quantity}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>
            <a class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#exampleModal" onclick="editarProducto(${JSON.stringify(item)})">Editar</a>
            <a class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm" onclick="deleteMessage('${item._id}')">Eliminar</a>
          </td>
        `;

        tableBody.appendChild(row);
      });
    } else {
      // Si no hay datos, puedes mostrar un mensaje o cualquier otro elemento
      const noDataMessage = document.createElement('tr');
      noDataMessage.innerHTML = '<td colspan="7">No se encontraron productos</td>';
      tableBody.appendChild(noDataMessage);
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
};

getProductList();

inputSearch.addEventListener('input', () => {
  const searchText = inputSearch.value.trim();

  getProductList(searchText);
});
