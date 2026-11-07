const title = document.getElementById("title")
const genre = document.getElementById("genre")
const releaseYear = document.getElementById("releaseYear")
const isWatched = document.getElementById("isWatched").checked

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

// Функция, при нажатии кнопки submit собирает данные с формы и передает в функцию addFilm()
function handleFormSubmit(e) {
  e.preventDefault() 

  const film = {
    title: title.value,
    genre: genre.value,
    releaseYear: releaseYear.value,
    isWatched: isWatched,
  };

  addFilm(film);
}

// Функция добавления объекта в сервер
async function addFilm(film) {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  // films.push(film);
  // localStorage.setItem("films", JSON.stringify(films));

  // console.log(film);
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
    body: JSON.stringify(film),
  });
  renderTable();
}

// Функция делает запрос на сервер и выводит данные в таблице
async function renderTable(arr) {
  // const films = JSON.parse(localStorage.getItem("films")) || [];
  if (!arr) {
    const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
      headers: {
        email: "ovikdevil@gmail.com",
      },
    });
    const films = await filmsResponse.json();
    arr = films
  }

  const filmTableBody = document.getElementById("film-tbody");

  // Clear table body first
  filmTableBody.innerHTML = "";

  // Then add new rows
  arr.forEach((film, id) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td>
        
        <button class="removeRow" data-id="${film.id}">Удалить</button>
      </td>
    `;
    filmTableBody.appendChild(row);
  });
}

document.getElementById("film-form").addEventListener("submit", handleFormSubmit);

// Display films on load
// renderTable();

const table = document.getElementById('film-table')

// Функция считывает клик в таблице по кнопке удаления фильма
table.addEventListener('click', function(e) {
  const btn = e.target.closest("button")
  if(!btn) return

  // const row = btn.closest("tr")
  // if (!row) return

  // const index = parseInt(btn.dataset.index)
  const id = parseInt(btn.dataset.id)

  if(isNaN(id)){
      return
  }

  if (btn.classList.contains("removeRow")) {
      deleteFilm(id)
      // return
  } 
})

// Функция удаляет фильм с сервера
async function deleteFilm(id) {
  const response = await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
    method: "DELETE",
    headers: {      
      email: "ovikdevil@gmail.com",
    }
    
  })
  const data = await response.json()
  console.log(data)
  renderTable();
}

const btnDeleteAllFilms = document.getElementById('removeAllFilms')

// Функция удаляет все фильмы с сервера
async function deleteAllFilm() {
  const response = await fetch('https://sb-film.skillbox.cc/films', {
    method: "DELETE",
    headers: {      
      email: "ovikdevil@gmail.com",
    }
    
  })
  const data = await response.json()

  renderTable();
}
btnDeleteAllFilms.addEventListener('click', deleteAllFilm)

let films = []

// Функция для получения данных с сервера
async function getMovies() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  films = await filmsResponse.json();
  filterFilm()
}

window.addEventListener('DOMContentLoaded', getMovies)

const findForm = document.getElementById('findFilmContainer')

// Функция для фильтрации фильмов
function filterFilm() {
  
  const title = document.getElementById("titleFind").value.trim().toLowerCase()
  const genre = document.getElementById("genreFind").value.trim().toLowerCase()
  const releaseYear = document.getElementById("releaseYearFind").value.trim()
  const isWatched= document.getElementById("selectFind").value

  const filtered = []

  for (i=0; i < films.length; i++) {
    const film = films[i]
    
    let matches = true
    
    if(title && !film.title.toLowerCase().startsWith(title)) {
      matches = false
    }
    if(genre && !film.genre.toLowerCase().startsWith(genre)) {
      matches = false
    }
    if(releaseYear && !film.releaseYear.startsWith(releaseYear)) {
      matches = false
    }
    if(isWatched && String(film.isWatched) !== isWatched) {      
      matches = false
    }

    if(matches) {
      filtered.push(film)
    }
  }  
  renderTable(filtered)
}

findForm.addEventListener('input', filterFilm)
findForm.addEventListener('change', filterFilm)

