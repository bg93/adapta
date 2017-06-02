
var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'mysql.hostinger.es',
   user: 'u754154619_a',
   password: 'holamundo2016',
   database: 'u754154619_a'
   /*
   ,
   port: 3306
   */
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

var query = connection.query('INSERT INTO usuarios(usuario, email, password, foto, fecha_nacimiento) VALUES(?, ?, ?, ?, ?)', ['Homer', 'homer@gmail.com', 'passsss', '2', '08/08/2012'], function(error, result){
   if(error){
      throw error;
   }else{
      console.log(result);
   }
 }
);

connection.end();
