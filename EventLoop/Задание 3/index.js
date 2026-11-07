const catImages = [
    './img/cat1.jpg',
    './img/cat2.jpg',
    './img/cat3.jpg'    
]

const dogImages = [
    './img/dog1.jpg',
    './img/dog2.jpeg',
    './img/dog3.jpg',    
]

// Мок-функция, функция имитирующая запрос
function loadCatImages() {
    return new Promise((resolve) => {
        // Вычисление времени в мок-функции, рандомное время, от 2 до 5 с
        const randomDelay = Math.floor(Math.random()*3000) + 2000
        // Вызов функции progressBar
        const progress1 = progress
        progress1(randomDelay/1000, 'progressEl1', 'timerEl1')

        setTimeout(() => {
            resolve(catImages)            
        }, randomDelay)
    })
}

// Мок-функция, функция имитирующая запрос 
function loadDogImages(randomDelay) {
    return new Promise((resolve) => {
        
        setTimeout(() => {
            resolve(dogImages)
        }, randomDelay)
    })
}

// Функция отрисовки картинок
function createImageRow(urls, title) {
    const row = document.createElement('div')
    row.classList.add('rowImg')

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('imgContainer')

    urls.forEach(url => {
        const img = document.createElement('img')
        img.classList.add('img')

        img.src = url
        img.title = title

        imgContainer.append(img)

    })

    row.append(imgContainer)
    return row
}


window.onload = () => {
    startCats()     
}

// Функция обработки промиса
function startCats() {
    const mainContaner = document.createElement('div')
    mainContaner.classList.add('mainContaner')
    mainContaner.id = 'mainContaner'
    const progressEl1 = getProgressEl('progressEl1', 'timerEl1')
    mainContaner.append(progressEl1)
    document.body.append(mainContaner)    
    
    const catPromise = loadCatImages()    

    catPromise
        .then((cats) => {

            const catRow = createImageRow(cats, 'Коты')
            mainContaner.append(catRow)            
        })
        .catch(err => console.error('Ошибка загрузки изображений:', err))
        .finally(()=> {
            startDogs()           
        }) 
}

// Функция обработки промиса 
function startDogs() {   
    
    const mainContaner = document.getElementById('mainContaner')    
    const progressEl2 = getProgressEl('progressEl2', 'timerEl2')
    mainContaner.append(progressEl2)

    const randomDelay = Math.floor(Math.random()*3000) + 2000
    const progress2 = progress
    progress2(randomDelay/1000, 'progressEl2', 'timerEl2')
    
    const dogPromise = loadDogImages(randomDelay)

    dogPromise
        .then((dogs) => {

            const dogRow = createImageRow(dogs, 'Собаки')
            mainContaner.append(dogRow)            
        })
        .catch(err => console.error('Ошибка загрузки изображений:', err))

}

// Функция отрисовки элементов прогресса
function getProgressEl(idProgress, idTimer) {
    const container = document.createElement('div')
    container.classList.add('container')

    const progressBar = document.createElement('div')
    progressBar.classList.add('progressBar')
    progressBar.id = 'progress-bar'

    const progressEl = document.createElement('div')
    progressEl.classList.add('progressEl')
    progressEl.id = idProgress

    const timerDisplay = document.createElement('div')
    timerDisplay.classList.add('timerEl')
    timerDisplay.id = idTimer

    progressBar.append(progressEl)
    container.append(progressBar, timerDisplay)
    
    return container    
    
}

// Функция отрисовки прогресса
function progress(time, progressId, timerId) {

    if (time < 2) {
        time = 2
    }

    const progressEl = document.getElementById(progressId)
    const timerDisplay = document.getElementById(timerId)

    // Сбрасываем начальное состояние
    progressEl.style.transition = 'none'
    progressEl.style.transform = 'scaleX(0)'
    timerDisplay.textContent = '0 c'

    void progressEl.offsetWidth

    // Устанавливаем плавную анимацию
    progressEl.style.transition = `transform ${time}s linear`
    progressEl.style.transform = 'scaleX(1)'
  

    let secondPassed = 0

    setTimeout(function go() {
        secondPassed++
        timerDisplay.textContent = `${secondPassed} c`
        if(secondPassed < time) {            
            setTimeout(go, 1000)            
        }
    }, 1000)
}
