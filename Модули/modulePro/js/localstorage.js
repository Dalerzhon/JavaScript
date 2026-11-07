// Функция добавления данных в localStorage
export function addToLocalStorage(data) {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    goods.push(data)
    localStorage.setItem('goods', JSON.stringify(goods))
}

// Функция извлечения данных с localStorage
export function getFromLocalStorage() {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    return goods   
}

// Функция изменения данных в localStorage
export function editInLocalStorage(data, index) {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    goods.splice(index, 1, data)
    localStorage.setItem('goods', JSON.stringify(goods))
}

// Функция удаления данных в localStorage
export function deletInLocalStorage(index) {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    goods.splice(index, 1)
    localStorage.setItem('goods', JSON.stringify(goods))
}