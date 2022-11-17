import Singleton from "./Singleton.js";
import { BoxCollision } from "./BoxCollision.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { TankClass } from "./TankClass.js";

class BulletClass {
    BulletModel;
    BulletCollision;
    Damage; 
    TimerAlive;
    TankShooterClass;
    Velocity;

    static balaModeloGeneral;
    static isReady = false;

    constructor(TankShooterClass, Position, ForwardAngle, Velocity) {
        this.TankShooterClass = TankShooterClass;

        this.BulletModel = BulletClass.balaModeloGeneral.clone()

        this.BulletModel.position.x = Position.x;
        this.BulletModel.position.z = Position.z;
        this.BulletModel.rotation.y = ForwardAngle;
        
        var vBoxSize = new THREE.Vector3(1.5,10,1.5);
        this.BulletCollision = new BoxCollision(vBoxSize);

        Singleton.getScene().add(this.BulletModel);

        this.TimerAlive = 10;
        this.Velocity = Velocity;
    }

    updateValues(deltaTime){
        this.movement(deltaTime);
        this.hasCollisionated();
        this.updateTimers(deltaTime);
    }

    movement(deltaTime){
        this.BulletModel.translateZ(this.Velocity * deltaTime);
        this.BulletCollision.updatePosition(this.BulletModel.position);
    }

    hasCollisionated(){
        var objectCollisionated = Singleton.hasCollisionedWithAnything(this.BulletCollision);
            
        if (objectCollisionated !== null){

            switch(Singleton.getGameMode()){
                case Singleton.gameModeTypes.SINGLE_PLAYER:
                    if (objectCollisionated.constructor.name != this.TankShooterClass.constructor.name &&
                        TankClass.prototype.isPrototypeOf(objectCollisionated) && objectCollisionated.getTankModel().uuid !== this.TankShooterClass.getTankModel().uuid){
                        Singleton.tankHasBeenShooted(objectCollisionated);
        
                        this.TimerAlive = 0;
                    }
                    else if (BoxCollision.prototype.isPrototypeOf(objectCollisionated)){
                        this.TimerAlive = 0;
                    }

                break;
                
                case Singleton.gameModeTypes.MULTI_PLAYER:
                    if (TankClass.prototype.isPrototypeOf(objectCollisionated) && objectCollisionated.getTankModel().uuid !== this.TankShooterClass.getTankModel().uuid){
                        Singleton.tankHasBeenShooted(objectCollisionated);
        
                        this.TimerAlive = 0;
                    }
                    else if (BoxCollision.prototype.isPrototypeOf(objectCollisionated)){
                        this.TimerAlive = 0;
                    }
                break;
        
                default:
                    console.log("ERROR: No hay ningun modo de juego seleccionado");
            }

            
        }
    }

    updateTimers(deltaTime){
        if (this.TimerAlive != 0){
            this.TimerAlive -= deltaTime

            if (this.TimerAlive <= 0)
                this.TimerAlive = 0
        }
    }


    getTimerAlive() {
        return this.TimerAlive;
    }

    getBulletCollision(){
        return this.BulletCollision;
    }

    removeFromScene(){

        for (let index = 0; index < this.BulletModel.children.length; index++) {
            const elementModel = this.BulletModel.children[index];

            elementModel.geometry.dispose();
            elementModel.material.dispose(); 
        }

        Singleton.getScene().remove(this.BulletModel)

        
        this.BulletCollision.removeFromScene()
    }
}

export { BulletClass };