/* Copyright (c) 2020 AutomaCoin*/

import './app/store';
import 'alpinejs';
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
