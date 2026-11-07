import { loadProducts } from "./getData.js"
import { tippyFunc } from "./tippy.js"
import { filter } from "./filters.js"

// Количество карточек на странице
const cardsPerPage = 6
let currentPage = 1

// Отображение товаров на экране
export async function renderProducts(dataProducts) {
    
    let products = dataProducts
    if(!dataProducts){
        products = await loadProducts()
    } 

    // Пагинация
    const start = (currentPage - 1) * cardsPerPage
    const end = start + cardsPerPage
    const currentProducts = products.slice(start, end)    

    
    const list = document.querySelector('.catalog__list')
    list.innerHTML = ''

    currentProducts.forEach(product => {
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
        list.append(li)
    });   
    tippyFunc()
}
    


// Функция для создания пагинации
export async function renderPagination(dataProducts) {
    
    let products = dataProducts
    if(!dataProducts){
        products = await loadProducts()
    }    

    // Количество страниц
    const pagesCount = Math.ceil(products.length / cardsPerPage)

    const paginationContainer = document.querySelector('.catalog__pagination')
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
            
            filter(products)
            renderPagination()
        })

        li.append(button)
        paginationContainer.append(li)
    }
}
    

    
