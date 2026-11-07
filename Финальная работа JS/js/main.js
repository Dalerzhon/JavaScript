import { initBurgerMenu } from "./components/burgerMenu.js"
import { initLocationSelect } from "./components/locationSelect.js"
import { renderProducts, renderPagination } from "./components/renderProducts.js"
import { printCountType } from "./components/productCounts.js"
import { initFilters } from "./components/filters.js"
import { initBasketFunc } from "./components/basket.js"
import { initAccordeon } from "./components/accordeon.js"
import { renderProductsDay } from "./components/renderProductsDay.js"
import { swiperFunc } from "./components/swiper.js"
import { formValidation } from "./components/justValidateForm.js"
import { tippyFunc } from "./components/tippy.js"



window.addEventListener('DOMContentLoaded', () => {    
    // Открытие и закрытие бургерного меню
    initBurgerMenu()

    // Изменение локации
    initLocationSelect()
    
    // Пагинация и отрисовка карточек
    renderPagination()
    renderProducts()
    
    // Вывод количества типов светильников
    printCountType()
    
    // Фильтрация и сортировка
    initFilters()
    
    // Функции связанные с корзиной
    initBasketFunc()
    
    // Открытие и закрытие бургерного аккордеона
    initAccordeon()
    
    // Отрисовка товаров дня
    renderProductsDay()
    
    // Библиотека Swiper.js
    swiperFunc()
    
    // Библиотека JustValidate.js
    formValidation() 
    
    // Библиотека tippy.js
    tippyFunc()
});


