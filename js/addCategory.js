$(document).ready(function () {
  const categoryForm = $('#category_form')
  const categoryNameInput = $('#nombreCategoria')

  let categorias = JSON.parse(localStorage.getItem('categorias')) || []

  function guardarCategoria(event) {
    event.preventDefault()
    const nuevaCategoria = {
      id: categorias.length + 1,
      nombre: categoryNameInput.val(),
    }
    categorias.push(nuevaCategoria)
    localStorage.setItem('categorias', JSON.stringify(categorias))
    categoryNameInput.val('')
    $('#modalCategoria').modal('hide')
    mostrarCategorias()
  }

  categoryForm.submit(guardarCategoria)
})
