let categorias = [
  { id: 1, nombre: 'Juegos de terror' },
  { id: 2, nombre: 'Juegos de plataformas' },
]

let productos = [
  {
    id: 1,
    codigo: '1',
    descripcion:
      'Resident Evil 2 Remake es una nueva versión del clásico de Capcom de 1998, que se lanzó originalmente para PlayStation. En esta nueva versión, los jugadores se sumergirán en la historia de Leon S. Kennedy y Claire Redfield, dos nuevos personajes que se unen a la lucha contra el virus T-Veronica. Resident Evil 2 Remake es un juego de acción y terror en tercera persona que se desarrolla en una ciudad destruida por un virus biológico.',
    precio: '19.99',
    stock: 10,
    imagen: 'images/resident_evil_2.jpg',
    categoria: 1,
  },
  {
    id: 2,
    codigo: '2',
    descripcion:
      'Sobrevivir es solo el principio. Seis años después de la catástrofe biológica en Raccoon City, el agente Leon S. Kennedy, uno de los supervivientes del desastre, ha sido enviado a rescatar a la hija del presidente, a quien han secuestrado. Siguiendo su rastro, llega a una apartada población europea, donde sus habitantes sufren un mal terrible. Así comienza esta historia de un arriesgado rescate y terror escalofriante donde se cruzan la vida y la muerte, y el miedo y la catarsis. Con una mecánica de juego modernizada, una historia reimaginada y unos gráficos espectacularmente detallados, Resident Evil 4 Remake supone el renacimiento de un gigante del mundo de los videojuegos.',
    precio: '39.99',
    stock: 20,
    imagen: 'images/resident_evil_4.jpg',
    categoria: 1,
  },
  {
    id: 3,
    codigo: '2',
    descripcion:
      'Acompaña a Mario en una aventura en 3D enorme por todo el planeta usando sus nuevas habilidades para recoger lunas que servirán de combustible a tu aeronave, la Odyssey. ¡Y entretanto, rescata a la princesa Peach de las garras de Bowser!',
    precio: '61.99',
    stock: 50,
    imagen: 'images/mario_odyssey.jpg',
    categoria: 2,
  },
]

if (!localStorage.getItem('categorias')) {
  localStorage.setItem('categorias', JSON.stringify(categorias))
}

if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(productos))
}

function mostrarCategorias() {
  const categoriasJSON = JSON.parse(localStorage.getItem('categorias')) || []
  const productosJSON = JSON.parse(localStorage.getItem('productos')) || []

  const categoriasContainer = document.getElementById('category-container')

  categoriasContainer.innerHTML = categoriasJSON
    .map((categoria) => {
      const productosHTML = productosJSON
        .filter((producto) => producto.categoria === categoria.id)
        .map((producto) => {
          return `      
          <div class="row align-items-center bg-white">
            <div class="col-md-3">
              <img class="product-img" src="${producto.imagen}" alt="${producto.descripcion}" width="90%" height="90%">
            </div>
            <div class="col-md-6 small">
              <dt>Código de producto:</dt>
              <dd>${producto.codigo}</dd>
              <dt>Descripción:</dt>
              <dd>${producto.descripcion}</dd>
              <dt>Precio:</dt>
              <dd>${producto.precio} €</dd>
              <dt>Stock:</dt>
              <dd>${producto.stock} unidades</dd>
            </div>
            <div class="d-flex justify-content-end align-items-end flex-column mt-auto mb-2 pt-3">
              <button type="button" class="btn btn-warning">Agregar a la cesta</button>
            </div>
          </div>
          <hr>
        `
        })
        .join('')
      const categoriaHTML = `<div class="modal fade" id="modalProducto${categoria.id}" tabindex="-1" aria-labelledby="modalProductoLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="modalProductoLabel${categoria.id}">Añadir nuevo juego</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                      <form id="form-${categoria.id}" onsubmit="guardarProducto(event, ${categoria.id})">
                        <div class="modal-body">
                          <div class="form-group">
                          
                            <label for="codigoProducto" class="col-form-label">Código del producto:</label>
                            <input type="text" required class="form-control" id="codigoProducto${categoria.id}" />

                            <label for="descripcionProducto" class="col-form-label">Descripción del producto:</label>
                            <input type="text" required class="form-control" id="descripcionProducto${categoria.id}" />

                            <label for="precioProducto" class="col-form-label">Precio del producto:</label>
                            <input type="text" required class="form-control" id="precioProducto${categoria.id}" />

                            <label for="stockProducto" class="col-form-label">Stock del producto:</label>
                            <input type="number" required class="form-control" id="stockProducto${categoria.id}" />

                            <label for="imagenProducto" class="col-form-label">Imagen del producto:</label>
                            <div class="input-group">
                              <div class="custom-file">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  id="imagenProducto${categoria.id}"
                                  accept="image/*"
                                  aria-describedby="inputGroupFileAddon"
                                  onchange="mostrarImagenPrevista(event, ${categoria.id})"
                                />
                                <label class="custom-file-label" for="imagenProducto">Seleccionar archivo</label>
                              </div>
                            </div>
                            <img class="mt-2" id="imagen-preview${categoria.id}" src="#" alt="Imagen del producto" width="180px" height="270px" />
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
          <h2 class="titleCategory cursor-pointer">${categoria.nombre}</h2>
          <button type="button" class="addCategory btn btn-success" data-toggle="modal" data-target="#modalProducto${categoria.id}">Añadir juego</button>
        </div>
        <dl class="products container">
          ${productosHTML}
        </dl>
    `

      return categoriaHTML
    })
    .join('')
}

function mostrarImagenPrevista(event, idCategoria) {
  const imagen = document.getElementById('imagen-preview' + idCategoria)
  const archivo = event.target.files[0]
  const lector = new FileReader()

  lector.onload = (evento) => {
    imagen.src = evento.target.result
  }

  lector.readAsDataURL(archivo)
}

mostrarCategorias()
