import { getFromLocalStorage } from "./localstorage.js"
import { sort } from "./sort.js"
import { removeRow } from "./removerow.js"
import { navigate } from "./navigate.js"
import * as components from "./components.js"

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
    
    return tableBody    
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
export function createTableCard(bodyData) {
    
    const mainWrap = components.getMainWrap()

    const title = components.getTitleEl('Склад')
    const buttonAdd = components.getButtonEl('Добавить запись')
    const wrap = components.getWrapEl()
    wrap.append(title, buttonAdd)
    mainWrap.append(wrap)

    buttonAdd.addEventListener('click', function() {
        navigate('add')
    })

    const table = components.getTableEl()
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
}