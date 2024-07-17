// npm init -y
// npm install mysql express ejs
// npm install pug --save

const express = require("express"); //cargamos la librería de express 
const mysql = require("mysql")
const app = express(); //variable para acceder a todos los métodos de la librería express 
app.set("view engine", "ejs"); //cargamos el motor de vistas para poder utilizar código html dentro de js en archivos con extensión js 

let conexion = mysql.createConnection({
    host : "localhost",
    database : "ejemploa",
    user : "root",
    password: ""
});

app.use(express.json()); //codifica el código json para poder ser leído en json 
app.use(express.urlencoded({extended:false}));//Analiza todos los datos que vienen de una págnina y lo codifica para poder ser leido en js
app.get("/", function(req, res){
    res.render("registro");
});
app.post("/validar", function(req, res){
    const datos = req.body;
    let nombre = datos.nombre; 
    let apellidos = datos.apellidos; 
    let email = datos.email; 
    let pass = datos.pass;
    
    let buscar = "SELECT * FROM empleados WHERE correo = '"+ email + "' ";
    conexion.query(buscar, function(error, row){
        if (error){
            throw error;
        }else {
            if(row.length>0){
                console.log("Correo ya registrado");
                res.render("regNok");// información de que usuario ya existe
            }else{
                let registrar = "INSERT INTO empleados (nombre, apellidos, correo, pass) VALUES ('"+ nombre +"', '"+ apellidos +"', '"+ email +"', '"+ pass +"')";	//consulta para introducir datos
                conexion.query(registrar, function (error){
                    if (error){
                        throw error;
                    }else {
                        console.log("datos almacenados");
                        res.render("regok");// información de que se registro correctamente
                    }
                });
            }
        }
    });
});

//Configuramos el puerto para el servidor local 
app.listen(3000, function(){ 
console.log("Servidor creado http://localhost:3000") 
});
