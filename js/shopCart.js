// Add product to shopping cart
function updateShopCart(event, productID) {
  event.preventDefault()
  const products = JSON.parse(localStorage.getItem('products')) || []
  const product = products.find((product) => product.id === productID)
  product.stock--
  localStorage.setItem('products', JSON.stringify(products))

  if (product.stock === 0) {
    $(event.target).attr('disabled', true)
    $(event.target).parent().parent().find('img').css('opacity', '0.5')
  }

  const shopCart = JSON.parse(localStorage.getItem('shopping-cart')) || []
  const shopCartProduct = shopCart.find((product) => product.id === productID)

  if (shopCartProduct) shopCartProduct.quantity++
  else shopCart.push({ ...product, quantity: 1 })
  localStorage.setItem('shopping-cart', JSON.stringify(shopCart))
  showShopCart()
  showProducts()
}

// Empty shopping cart
function emptyShopCart(event) {
  event.preventDefault()
  const shopCart = JSON.parse(localStorage.getItem('shopping-cart')) || []
  const products = JSON.parse(localStorage.getItem('products')) || []
  shopCart.forEach((product) => {
    const productToDelete = products.find((productToDelete) => productToDelete.id === product.id)
    productToDelete.stock += product.quantity
  })
  localStorage.setItem('products', JSON.stringify(products))
  localStorage.setItem('shopping-cart', JSON.stringify([]))
  showShopCart()
  showProducts()
}

// Place order
function placeOrder(event) {
  event.preventDefault()
  alert('¡Pedido realizado correctamente!')
  localStorage.setItem('shopping-cart', JSON.stringify([]))
  showShopCart()
  showProducts()
}

// Delete product from shopping cart
function deleteProduct(event, productID) {
  event.preventDefault()
  const shopCart = JSON.parse(localStorage.getItem('shopping-cart')) || []
  const products = JSON.parse(localStorage.getItem('products')) || []
  const product = products.find((product) => product.id === productID)
  product.stock++
  const shopCartProduct = shopCart.find((product) => product.id === productID)
  shopCartProduct.quantity--
  localStorage.setItem('shopping-cart', JSON.stringify(shopCart))
  if (shopCartProduct.quantity === 0) {
    const newShopCart = shopCart.filter((product) => product.id !== productID)
    localStorage.setItem('shopping-cart', JSON.stringify(newShopCart))
  }
  localStorage.setItem('products', JSON.stringify(products))
  showShopCart()
  showProducts()
}
