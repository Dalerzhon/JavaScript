const nameSurname = document.getElementById('nameSurname')
const cardEl = document.getElementById('card')
const selectColor = document.getElementById('selectColor')

// Cлушатель события input для текствого поля
nameSurname.addEventListener('input', function() {
    cardEl.textContent = nameSurname.value
})

// Cлушатель события focus для текствого поля
nameSurname.addEventListener('focus', function() {
    nameSurname.style.backgroundColor = 'rgb(206, 236, 246)'
})

// Cлушатель события blur для текствого поля
nameSurname.addEventListener('blur', function() {
    nameSurname.style.backgroundColor = ''
})

// Cлушатель события change
selectColor.addEventListener('change', function() {
    const selectedColor = selectColor.value
    cardEl.classList = `card ${selectedColor}`    
})
