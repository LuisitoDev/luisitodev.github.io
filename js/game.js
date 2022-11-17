import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import { loadOBJWithMTL, LoadFBXWithAnimation } from "./Loaders.js";
import { CSM } from '../resources/threejs_modulos/csm/CSM.js';

import Singleton from "./Singleton.js";
import { PlayerTankClass } from "./PlayerTankClass.js";
import { EnemyTankClass } from "./EnemyTankClass.js";

import { PowerUp , powerUpMode } from "./PowerUp.js";
import { BulletClass } from "./BulletClass.js";
import { Scenario } from "./Scenario.js";
import { Respawn } from "./Respawn.js";
import { showParticle, spawnParticulas } from "./Particula.js";

var scene;
var camera;
var renderer;
var clock;
var deltaTime;
var keys = {};
var csm;

var balaModeloGeneral;

var Player1;
var Player2;

var Enemies = []

var RespawnPlayer = [];

var RespawnPowerUp = [];

var ScenarioGame;
var timeGame = 0;
var lastClock = 0;

var isWorldReady = [false, false];



$(document).ready(function () {

    setupScene();

    loadingModels();

    render();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
});


function render() {
    requestAnimationFrame(render);
    csm.update();

    deltaTime = clock.getDelta();

    if(pausaCheck == true){
        deltaTime = 0;
    }
    else{
        const deltaClock = clock.getElapsedTime() - lastClock;
        timeGame += deltaClock;            
    }

    lastClock = clock.getElapsedTime();
    let GameHasFinished = Singleton.CheckGameHasFinished()
    if (GameHasFinished == false && pausaCheck === false){
        if (Singleton.EverybodyIsReady()) {

            if (Singleton.getGameMode() == Singleton.gameModeTypes.MULTI_PLAYER){
                
                Singleton.UpdateMixers(deltaTime)
                Player1.hasPressedKeys(keys, deltaTime)
                Player2.hasPressedKeys(keys, deltaTime)

                Player1.updateValues(deltaTime)
                Player2.updateValues(deltaTime)
            }
            else if (Singleton.getGameMode() == Singleton.gameModeTypes.SINGLE_PLAYER){
                
                Singleton.UpdateMixers(deltaTime)
                Player1.hasPressedKeys(keys, deltaTime)

                Enemies.forEach( (enemyTank) => {
                    enemyTank.moveAround(deltaTime); 
                    
                });
                
                Player1.updateValues(deltaTime)
            }

            Singleton.UpdateValues(deltaTime, timeGame);
            Singleton.RenderPowerUpsParticules();
        }

        renderer.render(scene, camera);
    }
    else{
        if (GameHasFinished == true){
            Singleton.setGameFinishedWindows();
        }
    }
}


function loadingModels() {

    let skinPlayer1 = "";
    if (localStorage.getItem('Player1_Skin') == null)
        skinPlayer1 = "../resources/modelos/Tanquecito/Player1/";
    else
        skinPlayer1 = localStorage.getItem('Player1_Skin');

    if (skinPlayer1 == "free")
        skinPlayer1 = "../resources/modelos/Tanquecito/Player1/";

    if (Singleton.getGameMode() == Singleton.gameModeTypes.MULTI_PLAYER){
        
        loadOBJWithMTL(skinPlayer1, "tanquecito.obj ", "tanquecito.mtl", (tanquecito) => {

            Player1.setTankModel(tanquecito, RespawnPlayer[0].position, RespawnPlayer[0].rotationY)
        
            scene.add(tanquecito);
            tanquecito.name = "tanquecito"
    
            isWorldReady[0] = true;
        });

        let skinPlayer2 = "";
        if (localStorage.getItem('Player2_Skin')==null)
            skinPlayer2 = "../resources/modelos/Tanquecito/Player2/";
        else
            skinPlayer2 = localStorage.getItem('Player2_Skin');

        if (skinPlayer2 == "free")
            skinPlayer2 = "../resources/modelos/Tanquecito/Player2/";

        loadOBJWithMTL(skinPlayer2, "tanquecito.obj", "tanquecito.mtl", (tanquecito2) => {

            Player2.setTankModel(tanquecito2, RespawnPlayer[1].position, RespawnPlayer[1].rotationY)
            
            scene.add(tanquecito2);
            tanquecito2.name = "tanquecito2"

        });
    }
    else if (Singleton.getGameMode() == Singleton.gameModeTypes.SINGLE_PLAYER){
        loadOBJWithMTL(skinPlayer1, "tanquecito.obj ", "tanquecito.mtl", (tanquecito) => {
            
            Player1.setTankModel(tanquecito, RespawnPlayer[0].position, RespawnPlayer[0].rotationY)
        
            scene.add(tanquecito);
            tanquecito.name = "tanquecito"
    
            isWorldReady[0] = true;
    
            EnemyTankClass.PlayerPosition = Player1.getTankModel().position;
        });

        let enemySkin = "";

        if (Singleton.getDifficultyMode() == Singleton.difficultyTypes.EASY_MODE){
            enemySkin = "tanquecito_enemigo.mtl";
        }
        else if (Singleton.getDifficultyMode() == Singleton.difficultyTypes.HARD_MODE){
            enemySkin = "tanquecito_enemigoDificil.mtl";
        }

        loadOBJWithMTL("../resources/modelos/Tanquecito/", "tanquecito.obj", enemySkin, (tanquecitoEnemigo) => {
            Enemies.forEach( (enemyTank, index ) => {
                
                var tanquecitoEnemigoClone = tanquecitoEnemigo.clone();
                enemyTank.setTankModel(tanquecitoEnemigoClone, RespawnPlayer[index + 1].position, RespawnPlayer[index + 1].rotationY)

                scene.add(tanquecitoEnemigoClone);

            });

        });
        
        
    }
    

    loadOBJWithMTL("../resources/modelos/Bala/", "bala.obj", "bala.mtl", (bala) => {
        balaModeloGeneral = bala;
        balaModeloGeneral.position.z = 1000

        scene.add(balaModeloGeneral);

        BulletClass.balaModeloGeneral = balaModeloGeneral;
        BulletClass.isReady = true;
    });




    loadOBJWithMTL("../resources/modelos/Powerups/", "escudo.obj", "escudo.mtl", (bala) => {
        
        //#region TEST
        bala.scale.x = 3
        bala.scale.y = 3
        bala.scale.z = 3
        bala.position.y = 4
        bala.rotation.y = THREE.Math.degToRad(0);
        //#endregion

        scene.add(bala);

        var particleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 4.5,
            map: THREE.ImageUtils.loadTexture(
               "../resources/orbs3.png"
             ),
             blending: THREE.AdditiveBlending,
             transparent: true
        });

        var powerUp = new PowerUp(powerUpMode.INMUNIDAD, bala, particleMaterial);

        Singleton.addPowerUps(powerUp);

    });


    loadOBJWithMTL("../resources/modelos/Powerups/", "velocidad.obj", "velocidad.mtl", (bala) => {
        
        //#region TEST
        bala.scale.x = 3
        bala.scale.y = 3
        bala.scale.z = 3
        bala.position.y = 4
        bala.rotation.y = THREE.Math.degToRad(0);
        //#endregion

        scene.add(bala);
               
        var particleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 4.5,
            map: THREE.ImageUtils.loadTexture(
               "../resources/orbs2.png"
             ),
             blending: THREE.AdditiveBlending,
             transparent: true
        });

        var powerUp = new PowerUp(powerUpMode.VELOCIDAD, bala, particleMaterial);

        Singleton.addPowerUps(powerUp);

    });

    //TODO: EL MODELO DEBE SER DE VELOCIDAD
    loadOBJWithMTL("../resources/modelos/Powerups/", "velocidadbala.obj", "velocidadbala.mtl", (bala) => {
        
        //#region TEST
        bala.scale.x = 3.5
        bala.scale.y = 3.5
        bala.scale.z = 3.5
        bala.position.y = 4
        bala.rotation.y = THREE.Math.degToRad(0);
        //#endregion

        scene.add(bala);

        var particleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 4.5,
            map: THREE.ImageUtils.loadTexture(
               "../resources/orbs.png"
             ),
             blending: THREE.AdditiveBlending,
             transparent: true
        });

        var powerUp = new PowerUp(powerUpMode.DISPARO, bala, particleMaterial);

        Singleton.addPowerUps(powerUp);

    });

    if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){
        loadOBJWithMTL("../resources/modelos/Escenarios/Completos/Ciudad/", "ciudad.obj", "ciudad.mtl", (object) => {
            object.name = "ciudad_escenario"
            scene.add(object);
        });

        loadOBJWithMTL("../resources/modelos/Escenarios/Completos/Ciudad/edificio/", "edificio.obj", "edificio.mtl", (edificio1) => {
            edificio1.name = "ciudad_edificio_escenario"
            edificio1.position.x = 38;
            edificio1.position.z = 28;
            scene.add(edificio1);

            var edificio2=edificio1.clone();
            edificio2.position.x = 60;
            edificio2.position.z = 5;
            edificio2.rotation.y = THREE.Math.degToRad(90);

            scene.add(edificio2)

            
            var edificio3=edificio1.clone();
            edificio3.position.x = 60;
            edificio3.position.z = -25;
            edificio3.rotation.y = THREE.Math.degToRad(90);

            scene.add(edificio3)
        });

        LoadFBXWithAnimation(
            '../resources/modelos/Escenarios/Completos/Ciudad/Bandera/bandera.fbx', 
            '../resources/modelos/Escenarios/Completos/Ciudad/Bandera/bandera.fbx', 
            2.0,
            (objetoCargado) => {
            
            objetoCargado.scale.setScalar(2); 
            objetoCargado.position.x = 0
            objetoCargado.position.z = 0
            objetoCargado.position.y = 0
            
            // object.rotation.y = THREE.Math.degToRad(-90);
            
            scene.add(objetoCargado);             
        });
    }
    else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
        loadOBJWithMTL("../resources/modelos/Escenarios/Completos/Granja/", "granja.obj", "granja.mtl", (object) => {
            object.name = "ciudad_escenario"
            scene.add(object);
        });

        loadOBJWithMTL("../resources/modelos/Escenarios/Completos/Granja/Arbol/", "arbol.obj", "arbol.mtl", (arbol1) => {
            arbol1.name = "ciudad_arbol_escenario"
            arbol1.position.x = 55;
            arbol1.position.z = -35;
            scene.add(arbol1);

            for (var i = 0; i < 6; i++){

                var arbol1Copia=arbol1.clone();
                arbol1Copia.position.z += i * 13;

                scene.add(arbol1Copia);

                var arbol1CopiaEspejo = arbol1Copia.clone();
                arbol1CopiaEspejo.position.x *= -1;

                scene.add(arbol1CopiaEspejo)
            }

            var arbol2=arbol1.clone();
            arbol2.position.x = 70;
            arbol2.position.z = 10;

            scene.add(arbol2);

            for (var i = 0; i < 3; i++){

                var arbol2Copia=arbol2.clone();
                arbol2Copia.position.z += i * 13;

                scene.add(arbol2Copia);

                var arbol2CopiaEspejo = arbol2Copia.clone();
                arbol2CopiaEspejo.position.x *= -1;

                scene.add(arbol2CopiaEspejo)
            }

            var arbol3=arbol1.clone();
            arbol3.position.x = 100;
            arbol3.position.z = 90;

            scene.add(arbol3);

            for (var i = 0; i < 4; i++){
                for (let j = 0; j < 16; j++) {
                    var desplazamientoEnPar = 0;
                    if (i%2 == 0)
                        var desplazamientoEnPar = 5;

                    var arbol3Copia=arbol3.clone();
                    arbol3Copia.position.z -= i * 13;
                    arbol3Copia.position.x -= j * 13 + desplazamientoEnPar;

                    scene.add(arbol3Copia);                     
                }
            }

            
        });

        LoadFBXWithAnimation(
            '../resources/modelos/Escenarios/Completos/Granja/Molino/molino.FBX', 
            '../resources/modelos/Escenarios/Completos/Granja/Molino/molino.FBX', 
            8.0,
            (objetoCargado) => {
            
            // objetoCargado.scale.setScalar(); 
            objetoCargado.position.x = 31
            objetoCargado.position.z = 5
            objetoCargado.position.y = 0
            objetoCargado.rotation.y = THREE.Math.degToRad(180);
            objetoCargado.scale.setScalar(2, 2, 2);

            
            scene.add(objetoCargado);
        
            
            //isWorldReady[0] = true
             
        });

        
        LoadFBXWithAnimation(
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_pastando.FBX', 
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_pastando.FBX', 
            6.0,
            (objetoCargado) => {
            
            // objetoCargado.scale.setScalar(); 
            objetoCargado.position.x = 15
            objetoCargado.position.z = 20
            objetoCargado.position.y = 0
            objetoCargado.rotation.y = THREE.Math.degToRad(225);
            objetoCargado.scale.setScalar(3, 3, 3);

            
            scene.add(objetoCargado);
        
            
            //isWorldReady[0] = true
             
        });

        LoadFBXWithAnimation(
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_bailando.FBX', 
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_bailando.FBX', 
            10.0,
            (objetoCargado) => {
            
            // objetoCargado.scale.setScalar(); 
            objetoCargado.position.x = -1
            objetoCargado.position.z = -18
            objetoCargado.position.y = 0
             objetoCargado.rotation.y = THREE.Math.degToRad(90);
            objetoCargado.scale.setScalar(2, 2, 2);

            
            scene.add(objetoCargado);
        
            
            //isWorldReady[0] = true
             
        });

        LoadFBXWithAnimation(
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_caminando.FBX', 
            '../resources/modelos/Escenarios/Completos/Granja/vaquitas/vaca_caminando.FBX', 
            6.0,
            (objetoCargado) => {
            
            objetoCargado.position.x = 2
            objetoCargado.position.z = -18
            objetoCargado.position.y = 0
             objetoCargado.rotation.y = THREE.Math.degToRad(90);
            objetoCargado.scale.setScalar(2.3, 2.3, 2.3);

            
            scene.add(objetoCargado);
        
            
            //isWorldReady[0] = true
             
        });
    }

}

function setupScene() {

    if (JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == Singleton.scenarioTypes.CIUDAD){
        Singleton.setScenario(Singleton.scenarioTypes.CIUDAD);
        musicaCiudad.loop=true;
    }
    else if (JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == Singleton.scenarioTypes.GRANJA){
        Singleton.setScenario(Singleton.scenarioTypes.GRANJA);
        musicaGranja.loop=true;
    }

    if (JSON.parse(localStorage.getItem('dificultadD'))[0] == Singleton.difficultyTypes.EASY_MODE){
        Singleton.setDifficultyMode(Singleton.difficultyTypes.EASY_MODE);
    }
    else if (JSON.parse(localStorage.getItem('dificultadD'))[0] == Singleton.difficultyTypes.HARD_MODE){
        Singleton.setDifficultyMode(Singleton.difficultyTypes.HARD_MODE);
    }

    if (JSON.parse(localStorage.getItem('cantidadJugadores'))[0] == Singleton.gameModeTypes.SINGLE_PLAYER){
        Singleton.setGameMode(Singleton.gameModeTypes.SINGLE_PLAYER);
    }
    else if (JSON.parse(localStorage.getItem('cantidadJugadores'))[0] == Singleton.gameModeTypes.MULTI_PLAYER){
        Singleton.setGameMode(Singleton.gameModeTypes.MULTI_PLAYER);
    }
    

    var visibleSize = {
        width: $("#scene-section").width(),
        height: $("#scene-section").height()
    };

    clock = new THREE.Clock();
    Singleton.setClock(clock);

    scene = new THREE.Scene();
    Singleton.setScene(scene);
    //#region Camera
    camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 200);
    camera.position.y = 65;
    camera.position.z = -45;
    camera.rotation.x = THREE.Math.degToRad(-120);
    camera.rotation.z = THREE.Math.degToRad(-180);

    Singleton.setCamera(camera);

    // camera.position.y = 20;
    // camera.position.z = -10;
    // camera.rotation.x = THREE.Math.degToRad(-120);
    // camera.rotation.z = THREE.Math.degToRad(-180);
    //#endregion

    //#region Render
    renderer = new THREE.WebGLRenderer({
        precision: "mediump"
    });
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //#endregion

    //#region Light
    var ambientLight = new THREE.AmbientLight(new THREE.Color(0.9, 0.9, 0.9), 1.0);
    scene.add(ambientLight);

    
    if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){
        csm = new CSM({
            fade: true,
            far: camera.far,
            cascades: 4,
            shadowMapSize: 4096,
            lightDirection: new THREE.Vector3(0, -1, 1),
            camera: camera,
            parent: scene,
            lightIntensity: 0.3
        });
    }
    else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
        csm = new CSM({
            fade: true,
            far: camera.far,
            cascades: 4,
            shadowMapSize: 4096,
            lightDirection: new THREE.Vector3(0, -1, 1),
            camera: camera,
            parent: scene,
            lightIntensity: 0.2
        });
    }

    /*
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0, 10, 0 );
    
    spotLight.target.position.set( 10, 10, 10 );
    spotLight.distance = 100
    spotLight.intensity = 1
    spotLight.angle = 0.5
    spotLight.penumbra = 0.25

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 256;
    spotLight.shadow.mapSize.height = 256;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 5;
    spotLight.shadow.camera.fov = 10;
    scene.add( spotLight );
    */
    
    //#endregion

    $("#scene-section").append(renderer.domElement);


    if (Singleton.getGameMode() == Singleton.gameModeTypes.MULTI_PLAYER){
        Player1 = new PlayerTankClass(3, "1", "W", "A", "D", "S", "C");
        Player2 = new PlayerTankClass(3, "2", "I", "J", "L", "K", "M");
        
        Singleton.setPlayerOne(Player1);
        Singleton.setPlayerTwo(Player2);
    }
    else if (Singleton.getGameMode() == Singleton.gameModeTypes.SINGLE_PLAYER){
        Player1 = new PlayerTankClass(3, "1", "W", "A", "D", "S", "C");
        initEnemies();

        Singleton.setPlayerOne(Player1);
        Singleton.setEnemies(Enemies);
    }

    ScenarioGame = new Scenario()

    initRespawnsPlayer();

    initRespawnsPowerUp();
    
}

function initEnemies(){
    var enemy1 = new EnemyTankClass();
    Enemies.push(enemy1)

    var enemy2 = new EnemyTankClass();
    Enemies.push(enemy2)

    var enemy3 = new EnemyTankClass();
    Enemies.push(enemy3)


    var enemy4 = new EnemyTankClass();
    Enemies.push(enemy4)

    initRespawnsEnemyTargets()

}

function initRespawnsPlayer(){
    var respawn;

    if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){
        
        if (Singleton.getGameMode() == Singleton.gameModeTypes.SINGLE_PLAYER){
            respawn = new Respawn(new THREE.Vector3(3, 0, -14), 180)
        }
        else if (Singleton.getGameMode() == Singleton.gameModeTypes.MULTI_PLAYER){
            respawn = new Respawn(
                new THREE.Vector3(13, 0, -14), 
                0)
        }
        
        RespawnPlayer.push(respawn);

        /*
        respawn = new Respawn(
            new THREE.Vector3(-15, 0, 11), 
            180)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(41, 0, -36), 
            0)
        
        RespawnPlayer.push(respawn);
        
*/
        respawn = new Respawn(
            new THREE.Vector3(40, 0, 10), 
            180)
        
        RespawnPlayer.push(respawn);
        
        respawn = new Respawn(
            new THREE.Vector3(20, 0, 35), 
            180)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-43, 0, -37), 
            0)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-43, 0, 33), 
            180)
        
        RespawnPlayer.push(respawn);

    }
    else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
        
        if (Singleton.getGameMode() == Singleton.gameModeTypes.SINGLE_PLAYER){
            respawn = new Respawn(
                new THREE.Vector3(2, 0, 8), 
                0)
        }
        else if (Singleton.getGameMode() == Singleton.gameModeTypes.MULTI_PLAYER){
            respawn = new Respawn(
                new THREE.Vector3(16, 0, -17), 
                0)
        }

        RespawnPlayer.push(respawn);
    
        respawn = new Respawn(
            new THREE.Vector3(-16, 0, -17), 
            0)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-19, 0, 17), 
            90)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(42, 0, -32), 
            270)
        
        RespawnPlayer.push(respawn);
        
        respawn = new Respawn(
            new THREE.Vector3(-42, 0, -32), 
            90)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-42, 0, 37), 
            180)
        
        RespawnPlayer.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(42, 0, 37), 
            180)
        
        RespawnPlayer.push(respawn);
    }

    Singleton.setRandomRespawnPlayer(RespawnPlayer)
}

function initRespawnsEnemyTargets(){
    var respawn;
    const RespawnEnemyTargets = []

    if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){
        
        respawn = new Respawn(
            new THREE.Vector3(3, 0, -35), 
            180)
        
        RespawnEnemyTargets.push(respawn);


        //

        // respawn = new Respawn(
        //     new THREE.Vector3(41, 0, -36), 
        //     0)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(40, 0, 10), 
        //     180)
        
        // RespawnEnemyTargets.push(respawn);
        
        // respawn = new Respawn(
        //     new THREE.Vector3(20, 0, 35), 
        //     180)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(-43, 0, -37), 
        //     0)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(-43, 0, 33), 
        //     180)
        
        // RespawnEnemyTargets.push(respawn);

    }
    else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
        
        respawn = new Respawn(
            new THREE.Vector3(-16, 0, -17), 
            0)
        
        RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(-19, 0, 17), 
        //     90)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(42, 0, -32), 
        //     270)
        
        // RespawnEnemyTargets.push(respawn);
        
        // respawn = new Respawn(
        //     new THREE.Vector3(-42, 0, -32), 
        //     90)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(-42, 0, 37), 
        //     180)
        
        // RespawnEnemyTargets.push(respawn);

        // respawn = new Respawn(
        //     new THREE.Vector3(42, 0, 37), 
        //     180)
        
        // RespawnEnemyTargets.push(respawn);
    }

    Singleton.setRespawnsEnemyTargets(RespawnEnemyTargets)
}

function initRespawnsPowerUp(){
    var respawn;
    if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){
      
        respawn = new Respawn(
            new THREE.Vector3(3, 0, -27), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(21, 0, 11), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(22, 0, -36), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-22, 0, -36), 
            180)
            
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-15, 0, 33), 
            0)
        
        RespawnPowerUp.push(respawn);

    }
    else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
        
        respawn = new Respawn(
            new THREE.Vector3(3, 0, 0), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(16, 0, -32), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-16, 0, -32), 
            0)
        
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-20, 0, 37), 
            180)
            
        RespawnPowerUp.push(respawn);

        respawn = new Respawn(
            new THREE.Vector3(-42, 0, 18), 
            0)
        
        RespawnPowerUp.push(respawn);

        
        respawn = new Respawn(
            new THREE.Vector3(42, 0, 10), 
            0)
        
        RespawnPowerUp.push(respawn);
                
    }

    Singleton.setRandomRespawnPowerUp(RespawnPowerUp)
}

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


$(document).mousemove(function( event ) {
    if (JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == Singleton.scenarioTypes.CIUDAD){
        
            musicaCiudad.play();
    }
    else if (JSON.parse(localStorage.getItem('seleccionEscenario'))[0] == Singleton.scenarioTypes.GRANJA){
        
            musicaGranja.play();
    }
});