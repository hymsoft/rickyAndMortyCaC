// Aqui necesitamos traer todos los personajes, por eso importamos nuestra funcion getCharacters

import { getCharacters } from "./services/getData.js";

// Capturamos el main container de nuestro home y el loader
const container = document.querySelector("#characters");
const loader = document.querySelector("#lds-ring");

const charactersList = async (page = 1) => {
  // por defecto le pasamos el page 1 por si no lo recibe
  // mostramos el loader antes de llamar a la API
  loader.style.display = "grid";
  // pedimos los personajes
  const { results } = await getCharacters(page);
  // ocultamos el loader una vez que ya tenemos la respuesta
  loader.style.display = "none";
  results.forEach((character) => {
    // por cada personaje creamos un article con sus datos
    const article = document.createElement("article");
    article.setAttribute("class", "character");
    article.innerHTML = `
    <img src="${character.image}" alt="">
    <h2>${character.name}</h2>
    <div>
    <p>${character.species}</p>
    <p class="${character.status.toLowerCase()}"></p>
    </div>
    <a href="/#/${character.id}">Ver detalle</a>
    `;
    container.appendChild(article);
  });
};

// Escuchamos cambios en la URL, atentos a cuando hagan click en un “ver detalle”
window.addEventListener("hashchange", () => {
  // Si el enlace lleva a /#/3, id toma el valor 3 que es el ID del personaje
  const id = location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "/";
  console.log(typeof id);
  localStorage.setItem("charID", id);
  //   window.location.replace("/character.html");
});

charactersList();
