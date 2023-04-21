function guardarProducto(event, categoriaProducto) {
  let productos = JSON.parse(localStorage.getItem('productos')) || []
  event.preventDefault()
  const codigoProductoInput = $('#codigoProducto' + categoriaProducto)
  const descripcionProductoInput = $('#descripcionProducto' + categoriaProducto)
  const precioProductoInput = $('#precioProducto' + categoriaProducto)
  const stockProductoInput = $('#stockProducto' + categoriaProducto)
  const imagenProductoInput = $('#imagen-preview' + categoriaProducto)
  const nuevoProducto = {
    id: productos.length + 1,
    codigo: codigoProductoInput.val(),
    descripcion: descripcionProductoInput.val(),
    precio: precioProductoInput.val(),
    stock: parseInt(stockProductoInput.val()),
    imagen: imagenProductoInput.attr('src'),
    categoria: categoriaProducto,
  }
  productos.push(nuevoProducto)
  localStorage.setItem('productos', JSON.stringify(productos))
  $('#modalProducto' + categoriaProducto).modal('hide')
  codigoProductoInput.val('')
  descripcionProductoInput.val('')
  precioProductoInput.val('')
  stockProductoInput.val('')
  imagenProductoInput.val('')
  mostrarCategorias()
}
