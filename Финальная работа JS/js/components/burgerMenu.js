

const burgerBtnOpen = document.querySelector('.header__catalog-btn')
const showCatalog = document.querySelector('.main-menu')
const burgerBtnClose = document.querySelector('.main-menu__close')

// Открытие бургера, каталога
function openMenu() {
    showCatalog.classList.add('main-menu--active')
}

// Закрытие бургера, каталога
function closeMenu() {
    if(showCatalog.classList.contains('main-menu--active')){
        showCatalog.classList.remove('main-menu--active')
    }
}

export function initBurgerMenu() {
    burgerBtnOpen.addEventListener('click', openMenu)
    burgerBtnClose.addEventListener('click', closeMenu)
}
