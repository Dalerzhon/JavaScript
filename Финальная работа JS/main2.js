

window.addEventListener('DOMContentLoaded', () => {
    
    
   
});

const burgerBtnOpen = document.querySelector('.header__catalog-btn')
const showCatalog = document.querySelector('.main-menu')
const burgerBtnClose = document.querySelector('.main-menu__close')

// Открытие бургера, каталога
burgerBtnOpen.addEventListener('click', function(){    
    showCatalog.classList.add('main-menu--active')
})

// Закрытие бургера, каталога
burgerBtnClose.addEventListener('click', function(){

    if(showCatalog.classList.contains('main-menu--active')){
        showCatalog.classList.remove('main-menu--active')
    }
})

// Открытие и закрытие локации

const locationCity = document.querySelector('.location__city')
// Название выбранного города
const locationCityName = document.querySelector('.location__city-name')
const locationSublist = document.querySelector('.location__sublist')

locationCity.addEventListener('click', function(){
    locationCity.classList.toggle('location__city--active')
})

locationSublist.addEventListener('click', function(e){
    
    const link = e.target.closest('.location__sublink')

    if(!link){
        return
    }

    const selectedCity = link.textContent.trim()
    
    if(locationCityName) {
        locationCityName.textContent = selectedCity        
        locationCity.classList.remove('location__city--active')
    }

})

// Запрос на сервер для получения данных, кешируем productsPromise
let productsPromise = null
function loadProducts() {
    if(!productsPromise) {
        productsPromise = fetch('./data/data.json')
            .then(res => res.json())        
    }
    return productsPromise
}

async function func1() {
    const products = await loadProducts()
    console.log(products)
}
func1()

const cardsPerPage = 6
let currentPage = 1
// Отображение товаров на экране
async function renderProducts(dataProducts) {
    
    let products = dataProducts
    if(!dataProducts){
        products = await loadProducts()
    } 

    const cardsContainer = document.querySelector('.catalog__list')    

    const start = (currentPage - 1) * cardsPerPage
    const end = start + cardsPerPage

    const currentCards = products.slice(start, end)
    cardsContainer.innerHTML = ''

    // const list = document.querySelector('.catalog__list')
    // list.innerHTML = ''
    currentCards.forEach(product => {
        const li = document.createElement('li')
        li.classList.add('catalog__item')
        li.innerHTML = `
            
                <div class="product-card">
                <div class="product-card__visual">
                    <img class="product-card__img" src=${product.image}
                        alt="Изображение товара">
                    <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon" data-id='${product.id}'>
                        <span class="btn__text">В корзину</span>
                        <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                        </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary data-id='${product.id}'">
                        <span class="btn__text">Подробнее</span>
                    </a>
                    </div>
                </div>
                <div class="product-card__info">
                    <h2 class="product-card__title">${product.name}</h2>
                    <span class="product-card__old">
                    <span class="product-card__old-number">${product.price.old}</span>
                    <span class="product-card__old-add">₽</span>
                </span>
                    <span class="product-card__price">
                    <span class="product-card__price-number">${product.price.new}</span>
                    <span class="product-card__price-add">₽</span>
                </span>
                    <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                        <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                        </svg>
                    </button>
                    <div class="tooltip__content">
                        <span class="tooltip__text">Наличие товара по городам:</span>
                        <ul class="tooltip__list">
                        <li class="tooltip__item">
                            <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
                        </li>
                        <li class="tooltip__item">
                            <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
                        </li>
                        <li class="tooltip__item">
                            <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            
        `
        cardsContainer.append(li)
    });   
}
// renderProducts()


// Определяем количество каждого типа, и 
// отображаем количество типов, в соответствующих тегах
async function printCountType() { 
    const products = await loadProducts()
    
    // Типы светильников
    const targetTypes = ['pendant', 'ceiling', 'overhead', 'point', 'nightlights']

    // Объект внутри которого типы и их количество
    const counts = {}

    // Вложение типов в объект, свойств со значением 0
    targetTypes.forEach(type => {
        counts[type] = 0
    })
    // Считаем количество типов, для каждого типа, products - это массив объектов
    products.forEach(product => {
        product.type.forEach(type => {
            if(counts.hasOwnProperty(type)) {                
                counts[type] = counts[type] + 1
            }
        })            
    })
    
    // Отображения количество типов, в соответствующих тегах
    const typesUl = document.querySelector('.catalog-form__list-col')

    Object.keys(counts).forEach(key => {        
        const divList = typesUl.querySelectorAll('div')        
        divList.forEach(div => {            
            if(div.classList.contains(`custom-checkbox--${key}`)) {                
                const span = div.querySelector('span.custom-checkbox__count')
                if(span) {
                    span.textContent = counts[key]
                }
            }
        })
    })     
}
printCountType()


// Единое состояние, фильтров и сортировки
const state = {
    types: [],
    availability: 'all-item',
    sort: 'price-min'
}


// Слушатель на изменение чекбоксов
const ulCheckbox = document.querySelector('.catalog-form__list-col')

ulCheckbox.addEventListener('change', (e)=> {
    if(e.target.type !== 'checkbox'){        
        return
    }

    const value = e.target.value

    // При выполнении условия изменяем state
    if(e.target.checked) {
        state.types.push(value)
    }else {
        state.types = state.types.filter(t => t !==value)
    }
    
    filter()
})

// Слушатель на изменение radio
const ulRadio = document.querySelector('.catalog-form__list-row')

ulRadio.addEventListener('change', (e)=> {
    if(e.target.type !== 'radio') {        
        return
    }

    const value = e.target.value

    // При изменении radio изменяем state
    state.availability = value
    
    filter()
})

// Слушатель на изменение select
const ulSelect = document.querySelector('.catalog__sort-select')

ulSelect.addEventListener('change', (e)=> {   

    const value = e.target.value

    // При изменении select изменяем state
    state.sort = value
    
    filter()
})

// Функция для фильтрации и сортировки, запускается 
// при каждом изменении фильтров и сортировки
async function filter() {
    const getData = await loadProducts()
    let products = getData
    console.log(products)
    if (state.types.length > 0) {
        console.log('jp1')
        products = products.filter(product => product.type.some(t => state.types.includes(t)))
        console.log('jp2')
        
        console.log(products)
    }

    if(state.availability=='instock') {
        products = products.filter(product => Object.values(product.availability).some(t => t > 0))
        console.log(products)
    }

    products.sort((a, b) => {
        if(state.sort==='price-min') {
            return a.price.new - b.price.new
        }
        if(state.sort==='price-max') {
            return b.price.new - a.price.new
        }
        if(state.sort==='rating-max') {
            return b.rating - a.rating
        }
    })
    renderProducts(products) 
}

// Слушатель на кнопку 'Сбросить фильтры'
const resetButton = document.querySelector('.catalog-form__reset')
resetButton.addEventListener('click', function() {
    state.types = []
    state.availability = 'all-item'
    state.sort = ''
    
    filter()
})

// Слушатель на иконку корзина, открывает и закрывает блок при клике
const basketBtn = document.querySelector('.header__user-btn')
basketBtn.addEventListener('click', () => {
    const basketEl = document.querySelector('.basket')
    basketEl.classList.toggle('basket--active')
})

// Слушатель на каталог товаров, при клике на кнопку 'В корзину' 
// товар добавляется в переменную countCard, с которого потом
// происходит отрисовка товаров в корзине с renderBasketProducts
let countCard = []
const addToBasket = document.querySelector('.catalog__list')
addToBasket.addEventListener('click', function(e) {    
    const aEl = e.target.closest('.btn--icon')    
    if(!aEl) {
        return
    }    
    if(aEl) {
        e.preventDefault()
        
        const cartId = aEl.dataset.id
        countCard.push(cartId)
        
        console.log(countCard)        
        
        controlBasketRendering()        
    }    
})

// Функция для контроля и отображения товаров на корзине
function controlBasketRendering() {
    
    const showCountEl = document.querySelector('.header__user-count')
    const basketEmptyBlock = document.querySelector('.basket__empty-block')

    showCountEl.textContent = countCard.length

    if(countCard.length > 0) {
        basketEmptyBlock.classList.add('basket__empty-hidden')        
    }else{
        basketEmptyBlock.classList.remove('basket__empty-hidden')        
    }
    renderBasketProducts()
}


// Отображение добавленных товаров на корзине (данные с переменной countCard)
async function renderBasketProducts() {
    let products = await loadProducts()
    if(!products){
        return
    }
    const basketAddedProducts = products.filter(product => countCard.map(Number).includes(product.id))    
    
    console.log(basketAddedProducts)
    
    const basketListUl = document.querySelector('.basket__list')
    
    basketListUl.innerHTML = ''
    basketAddedProducts.forEach(productBasket => {
        const li = document.createElement('li')
        li.innerHTML = `    
        <li class="basket__item">
        <div class="basket__img">
            <img src=${productBasket.image} alt="Фотография товара" height="60" width="60">
        </div>
        <span class="basket__name">${productBasket.name}</span>
        <span class="basket__price">${productBasket.price.new} руб</span>
        <button class="basket__item-close" type="button" data-id = ${productBasket.id}>
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
        </button>
        </li>     
        `
        basketListUl.append(li)
    })   
}

// Слушатель на кнопку удалить в карточке корзины
const basketItemClose = document.querySelector('.header__basket')
basketItemClose.addEventListener('click', function(e) {
    const deleteProductBasketEl = e.target.closest('.basket__item-close')     

    if(!deleteProductBasketEl) {
        return
    }    
    if(deleteProductBasketEl) {
       
        const cardId = deleteProductBasketEl.dataset.id
        const index = countCard.findIndex(card => card === cardId)

        if(index !== -1) {
            countCard.splice(index, 1)
        }

        controlBasketRendering()              
    }    
})

// Слушатель для аккардеона, открывает и закрывает элементы
const accordeonContainer = document.querySelector('.faq__accordion')
accordeonContainer.addEventListener('click', function(e) {
    const accordionBtn = e.target.closest('.accordion__btn')
    if(!accordionBtn) {
        return
    }    
    if(accordionBtn) {        
        const activeItem = accordeonContainer.querySelector('.accordion__btn--active')
        if(activeItem && activeItem !== accordionBtn) {
            activeItem.classList.remove('accordion__btn--active')
        }

        accordionBtn.classList.toggle('accordion__btn--active')        
    }   
})

// Функция для нахождения и отрисовки товаров дня
async function renderProductsDay() {
    
    let products = await loadProducts()
    if(!products){
        return
    } 
    const productsDay = products.filter(product => product.goodsOfDay===true)
    console.log(productsDay)
    const list = document.querySelector('.day-products__list')
    list.innerHTML = ''
    productsDay.forEach(product => {
        const li = document.createElement('li')
        li.classList.add('day-products__item', 'swiper-slide')

        li.innerHTML = `            
            <div class="product-card product-card--small">
            <div class="product-card__visual">
                <img class="product-card__img" src=${product.image} height="344" width="290"
                    alt="Изображение товара">
                <div class="product-card__more">
                <a href="#" class="product-card__link btn btn--icon">
                    <span class="btn__text">В корзину</span>
                    <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-basket"></use>
                    </svg>
                </a>
                <a href="#" class="product-card__link btn btn--secondary">
                    <span class="btn__text">Подробнее</span>
                </a>
                </div>
            </div>
            <div class="product-card__info">
                <h2 class="product-card__title">${product.name}</h2>
                <span class="product-card__old">
                <span class="product-card__old-number">${product.price.old}</span>
                <span class="product-card__old-add">₽</span>
                </span>
                <span class="product-card__price">
                <span class="product-card__price-number">${product.price.new}</span>
                <span class="product-card__price-add">₽</span>
                </span>
                <div class="product-card__tooltip tooltip">
                <button class="tooltip__btn" aria-label="Показать подсказку">
                    <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-i"></use>
                    </svg>
                </button>
                <div class="tooltip__content">
                    <span class="tooltip__text">Наличие товара по городам:</span>
                    <ul class="tooltip__list">
                    <li class="tooltip__item">
                        <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                    </li>
                    <li class="tooltip__item">
                        <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                    </li>
                    <li class="tooltip__item">
                        <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>        
        `
        list.append(li)
    });   
}
// renderProductsDay()

// Библиотека Swiper
function redirectSlider() {
    
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',      
    
        slidesPerView: 4,
        spaceBetween: 10,    
    
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },

    })       
}
redirectSlider()

function formValidation() {

    const validate = new JustValidate('.questions__form')

    validate.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Введите имя'
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимум 3 символа'
        },
        {
            rule: 'maxLength',
            value: 20,        
            errorMessage: 'Максимум 20 символов'
        },
    ])

    validate.addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Введите почту'
        },
        {
            rule: 'email',
            errorMessage: 'Почта введена неверно!'
        },       
    ])

    validate.addField('#agree', [
        {
            rule: 'required',
            errorMessage: 'Согласие обязательно!'
        },             
    ])

    
    validate.onSuccess(async function(e) {        
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            })

            if(!response.ok) {
                throw new Error('Ошибка отправки')
            }
            const textSuccess = 'Благодарим за обращение!'
            createModal(textSuccess)
            
            form.reset()

        } catch(error) {
            const textError = 'Не удалось отправить обращение!'
            
            createModal(textError)
        }          
    })    
}
formValidation()

function createModal(text) {
    const screenCoverBlur = document.createElement('div')
    screenCoverBlur.classList.add('screenCoverBlur', 'open')

    const modalEl = document.createElement('div')
    modalEl.classList.add('modalEl', 'open')    

    const textContainer = document.createElement('p')
    textContainer.classList.add('textContainer')
    textContainer.textContent = text

    // Кнопка для закрытия
    const closeBtnEl = document.createElement('button')
    closeBtnEl.classList.add('closeBtnEl')
    closeBtnEl.textContent = 'x'

    modalEl.append(closeBtnEl, textContainer)

    // Закрываем модальное окно при нажатии кнопки закрыть
    closeBtnEl.addEventListener('click', ()=>{
        screenCoverBlur.classList.remove('open')
        modalEl.classList.remove('open')
    })
    
    document.body.append(screenCoverBlur, modalEl)
}





addToBasket.addEventListener('click', function(e) {    
    const aEl = e.target.classList.contains('tooltip__btn')
    if(!aEl) {
        return
    }    
    if(aEl) {
        e.preventDefault()
        alert('tooltip__btn')
    }    
    tippyFunc()
    
})


function tippyFunc() {
    tippy('.tooltip__btn', {    
        allowHTML: true,
                
        content(reference) {
            const parent = reference.closest('.tooltip')
            const tooltip = parent.querySelector('.tooltip__content')
    
            return tooltip.innerHTML
        },
        
    });
}
// tippyFunc()

async function renderCardsPaginationFunc(dataProducts) {
    let products = dataProducts
    if(!dataProducts){
        products = await loadProducts()
    } 
    // const cardsContainer = document.querySelector('.catalog__list')
    const paginationContainer = document.querySelector('.catalog__pagination')

    // const cardsPerPage = 6
    // let currentPage = 1

    

    // function renderCards() {
    //     const start = (currentPage - 1) * cardsPerPage
    //     const end = start + cardsPerPage

    //     const currentCards = products.slice(start, end)
    //     cardsContainer.innerHTML = ''

    //     currentCards.forEach((card) => {
    //         const div = document.createElement('div')
    //         div.textContent = card
    //         cardsContainer.append(div)
    //     })
    // }

    function renderPagination() {
        // Количество страниц
        const pagesCount = Math.ceil(products.length / cardsPerPage)

        paginationContainer.innerHTML = ''

        // Создаем кнопки
        for(let i=1; i <= pagesCount; i++) {
            const li = document.createElement('li')
            li.classList.add('catalog__pagination-item')
            const button = document.createElement('button')
            button.classList.add('catalog__pagination-link')
            button.textContent = i

            // Активная кнопка
            if(i===currentPage) {
                button.disabled = true
            }

            // Обработчик клика
            button.addEventListener('click', ()=> {
                currentPage = i

                renderProducts(products)
                renderPagination()
            })
            li.append(button)
            paginationContainer.append(li)
        }
    }
    alert('hfgffg')
    renderProducts(products)
    renderPagination()
    
}

renderCardsPaginationFunc()