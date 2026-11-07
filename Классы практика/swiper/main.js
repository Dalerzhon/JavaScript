const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    slidesPerView: 2,
    spaceBetween: 10,


    pagination: {
        el: '.swiper-pagination'
    },
     
    // autoplay: {
    //     delay: 1000,
    // },
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // }

})