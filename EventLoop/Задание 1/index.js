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

// Функция имитирующая запрос 
function loadCatImages() {
    return new Promise((resolve) => {
        const randomDelay = Math.floor(Math.random()*3000) + 2000
        setTimeout(() => {
            resolve(catImages)
        }, randomDelay)
    })
}

// Функция имитирующая запрос 
function loadDogImages() {
    return new Promise((resolve) => {
        const randomDelay = Math.floor(Math.random()*3000) + 2000
        setTimeout(() => {
            resolve(dogImages)
        }, randomDelay)
    })
}

// Функция обработки промиса
window.onload = () => {
    const div = document.createElement('div')
    div.classList.add('mainContaner')
    
    document.body.append(div)

    const catPromise = loadCatImages()

    catPromise
        .then((cats) => {

            const catRow = createImageRow(cats, 'Коты')
            div.append(catRow)            
        })
        .catch(err => console.error('Ошибка загрузки изображений:', err))
    
    const dogPromise = loadDogImages()

    dogPromise
        .then((dogs) => {

            const dogRow = createImageRow(dogs, 'Собаки')
            div.append(dogRow)            
        })
        .catch(err => console.error('Ошибка загрузки изображений:', err)) 
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