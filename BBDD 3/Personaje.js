class Personaje{
    #name;
    energy = 10;
    edad;

    constructor(name, edad){
        this.#name = name;
        this.edad = edad;
    }

    getNombre(){
        return "Nombre: " + this.#name;
    }
    setNombre(name){
        this.#name = name;
    }
    getEdad(){
        return "Edad: " + this.edad;
    }
    setEdad(edad){
        this.edad = edad;
    }
    getFullName(){
        return "Mi nombre es " + this.#name + " y tengo " + this.edad + " años";
    } ;
}

/*
const mario = new Personaje("Mario",30);
mario.getNombre();
mario.getFullName();
*/

export default Personaje;
//export {Personaje};



