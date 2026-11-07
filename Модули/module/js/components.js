// Функция создания карточки
function getCardEl() {
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')    
    return cardEl
}

// Функция создания контейнера для элементов и центрирования внутри карточки
function getCentreWrapEl() {
    const wrapCentreEl = document.createElement('div')
    wrapCentreEl.classList.add('wrapCentre')    
    return wrapCentreEl
}

// Функция создания заголовка h1
function getTitleEl(text) {
    const titleEl = document.createElement('h1')
    titleEl.classList.add('mainTitle')
    titleEl.textContent = text
    return titleEl
}

// Функция создания кнопки
function getButtonEl(text) {
    const buttonEl = document.createElement('button')
    buttonEl.classList.add('button')
    buttonEl.textContent = text
    return buttonEl
}

// Функция создания контейнера для объединения в одну строку h1 и кнопки добавить
function getWrapEl() {
    const wrapEl = document.createElement('div')
    wrapEl.classList.add('wrap')    
    return wrapEl
}

// Функция создания формы
function getFormEl() {
    const formEl = document.createElement('form')
    formEl.classList.add('form')
    return formEl
}

// Функция создания инпута
function getInputEl(type, name, placeholder, required = '') {
    const inputEl = document.createElement('input')
    inputEl.type = type
    inputEl.name = name
    inputEl.placeholder = placeholder 
    inputEl.required = required   
    inputEl.classList.add('textField')
    return inputEl
}

// Функция для получения контейнера в которую заносится блок кода для отображения
function getMainWrap() {
    const app = document.getElementById('app')
    app.innerHTML = ''
    const card = getCardEl()
    app.append(card)
    const wrapCentreEl = getCentreWrapEl()
    card.append(wrapCentreEl)
    return wrapCentreEl
}

// Функция создания элемента таблицы
function getTableEl() {
    const table = document.createElement('table')
    table.classList.add('table')
    return table
}

// Функция создания loader
function getLoaderEl() {
    const loaderEl = document.createElement('div')
    loaderEl.classList.add('loader')

    for(let i=1; i<=4; i++) {
        const divEl = document.createElement('div')        
        loaderEl.append(divEl)
    }

    return loaderEl
}

export {
    getCardEl,
    getCentreWrapEl,
    getTitleEl,
    getButtonEl,
    getWrapEl,
    getFormEl,
    getInputEl,
    getMainWrap,
    getTableEl,
    getLoaderEl
}
