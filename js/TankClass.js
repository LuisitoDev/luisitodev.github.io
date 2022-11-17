import Singleton from "./Singleton.js";
import { BulletClass } from "./BulletClass.js";
import { BoxCollision } from "./BoxCollision.js";
import { FireParticleSystem } from "./FireParticleSystem.js";
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { PowerUp , powerUpMode } from "./PowerUp.js";

class TankClass{
    Lives;
    TankModel;
    TankCollision;
    BulletShots;
    isDeath;

    TimeBetweenBullets;
    timerShootingInput
    TimeRespawning;
    TimePowerUp;
    PowerUpTaken;

    isStopped;
    isCollisionating;

    yaw;
    forward;
    
    InitialAngle;

    isReady;

    //TODO: ELIMINAR dummyEnemy
    dummyEnemy = false;

    difficultyMultiplier;

    TankUpParticleSystem;

    constructor (Lives){
        this.Lives = Lives;
        this.isDeath = false;

        this.BulletShots = [];

        this.yaw = 0;
        this.forward = 0;

        this.TimeRespawning = 0;
        this.timerShootingInput = 0

        this.TimeBetweenBullets = 1.1;
        this.isStopped = false;
        this.isCollisionating = 0;

        var vBoxSize = new THREE.Vector3(5.5,10,6.5);
        this.TankCollision = new BoxCollision(vBoxSize);

        this.isReady = false;

        this.difficultyMultiplier = 1;

        Singleton.addTankToArray(this);
    }



    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    updateValues(deltaTime){
        this.movement(deltaTime);
        this.updateBulletsMovement(deltaTime);
        this.updateTimers(deltaTime);
    }

    movement(deltaTime) {
        this.translate(deltaTime);
        this.rotate(deltaTime);

        //if (this.dummyEnemy)
            // console.log("Tanque Pos X: ", this.TankModel.position.x, "Tanque Pos Z", this.TankModel.position.z, "Angulo Y: ", THREE.Math.radToDeg(this.TankModel.rotation.y))

            
    }

    translate(deltaTime){
        if (this.isStopped == false && this.TimeRespawning <= 0){
            var lastPosition = this.TankModel.position.clone();
            
            this.TankModel.translateZ(this.forward * deltaTime);
            
            this.TankCollision.updatePosition(this.TankModel.position);

            
            // spotLight.target = this.TankModel
            // spotLight.target.position += 

            // spotLight.target.updateMatrixWorld();

            // console.log("Tanque Pos X: ", this.TankModel.position.x, "Tanque Pos Z", this.TankModel.position.z, "Angulo Y: ", THREE.Math.radToDeg(this.TankModel.rotation.y))

            if (Singleton.hasCollisionedWithAnything(this.TankCollision) !== null){
                this.TankModel.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                this.isCollisionating += 1;
            }
            else{
                this.isCollisionating = 0;
            }

            // this.TankUpParticleSystem.position.x = this.TankModel.position.x;
            // this.TankUpParticleSystem.position.z = this.TankModel.position.z;
        }

        
    }

    rotate(deltaTime){
        this.TankModel.rotation.y +=  THREE.Math.degToRad(this.yaw * deltaTime);
    }

    updateBulletsMovement(deltaTime){
        this.BulletShots.forEach( (iBulletShot, index) => {
            if (iBulletShot.getTimerAlive() > 0)
                iBulletShot.updateValues(deltaTime)
            else{
                iBulletShot.removeFromScene();
                this.BulletShots.splice(index, 1)
            }
        });
    }

    updateTimers(deltaTime){
        this.updateShootingTimer(deltaTime);
        this.updateRotatingValues();
        this.updateTimeRespawning(deltaTime);
        this.updateTimePowerUp(deltaTime);
        this.updateRotationParticles(deltaTime);
    }


    updateShootingTimer(deltaTime){
        
        if (this.timerShootingInput != 0){
            this.timerShootingInput -= deltaTime 

            if (this.timerShootingInput <= 0)
                this.timerShootingInput = 0
        }
    }

    updateTimeRespawning(deltaTime){
        if (this.TimeRespawning != 0){
            this.TimeRespawning -= deltaTime

            if (this.TimeRespawning <= 0){
                this.TimeRespawning = 0
                this.respawnPlayer();
            }
        }
    }

    updateRotatingValues(){
        if (this.yaw != 0){
            
            var currentAngle = THREE.Math.radToDeg(this.TankModel.rotation.y);

            //if (this.dummyEnemy)
                //console.log("this.InitialAngle", this.InitialAngle, "       currentAngle: ", currentAngle, "       this.TankModel.rotation.y", this.TankModel.rotation.y  , "       isStopped: ", this.isStopped)

            if (Math.abs(currentAngle - this.InitialAngle) > 90){
                if (this.yaw > 0){
                    this.InitialAngle += 90
                }
                else if (this.yaw < 0){
                    this.InitialAngle -= 90
                }

                this.TankModel.rotation.y = THREE.Math.degToRad(this.InitialAngle);
                
                this.keepRotation360()
                
                this.yaw = 0;
                this.isStopped = false;
                this.isCollisionating = 0;
            }
            
        }
    }

    
    updateTimePowerUp(deltaTime){
        if (this.TimePowerUp != 0){
            this.TimePowerUp -= deltaTime

            if (this.TimePowerUp <= 0){
                this.resetPowerUp();
            }
        }
    }

    
    updateRotationParticles(){
        if (this.TankUpParticleSystem != undefined) {
            // this.TankUpParticleSystem.Step(Singleton.getClock().getElapsedTime());
            this.TankUpParticleSystem.rotation.y += 0.03;
            this.TankUpParticleSystem.rotation.x += 0.04;
        }
    }

    resetPowerUp(){
        this.TimePowerUp = 0
        this.PowerUpTaken = null;
    }

    shoot(){
        
        if (this.timerShootingInput == 0){
            var multiplierVelocityBullets = 1

            if (this.PowerUpTaken == powerUpMode.DISPARO)
                multiplierVelocityBullets = 1.6

            var bulletElement = new BulletClass(this, this.TankModel.position, this.TankModel.rotation.y, 50 * multiplierVelocityBullets * this.difficultyMultiplier)
            this.BulletShots.push(bulletElement)

            
                sonidoDisparo.play();
            
            this.timerShootingInput =  this.TimeBetweenBullets

            var multiplierTimeBetweenBullets = 1

            if (this.PowerUpTaken == powerUpMode.DISPARO)
                multiplierTimeBetweenBullets = 0.5

            this.timerShootingInput =  this.TimeBetweenBullets / multiplierVelocityBullets

        }

        
    }


    removeLive(){
        if (this.Lives > 0 && this.TimeRespawning == 0){

            this.Lives -= 1;
            this.TimeRespawning = 3;

            // this.TankUpParticleSystem = new FireParticleSystem({
            //     parent: Singleton.getScene(),
            //     camera: Singleton.getCamera(),
            //     position: this.TankModel.position
            // });

            
            this.TankUpParticleSystem.position.x = this.TankModel.position.x;
            this.TankUpParticleSystem.position.z = this.TankModel.position.z;
            
            this.TankModel.position.x = 500;
            this.TankModel.position.z = 500;

            this.TankCollision.updatePosition(this.TankModel.position);

            // console.log("vidas restantes", this.Lives)

            // console.log("Tanque Pos X: ", this.TankModel.position.x, "Tanque Pos Z", this.TankModel.position.z, "Angulo Y: ", THREE.Math.radToDeg(this.TankModel.rotation.y))

            this.updateLabelLives();
            
            this.removePowerUpDiv();
            
            
                sonidoExplosion.play();

            if (this.Lives <= 0)
                this.isDeath = true;
        }
    }
    
    removePowerUpDiv(){
        //No hacer nada, esto es para los enemigos
    }

    respawnPlayer(){
        var respawn = Singleton.getRandomUnobstructedRespawnPlayer();

        this.TankModel.position.x = respawn.position.x;
        this.TankModel.position.z = respawn.position.z;

        this.TankUpParticleSystem.position.x = 500;
        this.TankUpParticleSystem.position.z = 500;

        this.TankModel.rotation.y = THREE.Math.degToRad(respawn.rotationY);

        this.setPowerUp(powerUpMode.INMUNIDAD);
        this.TimePowerUp = 3;
    }

    updateLabelLives(){
        //No hacer nada, esto es para los enemigos
    }

    setPowerUp(Mode){
        //No hacer nada, esto es para los enemigos
    }

    isAlive(){
        if (this.Lives > 0) 
            return true;
        else 
            return false;
    }

    setTankModel(TankModel, position, rotationY) {
        this.TankModel = TankModel;

        this.TankModel.position.x = position.x;
        this.TankModel.position.z = position.z;

        this.TankModel.rotation.y = THREE.Math.degToRad(rotationY);

        this.isReady = true

        this.initParticle();
    }

    
    initParticle(){
        var particleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 2,
            map: THREE.ImageUtils.loadTexture(
               "/resources/fire.png"
             ),
             blending: THREE.AdditiveBlending,
             transparent: true
        });
        
        var particleCount = 1000;
        var particles = new THREE.Geometry();

        // var particles = new THREE.BufferGeometry();
        // particles.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
        // particles.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
        // particles.setAttribute('colour', new THREE.Float32BufferAttribute([], 4));
        // particles.setAttribute('angle', new THREE.Float32BufferAttribute([], 1));
        
        for (var p = 0; p < particleCount; p++) {
            var pX = 0, pY = 0, pZ = 0;

            pX = this.getRandomArbitrary(-0.8, 0.8);
            pY = this.getRandomArbitrary(-0.8, 0.8);
            pZ = this.getRandomArbitrary(-0.8, 0.8);

            var particle = new THREE.Vector3(pX, pY, pZ);
        
            particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
            particles.vertices.push(particle);
        }

        var particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.sortParticles = true;

        this.TankUpParticleSystem = particleSystem;
        this.TankUpParticleSystem.scale.x = 3
        this.TankUpParticleSystem.scale.y = 3
        this.TankUpParticleSystem.scale.z = 3
        this.TankUpParticleSystem.material.opacity = 10 ;

        Singleton.getScene().add(this.TankUpParticleSystem)

        this.TankUpParticleSystem.position.x = 500;
        this.TankUpParticleSystem.position.z = 500;
        // this.TankModel.position.x = position.x;
        // this.TankModel.position.z = position.z;
    }

    getTankModel() {
        return this.TankModel;
    }

    getTankCollision(){
        return this.TankCollision;
    }

    
    keepRotation360(){
        if (THREE.Math.radToDeg(this.TankModel.rotation.y) >= 360)
            this.TankModel.rotation.y += THREE.Math.degToRad(-360.0);

        if (THREE.Math.radToDeg(this.TankModel.rotation.y) < 0)
            this.TankModel.rotation.y += THREE.Math.degToRad(360.0);
    }

    hasInmunity(){
        if (this.PowerUpTaken == powerUpMode.INMUNIDAD)
            return true;
        else
            return false;
    }

}


export { TankClass };