import {Delivery} from './Delivery.js'

export default class EditDelivery extends Delivery {
    
    constructor(name, address, distance, status) {        
        super(name, address, distance, status)        
    }
   
    
    getelement() {    
        // Вызиваем метод getelement из класса Delivery
        this.cardEl = super.getelement()
        
        // Вызиваем метод getEditButtonEl
        this.editButtonEl = this.getEditButtonEl()

        // Вызиваем метод для создания попапа
        this.getChangePopapEl = this.getChangePopapEl()

        // Закрываем попап при нажатии кнопки закрыть
        this.closeBtnEl.addEventListener('click', ()=>{
            this.overlayWrapEl.classList.remove('open')
            this.blurContainerEl.classList.remove('open')
        })

        // Открываем попап при нажатии кнопки изменить
        this.editButtonEl.addEventListener('click', ()=>{
            const app = document.getElementById('app')
            app.append(this.getChangePopapEl, this.blurContainerEl)
            this.overlayWrapEl.classList.add('open')
            this.blurContainerEl.classList.add('open')

            // Данные из карточки получаем через геттеры и помешаем в инпутах попапа
            // пример: this.status это геттер статуса
            this.inputNameEl.value = this.name
            this.inputAddressEl.value = this.address
            this.inputDistanceEl.value = this.distance
            this.inputStatusEl.value = this.status           
        })
        
        // Изменяем данные карточки при нажатии кнопки сохранить
        this.submitBtnEl.addEventListener('click', (e)=>{
            e.preventDefault()
           
            this.name = this.inputNameEl.value
            this.address = this.inputAddressEl.value
            this.distance = this.inputDistanceEl.value
            this.status = this.inputStatusEl.value
            
            // Закрываем попап и блур при нажатии кноки сохранить
            this.overlayWrapEl.classList.remove('open')
            this.blurContainerEl.classList.remove('open')                
        })        

        this.cardEl.append(this.editButtonEl)

        return this.cardEl
    }
    
    // Кнопка на карточке для отображения попапа
    getEditButtonEl() {
        const editButtonEl = document.createElement('button')
        editButtonEl.classList.add('card__edit-btn')
        editButtonEl.textContent = 'Изменить' 

        return editButtonEl
    }

    // Попап для изменения данных
    getChangePopapEl() {
        this.overlayWrapEl = document.createElement('div')
        this.overlayWrapEl.classList.add('overlayWrapEl-style')

        // При открытии попапа экран накрываем блуром
        this.blurContainerEl = document.createElement('div')
        this.blurContainerEl.classList.add('blurContainerEl')
        

        // Кнопка для закрытия
        this.closeBtnEl = document.createElement('button')
        this.closeBtnEl.classList.add('closeBtnEl')
        this.closeBtnEl.textContent = 'x'

        // Заголовок попапа
        const titleOvetlay = document.createElement('h2')
        titleOvetlay.classList.add('titleOverlay')
        titleOvetlay.textContent = 'Изменить'

        // Форма для изменения данных карточки
        const formEl = document.createElement('form')
        formEl.classList.add('formEl')

        this.inputNameEl = document.createElement('input')
        this.inputNameEl.classList.add('inputNameEl', 'formElemetn')

        this.inputAddressEl = document.createElement('input')
        this.inputAddressEl.classList.add('inputAddressEl', 'formElemetn')

        this.inputDistanceEl = document.createElement('input')
        this.inputDistanceEl.classList.add('inputDistanceEl', 'formElemetn')
       
        // Статус доставки
        this.inputStatusEl = document.createElement('select')
        this.inputStatusEl.classList.add('inputStatusEl', 'formElemetn')        
        // Опция статуса, отменен
        const сancelStatusEl = document.createElement('option')
        сancelStatusEl.classList.add('сancelStatusEl')
        сancelStatusEl.value = 'canceled'
        сancelStatusEl.textContent = 'Отменен'
        // Опция статуса, доставлен
        const deliveredStatusEl = document.createElement('option')
        deliveredStatusEl.classList.add('deliveredStatusEl')
        deliveredStatusEl.value = 'delivered'
        deliveredStatusEl.textContent = 'Доставлен'
        // Опция статуса, доставляется
        const deliveryStatusEl = document.createElement('option')
        deliveryStatusEl.classList.add('deliveryStatusEl')
        deliveryStatusEl.value = 'delivery'
        deliveryStatusEl.textContent = 'Доставляется'

        // Добавляем опции в статус
        this.inputStatusEl.append(сancelStatusEl, deliveredStatusEl, deliveryStatusEl)        

        // Кнопка сохранения изменений
        this.submitBtnEl = document.createElement('button')
        this.submitBtnEl.classList.add('submitBtnEl', 'formElemetn')
        this.submitBtnEl.textContent = 'Сохранить'


        formEl.append(this.inputNameEl, this.inputAddressEl, this.inputDistanceEl, this.inputStatusEl, this.submitBtnEl)

       
        this.overlayWrapEl.append(this.closeBtnEl, titleOvetlay, formEl)

        return this.overlayWrapEl
    }
}