<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

	//Configuracion de la conexion a la BD
	header('Content-Type: text/html; charset=UTF-8');
	include("../bd_acceso.php");

	date_default_timezone_set('Europe/Madrid');

	$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata)) {

		$request = json_decode($postdata);

		//Variables POST

		$usuario = $request->registro_usuario;
		$email = $request->registro_email;
		$password = $request->registro_password;

		//si fuese un numero ->       (int)$usuario = $request->registro_numero;

		if(!isset($usuario) || empty($usuario) || !isset($email) || empty($email) || !isset($password) || empty($password)) {
			die("2-No se han recibido los datos requeridos.");
		}

		/*
		$usuario = (isset($_POST['registro_usuario'])) ? $_POST['registro_usuario'] : die("2-No se ha recibido el usuario");
		$email = (isset($_POST['registro_email'])) ? $_POST['registro_email'] : die("2-No se ha recibido el email");
		$password = (isset($_POST['registro_password'])) ? $_POST['registro_password'] : die("2-No se ha recibido la contraseña");
		*/

		$sexo = "O";
		$fecha_nacimiento = "0000-00-00";
		$provincia = "0";
		$foto = "1";

		$clave='rv278u4h';
		$hash = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($clave), $password, MCRYPT_MODE_CBC, md5(md5($clave))));


		$db = new mysqli(host, user, pass, bd);

		if($db->connect_errno > 0){

			die('2-Imposible conectarse a la BD [' . $db->connect_error . ']');
		}

		$db->query("SET NAMES 'utf8'");

		//Se escapan los resultados para evitar conflictos
		$usuario = $db->real_escape_string($usuario);
		$email = $db->real_escape_string($email);
		$password = $db->real_escape_string($password);

		//Se obtiene la fecha y hora actual
		$fecha = date("Y-m-d");
		$hora = date("G:i:s");

		//Se inserta el nuevo usuario
		$sql = "INSERT INTO usuarios (usuario,email,password,sexo,provincia,foto,fecha_nacimiento,fecha,hora) VALUES('$usuario','$email','$hash','$sexo','$provincia','$foto','$fecha_nacimiento','$fecha','$hora');";

		if(!$result = $db->query($sql)) {

		die('2-Ha ocurrido un error durante la query [' . $db->error . ']');
		}

		$id_usuario = $db->insert_id;

		//Se inserta la acción del usuario en el historial
		$sql2 = "INSERT INTO historial (tipo,id_usuario,fecha,hora) VALUES('1','$id_usuario','$fecha','$hora');";

		if(!$result2 = $db->query($sql2)) {

			die('2-Ha ocurrido un error durante la query [' . $db->error . ']');
		}


		echo "1-$usuario";

		//Se cierra la conexión
		$db->close();

	}

?>
