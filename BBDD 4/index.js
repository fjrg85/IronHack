import Animal from "./Animal.js";

let animal;
function DataAnimal(){
    document.getElementById("fullData").hidden = false;
    document.getElementById("fullData").innerHTML = animal.getFullData();
    document.getElementById("enviar").disabled = false;
}
function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    value.nombre = data.getAll("nombre");
    value.tipo = data.getAll("tipo");
    value.anionac = data.getAll("anionac");

    //let nombre = data.get('nombre');
    //let tipo = data.get('tipo');
    //alert(value);
    //alert(value.nombre);
    //alert(value.tipo);
    //alert(value.anionac);
    console.log({ value });

    animal = new Animal(value.nombre,value.tipo,value.anionac);
    document.getElementById("enviar").disabled = true;
    document.getElementById("datos").hidden = false;
    document.getElementById("enviarInfo").innerHTML = animal.getNombreonly();

    
}

//let animal;
const btn = document.querySelector("#enviarInfo");
btn.addEventListener("click", DataAnimal);
const form = document.querySelector("#addAnimal");
form.addEventListener("submit", handleSubmit);

/*
let animal = new Animal("Micifuz","gato", 2019);
//alert("Micifuz")
document.getElementById("datos").innerHTML= animal.getFullData();

console.log(animal.getFullData());
*/