import libros from "../data/libros.json" with {type: 'json'};

const carouselInner = document.getElementById("carouselInner");
document.querySelector('#carouselExampleIndicators').setAttribute('data-bs-interval', '2000');

let portada = libros;
let portadas = [];

portada.forEach(item => {
    portadas.push(item.Portada);
});

function obtenerImagenesAleatorias(array, cantidad) {
    let imagenesAleatorias = [];
    let indicesUsados = new Set(); // Usamos un Set para evitar índices duplicados

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

cincoPortadas.forEach((src, index) => {

    // Create a new div for each carousel item
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    // Set the first item as active
    if (index === 0) {
        carouselItem.classList.add("active");
    }

    // Create the image element
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("d-block", "imgCarrusel");
    img.alt = `Image ${index + 1}`;

    // Append the image to the carousel item
    carouselItem.appendChild(img);

    // Append the carousel item to the carousel inner container
    carouselInner.appendChild(carouselItem);
});


// let headerArticulo = document.querySelectorAll(".header-articulo");
// let boton = document.createElement("button");
// boton.value = "Ver mas";
// headerArticulo.addEventListener("click", ()=> {
//     articulos.classList.tog
// })

