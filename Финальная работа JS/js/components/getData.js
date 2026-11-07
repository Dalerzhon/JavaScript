
// Запрос на сервер для получения данных, кешируем productsPromise
let productsPromise = null
export function loadProducts() {
    if(!productsPromise) {
        productsPromise = fetch('./data/data.json')
            .then(res => res.json())        
    }
    return productsPromise
}

