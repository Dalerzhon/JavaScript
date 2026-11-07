import { editInLocalStorage } from "./localstorage.js"
import { deletInLocalStorage } from "./localstorage.js"
import { navigate } from "./navigate.js"

// Функция редактирования объекта
export function editRow(filtered) {
    
    const table = document.querySelector('table')
        
    if(table) {
        
        table.addEventListener('click', function(e) {
            
            const btn = e.target.closest("button")
            if(!btn) return
        
            const row = btn.closest("tr")
            if (!row) return
        
            const index = parseInt(btn.dataset.index)
            console.log(index)
            if(isNaN(index)){
                return
            }
        
            if (btn.classList.contains("editRowBtn")) {
                
                const targetRow = filtered[index]
                
                startEdit(targetRow)

                const filterTable = document.getElementById('filtertable')
                filterTable.remove()         
            }
            if (btn.classList.contains("removeRowBtn")) {
                
                const targetRow = filtered[index]
                findIndex(targetRow, 'remove')
                const filterTable = document.getElementById('filtertable')
                filterTable.remove()         
            } 
        })       
    }  
}

// Функция которая выводить изменяемый объект в поля input
export function startEdit(targetRow) {    
    const inputName = document.getElementById('nameInputStyle').value = targetRow.name
    const inputShelf = document.getElementById('shelfInputStyle').value = targetRow.shelf
    const inputWeight = document.getElementById('weightfInputStyle').value = targetRow.weight
    const inputDate = document.getElementById('dateInputStyle').value = targetRow.date
    
    const buttonSubmit = document.getElementById('btnEdit')
    buttonSubmit.className = 'button'

    const editTitle = document.querySelector('.mainTitle')
    editTitle.textContent = 'Редактирование'

    findIndex(targetRow, 'edit') 
}

// Функция для нахождения индекса изменяемого объекта, не в 
// отфильтрованной таблице а в localStorage, так как у объетов нету id
function findIndex(targetRow, action) {
    const goods = JSON.parse(localStorage.getItem('goods')) || []
        
    for (let i=0; i < goods.length; i++) {

        const good = goods[i]

        let matches = true

        if(targetRow.name !== good.name) {
            matches = false
        }
        if(targetRow.shelf !== good.shelf) {
            matches = false
        }
        if(targetRow.weight !== good.weight) {
            matches = false
        }
        if(targetRow.date !== good.date) {
            matches = false
        }

        if(matches) {           
            const targetIndex = i
            // console.log(targetIndex)
            if(action==='edit') {
                saveEditObj(targetIndex)
            }
            if(action==='remove') {
                deleteFindObj(targetIndex)
            }           
        }
    }  
}

// Функция для сохранения изменений в объекте
function saveEditObj(targetIndex) {

    const form = document.getElementById('form')

    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        //Создаем объект данных
        const formData = new FormData(form)     
    
        //Преобразование в объект для отправки
        const data = Object.fromEntries(formData)
        
        editInLocalStorage(data, targetIndex)
        
        navigate('table')  
    })    
}

// Функция для удаления изменений в объекте
function deleteFindObj(targetIndex) {
    deletInLocalStorage(targetIndex)
}
