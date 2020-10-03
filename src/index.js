/* Copyright (c) 2020 AutomaCoin*/

import './app/store';
import 'alpinejs';
import { coin } from './app/coin';
import engine from 'workerize-loader!./app/engine';
import harvester from 'workerize-loader!./app/harvester';
import { dashboardComponent, userProfileComponent, optionsComponent } from './app/app';

document.querySelector("#poweron").addEventListener("click", function (event) {
    event.preventDefault();
}, false);

/* Delay to create the illusion of initialization */
window.addEventListener('load', function () {
    setTimeout(() => {
        document.querySelector('#pageloader').classList.remove("is-active")
    }, 1500);
});

/* instantiate all worker threads here and expose them as objects */
window.harvester = harvester();
window.engine = engine();


/* These are all components of the application */
window.dashboardComponent = dashboardComponent;
window.userProfileComponent = userProfileComponent;
window.optionsComponent = optionsComponent;

/* Initializes the Coin Animation */
const automaCoin = coin(artifactCanvas);
