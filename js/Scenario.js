import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import { BoxCollision } from "./BoxCollision.js";
import Singleton from "./Singleton.js";


class Scenario {
    Models;
    WallsCollision;

    constructor(){
        this.WallsCollision = [];

        this.initWallsCollision();
    }

    initWallsCollision(){
        var vBoxSize;
        var vBoxPosition;

        if (Singleton.getScenario() == Singleton.scenarioTypes.CIUDAD){

            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(27,0, -2);
            var WallCollisionGasolinera = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionGasolinera);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(39,0, -48);
            var WallCollisionAbajo1 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo1);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(-40,0, -48);
            var WallCollisionAbajo2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionAbajo2);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(28,0, -48);
            var WallCollisionAbajo3 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo3);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(16,0, -48);
            var WallCollisionAbajo4 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo4);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(5,0, -48);
            var WallCollisionAbajo5 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo5);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(-6,0, -48);
            var WallCollisionAbajo6 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo6);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(-18,0, -48);
            var WallCollisionAbajo7 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo7);
            ///---------------
            vBoxSize = new THREE.Vector3(12,10,13);
            vBoxPosition = new THREE.Vector3(-29,0, -48);
            var WallCollisionAbajo8 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo8);
            ///---------------
            vBoxSize = new THREE.Vector3(22,10,13);
            vBoxPosition = new THREE.Vector3(37,0, 23);
            var WallCollisionArriba1 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba1);
            ///---------------
            vBoxSize = new THREE.Vector3(22,10,13);
            vBoxPosition = new THREE.Vector3(37,0, 34);
            var WallCollisionArriba7 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba7);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-40,0, 45);
            var WallCollisionArriba2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionArriba2);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(22,0, 45);
            var WallCollisionArriba3 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba3);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(6,0, 45);
            var WallCollisionArriba4 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba4);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-10,0, 45);
            var WallCollisionArriba5 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba1);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-23,0, 45);
            var WallCollisionArriba6 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionArriba6);
            ///---------------
            vBoxSize = new THREE.Vector3(10,10,35);
            vBoxPosition = new THREE.Vector3(52,0, -12);
            var WallCollisionIzquierda1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda1);
            ///---------------
            vBoxSize = new THREE.Vector3(10,10,35);
            vBoxPosition = new THREE.Vector3(52,0, -32);
            var WallCollisionIzquierda2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda2);
            ///---------------
            vBoxSize = new THREE.Vector3(10,10,35);
            vBoxPosition = new THREE.Vector3(52,0, 12);
            var WallCollisionIzquierda3 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda3);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,35);
            vBoxPosition = new THREE.Vector3(-57,0, 12);
            var WallCollisionDerecha1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha1);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,35);
            vBoxPosition = new THREE.Vector3(-57,0, -12);
            var WallCollisionDerecha2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha2);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,35);
            vBoxPosition = new THREE.Vector3(-57,0, -32);
            var WallCollisionDerecha3 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha3);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,35);
            vBoxPosition = new THREE.Vector3(-57,0, 27);
            var WallCollisionDerecha4 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionDerecha4);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,35);
            vBoxPosition = new THREE.Vector3(-57,0, 12);
            var WallCollisionDerecha1 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionDerecha1);
            ///---------------
            vBoxSize = new THREE.Vector3(19,10,13);
            vBoxPosition = new THREE.Vector3(-1,0, -2);
            var WallCollisionParque = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionParque);
            ///---------------
            vBoxSize = new THREE.Vector3(16,10,13);
            vBoxPosition = new THREE.Vector3(9,0,23);
            var WallCollisionCosaRoja = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCosaRoja);
            ///---------------
            vBoxSize = new THREE.Vector3(22,10,11);
            vBoxPosition = new THREE.Vector3(-13,0,-26);
            var WallCollisionCasa1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCasa1);
            ///---------------
            vBoxSize = new THREE.Vector3(16,10,16); 
            vBoxPosition = new THREE.Vector3(-30,0,11);
            var WallCollisionCasaSuperiorDerecha1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCasaSuperiorDerecha1);
            ///---------------
            vBoxSize = new THREE.Vector3(16,10,16); 
            vBoxPosition = new THREE.Vector3(-30,0,21);
            var WallCollisionCasaSuperiorDerecha2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCasaSuperiorDerecha2);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,12); 
            vBoxPosition = new THREE.Vector3(-15,0,23);
            var WallCollisionSemaforo = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionSemaforo);
            ///---------------
            vBoxSize = new THREE.Vector3(16,10,25); 
            vBoxPosition = new THREE.Vector3(-30,0,-19);
            var WallCollisionCasaInferiorDerecha = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCasaInferiorDerecha);
            ///---------------
            vBoxSize = new THREE.Vector3(20,10,12);
            vBoxPosition = new THREE.Vector3(28,0,-25);
            var WallCollisionCasaInferiorIzquierda1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionCasaInferiorIzquierda1);   
            ///---------------
            vBoxSize = new THREE.Vector3(18.5,10,12);
            vBoxPosition = new THREE.Vector3(18,0,-25);
            var WallCollisionCasaInferiorIzquierda2 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionCasaInferiorIzquierda2);   

        }
        else if (Singleton.getScenario() == Singleton.scenarioTypes.GRANJA){
             ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(30,0, 25);
             var WallCollisionGranjaSuperiorIzquierda1 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaSuperiorIzquierda1);
             ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(15,0, 25);
             var WallCollisionGranjaSuperiorIzquierda2 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaSuperiorIzquierda2);
            ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(30,0, 12);
             var WallCollisionGranjaSuperiorIzquierda3 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaSuperiorIzquierda3);
             ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(15,0, 12);
             var WallCollisionGranjaSuperiorIzquierda4 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaSuperiorIzquierda4);
            ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(30,0,-20);
             var WallCollisionGranjaInferiorIzquierda1 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaInferiorIzquierda1);
            ///---------------
             vBoxSize = new THREE.Vector3(16,10,15);
             vBoxPosition = new THREE.Vector3(30,0,-13);
             var WallCollisionGranjaInferiorIzquierda2 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaInferiorIzquierda2);
            ///---------------
             vBoxSize = new THREE.Vector3(15,10,21);
             vBoxPosition = new THREE.Vector3(4,0,-17);
             var WallCollisionGranjaCentral1 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaCentral1);
            ///---------------
             vBoxSize = new THREE.Vector3(15,10,21);
             vBoxPosition = new THREE.Vector3(-4,0,-17);
             var WallCollisionGranjaCentral2 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionGranjaCentral2);
            ///---------------
            vBoxSize = new THREE.Vector3(16,15,15);
            vBoxPosition = new THREE.Vector3(-29.7,0,-14);
            var WallCollisionMolino1 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionMolino1);
            ///---------------
            vBoxSize = new THREE.Vector3(16,15,15);
            vBoxPosition = new THREE.Vector3(-29.7,0,-20);
            var WallCollisionMolino2 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionMolino2);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,9);
            vBoxPosition = new THREE.Vector3(-10,0,8.2);
            var WallCollisionSueloZanahorias1 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloZanahorias1);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,9);
            vBoxPosition = new THREE.Vector3(-30,0,8.2);
            var WallCollisionSueloZanahorias2 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloZanahorias2);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,9);
            vBoxPosition = new THREE.Vector3(-20,0,8.2);
            var WallCollisionSueloZanahorias3 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloZanahorias3);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,10);
            vBoxPosition = new THREE.Vector3(-10,0,28);
            var WallCollisionSueloSuperior1 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloSuperior1);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,10);
            vBoxPosition = new THREE.Vector3(-30,0,28);
            var WallCollisionSueloSuperior2 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloSuperior2);
            ///---------------
            vBoxSize = new THREE.Vector3(15.5,10,10);
            vBoxPosition = new THREE.Vector3(-20,0,28);
            var WallCollisionSueloSuperior3 = new BoxCollision(vBoxSize, vBoxPosition);
      
            this.WallsCollision.push(WallCollisionSueloSuperior3);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, 38);
            var WallCollisionIzquierda0 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda0);

            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, 23);
            var WallCollisionIzquierda1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda1);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, 8);
            var WallCollisionIzquierda2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda2);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, -7);
            var WallCollisionIzquierda3 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda3);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, -22);
            var WallCollisionIzquierda4 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda4);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(55,0, -37);
            var WallCollisionIzquierda5 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionIzquierda5);
           
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, 38);
            var WallCollisionDerecha0 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha0);

            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, 23);
            var WallCollisionDerecha1 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha1);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, 8);
            var WallCollisionDerecha2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha2);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, -7);
            var WallCollisionDerecha3 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha3);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, -22);
            var WallCollisionDerecha4 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha4);
            ///---------------
            vBoxSize = new THREE.Vector3(14,10,15);
            vBoxPosition = new THREE.Vector3(-55,0, -37);
            var WallCollisionDerecha5 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionDerecha5);

            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(39,0, -44);
            var WallCollisionAbajo1 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo1);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-40,0, -44);
            var WallCollisionAbajo2 = new BoxCollision(vBoxSize, vBoxPosition);
    
            this.WallsCollision.push(WallCollisionAbajo2);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(22,0, -44);
            var WallCollisionAbajo3 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo3);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(6,0, -44);
            var WallCollisionAbajo4 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo4);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-10,0, -44);
            var WallCollisionAbajo5 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo5);
            ///---------------
            vBoxSize = new THREE.Vector3(17,10,13);
            vBoxPosition = new THREE.Vector3(-23,0, -44);
            var WallCollisionAbajo6 = new BoxCollision(vBoxSize, vBoxPosition);
     
            this.WallsCollision.push(WallCollisionAbajo6);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(39,0, 50);
             var WallCollisionArriba1 = new BoxCollision(vBoxSize, vBoxPosition);
      
             this.WallsCollision.push(WallCollisionArriba1);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(-40,0, 50);
             var WallCollisionArriba2 = new BoxCollision(vBoxSize, vBoxPosition);
     
             this.WallsCollision.push(WallCollisionArriba2);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(22,0, 50);
             var WallCollisionArriba3 = new BoxCollision(vBoxSize, vBoxPosition);
      
             this.WallsCollision.push(WallCollisionArriba3);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(6,0, 50);
             var WallCollisionArriba4 = new BoxCollision(vBoxSize, vBoxPosition);
      
             this.WallsCollision.push(WallCollisionArriba4);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(-10,0, 50);
             var WallCollisionArriba5 = new BoxCollision(vBoxSize, vBoxPosition);
      
             this.WallsCollision.push(WallCollisionArriba5);
             ///---------------
             vBoxSize = new THREE.Vector3(17,10,13);
             vBoxPosition = new THREE.Vector3(-23,0, 50);
             var WallCollisionArriba6 = new BoxCollision(vBoxSize, vBoxPosition);
      
             this.WallsCollision.push(WallCollisionArriba6);
        }


        Singleton.setWallToArray(this.WallsCollision)

    }
}



export { Scenario };