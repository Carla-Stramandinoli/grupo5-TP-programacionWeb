import libros from "../../data/libros.json" with { type: 'json' };

var linksCategorias = document.querySelectorAll("a.categoria-tab");
var articulos

linksCategorias.forEach(function(linkCategoria) {
	linkCategoria.addEventListener("click", function() {
		articulos = ""
		Object.entries(libros).forEach((entry) => {
			const [key, value] = entry;

			if (linkCategoria.innerText === value.Categoria)
			{
				// console.log(`${key.toString}: ${value.Categoria}`);
				articulos = articulos + "\n" + "<article style='display:block;' class='categoria-articulo'>" + "<h2>" + value["Nombre"] + "</h2>" + "<img src='"+ value["URL Imagen"] + "' alt='" + value["Nombre"] + "'>" + "<p>" + value["Descripcion"] + "</p>" + "</article>"
			};

			document.querySelector("section#categoria-seccion").innerHTML = articulos;

		});
	});
});
