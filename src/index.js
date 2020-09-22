/* Copyright (c) 2020 AutomaCoin*/

import './app/store';
import 'alpinejs';
import * as THREE from 'three';
import { dashboardComponent, userProfileComponent, optionsComponent } from './app/app';

document.querySelector("#poweron").addEventListener("click", function (event) {
    event.preventDefault();
}, false);

/* Eventually this mocked delay will be deleted. It's a showcase for the PageLoader*/
window.addEventListener('load', function () {
    setTimeout(() => {
        document.querySelector('#pageloader').classList.remove("is-active")
    }, 1000);
});

/* These are all components of the application */
window.dashboardComponent = dashboardComponent;
window.userProfileComponent = userProfileComponent;
window.optionsComponent = optionsComponent;

var scene = new THREE.Scene();
//scene.background = new THREE.Color(0xF39DAE);
var camera = new THREE.PerspectiveCamera(40, 310 / 200, 1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true, canvas: artifactCanvas });
renderer.setSize(310, 200);

// Adding ambient lighting
scene.add(new THREE.AmbientLight(0xffffff, 1));

// Left point light
const pointLightLeft = new THREE.PointLight(0xff4422, .5);
pointLightLeft.position.set(-1, -1, 3);
scene.add(pointLightLeft);

// Right point light
const pointLightRight = new THREE.PointLight(0x44ff88, .5);
pointLightRight.position.set(1, 2, 3);
scene.add(pointLightRight);

// Top point light
const pointLightTop = new THREE.PointLight(0xdd3311, .5);
pointLightTop.position.set(0, 3, 2);
scene.add(pointLightTop);

THREE.ImageUtils.crossOrigin = '';
// IMPORTANT: This next line defines the texture of your coin. I didn't include the Minecraft texture (for copyright reasons) You should replace the url inside '.load(...)' with the path to your own image.
const textureCirc = new THREE.TextureLoader().load("assets/images/circumference.jpg");
textureCirc.wrapS = THREE.RepeatWrapping;//repeat texture horizontally
textureCirc.repeat.set(30, 0);//repeat 20x
const textureHeads = new THREE.TextureLoader().load("assets/images/goldcoin.png");
const textureTails = new THREE.TextureLoader().load("assets/images/silvercoin.png");
const metalness = 0.5;
const roughness = 0.2;


var geometry = new THREE.CylinderGeometry(7, 7, .8 , 100);

var materials = [
    new THREE.MeshStandardMaterial({
        //Circumference
        map: textureCirc,
        metalness: metalness,
        roughness: roughness
    }),
    //1st side
    new THREE.MeshStandardMaterial({
        map: textureHeads,
        metalness: metalness,
        roughness: roughness
    }),
    //2nd side
    new THREE.MeshStandardMaterial({
        map: textureTails,
        metalness: metalness,
        roughness: roughness
    })
];

var cylinder = new THREE.Mesh(geometry, materials);
scene.add(cylinder);

camera.position.z = 20;

var id;
var animate = function () {
    id = requestAnimationFrame(animate);


    cylinder.rotation.y += 0.01;
    cylinder.rotation.x += 0.01;

    renderer.render(scene, camera);
};

animate();
