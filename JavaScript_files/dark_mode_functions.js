import { setInLocalStorage, getFromLocalStorage } from "./local_storage_functions.js";
import {THEME_BTN_ID} from "./constants.js";


const themeBtn = document.getElementById(THEME_BTN_ID);
const body = document.body;
let darkMode = getFromLocalStorage('darkMode');

export let initializeDarkMode = function () {
    applyMode();
    themeBtn.addEventListener('click', (event) => {
        switchMode();
    });
};

export let switchMode = function () {
    darkMode = !darkMode;
    setInLocalStorage('darkMode', darkMode);
    applyMode();
};

let applyMode = function () {
    body.setAttribute('class', '');
    themeBtn.innerHTML = `<ion-icon name="moon-outline" class="button-icon"></ion-icon>Dark Mode`;
    if (darkMode) {
        body.classList.toggle('Dark-mode');
        themeBtn.innerHTML = `<ion-icon name="moon-outline" class="button-icon"></ion-icon>Light Mode`;
    }
};
