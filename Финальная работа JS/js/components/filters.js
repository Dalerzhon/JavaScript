import { renderProducts, renderPagination } from "./renderProducts.js"
import { loadProducts } from "./getData.js"


const state = {
    types: [],
    availability: 'all-item',
    sort: 'price-min'
}

export function initFilters() {
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

    // Слушатель на кнопку 'Сбросить фильтры'
    const resetButton = document.querySelector('.catalog-form__reset')
    resetButton.addEventListener('click', function() {
        state.types = []
        state.availability = 'all-item'
        state.sort = ''
        
        filter()
    })
}

// Функция для фильтрации и сортировки, запускается 
// при каждом изменении фильтров и сортировки
export async function filter(dataProducts) {

    let products = dataProducts
    if(!dataProducts){
        products = await loadProducts()
    }     

    
    if (state.types.length > 0) {        
        products = products.filter(product => product.type.some(t => state.types.includes(t)))
          
    }

    if(state.availability=='instock') {
        products = products.filter(product => Object.values(product.availability).some(t => t > 0))
        
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

