const validate = new JustValidate('#msg-form')

validate.addField('#name', [
    {
        rule: 'required',
        errorMessage: 'Введите имя'
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

validate.addField('#msg', [
    {
        rule: 'required',
        errorMessage: 'Введите сообщение'
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

validate.onSuccess(function() {
    alert('Проверка пройдена успешно!')
})