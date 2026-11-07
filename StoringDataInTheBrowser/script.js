const title = document.getElementById('title')
const genre = document.getElementById('genre')
const releaseYear = document.getElementById('releaseYear')
const isWatched = document.getElementById('isWatched').checked

const currentYear = new Date().getFullYear()

// Вспомогательная функция для вывода кастомных ошибок
function setError(input, massage) {
    input.setCustomValidity(massage)
    input.reportValidity()
}

// Вспомогательная функция для очишения кастомных ошибок
function clearError(input) {
    input.setCustomValidity('')
} 

// Функция валидации названия фильма
title.addEventListener('input', ()=> {
    const val = title.value.trim()

    if (!val) {
        setError(title, 'Введите название фильма!')
    } else if (val.length > 60 ) {
        setError(title, 'Название фильма слышком длинное, максимум 60 символов')
    } else if (!/^[a-zA-Zа-яА-Я0-9\s\-:.,!?()]+$/.test(val)) {
        setError(title, 'Название фильма только буквы, цифры, пробелы и знаки препинания')
    } else {
        clearError(title)
    }
})

// Функция валидации жанра фильма
genre.addEventListener('input', ()=> {
    const val = genre.value.trim()

    if (!val) {
        setError(genre, 'Введите жанр фильма!')
    } else if(val.length < 3) {
        setError(genre, 'Введите жанр фильма, от 3 символов')
    } else if (val.length > 60 ) {
        setError(genre, 'Жанр фильма слышком длинное, максимум 60 символов')
    } else if (!/^[a-zA-Zа-яА-Я0-9\s\-:.,!?()]+$/.test(val)) {
        setError(genre, 'Жанр фильма только буквы, цифры, пробелы и знаки препинания')
    } else {
        clearError(genre)
    }
})

// Функция валидации года выпуска фильма
releaseYear.addEventListener('input', ()=> {
    const val = releaseYear.value.trim()
    const numVal = Number(val)
    if (!val) {
        setError(releaseYear, 'Введите год выпуска фильма!')
        return
    }    
    if(!Number.isInteger(numVal)) {
        console.log(!Number.isInteger(numVal))
        setError(releaseYear, 'Год должен быть целым числом')
    } else if (numVal < 1888 ) {
        setError(releaseYear, 'Первый фильм вышел в 1895 году')
    } else if (numVal > currentYear + 2 ) {
        setError(releaseYear, `Год выпуска не может быть больше ${currentYear + 2}`)
    } else {
        clearError(releaseYear)
    }
})

// Функция для считывания данных с формы при клике, и вызов функции добавления
function handleFormSubmit(e) {
    e.preventDefault()    
    
    const film = {
        title: title.value,
        genre: genre.value,
        releaseYear: releaseYear.value,
        isWatched: isWatched
    }
    addFilmToLocalStorage(film)
}
document.querySelector('#film-form').addEventListener('submit', handleFormSubmit)

// Переменная для переключения между добавлением и редактированием
let tumbler = -1

// Функция добавления новых объектов в массив объектов в localStorage, и редактирования
function addFilmToLocalStorage(film) {
    let films = JSON.parse(localStorage.getItem('films')) || []
    if (tumbler >= 0) {
        films[tumbler] = film
        tumbler = -1
        const submitBtn = document.querySelector('#submitBtn')
        const cancelUpdateBtn = document.querySelector('#cancelUpdateBtn')
        submitBtn.textContent = 'Добавить'
        cancelUpdateBtn.style.display = 'none'
    } else {
        films.push(film)
    }
    localStorage.setItem('films', JSON.stringify(films))
   
    renderTable()
}

// Функция вывода на экран данных с localStorage 
function renderTable(arr) {
    if (!arr) {
        const films = JSON.parse(localStorage.getItem('films')) || []
        arr = films
    }

    const filmTableBody = document.querySelector('#film-tbody')
    filmTableBody.innerHTML = ''
   
    arr.forEach((film, index) =>  {
        const row = document.createElement('tr')
       
        row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.genre}</td>
        <td>${film.releaseYear}</td>
        <td>${film.isWatched ? 'Да' : 'Нет'}</td>
        <td>
            <button class="editRow" data-index="${index}">Редактировать</button>
            <button class="removeRow" data-index="${index}">Удалить</button>
        </td>
        `
        filmTableBody.appendChild(row)        
    })    
}
renderTable()

const table = document.getElementById('film-table')

// Функция для удаления либо редактирования объекта
table.addEventListener('click', function(e) {
    const btn = e.target.closest("button")
    if(!btn) return

    const row = btn.closest("tr")
    if (!row) return

    const index = parseInt(btn.dataset.index)

    if(isNaN(index)){
        return
    }

    if (btn.classList.contains("removeRow")) {
        // row.remove()
        const filmsNew = JSON.parse(localStorage.getItem('films')) || []
        filmsNew.splice(index, 1)
        localStorage.setItem('films', JSON.stringify(filmsNew))
        renderTable()
        return
    } else if (btn.classList.contains("editRow")) {             
        startEdit(index)    
    }   
})

// Функция вставления изменяемого объекта в форму
function startEdit(index) {
    const movies = JSON.parse(localStorage.getItem('films')) || []
    const movie = movies[index]
    
    const title = document.querySelector('#title').value = movie.title
    const genre = document.querySelector('#genre').value = movie.genre
    const releaseYear = document.querySelector('#releaseYear').value = movie.releaseYear
    const isWatched = document.querySelector('#isWatched').checked = movie.isWatched   
    
    const submitBtn = document.querySelector('#submitBtn')
    const cancelUpdateBtn = document.querySelector('#cancelUpdateBtn')
    submitBtn.textContent = 'Обновить'
    cancelUpdateBtn.style.display = 'block'

    // Для переключения с добавления на редактирование
    tumbler = index 
}

// Функция отмены редактирования
function cancelEdit() {
    tumbler = -1
    const submitBtn = document.querySelector('#submitBtn')
    const cancelUpdateBtn = document.querySelector('#cancelUpdateBtn')
    submitBtn.textContent = 'Добавить'
    cancelUpdateBtn.style.display = 'none'
}
const cancelUpdateBtn = document.querySelector('#cancelUpdateBtn')
cancelUpdateBtn.addEventListener('click', function() {
    cancelEdit()
})

const select = document.querySelector('#select')
const sortBtn = document.querySelector('#sortBtn')

// Универсальная функция для сортировки фильмов по названию, жанру и году выпуска
sortBtn.addEventListener('click', function() {

    const valSel = document.querySelector('#select option:checked').value    

    const movies = JSON.parse(localStorage.getItem('films')) || []
    
    const moviesNew = [...movies]  
    for (let i=0; i < moviesNew.length; i++) {
        for (let j=0; j < moviesNew.length - 1; j++) {
            if(moviesNew[j][valSel] > moviesNew[j+1][valSel]) {
                const temp = moviesNew[j]
                moviesNew[j] = moviesNew[j+1]
                moviesNew[j+1] = temp
            }
        }
    }    
    renderTable(moviesNew) 
})

