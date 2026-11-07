

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

window.onload = () => {
    const div = document.createElement('div')
    div.classList.add('mainContaner')
    // div.style.display = 'flex'
    // div.style.flexDirection = 'column'
    
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

function createImageRow(urls, title) {
    const row = document.createElement('div')
    row.classList.add('rowImg')

    // const titleEl = document.createElement('h2')
    // titleEl.textContent = title
    // row.append(titleEl)

    const imgContainer = document.createElement('div')
    imgContainer.classList.add('imgContainer')
    // imgContainer.style.display = 'flex'
    // imgContainer.style.gap = '10px'
    // imgContainer.style.flexWrap = 'wrap'

    urls.forEach(url => {
        const img = document.createElement('img')
        img.classList.add('img')

        img.src = url
        img.title = title

        // img.style.width = '300px'
        // img.style.height = '200px'
        // img.style.objectFit = 'cover'
        // img.style.borderRadius = '8px'
        imgContainer.append(img)

    })

    row.append(imgContainer)
    return row
}