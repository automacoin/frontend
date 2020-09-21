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
scene.background = new THREE.Color(0xF39DAE);
var camera = new THREE.PerspectiveCamera(45, 315 / 200, 1, 1000);

var renderer = new THREE.WebGLRenderer({ canvas: artifactCanvas });
renderer.setSize(315, 220);

var geometry = new THREE.CylinderGeometry(5, 5, .3, 100);
var material = new THREE.MeshBasicMaterial({ color: 0x686868 });
var cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

camera.position.z = 20;

var id;
var animate = function () {
    id = requestAnimationFrame(animate);

    cylinder.rotation.x += 0.01;
    cylinder.rotation.z += 0.01;

    renderer.render(scene, camera);
};

animate();
