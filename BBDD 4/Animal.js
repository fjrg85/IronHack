class Animal{
    #name;
    tipo;
    anac;

    constructor(name, tipo, anac){
        this.#name = name;
        this.tipo = tipo;
        this.anac = anac;
    }

    getNombre(){
        return "Nombre: " + this.#name;
    }
    getNombreonly(){
        return this.#name;
    }
    setNombre(name){
        this.#name = name;
    }
    getAnioNac(){
        return "Año Nac: " + this.anac;
    }
    setAnioNac(anac){
        this.anac = anac;
    }
    getTipo(){
        return "Tipo: " + this.tipo;
    }
    setTipo(anac){
        this.tipo = tipo;
    }

    getFullData(){
        return "Nombre animal: " + this.#name + "\n tipo: " + this.tipo + "\n Año nacimiento: "+ this.anac;
    } ;
}

export default Animal;



