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
            <button class="removeRowBtn btn" data-index="${index}">Удалить</button>
            <button class="editRowBtn btn" data-index="${index}">Редактировать</button>
        </td>
        `
        
        tableBody.appendChild(row)        
    })
    // console.log(row)
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
export function createTableFind(date) {   
    if(date.length < 1 ) {
        return []
    }
    const container = components.getFilterContainerEl()

    const table = components.getTableEl()
    const headTableEl =  createHeadTable()
       
    const tableBody = renderTableBody(date)    
    table.append(headTableEl, tableBody)   

    container.append(table)
    
    return container   
}