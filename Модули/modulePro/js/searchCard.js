import { getFromLocalStorage } from "./localstorage.js"
import { editRow } from "./editFindGoods.js"
import * as components from "./components.js"
import { createTableFind } from "./createTableFind.js"

// Функция создания формы и сохранения данных в localStorage
export function createSearchCard() {        
    const mainWrap = components.getMainWrapFind()
    
    const title = components.getTitleEl('Поиск')
    const form = components.getFormEl('form', 'form') 
    
    const inputName = components.getInputEl('select', 'name', 'Название', 'nameInputStyle', 'textField', 'true')
    const inputShelf = components.getInputEl('text', 'shelf', 'Полка', 'shelfInputStyle', 'textField', 'true')
    const inputWeight = components.getInputEl('number', 'weight', 'Вес', 'weightfInputStyle', 'textField', 'true')
    const inputDate = components.getInputEl('date', 'date', '', 'dateInputStyle', 'textField', 'true')
    const buttonEdit = components.getButtonEl('Сохранить', 'hidden', 'btnEdit')
    form.append(inputName, inputShelf, inputWeight, inputDate, buttonEdit)
        
    mainWrap.append(title, form)        
    
    form.addEventListener('input', ()=> {
                
        const container = document.getElementById('filtertable')
        if (container) {
            container.remove()
        }        

        const titleText = document.querySelector('.mainTitle')
    
        if(titleText.textContent === 'Редактирование') {
            console.log('stopReturn')
            return        
        }

        const inputNameVal = inputName.value.trim().toLowerCase()
        const inputShelfVal = inputShelf.value.trim().toLowerCase()
        const inputWeightVal = inputWeight.value
        const inputDateVal = inputDate.value

        const goods = getFromLocalStorage()
                
        const filtered = []

        for (let i=0; i < goods.length; i++) {
            const good = goods[i]
            
            let matches = true
            
            if(inputNameVal && !good.name.toLowerCase().startsWith(inputNameVal)) {
              matches = false
            }
            if(inputShelfVal && !good.shelf.toLowerCase().startsWith(inputShelfVal)) {
              matches = false
            }
            if(inputWeightVal && !good.weight.startsWith(inputWeightVal)) {
              matches = false
            }
            if(inputDateVal && String(good.date) !== inputDateVal) {      
              matches = false
            }            
        
            if(matches) {
              filtered.push(good)
            }
        }               
        
        const findTable = createTableFind(filtered)
        mainWrap.append(findTable)        
        
        if(filtered) {            
            editRow(filtered)            
        }               
    })       
}

