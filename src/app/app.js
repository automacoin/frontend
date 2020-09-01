/* Copyright (c) 2020 AutomaCoin*/

/* Eventually this mocked delay will be deleted. It's a showcase for the PageLoader*/
window.addEventListener('load', function () {
    setTimeout(() => document.querySelector('#pageloader').classList.remove("is-active"), 2500);
});

console.log('Hello from Automacoin Client!');
