const root = document.querySelector(':root');
const btn = document.getElementById("theme-switcher");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

const activateLight = () => {
    sun.style.display = '';
    moon.style.display = 'none'
    root.className = 'light'
}

const activateDark = () => {
    sun.style.display = 'none';
    moon.style.display = ''
    root.className = 'dark'
}

if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    activateDark()
} else {
    activateLight()
}

function switchTheme() {
    if (root.className == "dark") {
        activateLight();
    } else {
        activateDark();
    }
}

btn.addEventListener("click", switchTheme);