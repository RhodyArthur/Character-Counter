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
const densityEl = document.querySelector('.letter-density');
const defaultEl = document.querySelector('.default-text');

const densityContainer = document.createElement('div');
densityContainer.classList.add('chart-container');
densityEl.appendChild(densityContainer);
let isExpanded = false;




themeEl.addEventListener('click', toggleTheme);
textEl.addEventListener('beforeinput', handleCharacterLimit);
textEl.addEventListener('input', updateCount);
excludingSpacesEl.addEventListener('change', updateCount);
limitEl.addEventListener('input', handleCharacterLimit)
limitCheckbox.addEventListener('change', handleCharacterLimit);

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
    const textContent = text.value;
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
    characterCountEl.textContent =  String(count).padStart(2, "0");
    

    const wordCount = getWordCount(textEl)
    wordCountEl.textContent = String(wordCount).padStart(2, "0");

    const sentenceCount = getSentenceCount(textEl)
    sentenceCountEl.textContent = String(sentenceCount).padStart(2, "0");

    estimatedTimeEl.textContent = `Approx. reading time: < ${getReadingTime(textEl)} minute(s)`

    updateChart()
}


function handleCharacterLimit(e=null) {
    const characterLimit = parseInt(limitEl.value);
    const currentCount = getCharacterCount(textEl);

    limitEl.classList.toggle('visibility', !limitCheckbox.checked);

    if (!limitCheckbox.checked) {
        textEl.classList.remove('warning');
        limitWarningEl.classList.add('hidden');
        return;
    }

    if (isNaN(characterLimit)) {
        limitWarningEl.classList.add('hidden');
        return;
    }

    if (e && e.type === 'beforeinput' && currentCount > characterLimit && e.inputType.startsWith('insert')) {
        e.preventDefault();
        textEl.classList.add('warning');
        warningTextEl.textContent = `Limit reached! Your text exceeds ${characterLimit} characters.`;
        limitWarningEl.classList.remove('hidden');
        return;
    }

    if (currentCount > characterLimit) {
        textEl.classList.add('warning');
        warningTextEl.textContent = `Limit reached! Your text exceeds ${characterLimit} characters.`;
        limitWarningEl.classList.remove('hidden');

    } else {
        textEl.classList.remove('warning');
        limitWarningEl.classList.add('hidden');
    }
}


function getCharFrequency(text) {
    const textContent = text.value;
    let freq = {};

    for (let char of textContent) {
        if (char !== ' ') {
            freq[char] = (freq[char] || 0) + 1
        }
    }
    return freq;
}

function getCharacterProgress(value, text) {
    return (value/getCharacterCount(text) * 100).toFixed(2)
}

function updateChart() {
    const freq = getCharFrequency(textEl);
    const entries = Object.entries(freq);
    
    if (entries.length > 0) {
        defaultEl.classList.add('hidden')

        let html = ``

        const visibleEntries = isExpanded ? entries : entries.slice(0,5)

        for (let [key, value] of visibleEntries) {

            html += 
            `
                <div class="chart">
                    <p class="char">${key.toUpperCase()}</p>

                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${getCharacterProgress(value, textEl)}"></div>
                    </div>

                    <div class="value">
                        <p>${value} </p>
                        <span>(${getCharacterProgress(value, textEl)}%)</span>
                    </div>
                </div>
            `
        }

        if (entries.length > 5) {

            html += ` <div class="toggle-button">
                        <button id="toggle-chart">${isExpanded ? 'See less' : 'See more'}</button>
                      </div>`
        }
        
        densityContainer.innerHTML = html

        const toggleChartBtn = document.getElementById('toggle-chart');
        if (toggleChartBtn) {

            toggleChartBtn.addEventListener('click', () => {
                isExpanded = !isExpanded
                updateChart()
            })
        }
        
    }
    else {
        defaultEl.classList.remove('hidden')
        densityContainer.innerHTML = ''
    }
}