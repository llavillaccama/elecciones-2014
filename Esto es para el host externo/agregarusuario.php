<?php
//Conexion a mysql
$conexion= mysql_connect("mysql.nixiweb.com","u945250946_phone","phonegap");
//Nombro variables con metodo POST
$id = $_POST['id'];
$sex = $_POST['sex'];
$name = $_POST['name'];
$email = $_POST['email'];
$birtday = $_POST['birtday'];


//Selecciono mi Base de Datos
mysql_select_db("u945250946_phone",$conexion);

$sql="INSERT INTO usuario (`id` ,`nombre` ,`fecha_nac` ,`sexo` ,`email`) VALUES ('$id','$name','$birtday','$sex','$email')";

$resultado=mysql_query($sql);
//Cierro
mysql_close($conexion);
?>
