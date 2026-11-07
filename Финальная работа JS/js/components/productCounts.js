import { loadProducts } from "./getData.js"

// Определяем количество каждого типа, и 
// отображаем количество типов, в соответствующих тегах
export async function printCountType() { 
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
