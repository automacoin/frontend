/* Copyright (c) 2020 AutomaCoin*/

import './styles.scss';
import 'alpinejs';
import './app/app';

/* Eventually this mocked delay will be deleted. It's a showcase for the PageLoader*/
window.addEventListener('load', function () {
    setTimeout(() => document.querySelector('#pageloader').classList.remove("is-active"), 2500);
});

