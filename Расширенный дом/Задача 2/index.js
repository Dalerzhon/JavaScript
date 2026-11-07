const bodyEl = document.querySelector('body')
const wrapEl = document.createElement('div')
bodyEl.append(wrapEl)
wrapEl.classList.add('wrapEl')
const containerEl = document.createElement('div')
wrapEl.append(containerEl)
const ulEl = document.createElement('ul')
containerEl.append(ulEl)
ulEl.id = 'ulEl'
const addButton = document.createElement('button')
addButton.textContent = 'Добавить элемент'
containerEl.append(addButton)
addButton.classList.add('addBtnStyle')
const removeButton = document.createElement('button')
removeButton.textContent = 'Удалить элемент'
containerEl.append(removeButton)
removeButton.classList.add('removeBtnStyle')

function addLiEl() {
    const liEl = document.createElement('li')
    liEl.textContent = 'Новый элемент списка'
    ulEl.append(liEl)
}
addButton.addEventListener('click', addLiEl)

function removeLastLi() {
    const list = document.getElementById('ulEl')    
    const lastLi = list.lastChild
    if (lastLi) {
       lastLi.remove()        
    }
}
removeButton.addEventListener('click', removeLastLi)