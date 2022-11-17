import { TankClass } from "./TankClass.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import Singleton from "./Singleton.js";

class EnemyTankClass extends TankClass {
    static PlayerPosition;
    speedMultiplier;
    maxShootTimer = 5;
    shootTimer;

    constructor() {
        super(1);
        
        if (Singleton.getDifficultyMode() == Singleton.difficultyTypes.EASY_MODE){
            this.forward = 16;
            this.speedMultiplier = 0.7;
            this.difficultyMultiplier = 0.7;
            this.maxShootTimer = 60;
            this.shootTimer = this.maxShootTimer;
        }
        else if (Singleton.getDifficultyMode() == Singleton.difficultyTypes.HARD_MODE){
            this.forward = 29
            this.speedMultiplier = 1.3;
            this.difficultyMultiplier = 1.5;
            this.maxShootTimer = 5;
            this.shootTimer = this.maxShootTimer;
        }

        this.dummyEnemy = true;
    }

    generateRandomInteger(min, max) {
        return Math.floor(min + Math.random()*(max - min + 1))
    }

    moveAround(deltaTime){
        
        
        this.updateValues(deltaTime);
        //console.log("????????? this.isCollisionating: ", this.isCollisionating, "        this.yaw: " , this.yaw)

        if (this.isCollisionating > 5 && this.yaw == 0){
            
            this.InitialAngle = THREE.Math.radToDeg(this.TankModel.rotation.y);
            //console.log("ESTA COLISIONANDO AAAAAAAAAAA:     this.InitialAngle: ",  this.InitialAngle, "         this.yaw: ", this.yaw, "        this.isStopped: ", this.isStopped)
            const number = this.generateRandomInteger(1, 3)
            //console.log(number)
            if (number == 1){
                this.yaw = 150 * this.speedMultiplier;
            }
            else{
                
                this.yaw = -150 * this.speedMultiplier;
            }

            this.isStopped = true
        }

        this.shootTimer -= 1;

        if (this.yaw == 0 && this.shootTimer < 0){
            this.shoot();
            this.shootTimer = this.maxShootTimer;
        }
    }
    
    removeLive(){
        
            sonidoExplosion.play();

        this.TimeRespawning = 3;
        this.TankUpParticleSystem.position.x = this.TankModel.position.x;
        this.TankUpParticleSystem.position.z = this.TankModel.position.z;
        this.TankModel.position.x = 500;
        this.TankModel.position.z = 500;

        this.TankCollision.updatePosition(this.TankModel.position);
    }
};


export { EnemyTankClass };


