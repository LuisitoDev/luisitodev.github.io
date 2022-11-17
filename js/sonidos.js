var sonido = new Audio();
sonidosrc="../sonidos/sonidos1.mp3";
var sonido2 = new Audio();
sonido2src="../sonidos/sonidos4.mp3";
var sonido3 = new Audio();
sonido3src="../sonidos/sonidos2.mp3";

var sonido4 = new Audio();
sonido4src="../sonidos/sonidos3.mp3";

var musicaCiudad= new Audio();
musicaCiudadsrc="../sonidos/ciudad.mp3";

var musicaGranja= new Audio();
musicaGranjasrc="../sonidos/granja.mp3";

var musicaMenu= new Audio();
musicaMenusrc="../sonidos/TitleScreen.mp3";

var sonidoDisparo= new Audio();
sonidoDisparosrc="../sonidos/TanquecitoDispara.mp3";

var sonidoExplosion= new Audio();
sonidoExplosionsrc="../sonidos/tanquecitosExplosion.mp3";

var sonidoGanar= new Audio();
sonidoGanarsrc="../sonidos/tanquecitosGanar.mp3";

var sonidoPerder= new Audio();
sonidoPerdersrc="../sonidos/tanquecitosPerder.mp3";

var sonidoPowerUpAparece= new Audio();
sonidoPowerUpAparecesrc="../sonidos/TanquecitosPowerUpAparece.mp3";

var sonidoPowerUpUsar= new Audio();
sonidoPowerUpUsarsrc="../sonidos/tanquecitosPowerUpUsar.mp3";

$(document).on("click", "#volumen0", function () { 
    musicaMenu.volume = 0.1;
})


function cambiar0(){

    musicaMenu.pause();
    musicaMenu.volume = 0;
    sonido.volume = 0;
    sonido2.volume = 0;
    sonido3.volume = 0;
    sonido4.volume = 0;
    musicaCiudad.volume = 0;
    musicaGranja.volume = 0;
    sonidoDisparo.volume = 0;
    sonidoExplosion.volume = 0;
    sonidoExplosion.volume = 0;
    sonidoPerder.volume = 0;
    sonidoPowerUpAparece.volume = 0;
    sonidoPowerUpUsar.volume = 0;

    if (localStorage.getItem('volumenGeneral')==null){
        localStorage.setItem('volumenGeneral','[]');
    }else{
        localStorage.setItem('volumenGeneral','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoVolumenGeneral=JSON.parse(localStorage.getItem('volumenGeneral'));

    datoVolumenGeneral.push("GENERAL_VOLUME_0");

    localStorage.setItem('volumenGeneral', JSON.stringify(datoVolumenGeneral));
   
}


function cambiar1(){
    if(JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == "NINGUNA"){
        
            musicaMenu.play();
    }
    musicaMenu.volume = 0.2;
    sonido.volume = 0.2;
    sonido2.volume = 0.2;
    sonido3.volume = 0.2;
    sonido4.volume = 0.2;
    musicaCiudad.volume = 0.2;
    musicaGranja.volume = 0.2;
    sonidoDisparo.volume = 0.2;
    sonidoExplosion.volume = 0.2;
    sonidoExplosion.volume = 0.2;
    sonidoPerder.volume = 0.2;
    sonidoPowerUpAparece.volume = 0.2;
    sonidoPowerUpUsar.volume = 0.2;

    if (localStorage.getItem('volumenGeneral')==null){
        localStorage.setItem('volumenGeneral','[]');
    }else{
        localStorage.setItem('volumenGeneral','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoVolumenGeneral=JSON.parse(localStorage.getItem('volumenGeneral'));

    datoVolumenGeneral.push("GENERAL_VOLUME_1");

    localStorage.setItem('volumenGeneral', JSON.stringify(datoVolumenGeneral));
    
}

function cambiar2(){
    if(JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == "NINGUNA"){
        
            musicaMenu.play();
    }
    musicaMenu.volume = 0.4;
    musicaMenu.volume = 0.4;
    sonido.volume = 0.4;
    sonido2.volume = 0.4;
    sonido3.volume = 0.4;
    sonido4.volume = 0.4
    musicaCiudad.volume = 0.4;
    musicaGranja.volume = 0.4;
    sonidoDisparo.volume = 0.4;
    sonidoExplosion.volume = 0.4;
    sonidoExplosion.volume = 0.4;
    sonidoPerder.volume = 0.4;
    sonidoPowerUpAparece.volume = 0.4;
    sonidoPowerUpUsar.volume = 0.4;

    if (localStorage.getItem('volumenGeneral')==null){
        localStorage.setItem('volumenGeneral','[]');
    }else{
        localStorage.setItem('volumenGeneral','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoVolumenGeneral=JSON.parse(localStorage.getItem('volumenGeneral'));

    datoVolumenGeneral.push("GENERAL_VOLUME_2");

    localStorage.setItem('volumenGeneral', JSON.stringify(datoVolumenGeneral));
    
}

function cambiar3(){
    if(JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == "NINGUNA"){
        
            musicaMenu.play();
    }
    musicaMenu.volume = 0.7;
    musicaMenu.volume = 0.7;
    sonido.volume = 0.7;
    sonido2.volume = 0.7;
    sonido3.volume = 0.7;
    sonido4.volume = 0.7;
    musicaCiudad.volume = 0.7;
    musicaGranja.volume = 0.7;
    sonidoDisparo.volume = 0.7;
    sonidoExplosion.volume = 0.7;
    sonidoExplosion.volume = 0.7;
    sonidoPerder.volume = 0.7;
    sonidoPowerUpAparece.volume = 0.7;
    sonidoPowerUpUsar.volume = 0.7;
    
    if (localStorage.getItem('volumenGeneral')==null){
        localStorage.setItem('volumenGeneral','[]');
    }else{
        localStorage.setItem('volumenGeneral','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoVolumenGeneral=JSON.parse(localStorage.getItem('volumenGeneral'));

    datoVolumenGeneral.push("GENERAL_VOLUME_3");

    localStorage.setItem('volumenGeneral', JSON.stringify(datoVolumenGeneral));
    
}

function cambiar4(){
    if(JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == "NINGUNA"){
        
            musicaMenu.play();
    }
    musicaMenu.volume = 1;
    sonido.volume = 1;
    sonido2.volume = 1;
    sonido3.volume = 1;
    sonido4.volume = 1;
    musicaCiudad.volume = 1;
    musicaGranja.volume = 1;
    sonidoDisparo.volume = 1;
    sonidoExplosion.volume = 1;
    sonidoExplosion.volume = 1;
    sonidoPerder.volume = 1;
    sonidoPowerUpAparece.volume = 1;
    sonidoPowerUpUsar.volume = 1;    

    if (localStorage.getItem('volumenGeneral')==null){
        localStorage.setItem('volumenGeneral','[]');
    }else{
        localStorage.setItem('volumenGeneral','[]');
    }
    //JSON.parse hace que el dato sea legible
    var datoVolumenGeneral=JSON.parse(localStorage.getItem('volumenGeneral'));

    datoVolumenGeneral.push("GENERAL_VOLUME_4");

    localStorage.setItem('volumenGeneral', JSON.stringify(datoVolumenGeneral));
}

$(document).ready( function () {
    
if(JSON.parse(localStorage.getItem('volumenGeneral')) == "GENERAL_VOLUME_0"){
    musicaMenu.volume = 0;
    sonido.volume = 0;
    sonido2.volume = 0;
    sonido3.volume = 0;
    sonido4.volume = 0;
    musicaCiudad.volume = 0;
    musicaGranja.volume = 0;
    sonidoDisparo.volume = 0;
    sonidoExplosion.volume = 0;
    sonidoExplosion.volume = 0;
    sonidoPerder.volume = 0;
    sonidoPowerUpAparece.volume = 0;
    sonidoPowerUpUsar.volume = 0;
}

if(JSON.parse(localStorage.getItem('volumenGeneral')) == "GENERAL_VOLUME_1"){
    musicaMenu.volume = 0.2;
    sonido.volume = 0.2;
    sonido2.volume = 0.2;
    sonido3.volume = 0.2;
    sonido4.volume = 0.2;
    musicaCiudad.volume = 0.2;
    musicaGranja.volume = 0.2;
    sonidoDisparo.volume = 0.2;
    sonidoExplosion.volume = 0.2;
    sonidoExplosion.volume = 0.2;
    sonidoPerder.volume = 0.2;
    sonidoPowerUpAparece.volume = 0.2;
    sonidoPowerUpUsar.volume = 0.2;
}

if(JSON.parse(localStorage.getItem('volumenGeneral')) == "GENERAL_VOLUME_2"){
    musicaMenu.volume = 0.4;
    musicaMenu.volume = 0.4;
    sonido.volume = 0.4;
    sonido2.volume = 0.4;
    sonido3.volume = 0.4;
    sonido4.volume = 0.4
    musicaCiudad.volume = 0.4;
    musicaGranja.volume = 0.4;
    sonidoDisparo.volume = 0.4;
    sonidoExplosion.volume = 0.4;
    sonidoExplosion.volume = 0.4;
    sonidoPerder.volume = 0.4;
    sonidoPowerUpAparece.volume = 0.4;
    sonidoPowerUpUsar.volume = 0.4;
}

if(JSON.parse(localStorage.getItem('volumenGeneral')) == "GENERAL_VOLUME_3"){
    musicaMenu.volume = 0.7;
    musicaMenu.volume = 0.7;
    sonido.volume = 0.7;
    sonido2.volume = 0.7;
    sonido3.volume = 0.7;
    sonido4.volume = 0.7;
    musicaCiudad.volume = 0.7;
    musicaGranja.volume = 0.7;
    sonidoDisparo.volume = 0.7;
    sonidoExplosion.volume = 0.7;
    sonidoExplosion.volume = 0.7;
    sonidoPerder.volume = 0.7;
    sonidoPowerUpAparece.volume = 0.7;
    sonidoPowerUpUsar.volume = 0.7;
}

if(JSON.parse(localStorage.getItem('volumenGeneral')) == "GENERAL_VOLUME_4"){
    musicaMenu.volume = 1;
    sonido.volume = 1;
    sonido2.volume = 1;
    sonido3.volume = 1;
    sonido4.volume = 1;
    musicaCiudad.volume = 1;
    musicaGranja.volume = 1;
    sonidoDisparo.volume = 1;
    sonidoExplosion.volume = 1;
    sonidoExplosion.volume = 1;
    sonidoPerder.volume = 1;
    sonidoPowerUpAparece.volume = 1;
    sonidoPowerUpUsar.volume = 1;    
}

})