import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import Singleton from "./Singleton.js";

var reproducirParticulas = false;

var particleSystem;
var particleCount = 50;
var particles;
var reproducirParticulas = false;
var yaTerminamosLaClase = false;
var duracionParticula = 2;
var contadorAnim = 0;

function showParticle(poweUps, deltaTime){
    let scene = Singleton.getScene();

    if (reproducirParticulas == false) {
        reproducirParticulas = true;
        spawnParticulas(poweUps.position);
    }

    if (reproducirParticulas) {
    
        particleSystem.rotation.y += 0.05;
        particleSystem.material.opacity += 0.01;
    
        if (contadorAnim >= duracionParticula) {
            contadorAnim += deltaTime
            contadorAnim = 0;
            reproducirParticulas = false;
            scene.remove(particleSystem);
        }
    }
}

function spawnParticulas(target) {
    let scene = Singleton.getScene();
    // create the particle variables

    particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 1,
        map: THREE.ImageUtils.loadTexture(
           "resources/us.png"
         ),
         blending: THREE.AdditiveBlending,
         transparent: true
    });



    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

      // create a particle with random
      // position values, -250 -> 250
      var pX = getRandomArbitrary(target.x - 1, target.x + 1),
          pY = getRandomArbitrary(target.y - 1, target.y + 1),
          pZ = getRandomArbitrary(target.z - 1, target.z + 1),
          particle = new THREE.Vector3(pX, pY, pZ)

         // create a velocity vector
      particle.velocity = new THREE.Vector3(0, -Math.random(), 0);

      particles.vertices.push(particle);
    }

    // create the particle system
    particleSystem = new THREE.Points(particles,pMaterial);

    particleSystem.sortParticles = true;

    // add it to the scene
    scene.add(particleSystem);
    particleSystem.material.opacity = 0;


}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export { showParticle, spawnParticulas };