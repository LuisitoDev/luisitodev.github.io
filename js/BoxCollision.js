import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import Singleton from "./Singleton.js";

const collisionsVisible = false;

class BoxCollision {
    BoxModel;

    constructor(vBoxSize, vBoxPosition = new THREE.Vector3(0, 0, 0), vColor = new THREE.Vector3(1.0, 0.3, 0.3)) {
        var Boxgeometry = new THREE.BoxGeometry(vBoxSize.x, vBoxSize.y, vBoxSize.z);

        var materialBoxGeometry = new THREE.MeshLambertMaterial({
            color: new THREE.Color(vColor.x, vColor.y, vColor.z)
        });

        this.BoxModel = new THREE.Mesh(Boxgeometry, materialBoxGeometry);

        this.BoxModel.geometry.computeBoundingBox();
        this.BoxModel.visible = collisionsVisible;
        Singleton.getScene().add(this.BoxModel);

        this.updatePosition(vBoxPosition)
    }


    detectCollisionBoxes(pBoxCollision) {
        this.BoxModel.updateMatrixWorld();

        pBoxCollision.getBoxModel().geometry.computeBoundingBox();
        pBoxCollision.getBoxModel().updateMatrixWorld();

        var box1 = this.BoxModel.geometry.boundingBox.clone();
        box1.applyMatrix4(this.BoxModel.matrixWorld);

        var box2 = pBoxCollision.getBoxModel().geometry.boundingBox.clone();
        box2.applyMatrix4(pBoxCollision.getBoxModel().matrixWorld);

        return this.intersectsBoxXZ(box1, box2);
    }

    intersectsBoxXZ(box1, box2) {

        return box1.max.x < box2.min.x || box1.min.x > box2.max.x ||
            box1.max.z < box2.min.z || box1.min.z > box2.max.z ? false : true;

    }


    intersectsBoxXYZ(box1, box2) {

        return box1.max.x < box2.min.x || box1.min.x > box2.max.x ||
            box1.max.y < box2.min.y || box1.min.y > box2.max.y ||
            box1.max.z < box2.min.z || box1.min.z > box2.max.z ? false : true;

    }

    getBoxModel(){
        return this.BoxModel;
    }

    updatePosition(vBoxPosition){
        this.BoxModel.position.set(vBoxPosition.x, vBoxPosition.y, vBoxPosition.z);
    }

    removeFromScene(){
        this.BoxModel.geometry.dispose();
        this.BoxModel.material.dispose();      

        Singleton.getScene().remove(this.BoxModel)
    }
    
}


export {
    BoxCollision
};