<?php

include_once "Conectar.php";

//------------------------------- MENÚ PARA EJECUTAR UNA FUNCION O OTRA ----------------------------------------------

// Verificar si se recibe una solicitud POST para iniciar sesión o registrar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el cuerpo de la solicitud POST como cadena JSON
    $jsonData = file_get_contents('php://input');

    // Convertir la cadena JSON a un array asociativo de PHP
    $data = json_decode($jsonData, true);

    // Verificar si se proporciona un tipo de acción (Iniciar o Registrar)
    if (isset($data['action'])) {
        $action = $data['action'];

        // Llamar a la función correspondiente

        // INICIAR SESIÓN
        if ($action === 'IniciarSesion') {
            $Usuario = $data['Usuario'];
            $Contrasena = $data['Contrasena'];
            IniciarSesion($Usuario, $Contrasena);
        }

        // REGISTRARSE
        else if ($action === 'Registrarse') {
            $Usuario = $data['Usuario'];
            $Contrasena = $data['Contrasena'];
            $Correo = $data['Correo'];
            $Telefono = $data['Telefono'];
            Registrarse($Usuario, $Contrasena, $Correo, $Telefono);
        }

        /*
        //RECOGER DE LA BBDD LOS DATOS DEL ALUMNO
        elseif ($action === 'ConsultarEmpresa') {
            $_SESSION['Dni'] = $data['Dni'];
            $DNI = $_SESSION['Dni'];
            ConsultarEmpresa($DNI);
        }
        */

        //MESAJE SI LA ACCIÓN NO SE HA INDICADO
        else {
            // Manejar error si no se proporciona un tipo de acción
            echo json_encode(array("error" => "Tipo de acción no especificado."));
        }
    }
}

//------------------------------------------ INICIAR SESIÓN EN LA WEB ----------------------------------------//
function IniciarSesion($Usuario, $Contrasena)
{
    // Incluir conexión a la base de datos
    include_once "Conectar.php";
    global $conexion;
    // Obtener el cuerpo de la solicitud POST como cadena JSON
    $jsonData = file_get_contents('php://input');
    // Convertir la cadena JSON a un array asociativo de PHP
    $Datos = json_decode($jsonData, true);
    // Obtener el Usuario y la contraseña del array
    $Usuario = $Datos['Usuario'];
    $Contrasena = $Datos['Contrasena'];
    // Consulta SQL para comprobar si el usuario existe en la BBDD
    $sql = "SELECT * FROM datos_usuario WHERE usuario = '$Usuario' AND contrasena = '$Contrasena'";
    $result = $conexion->query($sql);

    // Verificar si se encontraron resultados
    if ($result->num_rows > 0) {
        echo json_encode("El usuario es correcto");
    } else {
        // Si no se encontraron resultados, devolver un mensaje de error
        $error = "Lo sentimos no está registrado o sus credenciales son incorrectas";
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *");
        echo json_encode($error);
    }
};

//-------------------------------------- REGISTRARSE EN LA WEB ----------------------------------------//
function Registrarse($Usuario, $Contrasena, $Correo, $Telefono)
{
    // Incluir conexión a la base de datos
    include_once "Conectar.php";
    global $conexion;
    // Obtener el cuerpo de la solicitud POST como cadena JSON
    $jsonData = file_get_contents('php://input');
    // Convertir la cadena JSON a un array asociativo de PHP
    $Datos = json_decode($jsonData, true);
    // Obtener el Usuario, la contraseña, el correo y el Telefono del array con las respectivas comporbaciones

    // Consulta SQL para comprobar si el usuario existe en la BBDD
    $sql = "SELECT * FROM datos_usuario WHERE usuario = '$Usuario'";
    $result = $conexion->query($sql);

    // Verificar si se encontraron resultados
    if ($result->num_rows > 0) {
        //Si se encontraron resultados pedir que cambie el nombre de usuario
        echo json_encode("Nombre de usuario ya en uso, proporcione otro distinto por favor");
    } else {
        $Usuario = $Datos['Usuario'];
        $Contrasena = $Datos['Contrasena'];
        $Correo = $Datos['Correo'];
        $Telefono = $Datos['Telefono'];

        //Comprobación de un núemro de teléfono correcto
        //1.- Comporbar que tiene 9 caracteres
        //2.- Comporbar que no tenga ningún carácter distinto a un número
        $digitos_Telefono = strlen($Telefono);
        if ($digitos_Telefono != 9 && !ctype_digit($Telefono)) {
            echo json_encode("Número de telefono invalido, introduzca un número correcto");
        } else {
            // Consulta SQL para inertar los datos en la base datos
            $sql = "INSERT INTO datos_usuario (usuario, contrasena, correo, telefono) VALUES ('$Usuario','$Contrasena','$Correo','$Telefono')";
            $result = $conexion->query($sql);

            // Verificar si se encontraron resultados
            if ($result) {
                echo json_encode("¡Te ha registrado en nuestra web!");
            } else { // Si no se encontraron resultados, devolver un mensaje de error
                echo json_encode("Error en el registro");
            }
            // Cerrar la conexión a la base de datos
            $conexion->close();
        }
    }
}
