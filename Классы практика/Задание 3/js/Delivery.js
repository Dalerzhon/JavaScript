export class Delivery {
    _nameLab = 'Имя'
    _addressLab = 'Адрес'
    _distanceLab = 'Расстояние'

    _name = ''
    _address = ''
    _distance = 0    
    _status = ''
    
    constructor(name, address, distance, status) {
        this.name = name
        this.address = address
        this.distance = distance    
        this.status = status
    }

    getelement() {
        // Контейнер
        this.cardEl = document.createElement('div')
        this.cardEl .classList.add('card')
        // Лейбл для имени
        this.nameLabEl = document.createElement('div')
        this.nameLabEl.classList.add('card__name-lab')
        this.nameLabEl.textContent = this._nameLab
       
        this.nameEl = document.createElement('strong')
        this.nameEl.classList.add('card__name')
        this.nameEl.textContent = this.name

        // Лейбл для адреса
        this.addressLabEl = document.createElement('div')
        this.addressLabEl.classList.add('card__address-lab')
        this.addressLabEl.textContent = this._addressLab

        this.addressEl = document.createElement('strong')
        this.addressEl.classList.add('card__address')
        this.addressEl.textContent = this.address

        // Лейбл для расстояния
        this.distanceLabEl = document.createElement('div')
        this.distanceLabEl.classList.add('card__distance-lab')
        this.distanceLabEl.textContent = this._distanceLab

        this.distanceEl = document.createElement('strong')
        this.distanceEl.classList.add('card__distance')
        this.distanceEl.textContent = `${this.distance} км`      

        // Помещаем элементы в контейнер
        this.cardEl.append(this.nameLabEl, this.nameEl, this.addressLabEl, this.addressEl, this.distanceLabEl, this.distanceEl)
        return this.cardEl
    }
   
    // Сеттер имени
    set name(value) {
        this._name = value

        if(this.nameEl) {
            this.nameEl.textContent = this._name 
        }
    }
    // Геттер имени
    get name() {
        return this._name 
    }

    // Сеттер адреса
    set address(value) {
        this._address = value

        if(this.addressEl) {
            this.addressEl.textContent = this._address 
        }
    }
    // Геттер адреса
    get address() {
        return this._address
    }

    // Сеттер дистанции
    set distance(value) {
        this._distance = value

        if(this.distanceEl) {
            this.distanceEl.textContent = this._distance
        }
    }
    // Геттер дистанции
    get distance() {
        return this._distance
    }
}