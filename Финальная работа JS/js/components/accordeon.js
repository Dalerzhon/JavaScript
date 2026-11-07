
// Слушатель для аккардеона, открывает и закрывает элементы
export function initAccordeon() {
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
}
