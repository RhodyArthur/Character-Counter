const themeEl = document.querySelector('.theme-switcher');
const body = document.querySelector('body');
const sunEl = document.querySelector('.sun');
const moonEl = document.querySelector('.moon');


themeEl.addEventListener('click', toggleTheme)

function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme')
        sunEl.classList.add('hidden')
        moonEl.classList.remove('hidden')
    }
    else {
        body.classList.add('dark-theme')
        sunEl.classList.remove('hidden');
        moonEl.classList.add('hidden');
    }
}