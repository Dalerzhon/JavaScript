import { addToLocalStorage } from "./localstorage.js"
import { navigate } from "./navigate.js"
import * as components from "./components.js"

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
export function createFormCard() {    
    const mainWrap = components.getMainWrap()

    const title = components.getTitleEl('Добавить запись')
    const form = components.getFormEl('form', 'form')    

    const inputName = components.getInputEl('text', 'name', 'Название', 'nameInputStyle', 'textField', 'true')
    const inputShelf = components.getInputEl('text', 'shelf', 'Полка', 'shelfInputStyle', 'textField', 'true')
    const inputWeight = components.getInputEl('number', 'weight', 'Вес', 'weightfInputStyle', 'textField', 'true')
    const inputDate = components.getInputEl('date', 'date', '', 'dateInputStyle', 'textField', 'true')
    
    const buttonSubmit = components.getButtonEl('Добавить запись')
    form.append(inputName, inputShelf, inputWeight, inputDate, buttonSubmit)
    
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
    inputWeight.addEventListener('input', ()=> {
        if(inputWeight.value <= 0) {            
            setError(inputWeight, 'Масса товара некорректая!')
        } else {
            clearError(inputWeight)
        }
    })

    form.addEventListener('submit', (e)=> {
        e.preventDefault()

        //Создаем объект данных
        const formData = new FormData(form); 
        
        //Преобразование в объект для отправки
        const data = Object.fromEntries(formData);
        
        addToLocalStorage(data)
               
        navigate('table')
    })
    
}