// Функция создания карточки
function getCardEl() {
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')    
    return cardEl
}

// Функция создания контейнера для элементов и центрирования внутри карточки
function getCentreWrapEl() {
    const wrapCentreEl = document.createElement('div')
    wrapCentreEl.classList.add('wrapCentre')    
    return wrapCentreEl
}

// Функция создания заголовка h1
function getTitleEl(text) {
    const titleEl = document.createElement('h1')
    titleEl.classList.add('mainTitle')
    titleEl.textContent = text
    return titleEl
}

// Функция создания кнопки
function getButtonEl(text) {
    const buttonEl = document.createElement('button')
    buttonEl.classList.add('button')
    buttonEl.textContent = text
    return buttonEl
}

// Функция создания контейнера для объединения в одну строку h1 и кнопки добавить
function getWrapEl() {
    const wrapEl = document.createElement('div')
    wrapEl.classList.add('wrap')    
    return wrapEl
}

// Функция создания формы
function getFormEl() {
    const formEl = document.createElement('form')
    formEl.classList.add('form')
    return formEl
}

// Функция создания инпута
function getInputEl(type, name, placeholder, required = '') {
    const inputEl = document.createElement('input')
    inputEl.type = type
    inputEl.name = name
    inputEl.placeholder = placeholder 
    inputEl.required = required   
    inputEl.classList.add('textField')
    return inputEl
}

// Функция создания ссылок
function getLinkEl(text, href) {
    const linkEl = document.createElement('a')
    linkEl.textContent = text
    linkEl.href = href
    linkEl.classList = 'link'
    return linkEl
}

// Функция для получения контейнера в которую заносится блок кода для отображения
function getMainWrap() {
    const app = document.getElementById('app')
    app.innerHTML = ''
    const card = getCardEl()
    app.append(card)
    const wrapCentreEl = getCentreWrapEl()
    card.append(wrapCentreEl)
    return wrapCentreEl
}

// Функция карточки добавления товаров в список
function getRowEl() {
    const rowEl = document.createElement('div')
}

// Функция добавления данных в localStorage
function addToLocalStorage(data) {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    goods.push(data)
    localStorage.setItem('goods', JSON.stringify(goods))
}

// Функция извлечения данных с localStorage
function getFromLocalStorage() {
    let goods = JSON.parse(localStorage.getItem('goods')) || []
    return goods   
}

// Функция отрисовки данных с localStorage в таблице
function renderTableBody(arrObj) {   
    
    const tableBody = document.createElement('tbody')   
    tableBody.innerHTML = '' 

    arrObj.forEach((obj, index) =>  {
        const row = document.createElement('tr')
       
        row.innerHTML = `
        <td>${obj.name}</td>
        <td>${obj.shelf}</td>
        <td>${obj.weight}</td>
        <td>${obj.date}</td>        
        <td>            
            <button class="removeRowBtn" data-index="${index}">Удалить</button>
        </td>
        `
        
        tableBody.appendChild(row)        
    })
    // console.log(row)
    return tableBody    
}

// Вспомогательная функция для вывода кастомных ошибок
function setError(input, massage) {
    input.setCustomValidity(massage)
    input.reportValidity()
}

// Вспомогательная функция для очишения кастомных ошибок
function clearError(input) {
    input.setCustomValidity('')
} 


// Функция создания формы и сохранения данных в localStorage
function createAddEl() {    
    const mainWrap = getMainWrap()

    const title = getTitleEl('Добавить запись')
    const form = getFormEl()    

    const inputName = getInputEl('text', 'name', 'Название', 'true')
    const inputShelf = getInputEl('text', 'shelf', 'Полка', 'true')
    const inputWEight = getInputEl('number', 'weight', 'Вес', 'true')
    const inputData = getInputEl('date', 'date', '', 'true')
    const buttonSubmit = getButtonEl('Добавить запись')
    form.append(inputName, inputShelf, inputWEight, inputData, buttonSubmit)
    
    mainWrap.append(title, form)
    
    inputName.addEventListener('input', ()=> {
        if(inputName.value.length < 2) {            
            setError(inputName, 'Название товара более 2 символов!')
        } else {
            clearError(inputName)
        }
    })
    inputShelf.addEventListener('input', ()=> {
        if(inputShelf.value.length < 2) {            
            setError(inputShelf, 'Название полки более 2 символов!')
        } else {
            clearError(inputShelf)
        }
    })
    inputWEight.addEventListener('input', ()=> {
        if(inputWEight.value <= 0) {            
            setError(inputWEight, 'Масса товара некорректая!')
        } else {
            clearError(inputWEight)
        }
    })

    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        //Создаем объект данных
        const formData = new FormData(form); 
    
        //Просмотр данных в консоли
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        //Преобразование в объект для отправки
        const data = Object.fromEntries(formData);
        console.log(data);
        addToLocalStorage(data)
               
        navigate('table')
    })
    
}

// Функция создания элемента таблицы
function getTableEl() {
    const table = document.createElement('table')
    table.classList.add('table')
    return table
}

// Создание шапки таблицы
function createHeadTable() {       
    const tableHead = document.createElement('thead')
    const row = document.createElement('tr')
    
    row.innerHTML = `        
        <tr>
            <th data-name = 'name'>Название</th>
            <th data-name = 'shelf'>Полка</th>
            <th data-name = 'weight'>Вес</th>
            <th data-name = 'date'>Время хранения</th>            
            <th></th>
        </tr>        
    `    
    tableHead.append(row)
    return tableHead
}

// Функция вывода на экран таблицы товаров
function renderTableEl(bodyData) {
    console.log('hi')
    const mainWrap = getMainWrap()

    const title = getTitleEl('Склад')
    const buttonAdd = getButtonEl('Добавить запись')
    const wrap = getWrapEl()
    wrap.append(title, buttonAdd)
    mainWrap.append(wrap)

    buttonAdd.addEventListener('click', function() {
        navigate('add')
    })

    const table = getTableEl()
    const headTableEl =  createHeadTable()
    let data = null
    if (!bodyData) {
        data = getFromLocalStorage()
    } else {
        data = bodyData
    }   
    
    const tableBody = renderTableBody(data)    
    table.append(headTableEl, tableBody)   

    mainWrap.append(table)
    sort()
    removeRow()
    
    console.log('hi2')

}

// Функция удаления объекта
function removeRow() {
    const table = document.querySelector('table')
    table.addEventListener('click', function(e) {
        const btn = e.target.closest("button")
        if(!btn) return
    
        const row = btn.closest("tr")
        if (!row) return
    
        const index = parseInt(btn.dataset.index)
    
        if(isNaN(index)){
            return
        }
    
        if (btn.classList.contains("removeRowBtn")) {
            // row.remove()
            const goods = JSON.parse(localStorage.getItem('goods')) || []
            goods.splice(index, 1)
            localStorage.setItem('goods', JSON.stringify(goods))
            renderTableEl()
            return
        }  
    })
}

function navigate(cardName) {
    const appEl = document.getElementById('app')
    appEl.innerHTML = ''  

    switch(cardName) {
        case 'add':
          createAddEl()
          break;
        case 'table':
          renderTableEl()
          break;
        default:
            if(getFromLocalStorage().length<1) {
                createAddEl()                
            } else {
                renderTableEl()
            }                     
      }
}

navigate()

function getAscDesc() {
    const goodsSortVal = {
        name: true,
        shelf: true,
        weight: true,
        data: true,
    }
    return goodsSortVal
}
let weight = true
let name = true
let shelf = true
let date = true;

// Функция сортировки объектов таблицы
function sort() {
    const thead = document.querySelector('table thead')
    
    thead.addEventListener('click', function(e) {
           
        const th = e.target.closest('th')
        if(!th) {
            return
        }
        const valSort = th.dataset.name        
        
        if(!valSort) {
            return
        } 
        
        const goodsSortVal = getAscDesc()
        console.log(goodsSortVal)

        const goods = getFromLocalStorage()
        const goodsNew = [...goods]  
        
        if(valSort==='name' && name===true) {
            goodsNew.sort((a, b) => a[valSort].toLowerCase().localeCompare(b[valSort].toLowerCase()))
            name = false
            renderTableEl(goodsNew)
            return          
        } else if(valSort==='name' && name===false) {
            goodsNew.sort((a, b) => b[valSort].toLowerCase().localeCompare(a[valSort].toLowerCase()))
            name = true
            renderTableEl(goodsNew)
            return 
        } else if(valSort==='shelf' && shelf===true) {
            goodsNew.sort((a, b) => a[valSort].toLowerCase().localeCompare(b[valSort].toLowerCase()))
            shelf = false     
            renderTableEl(goodsNew)
            return 
        } else if(valSort==='shelf' && shelf===false) {
            goodsNew.sort((a, b) => b[valSort].toLowerCase().localeCompare(a[valSort].toLowerCase()))
            shelf = true     
            renderTableEl(goodsNew)
            return 
        } else if(valSort==='weight' && weight===true) {
            goodsNew.sort((a, b) => a[valSort]- b[valSort])
            weight = false  
            renderTableEl(goodsNew)
            return                    
        } else if(valSort==='weight' && weight===false) {
            goodsNew.sort((a, b) => b[valSort]- a[valSort])
            weight = true  
            renderTableEl(goodsNew)
            return                    
        } else if(valSort==='date' && date===true) {
            goodsNew.sort((a, b) => new Date(a[valSort]) - new Date(b[valSort]))
            date = false
            renderTableEl(goodsNew)
            return 
        } else if(valSort==='date' && date===false) {
            goodsNew.sort((a, b) => new Date(b[valSort]) - new Date(a[valSort]))
            date = true
            renderTableEl(goodsNew)
            return 
        }                
    })    
}