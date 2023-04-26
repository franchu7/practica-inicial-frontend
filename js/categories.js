// Add category to local storage
$(document).ready(function () {
  const categoryForm = $('#category-form')
  const categoryNameInput = $('#category-name')

  let categories = JSON.parse(localStorage.getItem('categories')) || []

  function saveCategory(event) {
    event.preventDefault()
    const newCategory = {
      id: categories.length + 1,
      name: categoryNameInput.val(),
    }
    categories.push(newCategory)
    localStorage.setItem('categories', JSON.stringify(categories))
    categoryNameInput.val('')
    $('#category-modal').modal('hide')
    showProducts()
  }

  categoryForm.submit(saveCategory)
})

// Dropdown categories and its products
$(document).on('click', '.category-title', function () {
  $(this).parent('div').next('.products').slideToggle()
  $(this).parent('div').find('button').toggleClass('disabled')
  if ($(this).parent('div').find('button').hasClass('disabled')) {
    $(this).parent('div').find('button').attr('disabled', true)
  } else {
    $(this).parent('div').find('button').attr('disabled', false)
  }
})
