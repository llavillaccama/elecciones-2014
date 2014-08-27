<?php

//Conexion a mysql
$conexion= mysql_connect("mysql.nixiweb.com","u945250946_phone","phonegap");

//Nombro variables con metodo POST
$Nombre= $_POST['Nombre'];
$Descripcion = $_POST['Descripcion'];
$LatY = $_POST['LatY'];
$LongX = $_POST['LongX'];

//Selecciono mi Base de Datos
mysql_select_db("u945250946_phone",$conexion);


//Añado la onulta
$sql="INSERT INTO lugar (`Nombre`, `Descripcion`, `LatY`, `LongX`) VALUES ('$Nombre','$Descripcion','$LatY','$LongX')";

$resultado=mysql_query($sql);

//Cierro
mysql_close($conexion);

?>