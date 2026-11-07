import { getFromLocalStorage } from "./localstorage.js"
import { createTableCard } from "./tableCard.js"


let weight = true
let name = true
let shelf = true
let date = true;

// Функция сортировки объектов таблицы
export function sort() {
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
        
        
        const goods = getFromLocalStorage()
        const goodsNew = [...goods]  
        
        if(valSort==='name' && name===true) {
            goodsNew.sort((a, b) => a[valSort].toLowerCase().localeCompare(b[valSort].toLowerCase()))
            name = false
            createTableCard(goodsNew)
            return          
        } else if(valSort==='name' && name===false) {
            goodsNew.sort((a, b) => b[valSort].toLowerCase().localeCompare(a[valSort].toLowerCase()))
            name = true
            createTableCard(goodsNew)
            return 
        } else if(valSort==='shelf' && shelf===true) {
            goodsNew.sort((a, b) => a[valSort].toLowerCase().localeCompare(b[valSort].toLowerCase()))
            shelf = false     
            createTableCard(goodsNew)
            return 
        } else if(valSort==='shelf' && shelf===false) {
            goodsNew.sort((a, b) => b[valSort].toLowerCase().localeCompare(a[valSort].toLowerCase()))
            shelf = true     
            createTableCard(goodsNew)
            return 
        } else if(valSort==='weight' && weight===true) {
            goodsNew.sort((a, b) => a[valSort]- b[valSort])
            weight = false  
            createTableCard(goodsNew)
            return                    
        } else if(valSort==='weight' && weight===false) {
            goodsNew.sort((a, b) => b[valSort]- a[valSort])
            weight = true  
            createTableCard(goodsNew)
            return                    
        } else if(valSort==='date' && date===true) {
            goodsNew.sort((a, b) => new Date(a[valSort]) - new Date(b[valSort]))
            date = false
            createTableCard(goodsNew)
            return 
        } else if(valSort==='date' && date===false) {
            goodsNew.sort((a, b) => new Date(b[valSort]) - new Date(a[valSort]))
            date = true
            createTableCard(goodsNew)
            return 
        }                
    })    
}