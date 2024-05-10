const formCreateProduct = document.querySelector('.createProduct')
const btnCreate = document.getElementById('btnCreateProduct')

const handleCreateProduct = async (event) => {
  event.preventDefault()
  
  const productName = formCreateProduct.productNam.value
  const price = formCreateProduct.productCost.value
  const quantity = formCreateProduct.productStock.value
  
  const userToken = localStorage.getItem('token')

  try {

    const res = await fetch('http://localhost:4100/api/v1/product/create', {
      method: 'POST',
      body: JSON.stringify({ productName, price, quantity }),
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      alert('Producto creado correctamente')
    }
    
  } catch (error) {
   console.log(error); 
  }

}

const getProductList = async () => {
  try {
    const res = await fetch('http://localhost:4100/api/v1/product/query', {
      method: 'GET',
      headers: {
        'Authorization': userToken,
        'Content-Type': 'application/json'
      }
    })

    console.log(res);
    
  } catch (error) {
    
  }
}

getProductList()

btnCreate?.addEventListener('click', handleCreateProduct)