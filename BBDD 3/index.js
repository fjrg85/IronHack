import Personaje from "./Personaje.js";

let personaje = new Personaje("Juan",30);

document.getElementById("nombre").innerHTML= personaje.getNombre();
document.getElementById("info").innerHTML= personaje.getFullName();


//console.log(personaje.getNombre());
//console.log(personaje.getFullName());
