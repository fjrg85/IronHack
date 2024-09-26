class Grupo{
    nroalumnos = 4;
    #notaMedia;
    #notasAll;

    constructor(notaMedia,notasAll ){
        this.#notaMedia = notaMedia;
        this.#notasAll = notasAll;
    }

    visualizar_media(){
        return this.#notaMedia;
    }
    visualizar_notas(){
        return this.#notasAll;
    }
}

export default Grupo;