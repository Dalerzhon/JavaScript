import { loadProducts } from "./getData.js"

// Слушатель на иконку корзина, открывает и закрывает блок при клике
const basketBtn = document.querySelector('.header__user-btn')
function openCloseBasketList() {
    const basketEl = document.querySelector('.basket')
    basketEl.classList.toggle('basket--active')
}

// Слушатель на каталог товаров, при клике на кнопку 'В корзину' 
// товар добавляется в переменную countCard, с которого потом
// происходит отрисовка товаров в корзине с renderBasketProducts
let countCard = []
function addProductToBasket() {
    // Слушатель в соновной каталог товаров
    const mainCatalogList = document.querySelector('.catalog__list')
    mainCatalogList.addEventListener('click', addProductsBasket)
    
    // Слушатель в каталог товаров дня
    const dayCatalogList = document.querySelector('.day-products__list')
    dayCatalogList.addEventListener('click', addProductsBasket)
  

    function addProductsBasket(e) {
        const currentCard = e.target.closest('.product-card__link')    
        if(!currentCard) {
            return
        }    
        if(currentCard) {
            e.preventDefault()

            const cartId = currentCard.dataset.id

            if (!countCard.includes(cartId)) {
                            
                countCard.push(cartId)
                
                console.log(countCard)        
                
                controlBasketRendering() 
            }else{
                return
            }
        }
    }
}

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
export async function renderBasketProducts() {
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
function deleteProductBasket() {
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
}

export function initBasketFunc() {
    basketBtn.addEventListener('click', openCloseBasketList)

    addProductToBasket()

    controlBasketRendering()

    renderBasketProducts()

    deleteProductBasket()
}