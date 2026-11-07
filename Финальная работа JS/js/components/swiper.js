
// Библиотека Swiper
export function swiperFunc() {
    
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
