import {Delivery} from './Delivery.js'
import EditDelivery from './EditDelivery.js'


const app = document.getElementById('app')

const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8, 'canceled'),
    new Delivery("Дмитрий", "ул. Задачная, д. 7", 3, 'delivery'),
    new Delivery("Оля", "ул. Ткачей, д. 43", 11, 'delivered')
]

// Добавление карточек в app с помощью цикла
// deliveryArr.forEach(delivery => app.append(delivery.getelement()))


let card1 = deliveryArr[0]
app.append(card1.getelement())


let card2 = new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3)
app.append(card2.getelement())
// console.log(card2.inputStatusEl.value = 'delivery')


let card3 = new EditDelivery("Оля", "ул. Ткачей, д. 43", 11)
card3.status = 'delivered'
app.append(card3.getelement())



console.log(card3)

for(let i=0; i < 3; i++) {
    setTimeout(() => {
        console.log(i)
    }, 5000);
}










