document.addEventListener("DOMContentLoaded", function () {
    let Cuerpo = document.getElementById("Cuerpo");

    //FORMULARIO INICIAL DE LA PÁGINA
    const formulario = {
        TUsuario: "Nombre de Usuario: ",
        TContrasena: "Contraseña: ",
        Registrar: "¿Nuevo usuario? ¡REGISTRATE AQUÍ!",
        IniciarSesion: "Inciar sesión"
    };

    seccionFormuInicial(formulario);

    //-------------------------------------- Función para limpiar el contenido de la página --------------------------
    function LimpiarContenido() {
        let Cuerpo = document.getElementById("Cuerpo");
        Cuerpo.innerHTML = '';
    };

    function seccionFormuInicial(formulario) {
        LimpiarContenido();

        // Crear los elementos necesarios para la información
        let DivFormulario = document.createElement("form");
        DivFormulario.className = "DivFormulario";
        DivFormulario.id = "IdFormulario";
        let TUsuario = document.createElement("h3");
        let TContrasena = document.createElement("h3");
        let Usuario = document.createElement("input");
        let Contrasena = document.createElement("input");
        let br = document.createElement("br");
        let BotonIniciar = document.createElement("button");
        let BotonReistrarse = document.createElement("button");
        let ImagenFondo = document.createElement("img");
        let AvisoError = document.createElement("p");

        // Texto del nombre del usuario
        TUsuario.textContent = formulario.TUsuario;
        DivFormulario.appendChild(TUsuario);

        // Input del texto del nombre del usuario
        Usuario.className = "input";
        Usuario.autocomplete = "username";
        Usuario.id = "Usuario"
        DivFormulario.appendChild(Usuario);

        // Texto de la contraseña del usuario
        TContrasena.textContent = formulario.TContrasena;
        DivFormulario.appendChild(TContrasena);

        // Input de la contraseña del formulario
        Contrasena.className = "input";
        Contrasena.autocomplete = "current-password";
        Contrasena.id = "Contrasena";
        Contrasena.type = "password";
        DivFormulario.appendChild(Contrasena);

        // BR
        DivFormulario.appendChild(br);
        Cuerpo.appendChild(DivFormulario);

        // Imagen de fondo del formulario inicial
        ImagenFondo.src = "Imagenes/fondo.png";
        ImagenFondo.className = "ImagenFondoFormulario"
        Cuerpo.appendChild(ImagenFondo);

        // Botón para iniciar sesión
        BotonIniciar.textContent = formulario.IniciarSesion;
        BotonIniciar.className = "Boton";
        BotonIniciar.type = "button"; // Asegura que no se interprete como botón de envío
        BotonIniciar.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la recarga del formulario, para que no vuelva a cargarse
            let InputUsuario = document.getElementById("Usuario").value;
            let InputContrasena = document.getElementById("Contrasena").value;
            IniciarSesion(InputUsuario, InputContrasena);
        });
        DivFormulario.appendChild(BotonIniciar);

        // Botón para entrar al formulario de registrarse
        BotonReistrarse.textContent = formulario.Registrar;
        BotonReistrarse.className = "Boton";
        BotonReistrarse.type = "button";
        BotonReistrarse.addEventListener("click", function () {
            FormularioRegistro();
        });
        DivFormulario.appendChild(BotonReistrarse);
    };

    function IniciarSesion(Usuario, Contrasena) {
        fetch('php/llamadas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'IniciarSesion', Usuario: Usuario, Contrasena: Contrasena })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                if (data === "El usuario es correcto") {
                    // Limpiar el contenido
                    LimpiarContenido();

                    // Crear el campo de búsqueda y el iframe
                    const barraBusqueda = document.createElement("input");
                    barraBusqueda.id = "BarraBusqueda";
                    barraBusqueda.placeholder = "Buscar una ubicación...";

                    // Crear un boton para buscar el lugar
                    const botonbusqueda = document.createElement("button");
                    botonbusqueda.id = "BotonBus";
                    botonbusqueda.addEventListener("click", function () {
                        const lugar = document.getElementById("BarraBusqueda").value;
                        obtenerCoordenadasLugar(lugar);
                    });
                    botonbusqueda.textContent = "Buscar un maldito sitio";

                    // Crear el iframe para mostrar el mapa
                    const iframe = document.createElement("iframe");
                    iframe.className = "mapa";
                    iframe.width = "100%";
                    iframe.height = "500px";
                    iframe.style.border = "0";
                    iframe.loading = "lazy";
                    iframe.allowFullscreen = true;
                    iframe.referrerPolicy = "no-referrer-when-downgrade";
                    iframe.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCDxsyNU0pkhrGTYfKklBVM0FjFJf0lIGo&q=Space+Needle,Seattle+WA";

                    // Añadir los elementos al cuerpo del documento
                    let Cuerpo = document.getElementById("Cuerpo");
                    Cuerpo.appendChild(barraBusqueda);
                    Cuerpo.appendChild(botonbusqueda);
                    Cuerpo.appendChild(iframe);

                    function obtenerCoordenadasLugar(lugar) {
                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(lugar)}&key=AIzaSyCDxsyNU0pkhrGTYfKklBVM0FjFJf0lIGo`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.results && data.results.length > 0) {
                                    const location = data.results[0].geometry.location;
                                    console.log("Coordenadas del lugar:", location);
                    
                                    // Cambiar la ubicación en el iframe
                                    const iframe = document.getElementById("mapIframe");
                                    iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCDxsyNU0pkhrGTYfKklBVM0FjFJf0lIGo&q=${location.lat},${location.lng}`;
                                } else {
                                    console.log("No se encontraron resultados para el lugar.");
                                }
                            })
                            .catch(error => console.error("Error al obtener las coordenadas:", error));
                    }                  

                } else if (data === "Lo sentimos no está registrado o sus credenciales son incorrectas") {
                    // Eliminar cualquier mensaje de aviso existente
                    const avisoExistente = document.querySelector(".Aviso");
                    if (avisoExistente) {
                        avisoExistente.remove();
                    }

                    // Mostrar alerta y crear mensaje de error en el formulario
                    alert("Compruebe los datos del formulario.");
                    let Formu = document.getElementById("IdFormulario");
                    let Aviso = document.createElement("p");
                    Aviso.className = "Aviso";
                    Aviso.textContent = data;
                    Formu.appendChild(Aviso);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    function FormularioRegistro() {
        let Cuerpo = document.getElementById("Cuerpo");

        LimpiarContenido();

        //CREAR LOS ELEMENTOS NECESARIOS PARA LA INFORMACIÓN
        let DivFormularioRegistro = document.createElement("div");
        DivFormularioRegistro.className = "DivFormularioRegistro";
        DivFormularioRegistro.id = "IdFormularioRegistro";
        let TUsuario = document.createElement("h3");
        let TContrasena = document.createElement("h3");
        let TCorreo = document.createElement("h3");
        let TTelefono = document.createElement("h3");
        let Usuario = document.createElement("input");
        let Contrasena = document.createElement("input");
        let Correo = document.createElement("input");
        let Telefono = document.createElement("input");
        let br = document.createElement("br");
        let BotonRegistro = document.createElement("button");
        let ImagenFondo = document.createElement("img");
        let AvisoError = document.createElement("p");

        //TEXTO DEL NOMBRE DEL USUARIO
        TUsuario.textContent = formularioR.TUsuario;
        DivFormularioRegistro.appendChild(TUsuario);

        //INPUT DEL TEXTO DEL NOMBRE DEL USUARIO
        Usuario.className = "input";
        Usuario.id = "Usuario"
        DivFormularioRegistro.appendChild(Usuario);

        //TEXTO DE LA CONTRASEÑA DEL USUARIO
        TContrasena.textContent = formularioR.TContrasena;
        DivFormularioRegistro.appendChild(TContrasena);

        //INPUT DE LA CONTRASEÑA DEL FORMULARIO
        Contrasena.className = "input";
        Contrasena.id = "Contrasena";
        Contrasena.type = "password";
        DivFormularioRegistro.appendChild(Contrasena);

        //TEXTO DEL CORREO DEL USUARIO
        TCorreo.textContent = formularioR.TCorreo;
        DivFormularioRegistro.appendChild(TCorreo);

        //INPUT DEL CORREO DEL FORMULARIO
        Correo.className = "input";
        Correo.id = "Correo";
        Correo.type = "email";
        DivFormularioRegistro.appendChild(Correo);

        //TEXTO DEL TELEFONO MOVIL
        TTelefono.textContent = formularioR.TTelefono;
        DivFormularioRegistro.appendChild(TTelefono);

        //INPUT DEL TELEFONO DEL FORMULARIO
        Telefono.className = "input";
        Telefono.id = "Telefono";
        Telefono.type = "number";
        DivFormularioRegistro.appendChild(Telefono);

        //BR
        DivFormularioRegistro.appendChild(br);
        Cuerpo.appendChild(DivFormularioRegistro);

        //IMAGEN DE FONDO DEL FORMUALRIO INICIAL
        ImagenFondo.src = "Imagenes/fondo.png";
        ImagenFondo.className = "ImagenFondoFormulario"
        Cuerpo.appendChild(ImagenFondo);

        //BOTÓN PARA INICIAR SESIÓN
        BotonRegistro.textContent = formularioR.Registrar;
        BotonRegistro.className = "Boton";
        BotonRegistro.addEventListener("click", function () {
            let InputUsuario = document.getElementById("Usuario").value;
            let InputContrasena = document.getElementById("Contrasena").value;
            let InputCorreo = document.getElementById("Correo").value;
            let InputTelefono = document.getElementById("Telefono").value;
            Registro(InputUsuario, InputContrasena, InputCorreo, InputTelefono);
        });
        DivFormularioRegistro.appendChild(BotonRegistro);
    };

    function Registro(Usuario, Contrasena, Correo, Telefono) {
        fetch('php/llamadas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'Registrarse', Usuario: Usuario, Contrasena: Contrasena, Correo: Correo, Telefono: Telefono })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                if (data == "\u00a1Te ha registrado en nuestra web!") {
                    LimpiarContenido();

                    /* -7-7-7-7-7-7-7-77-7- AQUÍ PONER EL CÓDIGO PARA QUE APAREZCA EL MAPA -7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7 */

                } else if (data == "Error en el registro" || data == "Nombre de usuario ya en uso, proporcione otro distinto por favor" || data == "N\u00famero de telefono invalido, introduzca un n\u00famero correcto") {
                    if (!document.querySelector(".Aviso")) {
                        alert("Comprbar datos del Formualrio.");
                        let Formu = document.getElementById("IdFormularioRegistro");
                        let Aviso = document.createElement("p");
                        Aviso.className = "Aviso";
                        Aviso.textContent = data;
                        Formu.appendChild(Aviso);
                    } else {
                        alert("Comprbar datos del Formualrio.");
                        let Aviso = document.querySelector(".Aviso");
                        Aviso.textContent = "";
                        Aviso.textContent = data;
                    }

                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

});