export class Delivery {
    _nameLab = 'Имя'
    _addressLab = 'Адрес'
    _distanceLab = 'Расстояние'

    _name = ''
    _address = ''
    _distance = 0

    constructor(name, address, distance) {
        this.name = name
        this.address = address
        this.distance = distance
        
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

        // Отображение статуса
        this.statusPrint = document.createElement('div')
        this.statusPrint.classList.add('statusPrint')
        this.statusPrint.textContent = this.status

        // Помещаем элементы в контейнер
        this.cardEl.append(this.nameLabEl, this.nameEl, this.addressLabEl, this.addressEl, this.distanceLabEl, this.distanceEl, this.statusPrint)
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

    // Сеттер статуса
    set status(value) {
        this._status = value

        if(this.cardEl){
            switch (value) {            
                case 'canceled':                    
                    this.cardEl.className = 'card statusCanceled'                 
                    this.statusPrint.textContent = this._status
                    break;
                case 'delivered':                        
                    this.cardEl.className = 'card statusDelivered'              
                    this.statusPrint.textContent = this._status
                    break;
                case 'delivery':
                    this.cardEl.className = 'card statusDelivery'
                    this.statusPrint.textContent = this._status
                    break;
                default:                
            }            
        }        
    }

    // Геттер статуса
    get status() {
        return this._status
    }
}