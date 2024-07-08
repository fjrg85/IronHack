// npm init -y
// npm install mysql express ejs

const express = require("express"); //cargamos la librería de express 
const mysql = require("mysql")
const app = express(); //variable para acceder a todos los métodos de la librería express 
app.set("view engine", "ejs"); //cargamos el motor de vistas para poder utilizar código html dentro de js en archivos con extensión js 
//app.use(express.static('public'))

let conexion = mysql.createConnection({
    host : "localhost",
    database : "ejemploa",
    user : "root",
    password: ""
});

app.use(express.json()); //codifica el código json para poder ser leído en json 
app.use(express.urlencoded({extended:false}));//Analiza todos los datos que vienen de una págnina y lo codifica para poder ser leido en js

app.get('/', function (req, res) {
    console.log("llamada db");
    conexion.query('SELECT * FROM marcas', function(err, rows)   
  {  
    if (err){
        throw err;
    }
    else{
        console.log("llamada db ok");
        //res.json(rows);        
        res.write('<h1>Marcas</h1>');
        res.write('<table>');
        res.write('<tr>');
        res.write('<th>Id</th>');
        res.write('<th>Nombre</th>');
        res.write('<tr>');
        for(var i=0; i< rows.length; i++){
            res.write('</tr>');
            res.write('<td>' + rows[i]['Id'].toString() + '</td>');
            res.write('<td>' + rows[i]['Nombre'].toString() + '</td>');
            res.write('</tr>');
            //res.write(i.toString());
        }
        res.write('</table>');
        res.end();
    }
  });

});

//Configuramos el puerto para el servidor local 
app.listen(3000, function(){ 
console.log("Servidor creado http://localhost:3000") 
});
