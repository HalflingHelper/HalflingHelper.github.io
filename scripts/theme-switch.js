const root = document.querySelector(':root');
const btn = document.getElementById("theme-switcher");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

const activateLight = () => {
    moon.style.display = '';
    sun.style.display = 'none'
    root.className = 'light'
}

const activateDark = () => {
    moon.style.display = 'none';
    sun.style.display = ''
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