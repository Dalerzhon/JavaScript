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