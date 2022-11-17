function cargarNombres(){
    if(localStorage.getItem('cantidadJugadores')!=null){
        console.log(JSON.parse(localStorage.getItem('cantidadJugadores')));
    }
    if(localStorage.getItem('dificultadD')!=null){
        console.log(JSON.parse(localStorage.getItem('dificultadD')));
    }
    if(localStorage.getItem('seleccionEscenario')!=null){
        console.log(JSON.parse(localStorage.getItem('seleccionEscenario')));
    }

    
    if(JSON.parse(localStorage.getItem('cantidadJugadores'))[0] == "SINGLE_PLAYER"){
        document.getElementById("contadorEnemigos").classList.add('mostrar');
        document.getElementById("corazon2").classList.add('ocultar');
    }
    else if(JSON.parse(localStorage.getItem('cantidadJugadores'))[0] == "MULTI_PLAYER"){
        document.getElementById("corazon2").classList.add('mostrar');
        document.getElementById("contadorEnemigos").classList.add('ocultar');
    }
}


/*=============== SHOW MODAL ===============*/
const showModal = (modalContent) =>{
    modalContainer = document.getElementById(modalContent);
    
    modalContainer.classList.add('show-modal');
}

var pausaCheck=false;

$(document).ready( function () {

    
    cargarNombres()
    

    $("#container-pause").load("../modal_paused.html");
    $("#container-sound").load("../modal_sound.html");
    $("#container-controls").load("../modal_controls.html");
    $("#container-win").load("../modal_win.html");
    $("#container-lose").load("../modal_lose.html");
    $("#container-score").load("../modal_send_score.html"); 
    
    
    window.addEventListener("keydown",pausa);
    
    function pausa(e){
        if (e.keyCode==80 || e.keyCode==112 ){
            if (pausaCheck==false){
                pausaCheck=true;
                document.getElementById("modal-container-pause").classList.add('show-modal');
                sonido4.play()
            }
            else{
                pausaCheck=false;
                document.getElementById("modal-container-pause").classList.remove('show-modal');
                document.getElementById("modal-container-sound").classList.remove('show-modal');
                document.getElementById("modal-container-controls").classList.remove('show-modal');
                sonido3.play()
            }
        // alert(pausaCheck);
        }
    }
    
})

$(document).on("click", "#open-modal4", function () { 
    const modalAjustes = document.getElementById("modal-container-sound");
    modalAjustes.classList.add('show-modal');
})

$(document).on("click", "#modal-container-sound-close", function () { 
    const modalAjustes = document.getElementById("modal-container-sound");
    modalAjustes.classList.remove('show-modal');
})


$(document).on("click", "#open-modal5", function () { 
    const modalAjustes = document.getElementById("modal-container-controls");
    modalAjustes.classList.add('show-modal');
})

$(document).on("click", "#modal-container-controls-close", function () { 
    const modalAjustes = document.getElementById("modal-container-controls");
    modalAjustes.classList.remove('show-modal');
})

$(document).on("click", "#send_score_button_win", function () { 
    const modalAjustes = document.getElementById("modal-container-score");
    modalAjustes.classList.add('show-modal');
})

$(document).on("click", "#send_score_button_lose", function () { 
    const modalAjustes = document.getElementById("modal-container-score");
    modalAjustes.classList.add('show-modal');
})

$(document).on("click", "#send_score_button", function () { 
    var aux1 = $("#send_score_button");
    var aux2 = $("#modal_button_compartir");

    aux1.hide();
    aux2.hide();
    
    $("#modal_score_lose").addClass("ocultar");
    $("#modal_score_win").addClass("ocultar");

    const modalAjustes = document.getElementById("modal-container-score");
    modalAjustes.classList.add('show-modal');
})


$(document).on("click", "#modal-container-score-close", function () { 
    const modalAjustes = document.getElementById("modal-container-score");
    modalAjustes.classList.remove('show-modal');
})

$(document).on("click", "#modal-send-score", function () {
    var idUsuario = 0;

    if (localStorage.getItem('UserSesion')!=null) {
        let UserSesion = JSON.parse(localStorage.getItem('UserSesion'));
        idUsuario = UserSesion.id;
    }

    const score = $("#modal_score").text()
    const userName = $("#modal_score_nickname").val()
    const difficult = $("#modal_score_difficult").val()

    $.ajax({
        url: `https://tanquecitos-api.herokuapp.com/usuarios/agregar-puntuacion`,
        type: 'post',
        data: { 
            'IdUsuario': idUsuario, 
            'Puntuacion': score,
            'Dificultad': difficult
        },
        success: function(data) {
            var resultado = jQuery.parseJSON( data );
            if (resultado.status == "SUCCESS"){
                $("#modal-send-score").remove();
                const modalAjustes = document.getElementById("modal-container-score");
                modalAjustes.classList.remove('show-modal');

                $("#send_score_button_win").hide();
                $("#send_score_button_lose").hide();
            }
            else if (resultado.status == "ERROR")
                console.log("Error al hacer la petición: ", resultado.message)
        },
        error: function(data) {
            console.log("algo no jalo");
            console.log(data.text);
        },
        failure: function(data) {
            console.log("Failure");
        },
    });
})


$(document).mousemove(function( event ) {
    userInteract = true;
});