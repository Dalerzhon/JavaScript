const popap = document.getElementById('giftContainer')
const btn = document.getElementById('btn')
const img = document.getElementById('img')
const massage = document.getElementById('massage')

const giftArr = [
    {
      title: "Скидка 20% на первую покупку в нашем магазине!",
      icon: "img/discount.png"
    },
    {
      title: "Скидка 10% на всё!",
      icon: "img/discount_2.png"
    },
    {
      title: "Подарок при первой покупке в нашем магазине!",
      icon: "img/gift.png"
    },
    {
      title: "Бесплатная доставка для вас!",
      icon: "img/delivery.png"
    },
    {
      title: "Сегодня день больших скидок!",
      icon: "img/discount_3.png"
    }
]

// Функция рандомного получения подака и вывода на экран
function getRandomGift(min, max) {
   const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min  
   const randomGift = giftArr[randomIndex] 
   img.src = randomGift.icon    
   massage.textContent = randomGift.title 
}
const min = 0
const max = giftArr.length - 1

getRandomGift(min, max)


setTimeout(() => {
    popap.style.display = 'flex'
}, 3000);

btn.addEventListener('click', ()=> {
    popap.style.display = 'none'
})
   