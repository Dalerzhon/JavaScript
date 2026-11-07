const formEl = document.querySelector('form')
const nameGoods = document.getElementById('nameGoods')
const weightGoods = document.getElementById('weightGoods')
const distanceDelivery = document.getElementById('distanceDelivery')
const errMassage = document.querySelector('.errMassage')


formEl.addEventListener('submit', function(e) {
    e.preventDefault()

    const nameGoodsValue = nameGoods.value.trim()
    const weightGoodsValue = weightGoods.value
    const distanceDeliveryValue = distanceDelivery.value
    
    // Валидация названия
    if (nameGoodsValue.length < 2 || nameGoodsValue.length > 20) {        
        errMassage.textContent = 'Введите корректное название товара, от 2 до 20 символов'
        return
    }
    // Валидация массы
    if (weightGoodsValue <= 0) {        
        errMassage.textContent = 'Пожалуйста, введите корректное значение для массы'
        return
    } 
    // Валидация расстояния доставки
    if (distanceDeliveryValue < 1) {        
        errMassage.textContent = 'Пожалуйста, введите корректное значение для расстояния'
        return
    }
    // Если все корректно очищаем errMassage
    errMassage.textContent = ''
    
    // Стоимость доставки
    const costDelivery = (weightGoodsValue * distanceDeliveryValue)/10
    // Массив данных
    const dataArr = [nameGoodsValue, weightGoodsValue, distanceDeliveryValue, costDelivery]
    
    // Выводим результаты на экран
    function renderTd() {
        const tableBody = document.querySelector('.productTable')
        const tBody =document.createElement('tbody')
        tableBody.append(tBody)
        const tr = document.createElement('tr')
        tBody.append(tr)        
        
        for (let i=0; i < dataArr.length; i++) {
            const td = document.createElement('td')
            td.textContent = dataArr[i]
            tr.appendChild(td)
        }
    }
    renderTd()
    // Очищаем форму
    formEl.reset()
})