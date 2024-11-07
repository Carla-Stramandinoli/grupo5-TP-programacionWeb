import libros from "../../data/libros.json" with { type: 'json' };
import configuracion from "../../config/configuracion.json" with { type: 'json' };

let ratings = [];

libros.forEach(item => {
    ratings.push(item.Rating);
});


function generateStars(ratings) {
   let stars = '';
   for (let i = 0; i < 5; i++) {
       if(i < ratings){
           stars += "\u2605";
       } else {
           stars += "\u2606";
       }
   }
   return stars;
}


function cargarEstrellas(){
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

var linksCategorias = document.querySelectorAll("a.tab-categoria");
var articulos;


function createArticleNode(id) {
   // Create the main article element
   const article = document.createElement('article');
   article.id = id;
   article.className = `articulo-categoria ${id.split('-')[1]} extra`; // Extract class from the id

   // Create the header element
   const header = document.createElement('header');
   header.className = 'header-articulo';

   // Create and append child elements to the header
   const nameParagraph = document.createElement('p');
   nameParagraph.className = 'item-valor-nombre';
   nameParagraph.textContent = 'Valor del Nombre ITEM 9';
   
   const authorParagraph = document.createElement('p');
   authorParagraph.className = 'item-valor-autor';
   authorParagraph.textContent = 'Valor del Autor';
   
   const img = document.createElement('img');
   img.className = 'item-valor-portada';
   img.src = 'assets/img/' + id + '.png'; // Using the id for the image source
   img.alt = 'Imagen de Portada';
   
   const descriptionParagraph = document.createElement('p');
   descriptionParagraph.className = 'item-valor-descripcion';
   descriptionParagraph.textContent = 'Valor de la Descripcion';
   
   const ratingParagraph = document.createElement('p');
   ratingParagraph.className = 'item-valor-rating';
   ratingParagraph.textContent = 'Valor de Rating';

   // Append all header elements to the header
   header.appendChild(nameParagraph);
   header.appendChild(authorParagraph);
   header.appendChild(img);
   header.appendChild(descriptionParagraph);
   header.appendChild(ratingParagraph);

   // Create the detail element
   const detailDiv = document.createElement('div');
   detailDiv.className = 'detalle-articulo';

   // Create and append custom fields
   for (let i = 1; i <= 5; i++) {
       const customTitle = document.createElement('h4');
       customTitle.className = `item-campo-personalizado_${i}`;
       customTitle.textContent = `NOMBRE de Campo Personalizado ${i}`;
       
       const customValue = document.createElement('p');
       customValue.className = `item-valor-personalizado_${i}`;
       customValue.textContent = `VALOR de Campo Personalizado ${i}`;

       detailDiv.appendChild(customTitle);
       detailDiv.appendChild(customValue);
   }

   // Append header and detail elements to the article
   article.appendChild(header);
   article.appendChild(detailDiv);

   return article; // Return the constructed article node
}

linksCategorias.forEach(function(linkCategoria) {
   linkCategoria.addEventListener("click", function() {
      articulos = "";
      Object.entries(libros).forEach((entry) => {
         const [key, value] = entry;
         let id = value.Id.split("-")[1];
         let articleSelector;


         // Check if the category is "ALL" or matches the current linkCategoria
         if (linkCategoria.innerText === "Todas" ) {
               // Example usage
               if(key > 9 ){
                  id =`item${key}`;
                  const articleNode = createArticleNode(`categoria00-${id}`);
                  document.querySelector("#seccion-categoria").appendChild(articleNode); 
               }    
               articleSelector = llenarCampos(id,value);
               document.querySelector(articleSelector).id = value["Id"];
         }
         
         if (linkCategoria.innerText === value.Categoria) {
            if(key > 9){
               const elements = document.querySelectorAll(".extra");

               // Iterate through the NodeList and remove each element from the DOM
               elements.forEach(element => {
                   element.remove();
               });
            }
            
            articleSelector = llenarCampos(id,value);
            document.querySelector(articleSelector).id = value["Id"];
         };
         cargarEstrellas();
      });
   });
});


function llenarCampos(idRecibido ,value) {
   const articleSelector = "article." + idRecibido;
   // Update the article with book details
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


if(configuracion["modo-test-prod"] === "prod") {
   tabCategoria1.click();  
};

