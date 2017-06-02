<?php

	//Configuracion de la conexion a la BD
  header('Content-Type: text/html; charset=UTF-8');
  include("../bd_acceso.php");

  date_default_timezone_set('Europe/Madrid');

	//Variables POST
  $email = (isset($_POST['login_email'])) ? $_POST['login_email'] : die("4-No se ha recibido el email");
  $password = (isset($_POST['login_password'])) ? $_POST['login_password'] : die("4-No se ha recibido la contraseña");


  $db = new mysqli(host, user, pass, bd);

  if($db->connect_errno > 0) {

	die('4-Imposible conectarse a la BD [' . $db->connect_error . ']');
  }

	$db->query("SET NAMES 'utf8'");


	//Se escapan los resultados para evitar conflictos
	$email = $db->real_escape_string($email);
	$password = $db->real_escape_string($password);

  //Se obtienen los datos del usuario el usuario
	$sql = "SELECT * FROM usuarios WHERE email='$email'";

	if(!$result = $db->query($sql)){

		die('4-Ha ocurrido un error durante la query [' . $db->error . ']');
	}

	while($row = $result->fetch_assoc()){

		$id = $row['id'];
	$hash = $row['hash'];
	}

  //Se obtiene la fecha y hora actual
	$fecha = date("Y-m-d");
  $hora = date('G:i:s');

  //Se actualiza la última fecha de conexión del usuario
	$sql2 = "UPDATE usuarios SET fecha_conexion='$fecha',hora_conexion='$hora' WHERE id='$id'";

  if(!$result2 = $db->query($sql2)){

		die('2-Ha ocurrido un error durante la query [' . $db->error . ']');
	}

  //Se inserta la acción del usuario en el historial
	$sql3 = "INSERT INTO historial (tipo,id_usuario,fecha,hora) VALUES('2','$id','$fecha','$hora');";

	if(!$result3 = $db->query($sql3)) {

		die('2-Ha ocurrido un error durante la query [' . $db->error . ']');
	}


  //Se libera
	$result->free();

  //Se cierra la conexión
	$db->close();


  //Se crea una clave de codificación (debe usarse la misma para encriptar y desencriptar)
	$clave='rv278u4h';

  //Se obtiene la contraseña descifrada
  $passfinal = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($clave), base64_decode($hash), MCRYPT_MODE_CBC, md5(md5($clave))), "\0");


	if(!isset($hash)){

		die("2-No existe ningún usuario con este email");
	}

	if ($password == $passfinal){

		echo "1-$id";
	}

	else{

		die("3-La contraseña introducida es incorrecta");
	}


?>
