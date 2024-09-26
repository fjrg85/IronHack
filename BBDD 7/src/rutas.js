//Cargamos las librerías: express, bcryptjs; y el módulo de conexión a la BBDD creado por nosotros que se utilizan en las rutas: 
const express = require('express');
const rutas = express.Router();
const bcriptjs = require('bcryptjs');
const connectionbd = require('../database/db');


//10 - registro. Código que se cargará una vez relleno el formulario de registro
rutas.post('/register', async (req, res)=>{
    //variables para guardar la información de los campos
	const user = req.body.user;
	const name = req.body.name;
    const rol = req.body.rol;
	const pass = req.body.pass;

    //variable que guarda la contraseña encriptada en 8 iteraciones por el módulo bcrypt
	let passwordHash = await bcriptjs.hash(pass, 8); 

    //insertamos los datos en nuestra BBDD
    connectionbd.query('INSERT INTO users SET ?',{user:user, name:name, rol:rol, pass:passwordHash}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //enviamos el render con un objeto para el Sweet Alert 2
			res.render('register', {
				alert: true,
				alertTitle: "Registro",
				alertMessage: "¡Registro exitoso!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			});      
        }
	});
})



//11 - Metodo para la autenticación para el post definido como /auth. Método que se utiliza en el formulario para iniciar sesión
rutas.post('/auth', async (req, res)=> {
	const user = req.body.user;
	const pass = req.body.pass;
    let passwordHash = await bcriptjs.hash(pass, 8);

    //comprobamos si existe el usuario y la contraseña
	if (user && pass) {
        //comprobamos si existe el usuario em la base de datos
		connectionbd.query('SELECT * FROM users WHERE user = ?', [user], async (error, results, fields)=> {
            //comprobamos si hemos obtenido resultados y si ha coincidido la contraseña en tal caso
			if( results.length == 0 || !(await bcriptjs.compare(pass, results[0].pass)) ) {
                //Mensaje simple para avisar de que es incorrecta la autenticación 
                //res.send('Usuario y/o contraseña erróneo');		

                //creamos un objeto para utilizarlo con Sweet Alert 2
				res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña erróneo",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login',
						login:false 
                    });
						
			} else {  
                //Mensaje simple para avisar de que es correcta la autenticación 
                //res.send('Inicio de sesión exitoso');		  
                
				//creamos una variable de session y le asignamos true       
				req.session.loggedin = true; 
                //cargamos el nombre de usuario que hemos importado de la BBDD
				req.session.name = results[0].name;

                //creamos un objeto para utilizarlo con Sweet Alert 2
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "¡Inicio de sesión exitoso!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: 'admin',
					login: false
				});        			
			}			
			// res.end();
		});
	} else {
        //avisar de que debe ingresar un usuario y una contraseña
		//res.send('Ingrese el usuario y la contraseña');
		//res.end();
        
        //creamos un objeto para utilizarlo con Sweet Alert 2
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese el usuario y la contraseña",
            alertIcon:'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
        
	}
});

//12 - Renderización para la ruta principal / de la vista index.ejs
rutas.get('/', (req, res)=> {
    // si existe la variable que guarda la autenticación
	if (req.session.loggedin) {
        //renderizamos index,asignándole el nombre de usuario y la variable login con valor true
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
        //renderizamos index,asignándole el texto a name y la variable login con valor false
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});

//12B - Renderización para la ruta /login de la vista login.ejs
rutas.get('/login', (req, res)=> {
    // si existe la variable que guarda la autenticación
	if (req.session.loggedin) {
        //renderizamos index,asignándole el nombre de usuario y la variable login con valor true
		res.render('login',{
			login: true		
		});		
	} else {
        //renderizamos index,asignándole el texto a name y la variable login con valor false
		res.render('login',{
			login:false			
		});				
	}
	res.end();
});

//12C - Renderización para la ruta /registro de la vista register.ejs
rutas.get('/registro', (req, res)=> {
    // si existe la variable que guarda la autenticación
	if (req.session.loggedin) {
        //renderizamos index,asignándole el nombre de usuario y la variable login con valor true
		res.render('register',{
			login: true		
		});		
	} else {
        //renderizamos index,asignándole el texto a name y la variable login con valor false
		res.render('register',{
			login:false			
		});				
	}
	res.end();
});

//12D - Renderización para la ruta /admin de la vista admin.ejs
rutas.get('/admin', (req, res)=> {
    // si existe la variable que guarda la autenticación
	if (req.session.loggedin) {
        //renderizamos index,asignándole el nombre de usuario y la variable login con valor true
		res.render('admin',{
			login: true,
			name: req.session.name,
            total: 0			
		});		
	} else {
        //renderizamos index,asignándole el texto a name y la variable login con valor false
		res.render('admin',{
			login:false,
			name: "Área privada, inicie sesión para poder acceder al contenido",
            total: 0			
		});				
	}
	res.end();
});


//13 - Ruta que será cargada para destruir la sesión y redirigir a la página principal
rutas.get('/logout', function (req, res) {
    //Destruye la sesión.
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

//14 - Metodo para la suma para el post definido como /suma (vista admin)
rutas.post('/suma', async (req, res)=> {
	const num1 = req.body.num1;
	const num2 = req.body.num2;

    //comprobamos si existe el usuario y la contraseña
	if (num1 && num2) {
        let total = parseFloat(num1)+parseFloat(num2);
        res.render('admin', {
            login:true,
            name: req.session.name,	
            total: total 
        });
	} else {
        res.render('admin', {
            login: true,
			name: req.session.name,
            total: 0	
        });
        
	}
});

//exportamos todas las rutas
module.exports = rutas;

