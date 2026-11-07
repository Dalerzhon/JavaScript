const form = document.getElementById('form')
const promoInput = document.getElementById('promoInput')
const btn = document.getElementById('btn')
const textPromo = document.getElementById('textPromo')

const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%"
   }

promoInput.addEventListener('input', function() {
    this.value = this.value.toUpperCase();   
})

// Отправка формы, с проверкой промокода и сохранения куки при корректном введении
form.addEventListener('submit', (e)=> {
    e.preventDefault()

    textPromo.textContent = ''
    promoInput.classList.remove('greenColor')
    const promoVal = promoInput.value.trim().toUpperCase()    
  
    if (!promoVal || promocodeObj.promocode!==promoVal) {        
        return
    } else {           
            promoInput.classList.add('greenColor')            
            textPromo.textContent = 'Промокод применен.' + promocodeObj.gift          
            document.cookie = `promocode=${promoVal}`
            document.cookie = `text=${textPromo.textContent}`                      
        }
})

// Вспомогательная функция для получения данных из куки
function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
}
const cookie = getCookie()


// Заргрузка данных промокода при перезагрузке страницы
window.addEventListener('load', function() {    
    if (!cookie.promocode) {
        return
    }    
    promoInput.value = cookie.promocode
    textPromo.textContent = cookie.text
    promoInput.classList.add('greenColor')
})