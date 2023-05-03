// Default categories
let categories = [
  { id: 1, name: 'Juegos de terror' },
  { id: 2, name: 'Juegos de plataformas' },
  {id: 3, name: 'Juegos de acción'}
]

// Default products
let products = [
  {
    id: 1,
    code: '1',
    title: 'Resident Evil 2 Remake',
    description:
      'Resident Evil 2 Remake es una nueva versión del clásico de Capcom de 1998, que se lanzó originalmente para PlayStation. En esta nueva versión, los jugadores se sumergirán en la historia de Leon S. Kennedy y Claire Redfield, dos nuevos personajes que se unen a la lucha contra el virus T-Veronica. Resident Evil 2 Remake es un juego de acción y terror en tercera persona que se desarrolla en una ciudad destruida por un virus biológico.',
    price: '19.99',
    stock: 10,
    image: 'images/resident_evil_2.jpg',
    category: 1,
  },
  {
    id: 2,
    code: '2',
    title: 'Resident Evil 4 Remake',
    description:
      'Sobrevivir es solo el principio. Seis años después de la catástrofe biológica en Raccoon City, el agente Leon S. Kennedy, uno de los supervivientes del desastre, ha sido enviado a rescatar a la hija del presidente, a quien han secuestrado. Siguiendo su rastro, llega a una apartada población europea, donde sus habitantes sufren un mal terrible. Así comienza esta historia de un arriesgado rescate y terror escalofriante donde se cruzan la vida y la muerte, y el miedo y la catarsis. Con una mecánica de juego modernizada, una historia reimaginada y unos gráficos espectacularmente detallados, Resident Evil 4 Remake supone el renacimiento de un gigante del mundo de los videojuegos.',
    price: '39.99',
    stock: 20,
    image: 'images/resident_evil_4.jpg',
    category: 1,
  },
  {
    id: 3,
    code: '3',
    title: 'Silent Hill 3',
    description: 'Silent Hill 3 es un videojuego de survival horror, desarrollado por Team Silent y publicado por Konami en 2003 para la consola PlayStation 2. Es la tercera entrega de la serie Silent Hill y se desarrolla diecisiete años después de los acontecimientos de Silent Hill.',
    price: '29.99',
    stock: 15,
    image: 'images/silent_hill_3.jpg',
    category: 1,
  },
  {
    id: 4,
    code: '4',
    title: 'Super Mario Odyssey',
    description:
      'Acompaña a Mario en una aventura en 3D enorme por todo el planeta usando sus nuevas habilidades para recoger lunas que servirán de combustible a tu aeronave, la Odyssey. ¡Y entretanto, rescata a la princesa Peach de las garras de Bowser!',
    price: '61.99',
    stock: 50,
    image: 'images/mario_odyssey.jpg',
    category: 2,
  },
  {
    id: 5,
    code: '5',
    title: 'Grand Theft Auto V',
    description: 'Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto desarrollado por la compañía británica Rockstar North y distribuido por Rockstar Games. Un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se meten en un lío, y tendrán que llevar a cabo una serie de peligrosos golpes para sobrevivir en una ciudad en la que no pueden confiar en nadie, y mucho menos los unos en los otros.',
    price: '19.99',
    stock: 30,
    image: 'images/gta_v.jpg',
    category: 3,
  }
]

// Save default categories and products in local storage
if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify(categories))
}

// Save default categories and products in local storage
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products))
}

// Show categories and products in the view
function showProducts() {
  const categoriesJSON = JSON.parse(localStorage.getItem('categories')) || []
  const productsJSON = JSON.parse(localStorage.getItem('products')) || []
  const categoriesContainer = document.getElementById('category-container')

  categoriesContainer.innerHTML = categoriesJSON
    .map((category) => {
      const productsHTML = productsJSON
        .filter((product) => product.category === category.id)
        .map((product) => {
          return `      
          <div class="row align-items-center bg-white p-2">
          <div class="col-md-3">
            <img class="product-img ${product.stock === 0 ? 'opacity-50' : ''}" src="${product.image}" alt="${
            product.title
          }" width="90%" height="90%">
          </div>       
            <div class="col-md-9 small">
              <dt>Código de producto:</dt>
              <dd>${product.code}</dd>
              <dt>Nombre:</dt>
              <dd>${product.title}</dd>
              <dt>Descripción:</dt>
              <dd>${product.description}</dd>
              <dt>Precio:</dt>
              <dd>${product.price} €</dd>
              <dt>Stock:</dt>
              <dd>${product.stock} unidades</dd>
            </div>
            <div class="d-flex justify-content-start align-items-start flex-column mt-auto col-md-3 mb-2 pt-3">
              <button type="button" class="btn btn-warning" onClick="updateShopCart(event, ${product.id})" ${
            product.stock === 0 ? 'disabled' : ''
          }>Agregar a la cesta</button>
            </div>
          </div>
          <hr>
        `
        })
        .join('')
      const categorieHTML = `<div class="modal fade" id="product-modal-${category.id}" tabindex="-1" aria-labelledby="product-modal-label" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="product-modal-label${category.id}">Añadir nuevo juego</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                      <form id="form-${category.id}" onsubmit="saveProduct(event, ${category.id})">
                        <div class="modal-body">
                          <div class="form-group">
                          
                            <label for="product-code" class="col-form-label">Código del producto:</label>
                            <input type="text" required class="form-control" id="product-code-${category.id}" />

                            <label for="product-name" class="col-form-label">Nombre del producto:</label>
                            <input type="text" required class="form-control" id="product-name-${category.id}" />

                            <label for="product-description" class="col-form-label">Descripción del producto:</label>
                            <input type="text" required class="form-control" id="product-description-${category.id}" />

                            <label for="product-price" class="col-form-label">Precio del producto:</label>
                            <input type="text" required class="form-control" id="product-price-${category.id}" />

                            <label for="product-stock" class="col-form-label">Stock del producto:</label>
                            <input type="number" required class="form-control" id="product-stock-${category.id}" />

                            <label for="product-image" class="col-form-label">Imagen del producto:</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  id="product-image-${category.id}"
                                  accept="image/*"
                                  aria-describedby="inputGroupFileAddon"
                                  onchange="showPreviewImg(event, ${category.id})"
                                />
                                <label class="custom-file-label" for="product-image">Seleccionar archivo</label>
                              </div>
                            </div>
                            <img class="mt-2" id="preview-image-${category.id}" src="#" alt="Imagen del producto" width="180px" height="270px" />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                          <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                      </form>                   
                  </div>
                </div>
              </div>
        <div class="d-flex align-items-center justify-content-around px-4 bg-info">
          <h2 class="category-title cursor-pointer">${category.name}</h2>
          <button type="button" class="btn btn-success" data-toggle="modal" data-target="#product-modal-${category.id}">Añadir juego</button>
        </div>
        <dl class="products container">
          ${productsHTML}
        </dl>
    `
      return categorieHTML
    })
    .join('')
}

// Show shopping cart in the view
function showShopCart() {
  const shopCart = JSON.parse(localStorage.getItem('shopping-cart')) || []
  const shopCartContainer = document.getElementById('shopping-cart-container')
  let total = 0
  shopCartContainer.innerHTML = shopCart
    .map((product) => {
      const amount = product.price * product.quantity
      total += amount
      return `
      <div class="row align-items-center bg-white">
        <div class="col-md-3">
          <img class="product-img" src="${product.image}" alt="${product.description}" width="90%" height="90%">
        </div>
        <div class="col-md-6 small">
          <dt>Código de producto:</dt>
          <dd>${product.code}</dd>
          <dt>Nombre:</dt>
          <dd>${product.title}</dd>
          <dt>Descripción:</dt>
          <dd>${product.description}</dd>
          <dt>Unidades:</dt>
          <dd>${product.quantity}</dd>
          <dt>Importe:</dt>
          <dd>${amount.toFixed(2)} €</dd>
        </div>
        <div class="d-flex justify-content-end align-items-end flex-column mt-auto mb-2 pt-3">
          <button type="button" class="btn btn-danger" onclick="deleteProduct(event, ${product.id})">Eliminar de la cesta</button>
        </div>
      </div>
      <hr>
    `
    })
    .join('')
  shopCartContainer.innerHTML += `
    ${
      shopCart.length > 0
        ? `<div class="text-end">
      <p class="mb-0" style="font-weight: bold; font-size: 1.2rem;">Precio Total: ${total.toFixed(2)} €</p>
      <button type="button" class="btn btn-danger ms-3" onclick="emptyShopCart(event)">Vaciar cesta</button>
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#confirm-order-modal">Realizar Pedido</button>
    </div>
    <div class="modal fade" id="confirm-order-modal" tabindex="-1" aria-labelledby="confirm-order-modal-label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirm-order-modal-label">Confirmar Pedido</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
      </div>
      <div class="modal-body">
        ¿Estás seguro de que deseas realizar el pedido?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="placeOrder(event)">Confirmar</button>
      </div>
    </div>
  </div>
</div>  
    `
        : ''
    }
  `
}

showProducts()
showShopCart()
