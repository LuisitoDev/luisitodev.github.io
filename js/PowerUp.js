import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { BoxCollision } from "./BoxCollision.js";
import Singleton from "./Singleton.js";

const powerUpMode = {
    INMUNIDAD: 'INMUNIDAD',
    VELOCIDAD: 'VELOCIDAD',
    DISPARO: 'DISPARO'
}

class PowerUp {
    PowerUpModel;
    PowerUpCollision
    Mode;
    PowerUpParticleMaterial;
    PowerUpParticleSystem;

    constructor(mode, powerUpModel, powerUpParticleMaterial){
        this.Mode = mode;

        this.PowerUpParticleMaterial = powerUpParticleMaterial;
        this.setPowerUpModel(powerUpModel);
        this.hidePowerUp();
    }

    setPowerUpModel(PowerUpModel) {
        this.PowerUpModel = PowerUpModel;

        var vBoxSize = new THREE.Vector3(5,10,5);
        var vBoxPosition = new THREE.Vector3(PowerUpModel.position.x,PowerUpModel.position.y,PowerUpModel.position.z);
        this.PowerUpCollision = new BoxCollision(vBoxSize, vBoxPosition);

        
        this.renderPowerUpParticle();        
    }

    renderPowerUpParticle() {
        var particleCount = 10;
        var particles = new THREE.Geometry();
        
        for (var p = 0; p < particleCount; p++) {
            var pX = this.getRandomArbitrary(this.PowerUpModel.position.x - 1.2, this.PowerUpModel.position.x + 1.2);
            var pY = this.getRandomArbitrary(this.PowerUpModel.position.y - 1.2, this.PowerUpModel.position.y + 1.2);
            var pZ = this.getRandomArbitrary(this.PowerUpModel.position.z - 1.2, this.PowerUpModel.position.z + 1.2);
            var particle = new THREE.Vector3(pX, pY, pZ);
        
            particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
            particles.vertices.push(particle);
        }
    
        var particleSystem = new THREE.Points(particles,this.PowerUpParticleMaterial);
        particleSystem.sortParticles = true;

        this.PowerUpParticleSystem = particleSystem;
        this.PowerUpParticleSystem.scale.x = 3
        this.PowerUpParticleSystem.scale.y = 1
        this.PowerUpParticleSystem.scale.z = 3
        this.PowerUpParticleSystem.material.opacity = 2;

        Singleton.getScene().add(this.PowerUpParticleSystem)
    }

    updateValues(deltaTime){
        if (this.PowerUpParticleSystem != undefined) {

            this.PowerUpParticleSystem.rotation.y += 0.05;
        }
    }

    getPowerUpModel() {
        return this.PowerUpModel;
    }

    getPowerUpCollision(){
        return this.PowerUpCollision;
    }

    getMode(){
        return this.Mode;
    }

    hidePowerUp(){
        this.PowerUpModel.position.z = 2000
        this.PowerUpCollision.updatePosition(this.PowerUpModel.position)
        
        this.PowerUpParticleSystem.position.z = 2000
    }

    respawnPowerUp(respawn){
        
        
            sonidoPowerUpAparece.play();

        this.PowerUpModel.position.x = respawn.position.x;
        this.PowerUpModel.position.z = respawn.position.z;

        this.PowerUpParticleSystem.position.x = respawn.position.x;
        this.PowerUpParticleSystem.position.z = respawn.position.z;
        

        // this.PowerUpModel.rotation.y = THREE.Math.degToRad(respawn.rotationY);

        this.PowerUpCollision.updatePosition(this.PowerUpModel.position)
    }
    
    removeFromScene(){

        for (let index = 0; index < this.PowerUpModel.children.length; index++) {
            const elementModel = this.PowerUpModel.children[index];

            elementModel.geometry.dispose();
            elementModel.material.dispose(); 
        }

        Singleton.getScene().remove(this.PowerUpModel)

        this.PowerUpCollision.removeFromScene()
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


}



export { PowerUp, powerUpMode };