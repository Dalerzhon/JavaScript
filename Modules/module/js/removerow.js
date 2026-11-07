import { createTableCard } from "./tableCard.js"

// Функция удаления объекта
export function removeRow() {
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
            createTableCard()
            return
        }  
    })
}

