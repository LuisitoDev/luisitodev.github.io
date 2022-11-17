import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { BoxCollision } from "./BoxCollision.js";
import { PlayerTankClass } from './PlayerTankClass.js';
import { shareScore } from "./mifacebook.js";
import { BulletClass } from './BulletClass.js';

var player1;
var player2;

var camera;
var clock;

var Enemies;
var RespawnEnemyTargets = [];
var puntuacion;

var indexPowerUpVisible = -1;
var PowerUps = [];
var RespawnPowerUps = [];

var totalTime = 250;
var timeRemaining = totalTime;
const TotalTimeBetweenPowerUp = 10;
var TimeBetweenPowerUp = TotalTimeBetweenPowerUp;
const TotalTimePowerUpInGame = 15;
var TimePowerUpInGame = 0;

const IdTimeRemaining = "#IdTimeRemaining"

const tanksArray = []
var wallsArray = []
var RespawnPlayer = []
var scene;
var gameFinishedWindowsShowed = false;

var scenario;

const scenarioTypes = {
    CIUDAD: 'CIUDAD',
    GRANJA: 'GRANJA'
}

const gameModeTypes = {
    MULTI_PLAYER: 'MULTI_PLAYER',
    SINGLE_PLAYER: 'SINGLE_PLAYER'
}

const difficultyTypes = {
    EASY_MODE: 'EASY_MODE',
    HARD_MODE: 'HARD_MODE'
}

var gameMode;
var difficultyMode;

function generateRandom(min = 0, max = 100) {

    let difference = max - min;

    let rand = Math.random();

    rand = Math.floor( rand * difference);

    rand = rand + min;

    return rand;
}

function getDistance(mesh1, mesh2) {
    var dx = mesh1.position.x - mesh2.position.x;
    var dy = mesh1.position.y - mesh2.position.y;
    var dz = mesh1.position.z - mesh2.position.z;

    var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    return distance;
}


const hasCollisionedWithAnything = (pBoxCollision) => {
    var boxHasCollisioned = null;

    boxHasCollisioned = 
            hasCollisionedWithTanks(pBoxCollision)
        ||  hasCollisionedWithWalls(pBoxCollision)
        ||  null;

        return boxHasCollisioned;
}

const hasCollisionedWithTanks = (pBoxCollision) => {

        var tankCollisionated = null;

        for (let iTank of tanksArray) {
            var iTankCollision = iTank.getTankCollision();

            if (pBoxCollision !== iTankCollision) {
                if (getDistance(pBoxCollision.getBoxModel(), iTankCollision.getBoxModel()) < 15) {
                    if (pBoxCollision.detectCollisionBoxes(iTankCollision)) {
                        tankCollisionated = iTank;
                        break;
                    }
                }
            }
        }

        return tankCollisionated;
    
}

const hasCollisionedWithWalls = (pBoxCollision) => {

    /*
        var wallCollisionated = null;

        for (let iWall of wallsArray) {
            var iWallCollision = iWall.getWallCollision();

            if (pBoxCollision !== iWallCollision) {
                if (getDistance(pBoxCollision.getBoxModel(), iWallCollision.getBoxModel()) < 15) {
                    if (pBoxCollision.detectCollisionBoxes(iWallCollision)) {
                        wallCollisionated = iWall;
                        break;
                    }
                }
            }
        }
    */

    var wallCollisionated = null;

    for (let iWallCollision of wallsArray) {
       
        if (pBoxCollision !== iWallCollision) {
            if (getDistance(pBoxCollision.getBoxModel(), iWallCollision.getBoxModel()) < 15) {
                if (pBoxCollision.detectCollisionBoxes(iWallCollision)) {
                    wallCollisionated = iWallCollision;
                    break;
                }
            }
        }
    }


    return wallCollisionated;

}

const tankHasBeenShooted = (tankCollisionated) => {

    switch(gameMode){
        case gameModeTypes.SINGLE_PLAYER:
            //if (EnemyTankClass.prototype.isPrototypeOf(TankShooterClass) == true && EnemyTankClass.prototype.isPrototypeOf(objectCollisionated) == true)


            if (tankCollisionated.isAlive() == true && tankCollisionated.hasInmunity() == false){
                tankCollisionated.removeLive();

                if (tankCollisionated !== player1)
                    player1.addOneKill();
            }

        break;
        
        case gameModeTypes.MULTI_PLAYER:
            if (tankCollisionated.isAlive() == true && tankCollisionated.hasInmunity() == false){
                tankCollisionated.removeLive();
            }
            
        break;

        default:
            console.log("ERROR: No hay ningun modo de juego seleccionado");
    }

    // console.log("le hizo daño a tanque", tankCollisionated.getTankModel().name, " la clase es:", tankCollisionated.constructor.name);
    // console.log("es player tank? ", PlayerTankClass.prototype.isPrototypeOf(tankCollisionated) );

}

const GameOverPlayerOne = () => {
    //TODO: AQUI SE REPITE ESTO MUCHAS VECES, ES ESO CORRECTO? HAY ALGUNA MANERA DE PONERLE PAUSA AL GAME?
    
    
    var difficultyMultiplier = 0;

    switch(difficultyMode){
        case difficultyTypes.EASY_MODE:{
            difficultyMultiplier = 1
            $("#modal_score_difficult").text("Facil");   
            $("#modal_score_difficult").val(difficultyTypes.EASY_MODE); 
        }
        break;
        
        case difficultyTypes.HARD_MODE:{
            difficultyMultiplier = 3
            $("#modal_score_difficult").text("Dificil");   
            $("#modal_score_difficult").val(difficultyTypes.HARD_MODE); 
        }
        break;

        default:
            console.log("ERROR: No hay ninguna dificultad seleccionada");
    }

    puntuacion = player1.getKills() * difficultyMultiplier
    
    $("#modal_score").text(`${puntuacion}`);
    
    var textScoreGameOver = `Puntuación: ${puntuacion}`;
    var textPlayer1WinDebugg = `GAME OVER PLAYER 1, kills: ${player1.getKills()} PUNTUACION: ${player1.getKills() * difficultyMultiplier} en modo: ${difficultyMode}`;
    console.log(textPlayer1WinDebugg);

    if (timeRemaining <= 0){
        //--------- Sonidito cuando ganan -------
        
        
            sonidoGanar.play();
        
        var textPlayer1Win = `GAME OVER, SE HA ACABADO EL TIEMPO`;
        $("#modal_title_win").text(textPlayer1Win);
        $("#modal_score_win").text(textScoreGameOver);
        showModal('modal-container-win')
    }
    else if (player1.isAlive() == false){
        //--------- Sonidito cuando pierde -------
        
        
            sonidoPerder.play();

        var textPlayer1Win = `GAME OVER, EL JUGADOR HA PERDIDO TODAS LAS VIDAS`;
        $("#modal_title_lose").text(textPlayer1Win);
        $("#modal_score_lose").text(textScoreGameOver);
        showModal('modal-container-lose')
    }

     
}


$(document).on("click", "#modal_button_compartir_win", function () { 
    shareScore(puntuacion)
})


$(document).on("click", "#modal_button_compartir_lose", function () { 
    shareScore(puntuacion)
})




const GameOverAnyPlayer = () => {
    $("#send_score_button_win").hide();
    $("#send_score_button_lose").hide();
    $("#modal_button_compartir_win").hide();
    $("#modal_button_compartir_lose").hide();


    $("#modal_score_lose").hide();
    $("#modal_score_win").hide();
    $("#modal_button_lose_compartir").hide();
    $("#modal_button_win_compartir").hide();

    if(timeRemaining <= 0){
        //--------- Sonidito cuando pierden -------
        
            sonidoPerder.play();

        var textDraw = `Empate, se termino el tiempo`;
        var textDrawDebugg = `Empate, se termino el tiempo, jugador1 esta vivo?" ${player1.isAlive()} jugador2 esta vivo? $${player2.isAlive()} `;
        console.log(textDrawDebugg);

        $("#modal_title_lose").text(textDraw);
        showModal('modal-container-lose')
    }
    else if(player1.isAlive() == true && player2.isAlive() == false){
        //--------- Sonidito cuando ganan -------
        
            sonidoGanar.play();

        var textPlayer1Win = `Gano jugador 1`;
        var textPlayer1WinDebugg = `Gano jugador 1, jugador1 esta vivo? ${player1.isAlive()} jugador2 esta vivo? ${player2.isAlive()} `;
        console.log(textPlayer1WinDebugg);

        $("#modal_title_win").text(textPlayer1Win);
        showModal('modal-container-win')
    }
    else if(player1.isAlive() == false && player2.isAlive() == true){
        //--------- Sonidito cuando ganan -------
        
            sonidoGanar.play();

        var textPlayer2Win = `Gano jugador 2`;
        var textPlayer2WinDebugg = `Gano jugador 2, jugador1 esta vivo?" ${player1.isAlive()} jugador2 esta vivo? ${player2.isAlive()}`;
        console.log(textPlayer2WinDebugg);

        $("#modal_title_win").text(textPlayer2Win);
        showModal('modal-container-win')

    }
    else if(player1.isAlive() == false && player2.isAlive() == false){
        //--------- Sonidito cuando pierden -------
        
            sonidoPerder.play();

        var textDraw = `Empate, ambos jugadores murieron`;
        var textDrawDebugg = `Ambos jugadores murieron, jugador1 esta vivo? ${player1.isAlive()} jugador2 esta vivo? ${player2.isAlive()}`;
        console.log(textDrawDebugg);

        $("#modal_title_lose").text(textDraw);
        showModal('modal-container-lose')
    }
}

const CheckGameHasFinished = () => {
    switch(gameMode){
        case gameModeTypes.SINGLE_PLAYER:
            if (player1.isAlive() == false || timeRemaining <= 0){
                return true;
            }
            else
                return false;
                
        break;
        
        case gameModeTypes.MULTI_PLAYER:
            if (player1.isAlive() == false || player2.isAlive() == false ||  timeRemaining <= 0){
                return true;
            }
            else 
                return false;
        break;

        default:
            console.log("ERROR: No hay ningun modo de juego seleccionado");
    }


}

const setGameFinishedWindows = () => {
    if (gameFinishedWindowsShowed == false){
        switch(gameMode){
            case gameModeTypes.SINGLE_PLAYER:
                if (player1.isAlive() == false || timeRemaining <= 0){
                    GameOverPlayerOne();    
                }
                    
            break;
            
            case gameModeTypes.MULTI_PLAYER:
                if (player1.isAlive() == false || player2.isAlive() == false ||  timeRemaining <= 0){
                    GameOverAnyPlayer();
                }
            break;

            default:
                console.log("ERROR: No hay ningun modo de juego seleccionado");
        }

        gameFinishedWindowsShowed = true
    }
}

const UpdateValues = (deltaTime, elapsedTime) => {
    UpdateTimer(elapsedTime)
    UpdateRespawnPowerUp(deltaTime)
}

const UpdateTimer = (elapsedTime) => {
    if (timeRemaining > 0){
        timeRemaining = Math.ceil(totalTime - elapsedTime);

        if (timeRemaining <= 0)
            timeRemaining = 0;

        $(IdTimeRemaining).text(timeRemaining);
    }
}

const UpdateRespawnPowerUp = (deltaTime) => {
    if (TimeBetweenPowerUp != 0){
        TimeBetweenPowerUp -= deltaTime

        if (TimeBetweenPowerUp <= 0){
            TimeBetweenPowerUp = 0
            TimePowerUpInGame = TotalTimePowerUpInGame
            
            indexPowerUpVisible = generateRandom(0, PowerUps.length)
            var indexRespawnPowerUP = generateRandom(0, RespawnPowerUps.length)

            var respawn = RespawnPowerUps[indexRespawnPowerUP]
            
            PowerUps[indexPowerUpVisible].respawnPowerUp(respawn);
        }
    }   

    if (TimePowerUpInGame != 0){
        TimePowerUpInGame -= deltaTime

        var tankCollisionated = hasCollisionedWithTanks(PowerUps[indexPowerUpVisible].getPowerUpCollision());
        
        if (tankCollisionated !== null && PlayerTankClass.prototype.isPrototypeOf(tankCollisionated)){
            tankCollisionated.setPowerUp(PowerUps[indexPowerUpVisible].getMode())
            TimePowerUpInGame = -1;
            // console.log("Tomo Item: ", PowerUps[indexPowerUpVisible].Mode, " El jugador: ", tankCollisionated.constructor.name)
        }

        if (TimePowerUpInGame <= 0){
            TimePowerUpInGame = 0
            TimeBetweenPowerUp = TotalTimeBetweenPowerUp
            
            PowerUps[indexPowerUpVisible].hidePowerUp()
            indexPowerUpVisible = -1
        }
    }
}

function RespawnIsCollisionated(respawn){
    
    var vBoxSize = new THREE.Vector3(5.5,10,6.5);
    var vBoxPosition = new THREE.Vector3(respawn.position.x, 0,respawn.position.z);
    var boxCollisionRespawn = new BoxCollision(vBoxSize, vBoxPosition);

    var boxHasCollisioned = hasCollisionedWithTanks(boxCollisionRespawn) || null;

    boxCollisionRespawn.removeFromScene();

    if (boxHasCollisioned == null)
        return false;
    else        
        return true;
        
}

const getRandomUnobstructedRespawnPlayer = () => {
    var respawn;

    var ArrayRespawns = Array.from(RespawnPlayer)
    var respawnFound = false

    do {
        var indexRespanw = generateRandom(0,ArrayRespawns.length)
        respawn = ArrayRespawns[indexRespanw]

        if (RespawnIsCollisionated(respawn) == true){
            ArrayRespawns.splice(indexRespanw, 1)
        }
        else{
            respawnFound = true;
        }
    }
    while(respawnFound == false);
    

    return respawn;
}

const RenderPowerUpsParticules = () => {
    PowerUps.forEach( (powerUp) => {
        powerUp.updateValues(); 
    });
}

var action, action2;
var mixers=[];

const UpdateMixers = (deltaTime) => {
    var flag=false; 
    if(mixers.length>0){
        for(var i=0; i<mixers.length;i++){
            mixers[i].update(deltaTime);
        }
        if(flag){
            action.weight=0;
            // action2.weight=1;

            flag=false;
        }else{
            action.weight=1;
            // action2.weight=0;   
        }
    }
}

const EverybodyIsReady = () => {
    const isReady = true;

    if (gameMode == gameModeTypes.SINGLE_PLAYER){
        if (!player1.isReady)
            return false;
 
        for (let iEnemies of Enemies) {
            if (!iEnemies.isReady)
                return false;
        }   
    }
    else if (gameMode == gameModeTypes.MULTI_PLAYER){
        if (!player1.isReady)
            return false;
    
        if (!player2.isReady)
            return false;
    }

    if (!BulletClass.isReady)
        return false;

    return isReady;
}

export default {
    RenderPowerUpsParticules,
    getRandomUnobstructedRespawnPlayer,
    setRandomRespawnPlayer(pRespawnPlayer){ RespawnPlayer = pRespawnPlayer },
    setRespawnsEnemyTargets(pRespawnsEnemyTarget){ RespawnEnemyTargets = pRespawnsEnemyTarget },
    getRespawnsEnemyTargets(){ return RespawnEnemyTargets; },
    EverybodyIsReady,
    scenarioTypes,
    setScenario(pScenario){ scenario = pScenario },
    getScenario(){ return scenario; },

    gameModeTypes,
    setGameMode(pGameMode){ gameMode = pGameMode },
    getGameMode(){ return gameMode; },

    difficultyTypes,
    setDifficultyMode(pDifficultyMode){ difficultyMode = pDifficultyMode },
    getDifficultyMode(){ return difficultyMode; },
    
    setMixers(pMixers){ mixers = pMixers },
    getMixers (){ return mixers; },
    setAction1(pAction1){ action = pAction1 },
    getAction1 (){ return action; },
    setAction2(pAction2){ action2 = pAction2 },
    getAction2 (){ return action2; },

    UpdateMixers,
    setGameMode(pGameMode){ gameMode = pGameMode },
    getGameMode (){ return gameMode; },

    setCamera(pCamera){ camera = pCamera; },
    getCamera(){ return camera; },

    setClock(pClock){ clock = pClock; },
    getClock(){ return clock; },

    addTankToArray(BoxCollision){ tanksArray.push(BoxCollision); },
    setWallToArray(pWallsArray){ wallsArray = pWallsArray;  },

    setScene(pScene){ scene = pScene; },
    getScene(){ return scene; },

    hasCollisionedWithAnything,
    hasCollisionedWithTanks,

    tankHasBeenShooted,

    CheckGameHasFinished,
    setGameFinishedWindows,
    UpdateValues,

    setPlayerOne(pPlayer1){player1 = pPlayer1},
    setPlayerTwo(pPlayer2){player2 = pPlayer2},

    setEnemies(pEnemies){Enemies = pEnemies},

    addPowerUps(pPowerUps){ PowerUps.push(pPowerUps); },
    
    setRandomRespawnPowerUp(pRespawnPowerUp){ RespawnPowerUps = pRespawnPowerUp },

}