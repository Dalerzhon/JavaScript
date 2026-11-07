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
    const form = components.getFormEl()    

    const inputName = components.getInputEl('text', 'name', 'Название', 'true')
    const inputShelf = components.getInputEl('text', 'shelf', 'Полка', 'true')
    const inputWEight = components.getInputEl('number', 'weight', 'Вес', 'true')
    const inputData = components.getInputEl('date', 'date', '', 'true')
    const buttonSubmit = components.getButtonEl('Добавить запись')
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
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
    
        //Преобразование в объект для отправки
        const data = Object.fromEntries(formData);
        
        addToLocalStorage(data)
               
        navigate('table')
    })
    
}