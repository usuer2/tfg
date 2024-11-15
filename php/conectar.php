<?php
$bd_host = "localhost"; $bd_usuario = "root";
$bd_password = "";
$bd_base = "datos_tfg";
$conexion = new mysqli($bd_host, $bd_usuario, $bd_password);
if ($conexion) {
$conexion->select_db($bd_base);
mysqli_set_charset($conexion,"utf8");}
