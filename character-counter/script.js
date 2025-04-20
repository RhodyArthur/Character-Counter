const themeEl = document.querySelector('.theme-switcher');
const body = document.querySelector('body');
const sunEl = document.querySelector('.sun');
const moonEl = document.querySelector('.moon');
const textEl = document.getElementById('message');
const characterCountEl = document.getElementById('character-count');
const wordCountEl = document.getElementById('word-count');
const sentenceCountEl = document.getElementById('sentence-count');
const excludingSpacesEl = document.getElementById('exclude-spaces');
const limitCheckbox = document.getElementById('character-limit');
const limitEl = document.getElementById('limit');
const limitWarningEl = document.getElementById('limit-warning');
const warningTextEl = document.getElementById('warning-text');
const estimatedTimeEl = document.querySelector('.approx-time');



themeEl.addEventListener('click', toggleTheme);
textEl.addEventListener('input', updateCount);
excludingSpacesEl.addEventListener('change', updateCount);
limitEl.addEventListener('input', characterLimit)
limitCheckbox.addEventListener('change', characterLimit);

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

function getCharacterCount(text) {
    const textContent = text.value || text;
    return excludingSpacesEl.checked ?  textContent.replace(/\s/g, '').length : textContent.length;
}

function getWordCount(text) {
    const textContent = text.value;
    return textContent.trim().split(/\s+/).filter(word => word !== '').length;
}

function getSentenceCount(text) {
    const textContent = text.value;
    return textContent.trim().split(/[.!?]+/).filter(sentence => sentence.trim() !== '').length;
}


function getReadingTime(text) {
    const wordsPerMin = 100;
    const estimatedTime = getWordCount(text) / wordsPerMin;
    return estimatedTime;
}

function updateCount() {
    const count = getCharacterCount(textEl);
    characterCountEl.textContent =  count < 10 ? `0${count}`: count;

    const wordCount = getWordCount(textEl)
    wordCountEl.textContent = wordCount < 10 ? `0${wordCount}` : wordCount;

    const sentenceCount = getSentenceCount(textEl)
    sentenceCountEl.textContent = sentenceCount < 10 ? `0${sentenceCount}` : sentenceCount;

    estimatedTimeEl.textContent = `Approx. reading time: < ${getReadingTime(textEl)} minute(s)`

    characterLimit()
}



function characterLimit() {
    limitEl.classList.toggle('visibility', !limitCheckbox.checked);

    if (!limitCheckbox.checked) {
        textEl.classList.remove('warning');
        limitWarningEl.classList.add('hidden');
        return;
    }

    const characterLimit = parseInt(limitEl.value);
    if (isNaN(characterLimit)) {
        limitWarningEl.classList.add('hidden');
        return;
    }

    const currentCount = getCharacterCount(textEl);

    if (currentCount > characterLimit) {
        textEl.readOnly = true;
        textEl.classList.add('warning');
        warningTextEl.textContent = `Limit reached! Your text exceeds ${characterLimit} characters.`;
        limitWarningEl.classList.remove('hidden');

    } else {
        textEl.readOnly = false;
        textEl.classList.remove('warning');
        limitWarningEl.classList.add('hidden');
    }
}

