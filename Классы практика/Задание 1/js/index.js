import {Delivery} from './Delivery.js'


const app = document.getElementById('app')

const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
    new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
    new Delivery("Оля", "ул. Ткачей, д. 43", 11)
]

// Добавление карточек в app с помощью цикла
// deliveryArr.forEach(delivery => app.append(delivery.getelement()))
// deliveryArr[0].distance = 99


let card1 = deliveryArr[0]
app.append(card1.getelement())

// card1.distance = 99

let card2 = deliveryArr[1]
app.append(card2.getelement())

let card3 = deliveryArr[2]
app.append(card3.getelement())











