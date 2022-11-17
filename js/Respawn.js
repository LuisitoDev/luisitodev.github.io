import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
//import Singleton from "./Singleton.js";


class Respawn {
    position;
    rotationY;

    constructor(pPosition, RotationY){
        this.position = new THREE.Vector3(pPosition.x, pPosition.y, pPosition.z)
        this.rotationY = RotationY
    }

}



export { Respawn };