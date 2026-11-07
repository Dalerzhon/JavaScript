const formEl = document.querySelector('form')
const topDivs = formEl.querySelectorAll(':scope > div')
topDivs.forEach(div => {div.classList.add('formBlocks')})

const emailEl = document.getElementById('email')
const range = document.getElementById('volume')
const rangeValueScreen = document.getElementById('volumeValue')
// Динамическое отображение значения range
range.addEventListener('input', ()=> {
    rangeValueScreen.textContent = range.value
})

// Валидация email 
function validateEmail() {
    emailEl.setCustomValidity('')   
    // Значение email    
    const emailValue = emailEl.value    
       
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const checkEmail = regex.test(String(emailValue).toLowerCase())
    
    if (!checkEmail) {              
        emailEl.setCustomValidity('Некорректный email')             
        return
    }    
}
emailEl.addEventListener('input', validateEmail)
emailEl.addEventListener('blur', validateEmail)

// Отправка формы
formEl.addEventListener('submit', function(e) {
    e.preventDefault()     

    // Значение email    
    const emailValue = emailEl.value
    
    // Собираем данные формы в объект
    const dataForm = {
        name: formEl.name.value.trim(),
        email: emailValue,
        gender: formEl.querySelector('input[name="gender"]:checked')?.value||'-',
        range: range.value,
        interests: [...formEl.querySelectorAll('input[name="interests"]:checked')]
                .map(cb=>cb.value)
                .join(', ')||'-',
        comment: formEl.comment.value.trim()||'-'
    }

    // Создание заголовка h2 c проверкой на наличие h2
    if (!document.getElementById('resultTitle')) {
        const h2El = document.createElement('h2')
        h2El.textContent = 'Результаты опроса'
        h2El.id = 'resultTitle'
        formEl.after(h2El)
    }
    
    // Создаем новый объект для удоюства отображения данных на экране
    const dataFormRes = {
        "Имя пользователя": dataForm.name,
        "Email": dataForm.email,
        "Пол": dataForm.gender,
        "Оценка сервиса": dataForm.range,
        "Интересы пользователя": dataForm.interests,
        "Дополнительные комментарии": dataForm.comment,
    }
    
    // Выводим данные формы на экран
    const resultContainer = document.querySelector('.resultContainer')
    resultContainer.textContent = ''
    for (let key in dataFormRes) {
        const value = dataFormRes[key]

        const divEl = document.createElement('div')
        divEl.classList.add('resBlocks')
        divEl.textContent = `${key}: ${value}`
        resultContainer.appendChild(divEl)        
    }
})



