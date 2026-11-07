const bodyEl = document.querySelector('body')
const wrapEl = document.createElement('div')
bodyEl.append(wrapEl)
wrapEl.classList.add('wrapEl')
const containerEl = document.createElement('div')
wrapEl.append(containerEl)
const ulEl = document.createElement('ul')
containerEl.append(ulEl)
ulEl.id = 'ulEl'
const sortAscendingBtn = document.createElement('button')
sortAscendingBtn.textContent = 'Сортировать по возрастанию'
containerEl.append(sortAscendingBtn)
sortAscendingBtn.classList.add('sortAscendingBtnStyle')
const sortDescendingBtn = document.createElement('button')
sortDescendingBtn.textContent = 'Сортировать по убыванию'
containerEl.append(sortDescendingBtn)
sortDescendingBtn.classList.add('sortDescendingBtnStyle')

const prices = [100, 500, 250, 750, 300]

// Функция вывода массива на экран внутри li
function renderList(arr) {
    ulEl.innerHTML = ''      
    for (let i = 0; i < arr.length; i++) {   
        const liEl = document.createElement('li')
        liEl.textContent = arr[i]
        ulEl.append(liEl)
    }
}

// Функция сортировки массива по возрастанию
function sortAscending() {     
    const pricesAsc = [...prices]                    
    pricesAsc.sort((a, b) => a - b)
    renderList(pricesAsc)    
}
sortAscendingBtn.addEventListener('click', sortAscending)

// Функция сортировки массива по убыванию
function sortDescending() {   
    const pricesDes = [...prices]   
    pricesDes.sort((a, b) => b - a)
    renderList(pricesDes)    
}
sortDescendingBtn.addEventListener('click', sortDescending)
