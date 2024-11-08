import libros from "../../data/libros.json" with { type: 'json' };
import configuracion from "../../config/configuracion.json" with { type: 'json' };

let ratings = [];
let portadas = [];

libros.forEach(item => {
   ratings.push(item.Rating);
   portadas.push(item.Portada);
});

//obtener el carrusel
const carouselInner = document.getElementById("carouselInner");
document.querySelector('#carouselExampleIndicators').setAttribute('data-bs-interval', '2000');


function obtenerImagenesAleatorias(array, cantidad) {
    let imagenesAleatorias = [];
    let indicesUsados = new Set(); // Set para evitar índices duplicados

    while (imagenesAleatorias.length < cantidad) {
        let indiceAleatorio = Math.floor(Math.random() * array.length);

        if (!indicesUsados.has(indiceAleatorio)) { // Verifica que el índice no esté repetido
            imagenesAleatorias.push(array[indiceAleatorio]);
            indicesUsados.add(indiceAleatorio); // Marca el índice como usado
        }
    }
    return imagenesAleatorias;
}

let cincoPortadas = obtenerImagenesAleatorias(portadas, 5);
carouselInner.innerHTML = "";

//recorre el array con las portadas y agrega cinco aleatorias al carrusel
cincoPortadas.forEach((src, index) => {

    // crear un nuevo div para el carrusel
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    // setea el primer item como activo (el que se esta viendo)
    if (index === 0) {
        carouselItem.classList.add("active");
    }

    // creas el elemento imagen
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("d-block", "imgCarrusel");
    img.alt = `Image ${index + 1}`;

    // agregar la imagen al item del carrusel
    carouselItem.appendChild(img);

    // agregar el item del carrusel al contenedor del carrusel
    carouselInner.appendChild(carouselItem);
});


//obtener todos los campos con nombres de los libros para hacer la lupita
let nombresDeLibros = document.querySelectorAll(".item-valor-nombre");
let inputBuscador = document.querySelector(".buscador");

inputBuscador.addEventListener("keyup", () => {
   let valor = inputBuscador.value;
   if (valor === "") {
      // Si el buscador está vacío, cargamos todos los libros en la categoría "Todas"
      tabCategoria1.click();
      location.reload()
   } else {

      let arrayDeLibrosQueCumplen = [];

      nombresDeLibros.forEach((item) => {
         if (item.innerHTML.includes(inputBuscador.value)) {
            arrayDeLibrosQueCumplen.push(item.parentNode.parentNode);
         }

         const elements = document.querySelectorAll(".extra");
         elements.forEach(element => {
            element.remove();
         });
         let seccionCategoria = document.querySelector("#seccion-categoria");
         seccionCategoria.innerHTML = "";

         arrayDeLibrosQueCumplen.forEach((item) => {
            seccionCategoria.appendChild(item);
         })
      });
   }
})

//genera estrellas en base a al numero que esta guardado en el archivo json
function generateStars(ratings) {
   let stars = '';
   for (let i = 0; i < 5; i++) {
      if (i < ratings) {
         stars += "\u2605";
      } else {
         stars += "\u2606";
      }
   }
   return stars;
}

function cargarEstrellas() {
   document.querySelectorAll(".articulo-categoria").forEach((article, index) => {
      // Busca el elemento donde colocarás las estrellas
      const ratingElement = article.querySelector(".item-valor-rating");
      // Crea y agrega el elemento de estrellas
      if (ratingElement) {
         ratingElement.innerHTML = generateStars(ratings[index]);
         ratingElement.classList.add("estrellasIcono");
      }
   });
}


const tabCategoria1 = document.querySelector("#tab-categoria-0");
//obtiene todos los <a> con la clase tab-categoria
var linksCategorias = document.querySelectorAll("a.tab-categoria");
var articulos;

//creacion del nodo article para las tarjetas extra de la seccion todas
function createArticleNode(id) {
   const article = document.createElement('article');
   article.id = id;
   article.className = `articulo-categoria ${id.split('-')[1]} extra`;

   const header = document.createElement('header');
   header.className = 'header-articulo';

   // crear y agregar elementos al header
   const nombreParrafo = document.createElement('p');
   nombreParrafo.className = 'item-valor-nombre';
   nombreParrafo.textContent = 'Valor del Nombre ITEM 9';

   const autorParrafo = document.createElement('p');
   autorParrafo.className = 'item-valor-autor';
   autorParrafo.textContent = 'Valor del Autor';

   const img = document.createElement('img');
   img.className = 'item-valor-portada';
   img.src = 'assets/img/' + id + '.png';
   img.alt = 'Imagen de Portada';

   const descripcionParrafo = document.createElement('p');
   descripcionParrafo.className = 'item-valor-descripcion';
   descripcionParrafo.textContent = 'Valor de la Descripcion';

   const ratingParrafo = document.createElement('p');
   ratingParrafo.className = 'item-valor-rating';
   ratingParrafo.textContent = 'Valor de Rating';

   // agregar todos los elementos al header
   header.appendChild(nombreParrafo);
   header.appendChild(autorParrafo);
   header.appendChild(img);
   header.appendChild(descripcionParrafo);
   header.appendChild(ratingParrafo);

   // crear el elemento de detalle articulo
   const detalleArticuloDiv = document.createElement('div');
   detalleArticuloDiv.className = 'detalle-articulo';

   // crear y agregar campos customizados
   for (let i = 1; i <= 5; i++) {
      const customTitle = document.createElement('h4');
      customTitle.className = `item-campo-personalizado_${i}`;
      customTitle.textContent = `NOMBRE de Campo Personalizado ${i}`;

      const customValue = document.createElement('p');
      customValue.className = `item-valor-personalizado_${i}`;
      customValue.textContent = `VALOR de Campo Personalizado ${i}`;

      detalleArticuloDiv.appendChild(customTitle);
      detalleArticuloDiv.appendChild(customValue);
   }

   // agregar los elementos header y detalle a todo el articulo que contiene los libros
   article.appendChild(header);
   article.appendChild(detalleArticuloDiv);

   return article; // devuelve la tarjeta construida
}

cargarCategorias();


function cargarCategorias() {
   linksCategorias.forEach(function (linkCategoria) {
      linkCategoria.addEventListener("click", function () {
         articulos = "";
         Object.entries(libros).forEach((entry) => {
            const [key, value] = entry;
            let id = value.Id.split("-")[1];
            let articleSelector;


            if (linkCategoria.innerText === "Todas") {
               if (key > 10) {
                  id = `item${key}`;
                  const articuloNode = createArticleNode(`categoria00-${id}`);
                  document.querySelector("#seccion-categoria").appendChild(articuloNode);
               }
               articleSelector = llenarCampos(id, value);
               document.querySelector(articleSelector).id = value["Id"];
            }

            if (linkCategoria.innerText === value.Categoria) {
               
               const elements = document.querySelectorAll(".extra");
               // recorre los elementos agregados dinamicamente y los elimina para solo mostrar los de la categoria especifica
               elements.forEach(element => {
                  element.remove();
               });

               articleSelector = llenarCampos(id, value);
               document.querySelector(articleSelector).id = value["Id"];
            };
            cargarEstrellas();
         });
      });
   });
}

function llenarCampos(idRecibido, value) {
   const articleSelector = "article." + idRecibido;
   // actualiza los articulos con los datos de los libros
   document.querySelector(articleSelector + " > header.header-articulo > p.item-valor-nombre").innerText = value["Nombre"];
   document.querySelector(articleSelector + " > header.header-articulo > p.item-valor-autor").innerText = value["Autor"];
   document.querySelector(articleSelector + " > header.header-articulo > img.item-valor-portada").src = value["Portada"];
   document.querySelector(articleSelector + " > header.header-articulo > img.item-valor-portada").alt = value["Nombre"];
   document.querySelector(articleSelector + " > header.header-articulo > p.item-valor-descripcion").innerText = value["Descripcion"];
   document.querySelector(articleSelector + " > header.header-articulo > p.item-valor-rating").innerText = value["Rating"];

   for (const property in value) {
      switch (property.split(".")[0]) {
         case "personalizado_1":
            document.querySelector(articleSelector + " > div.detalle-articulo > h4.item-campo-personalizado_1").innerText = property.split(".")[1];
            document.querySelector(articleSelector + " > div.detalle-articulo > p.item-valor-personalizado_1").innerText = value[property];
            break;
         case "personalizado_2":
            document.querySelector(articleSelector + " > div.detalle-articulo > h4.item-campo-personalizado_2").innerText = property.split(".")[1];
            document.querySelector(articleSelector + " > div.detalle-articulo > p.item-valor-personalizado_2").innerText = value[property];
            break;
         case "personalizado_3":
            document.querySelector(articleSelector + " > div.detalle-articulo > h4.item-campo-personalizado_3").innerText = property.split(".")[1];
            document.querySelector(articleSelector + " > div.detalle-articulo > p.item-valor-personalizado_3").innerText = value[property];
            break;
         case "personalizado_4":
            document.querySelector(articleSelector + " > div.detalle-articulo > h4.item-campo-personalizado_4").innerText = property.split(".")[1];
            document.querySelector(articleSelector + " > div.detalle-articulo > p.item-valor-personalizado_4").innerText = value[property];
            break;
         case "personalizado_5":
            document.querySelector(articleSelector + " > div.detalle-articulo > h4.item-campo-personalizado_5").innerText = property.split(".")[1];
            document.querySelector(articleSelector + " > div.detalle-articulo > p.item-valor-personalizado_5").innerText = value[property];
            break;
      }
   };
   return articleSelector;
}


if (configuracion["modo-test-prod"] === "prod") {
   tabCategoria1.click();
};
