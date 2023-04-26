// Add product to local storage
function saveProduct(event, productCategory) {
  let products = JSON.parse(localStorage.getItem('products')) || []
  event.preventDefault()
  const productCodeInput = $('#product-code-' + productCategory)
  const productNameInput = $('#product-name-' + productCategory)
  const productDescriptionInput = $('#product-description-' + productCategory)
  const productPriceInput = $('#product-price-' + productCategory)
  const productStockInput = $('#product-stock-' + productCategory)
  const productImgInput = $('#preview-image-' + productCategory)
  const newProduct = {
    id: products.length + 1,
    code: productCodeInput.val(),
    title: productNameInput.val(),
    description: productDescriptionInput.val(),
    price: productPriceInput.val(),
    stock: parseInt(productStockInput.val()),
    image: productImgInput.attr('src'),
    category: productCategory,
  }
  products.push(newProduct)
  localStorage.setItem('products', JSON.stringify(products))
  $('#product-modal-' + productCategory).modal('hide')
  productCodeInput.val('')
  productNameInput.val('')
  productDescriptionInput.val('')
  productPriceInput.val('')
  productStockInput.val('')
  productImgInput.val('')
  showProducts()
}

// Show preview image when uploading a new product
function showPreviewImg(event, categoryID) {
  const image = document.getElementById('preview-image-' + categoryID)
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = (event) => {
    image.src = event.target.result
  }

  reader.readAsDataURL(file)
}
