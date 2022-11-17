import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {
    OBJLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/OBJLoader.js';
import {
    MTLLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/MTLLoader.js';

import {
    FBXLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

import Singleton from "./Singleton.js";

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
    var mtlLoader = new MTLLoader();
    mtlLoader.setPath(path);
    mtlLoader.load(mtlFile, (materials) => {

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objFile, (object) => {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            onLoadCallback(object);
        });

    });
}


function LoadFBX(fbxFile, onLoadCallback) {

    const loader = new FBXLoader();
    loader.load(fbxFile, (fbx) => {
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        onLoadCallback(fbx);
    });
}

function LoadFBXWithAnimation(fbxFile, fbxFileAnim, speed, onLoadCallback) {
    
    const loader = new FBXLoader();
    loader.load(fbxFile, (object) => {

        // object.rotation.y = THREE.Math.degToRad(-90);

        const anim = new FBXLoader();
        anim.load(fbxFileAnim, (anim) => {
            object.mixer = new THREE.AnimationMixer(object);
            Singleton.getMixers().push(object.mixer);
            object.mixer.timeScale = speed;
            Singleton.setAction1(object.mixer.clipAction(anim.animations[0]));
            Singleton.getAction1().play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            onLoadCallback(object);
        });

    });
     
}


/*

function LoadFBXWithAnimation(fbxFile, fbxFileAnim, onLoadCallback) {
    
    const loader = new FBXLoader();
    loader.load(fbxFile, (object) => {

        object.rotation.y = THREE.Math.degToRad(-90);

        const anim = new FBXLoader();
        anim.load(fbxFileAnim, (anim) => {
            object.mixer = new THREE.AnimationMixer(object);
            Singleton.getMixers().push(object.mixer);
            
            Singleton.setAction1(object.mixer.clipAction(anim.animations[0]));
            Singleton.setAction2(object.mixer.clipAction(anim.animations[1]));
            Singleton.getAction1().play();
            Singleton.getAction2().play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            onLoadCallback(object);
        });

    });
     
}



function LoadFBXWithAnimation(fbxFile, onLoadCallback) {
    
    const loader = new FBXLoader();
    loader.load(fbxFile, (object) => {

        const anim = new FBXLoader();
        anim.load(fbxFileAnim, (anim) => {
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);


            action = object.mixer.clipAction(anim.animations[0]);
            action2 = object.mixer.clipAction(anim.animations[1]);
            action.play();
            action2.play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            onLoadCallback(object);
        });

    });
     
}


*/



export {
    loadOBJWithMTL,
    LoadFBX,
    LoadFBXWithAnimation
};