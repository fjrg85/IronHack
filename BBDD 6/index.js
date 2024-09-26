//import Grupo from "./objects.js";

const express = require("express"); //cargamos la librería de express 
const app = express(); //variable para acceder a todos los métodos de la librería express 
app.set("view engine", "ejs"); //cargamos el motor de vistas para poder utilizar código html dentro de js en archivos con extensión js 

const grupofile = require('./objects');

app.use(express.json()); //codifica el código json para poder ser leído en json 
app.use(express.urlencoded({extended:false}));//Analiza todos los datos que vienen de una págnina y lo codifica para poder ser leido en js
app.get("/", function(req, res){
    res.render("registro");
});
app.post("/validar", function(req, res){
    const datos = req.body;
    console.log(datos);
    let nota1;
    let nota2;
    let nota3;
    let nota4;
    let notasAll;
    let notaMedia;
    let grupo;
    try{
        if (datos.nota1 < 0 || datos.nota1 > 9.95){throw "valor invalid";}
        else{nota1 = parseFloat(datos.nota1);}
        if (datos.nota2 < 0 || datos.nota2 > 9.95){throw "valor invalid";}
        else{nota2 = parseFloat(datos.nota2);}
        if (datos.nota3 < 0 || datos.nota3 > 9.95){throw "valor invalid";}
        else{nota3 = parseFloat(datos.nota3);}
        if (datos.nota4 < 0 || datos.nota4 > 9.95){throw "valor invalid";}
        else{nota4 = parseFloat(datos.nota4);}
        notasAll = [nota1,nota2,nota3,nota4];
        notasAll.forEach(function(nota){notaMedia += parseFloat(nota);});
        notaMedia = notaMedia/4.0;
        grupo = new grupofile.Grupo()
        console.log(notaMedia);
        console.log(err);
    }
    catch(err){
        console.log(err);}
    
    console.log("Jelou");
    
    /*
    res.render('views/registro', {
        errormsg: errormsg
      });
*/

});



//Configuramos el puerto para el servidor local 
app.listen(3000, function(){ 
console.log("Servidor creado http://localhost:3000") 
});
