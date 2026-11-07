import {Delivery} from './Delivery.js'
import EditDelivery from './EditDelivery.js'


const app = document.getElementById('app')
const cardWrap = document.createElement('div') 
cardWrap.classList.add('cardWrap')

export const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8, "canceled"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivery"),
    new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "delivery")
]

// Добавление карточек в cardWrap с помощью цикла
deliveryArr.forEach(delivery => cardWrap.append(delivery.getelement()))


// Контейнер общего расстояния
const totalDistanceContainer = document.createElement('div')
totalDistanceContainer.classList.add('totalDistanceContainer')

// Общее расстояние, кнопка
const totalDistanceBtn = document.createElement('button')
totalDistanceBtn.classList.add('totalDistanceBtn')
totalDistanceBtn.textContent = 'Общее расстояние'

// Общее расстояние, текст
const totalDistanceText = document.createElement('h3')
totalDistanceText.classList.add('totalDistanceText')

totalDistanceBtn.addEventListener('click', ()=>{
    totalDistanceText.textContent = ''

    const totalDistance = EditDelivery.getTotalDistance(deliveryArr)  

    if(totalDistance === 0) {
        totalDistanceText.className = 'totalDistanceText'       
        totalDistanceText.textContent = '' 
    }else{
        totalDistanceText.textContent = ''
        totalDistanceText.textContent = `Общее расстояние: ${totalDistance} км`
        totalDistanceText.className = 'totalDistanceTextActive'    
        totalDistanceContainer.append(totalDistanceText)
    }
   
    
    console.log(deliveryArr)
    console.log(totalDistance)
})

totalDistanceContainer.append(totalDistanceBtn)

app.append(cardWrap, totalDistanceContainer)