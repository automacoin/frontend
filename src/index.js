/* Copyright (c) 2020 AutomaCoin*/

import 'alpinejs';
import { dashboardComponent, userProfileComponent } from './app/app';

/* These are all components of the application */
window.dashboardComponent = dashboardComponent;
window.userProfileComponent = userProfileComponent;

/* Eventually this mocked delay will be deleted. It's a showcase for the PageLoader*/
window.addEventListener('load', function () {
    setTimeout(() => document.querySelector('#pageloader').classList.remove("is-active"), 2500);
});