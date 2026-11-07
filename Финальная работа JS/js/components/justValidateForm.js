// Валидация формы библиотекой JustValidate
export function formValidation() {

    const validate = new JustValidate('.questions__form')

    validate.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Введите имя'
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимум 3 символа'
        },
        {
            rule: 'maxLength',
            value: 20,        
            errorMessage: 'Максимум 20 символов'
        },
    ])

    validate.addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Введите почту'
        },
        {
            rule: 'email',
            errorMessage: 'Почта введена неверно!'
        },       
    ])

    validate.addField('#agree', [
        {
            rule: 'required',
            errorMessage: 'Согласие обязательно!'
        },             
    ])

    
    validate.onSuccess(async function(e) {        
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            })

            if(!response.ok) {
                throw new Error('Ошибка отправки')
            }
            const textSuccess = 'Благодарим за обращение!'
            createModal(textSuccess)
            
            form.reset()

        } catch(error) {
            const textError = 'Не удалось отправить обращение!'
            
            createModal(textError)
        }          
    })    
}

// Функция для создания модального окна
export function createModal(text) {
    const screenCoverBlur = document.createElement('div')
    screenCoverBlur.classList.add('screenCoverBlur', 'open')

    const modalEl = document.createElement('div')
    modalEl.classList.add('modalEl', 'open')    

    const textContainer = document.createElement('p')
    textContainer.classList.add('textContainer')
    textContainer.textContent = text

    // Кнопка для закрытия
    const closeBtnEl = document.createElement('button')
    closeBtnEl.classList.add('closeBtnEl')
    closeBtnEl.textContent = 'x'

    modalEl.append(closeBtnEl, textContainer)

    // Закрываем модальное окно при нажатии кнопки закрыть
    closeBtnEl.addEventListener('click', ()=>{
        screenCoverBlur.classList.remove('open')
        modalEl.classList.remove('open')
    })
    
    document.body.append(screenCoverBlur, modalEl)
}