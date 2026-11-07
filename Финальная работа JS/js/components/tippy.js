// Библиотека tippy.js
export function tippyFunc() {
    tippy('.tooltip__btn', {    
        allowHTML: true,
                
        content(reference) {
            const parent = reference.closest('.tooltip')
            const tooltip = parent.querySelector('.tooltip__content')
    
            return tooltip.innerHTML
        },
        
    });
}