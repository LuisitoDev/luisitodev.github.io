$(document).ready( function () {
 if (localStorage.getItem('seleccionEscenario')==null){
    localStorage.setItem('seleccionEscenario','[]');
}else{
    localStorage.setItem('seleccionEscenario','[]');
}
//JSON.parse hace que el dato sea legible
var datoV4=JSON.parse(localStorage.getItem('seleccionEscenario'));

datoV4.push("NINGUNA");

localStorage.setItem('seleccionEscenario', JSON.stringify(datoV4));

if(localStorage.getItem('UserSesion')!=null){
    document.getElementById('open-modal282').style.display = "none";
    document.getElementById('open-modal283').style.display = "none";

    let UserSesion = JSON.parse(localStorage.getItem('UserSesion'));
    document.getElementById("titulo-bienvenida").textContent  = "Bienvenido: " + UserSesion.username;
    document.getElementById("titulo-bienvenida").style.display = "block";
}
else {
    document.getElementById('open-modal284').style.display = "none";
}

if(localStorage.getItem('seleccionEscenario')!=null){
    document.getElementById('textoEscenario').innerHTML= JSON.parse(localStorage.getItem('seleccionEscenario'));
}
})

function unJugador(){
    if (localStorage.getItem('cantidadJugadores')==null){
        localStorage.setItem('cantidadJugadores','[]');
    }else{
        localStorage.setItem('cantidadJugadores','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoV=JSON.parse(localStorage.getItem('cantidadJugadores'));

    datoV.push("SINGLE_PLAYER");

    localStorage.setItem('cantidadJugadores', JSON.stringify(datoV));
    
    if(localStorage.getItem('cantidadJugadores')!=null){
        document.getElementById('textoNombre').innerHTML= JSON.parse(localStorage.getItem('cantidadJugadores'));
    }
}

function dosJugadores(){
    if (localStorage.getItem('cantidadJugadores')==null){
        localStorage.setItem('cantidadJugadores','[]');
    }else{
        localStorage.setItem('cantidadJugadores','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoV2=JSON.parse(localStorage.getItem('cantidadJugadores'));

    datoV2.push("MULTI_PLAYER");

    localStorage.setItem('cantidadJugadores', JSON.stringify(datoV2));
    
    if(localStorage.getItem('cantidadJugadores')!=null){
        document.getElementById('textoNombre').innerHTML= JSON.parse(localStorage.getItem('cantidadJugadores'));
    }
}

function dificultadNula(){
 //ninguna dificultad porque es multijugador

 if (localStorage.getItem('dificultadD')==null){
      localStorage.setItem('dificultadD','[]');
  }else{
      localStorage.setItem('dificultadD','[]');
  }
  //JSON.parse hace que el dato sea legible
  var datoV3=JSON.parse(localStorage.getItem('dificultadD'));

  datoV3.push("Ninguno");

  localStorage.setItem('dificultadD', JSON.stringify(datoV3));
  
  if(localStorage.getItem('dificultadD')!=null){
      document.getElementById('textoDificultad').innerHTML= JSON.parse(localStorage.getItem('dificultadD'));
  }
}


   function dificultadFacil(){
    //ninguna dificultad porque es multijugador
   
    if (localStorage.getItem('dificultadD')==null){
         localStorage.setItem('dificultadD','[]');
     }else{
         localStorage.setItem('dificultadD','[]');
     }
     //JSON.parse hace que el dato sea legible
     var datoV4=JSON.parse(localStorage.getItem('dificultadD'));
   
     datoV4.push("EASY_MODE");
   
     localStorage.setItem('dificultadD', JSON.stringify(datoV4));
     
     if(localStorage.getItem('dificultadD')!=null){
         document.getElementById('textoDificultad').innerHTML= JSON.parse(localStorage.getItem('dificultadD'));
     }
   }

   function dificultadDificil(){
    //ninguna dificultad porque es multijugador
   
    if (localStorage.getItem('dificultadD')==null){
         localStorage.setItem('dificultadD','[]');
     }else{
         localStorage.setItem('dificultadD','[]');
     }
     //JSON.parse hace que el dato sea legible
     var datoV4=JSON.parse(localStorage.getItem('dificultadD'));
   
     datoV4.push("HARD_MODE");
   
     localStorage.setItem('dificultadD', JSON.stringify(datoV4));
     
     if(localStorage.getItem('dificultadD')!=null){
         document.getElementById('textoDificultad').innerHTML= JSON.parse(localStorage.getItem('dificultadD'));
     }
   }

   function escenarioCiudad(){
    if (localStorage.getItem('seleccionEscenario')==null){
         localStorage.setItem('seleccionEscenario','[]');
     }else{
         localStorage.setItem('seleccionEscenario','[]');
     }
     //JSON.parse hace que el dato sea legible
     var datoV4=JSON.parse(localStorage.getItem('seleccionEscenario'));
   
     datoV4.push("CIUDAD");
   
     localStorage.setItem('seleccionEscenario', JSON.stringify(datoV4));
     
     if(localStorage.getItem('seleccionEscenario')!=null){
         document.getElementById('textoEscenario').innerHTML= JSON.parse(localStorage.getItem('seleccionEscenario'));
     }
   }

   function escenarioGranja(){
    if (localStorage.getItem('seleccionEscenario')==null){
         localStorage.setItem('seleccionEscenario','[]');
     }else{
         localStorage.setItem('seleccionEscenario','[]');
     }
     //JSON.parse hace que el dato sea legible
     var datoV4=JSON.parse(localStorage.getItem('seleccionEscenario'));
   
     datoV4.push("GRANJA");
   
     localStorage.setItem('seleccionEscenario', JSON.stringify(datoV4));
     
     if(localStorage.getItem('seleccionEscenario')!=null){
         document.getElementById('textoEscenario').innerHTML= JSON.parse(localStorage.getItem('seleccionEscenario'));
     }
   }

   function escenarioJuguetes(){
    if (localStorage.getItem('seleccionEscenario')==null){
         localStorage.setItem('seleccionEscenario','[]');
     }else{
         localStorage.setItem('seleccionEscenario','[]');
     }
     //JSON.parse hace que el dato sea legible
     var datoV4=JSON.parse(localStorage.getItem('seleccionEscenario'));
   
     datoV4.push("Juguetes");
   
     localStorage.setItem('seleccionEscenario', JSON.stringify(datoV4));
     
     if(localStorage.getItem('seleccionEscenario')!=null){
         document.getElementById('textoEscenario').innerHTML= JSON.parse(localStorage.getItem('seleccionEscenario'));
     }
   }

    function registroUsuario(){

        let nombreUsuario = document.getElementById('id_registro_nombre_usuario').value;
        let correo = document.getElementById('id_registro_correo').value;
        let password = document.getElementById('id_registro_password').value;

        let ParamsRegistro = {
            NombreUsuario: nombreUsuario,
            Correo: correo,
            Password: password
        };

        $.ajax({
            url: `https://tanquecitos-api.herokuapp.com/usuarios/crear-usuario`,
            type: 'post',
            data: ParamsRegistro,
            success: function(data) {

                let resultado = JSON.parse(data);
                if (resultado.status == "SUCCESS"){
                    let ParamsLogin = {
                        Correo: correo,
                        Password: password
                    };
                    
                    $.ajax({
                        url: `https://tanquecitos-api.herokuapp.com/usuarios/login`,
                        type: 'post',
                        data: ParamsLogin,
                        success: function(data) {
    
                            let resultado = JSON.parse(data);
                
                            if (resultado.status == "SUCCESS"){
                                let UserSesion = resultado.user;
                                localStorage.setItem("UserSesion", JSON.stringify(UserSesion));
                                document.getElementById("titulo-bienvenida").textContent  = "Bienvenido: " + UserSesion.username;
                                document.getElementById("titulo-bienvenida").style.display = "block";

                                const modalContainer282 = document.getElementById('modal-container282');
                                modalContainer282.classList.remove('show-modal');
                                
                                document.getElementById("open-modal282").style.display = "none";
                                document.getElementById("open-modal283").style.display = "none";
                                document.getElementById("open-modal284").style.display = "block";

                                cleanSkins();
                                getSkins(".skinsParaComprar", "mostrar_skins");
                                getSkins(".skinsCompradasPlayer1", "mostrar_skins_compradas");
                                getSkins(".skinsCompradasPlayer2", "mostrar_skins_compradas");
                                
                                
                                $("#id_inicio_sesion_correo").val("");
                                $("#id_inicio_sesion_password").val("");

                            }
                            else if (resultado.status == "ERROR"){
                                alert("Error al iniciar sesion")
                                console.log("Error al hacer la petición: ", resultado.message)
                            }
                        },
                        error: function(data) {
                            console.log("Me lleva la cachetada");
                            console.log(data.text);
                        },
                        failure: function(data) {
                            console.log("Failure");
                        },
                    });

                   
                }
                else if (resultado.status == "ERROR"){
                    alert("Error al crear usuario")
                    console.log("Error al hacer la petición: ", resultado.message)
                }

            },
            error: function(data) {
                console.log("Me lleva la cachetada");
                console.log(data.text);
            },
            failure: function(data) {
                console.log("Failure");
            },
        });
    }

    function inicioSesionUsuario(){
        let correo = document.getElementById('id_inicio_sesion_correo').value;
        let password = document.getElementById('id_inicio_sesion_password').value;

        let ParamsLogin = {
            Correo: correo,
            Password: password
        }

        $.ajax({
            url: `https://tanquecitos-api.herokuapp.com/usuarios/login`,
            type: 'post',
            data: ParamsLogin,
            success: function(data) {

                let resultado = JSON.parse(data);

                if (resultado.status == "SUCCESS"){
                    let UserSesion = resultado.user;
                    localStorage.setItem("UserSesion", JSON.stringify(UserSesion));
                    
                    document.getElementById("titulo-bienvenida").textContent  = "Bienvenido: " + UserSesion.username;
                    document.getElementById("titulo-bienvenida").style.display = "block";
                    
                    const modalContainer283 = document.getElementById('modal-container283');
                    modalContainer283.classList.remove('show-modal');
                    
                    document.getElementById("open-modal282").style.display = "none";
                    document.getElementById("open-modal283").style.display = "none";
                    document.getElementById("open-modal284").style.display = "block";

                    cleanSkins();
                    getSkins(".skinsParaComprar", "mostrar_skins");
                    getSkins(".skinsCompradasPlayer1", "mostrar_skins_compradas");
                    getSkins(".skinsCompradasPlayer2", "mostrar_skins_compradas");

                    $("#id_inicio_sesion_correo").val("");
                    $("#id_inicio_sesion_password").val("");
                }
                else if (resultado.status == "ERROR"){
                    alert("Error al iniciar sesion")
                    console.log("Error al hacer la petición: ", resultado.message)
                }


                
            },
            error: function(data) {
                console.log("Me lleva la cachetada");
                console.log(data.text);
            },
            failure: function(data) {
                console.log("Failure");
            },
        });
    }

    function cerrarSesionUsuario(){
        localStorage.removeItem('UserSesion');

        document.getElementById('open-modal284').style.display = "none";
        document.getElementById("open-modal282").style.display = "block";
        document.getElementById("open-modal283").style.display = "block";
        document.getElementById("titulo-bienvenida").style.display = "none";

        cleanSkins();
        getSkins(".skinsParaComprar", "mostrar_skins");
        getSkins(".skinsCompradasPlayer1", "mostrar_skins_compradas");
        getSkins(".skinsCompradasPlayer2", "mostrar_skins_compradas");
    }

/*=============== SHOW MODAL ===============*/
const showModal = (openButton, modalContent) =>{
    const openBtn = document.getElementById(openButton),
    modalContainer = document.getElementById(modalContent)
    
    if(openBtn && modalContainer){
        openBtn.addEventListener('click', ()=>{
            modalContainer.classList.add('show-modal')
        })
    }
}
showModal('open-modal','modal-container')

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal')

function closeModal(){
    const modalContainer = document.getElementById('modal-container')
    modalContainer.classList.remove('show-modal')
}
closeBtn.forEach(c => c.addEventListener('click', closeModal))



/*=============== SHOW MODAL ===========================================================================*/
const showModal2 = (openButton2, modalContent2) =>{
    const openBtn2 = document.getElementById(openButton2),
    modalContainer2 = document.getElementById(modalContent2)
    
    if(openBtn2 && modalContainer2){
        openBtn2.addEventListener('click', ()=>{
            modalContainer2.classList.add('show-modal')
        })
    }
}
showModal2('open-modal2','modal-container2')

/*=============== CLOSE MODAL ===============*/
const closeBtn2 = document.querySelectorAll('.close-modal')

function closeModal2(){
    const modalContainer2 = document.getElementById('modal-container2')
    modalContainer2.classList.remove('show-modal')
}
closeBtn2.forEach(c => c.addEventListener('click', closeModal2))





/*=============== SHOW MODAL ADVERTENCIA===========================================================================*/
const showModal70 = (openButton70, modalContent70) =>{
    const openBtn70 = document.getElementById(openButton70),
    modalContainer70 = document.getElementById(modalContent70)
    
    if(openBtn70 && modalContainer70){
        openBtn70.addEventListener('click', ()=>{
            modalContainer70.classList.add('show-modal')
        })
    }
}
showModal2('open-modal70','modal-container70')

/*=============== CLOSE MODAL ===============*/
const closeBtn70 = document.querySelectorAll('.close-modal')

function closeModal70(){
    const modalContainer70 = document.getElementById('modal-container70')
    modalContainer70.classList.remove('show-modal')
}
closeBtn70.forEach(c => c.addEventListener('click', closeModal70))



/*=============== SHOW MODAL REGISTRO===========================================================================*/
const showModal282 = (openButton282, modalContent282) =>{
    const openBtn282 = document.getElementById(openButton282),
    modalContainer282 = document.getElementById(modalContent282)
    
    if(openBtn282 && modalContainer282){
        openBtn282.addEventListener('click', ()=>{
            modalContainer282.classList.add('show-modal')
        })
    }
}
showModal282('open-modal282','modal-container282')

/*=============== CLOSE MODAL ===============*/
const closeBtn282 = document.querySelectorAll('.close-modal')

function closeModal282(){
    const modalContainer282 = document.getElementById('modal-container282')
    modalContainer282.classList.remove('show-modal')
}
closeBtn282.forEach(c => c.addEventListener('click', closeModal282))



/*=============== SHOW MODAL INICIO DE SESIÓN===========================================================================*/
const showModal285 = (openButton285, modalContent285) =>{
    const openBtn285 = document.getElementById(openButton285),
    modalContainer285 = document.getElementById(modalContent285)
    
    if(openBtn285 && modalContainer285){
        openBtn285.addEventListener('click', ()=>{
            modalContainer285.classList.add('show-modal')
        })
    }
}
showModal285('open-modal285','modal-container285')

/*=============== CLOSE MODAL ===============*/
const closeBtn285 = document.querySelectorAll('.close-modal')

function closeModal285(){
    const modalContainer285 = document.getElementById('modal-container285')
    modalContainer285.classList.remove('show-modal')
}
closeBtn285.forEach(c => c.addEventListener('click', closeModal285))





/*=============== SHOW MODAL SKINS===========================================================================*/
const showModal287 = (openButton287, modalContent287) =>{
    const openBtn287 = document.getElementById(openButton287),
    modalContainer287 = document.getElementById(modalContent287)
    
    if(openBtn287 && modalContainer287){
        openBtn287.addEventListener('click', ()=>{
            modalContainer287.classList.add('show-modal')
            localStorage.removeItem('Player1_Skin');
            localStorage.removeItem('Player2_Skin');
        })
    }
}
showModal287('open-modal287','modal-container287')

/*=============== CLOSE MODAL ===============*/
const closeBtn287 = document.querySelectorAll('.close-modal')

function closeModal287(){
    const modalContainer287 = document.getElementById('modal-container287')
    modalContainer287.classList.remove('show-modal')
}
closeBtn287.forEach(c => c.addEventListener('click', closeModal287))


/*=============== SHOW MODAL SKINS 2 JUGADORES===========================================================================*/
const showModal288 = (openButton288, modalContent288) =>{
    const openBtn288 = document.getElementById(openButton288),
    modalContainer288 = document.getElementById(modalContent288)
    
    if(openBtn288 && modalContainer288){
        openBtn288.addEventListener('click', ()=>{
            modalContainer288.classList.add('show-modal')
            localStorage.removeItem('Player1_Skin');
            localStorage.removeItem('Player2_Skin');
        })
    }
}
showModal288('open-modal288','modal-container288')

/*=============== CLOSE MODAL ===============*/
const closeBtn288 = document.querySelectorAll('.close-modal')

function closeModal288(){
    const modalContainer288 = document.getElementById('modal-container288')
    modalContainer288.classList.remove('show-modal')
}
closeBtn287.forEach(c => c.addEventListener('click', closeModal288))





/*=============== SHOW MODAL INICIO DE SESIÓN===========================================================================*/
const showModal283 = (openButton283, modalContent283) =>{
    const openBtn283 = document.getElementById(openButton283),
    modalContainer283 = document.getElementById(modalContent283)
    
    if(openBtn283 && modalContainer283){
        openBtn283.addEventListener('click', ()=>{
            modalContainer283.classList.add('show-modal')
        })
    }
}
showModal283('open-modal283','modal-container283')

/*=============== CLOSE MODAL ===============*/
const closeBtn283 = document.querySelectorAll('.close-modal')

function closeModal283(){
    const modalContainer283 = document.getElementById('modal-container283')
    modalContainer283.classList.remove('show-modal')
}
closeBtn283.forEach(c => c.addEventListener('click', closeModal283))





/*=============== CLOSE MODAL ===============*/
const closeBtn69 = document.querySelectorAll('.close-modal')

function closeModal69(){
    const modalContainer69 = document.getElementById('modal-container69')
    modalContainer69.classList.remove('show-modal')
}
closeBtn69.forEach(c => c.addEventListener('click', closeModal69))






const insertScore = (containerScore, tableScores, rango, usuario, puntos) => {

    var comentarioHTML = `
    <div class="${containerScore}">
        <p class="rango">${rango}</p> &nbsp; &nbsp; &nbsp; &nbsp;
        <p class="usuario">${usuario}</p>
        <p class="puntos">${puntos}</p>
    </div>
    `;

    var comentarioSiguiente = $(`.${containerScore}`).last();

    if (comentarioSiguiente.length == 0) {

        var seccionComentarios = $(tableScores);
        $(comentarioHTML).hide().appendTo(seccionComentarios).fadeIn(300);
    } else {
        $(comentarioHTML).hide().insertAfter(comentarioSiguiente).fadeIn(300);
    }
}

const getScoresByMode = (mode, containerScore, tableScores) => {
    $.ajax({
        url: `https://tanquecitos-api.herokuapp.com/usuarios/puntuaciones_usuarios/${mode}`,
        type: 'get',
        success: function(data) {
            
            let contadorFilas = 5;
            
            $.each(JSON.parse(data), function(key, value) {
                
                var NombreUsuario = value.username;
                var Puntuacion = value.cantidad;
                
                insertScore(containerScore, tableScores, key + 1, NombreUsuario, Puntuacion)
                contadorFilas-= 1;

            });
            

            for (let index = 0; index < contadorFilas; index++) {
                insertScore(containerScore, tableScores, "---", "-----", "-----")
            }



        },
        error: function(data) {
            console.log("algo no jalo");
            console.log(data.text);
        },
        failure: function(data) {
            console.log("Failure");
        },
    });
}



const insertSkin = (tableSkin, id_skin, imagePath, path_file, costo, obtenida, opcion) => {
   
    var modalComprarComprado = "";
    var prefijoImagen = "";
    if (obtenida == 0 && opcion == "mostrar_skins"){
        modalComprarComprado = "open-modal69";
        prefijoImagen = "_comprar.png"
    }
    else{
        prefijoImagen = "_comprado.png"
        modalComprarComprado = "set-skin";
    }

    let skinsParaJugar = ""
    if (tableSkin == ".skinsCompradasPlayer1"){
        skinsParaJugar = `skin="${path_file}" player=${1}`
    }
    else if (tableSkin == ".skinsCompradasPlayer2"){
        skinsParaJugar = `skin="${path_file}" player=${2}`
    }

    if (path_file == "free"){
        if (tableSkin == ".skinsCompradasPlayer2"){
            imagePath = "./resources/modelos/Tanquecito/Skins_Imagenes/tiendaElementoTanque2"
        }
        else{
            imagePath = "./resources/modelos/Tanquecito/Skins_Imagenes/tiendaElementoTanque1"
        }
    }

    var skinHTML = `
    <button 
        onmouseenter="sonido.play()"  
        onmousedown="sonido2.play()" 
        class="skin1 ${modalComprarComprado}" 
        style="background-image: url(../${imagePath}${prefijoImagen});"
        ${skinsParaJugar}
        onclick="setDatosSkin(${id_skin}, ${costo});"> 
    </button>
    `;

    var seccionSkins = $(tableSkin);
    $(skinHTML).hide().appendTo(seccionSkins).fadeIn(300);
    
}


const getSkins = (tableSkin, opcion) => {
    var idUsuario = 0;

    if (localStorage.getItem('UserSesion')!=null) {
        let UserSesion = JSON.parse(localStorage.getItem('UserSesion'));
        idUsuario = UserSesion.id;
    }
    
    $.ajax({
        url: `https://tanquecitos-api.herokuapp.com/usuarios/${opcion}`,
        type: 'post',
        data: { 
            'IdUsuario': idUsuario
        },
        success: function(data) {
            
            
            $.each(JSON.parse(data), function(key, value) {
                
                var imagePath = value.skin.path_image;
                var path_file = value.skin.path_file;
                var costo = value.skin.costo;
                var obtenida = value.skin_obtenida;
                var id_skin = value.id_skin;
                
                insertSkin(tableSkin, id_skin, imagePath, path_file, costo, obtenida, opcion)

            });
            
            showModal69('.open-modal69','modal-container69')

        },
        error: function(data) {
            console.log("algo no jalo");
            console.log(data.text);
        },
        failure: function(data) {
            console.log("Failure");
        },
    });
}

$('body').on("click", ".set-skin", function () { 
    
    const buttonSkin = $(this);

    const skin = buttonSkin.attr("skin");
    const playerSkin = buttonSkin.attr("player");

    if (playerSkin !== undefined){
        if (playerSkin == 1){
            localStorage.setItem('Player1_Skin', skin);
        }
        else if(playerSkin == 2){
            localStorage.setItem('Player2_Skin', skin);
        }
        
    }
    
});


/*=============== SHOW MODAL PAYPAL ===========================================================================*/
const showModal69 = (openButton69, modalContent69) =>{
    const openBtn69 = document.querySelectorAll(openButton69),
    modalContainer69 = document.getElementById(modalContent69)
    let modalContainer70 = document.getElementById('modal-container70')
    
    function addClickEventListener(){
        if (localStorage.getItem('UserSesion')!=null)
            modalContainer69.classList.add('show-modal')
        else
            modalContainer70.classList.add('show-modal')
    }

    openBtn69.forEach(c => c.addEventListener('click', addClickEventListener))
}


/*=============== SHOW MODAL ===========================================================================*/
const showModal3 = (openButton3, modalContent3) =>{
    const openBtn3 = document.getElementById(openButton3),
    modalContainer3 = document.getElementById(modalContent3)
    
    if(openBtn3 && modalContainer3){
        openBtn3.addEventListener('click', ()=>{
            modalContainer3.classList.add('show-modal')
        })
    }
}
showModal3('open-modal3','modal-container_score')
getScoresByMode("easy_mode", "recordslista", "#tabla_score_easy_mode");
getScoresByMode("hard_mode", "recordslista2", "#tabla_score_hard_mode");

getSkins(".skinsParaComprar", "mostrar_skins");

getSkins(".skinsCompradasPlayer1", "mostrar_skins_compradas");
getSkins(".skinsCompradasPlayer2", "mostrar_skins_compradas");


/*=============== CLOSE MODAL ===============*/
const closeBtn3 = document.querySelectorAll('.close-modal')

function closeModal3(){
    const modalContainer3 = document.getElementById('modal-container_score')
    modalContainer3.classList.remove('show-modal')
}
closeBtn3.forEach(c => c.addEventListener('click', closeModal3))



/*=============== SHOW MODAL ===========================================================================*/
const showModal6 = (openButton6, modalContent6) =>{
    const openBtn6 = document.getElementById(openButton6),
    modalContainer6 = document.getElementById(modalContent6)
    
    if(openBtn6 && modalContainer6){
        openBtn6.addEventListener('click', ()=>{
            modalContainer6.classList.add('show-modal')
        })
    }
}
showModal6('open-modal6','modal-container6')
showModal6('open-modal62','modal-container6')

/*=============== CLOSE MODAL ===============*/
const closeBtn6 = document.querySelectorAll('.close-modal')

function closeModal6(){
    const modalContainer6 = document.getElementById('modal-container6')
    modalContainer6.classList.remove('show-modal')
}
closeBtn6.forEach(c => c.addEventListener('click', closeModal6))

/*=============== SHOW MODAL ===========================================================================*/
const showModal7 = (openButton7, modalContent7) =>{
    const openBtn7 = document.getElementById(openButton7),
    modalContainer7 = document.getElementById(modalContent7)
    
    if(openBtn7 && modalContainer7){
        openBtn7.addEventListener('click', ()=>{
            modalContainer7.classList.add('show-modal')
        })
    }
}
showModal7('open-modal7','modal-container7')
showModal7('open-modal72','modal-container7')
showModal7('open-modal73','modal-container7')


/*=============== CLOSE MODAL ===============*/
const closeBtn7 = document.querySelectorAll('.close-modal')

function closeModal7(){
    const modalContainer7 = document.getElementById('modal-container7')
    modalContainer7.classList.remove('show-modal')
}
closeBtn7.forEach(c => c.addEventListener('click', closeModal7))



$(document).ready( function () {
})


$(document).mousemove(function( event ) {
    musicaMenu.play();
    musicaMenu.loop = true;
});