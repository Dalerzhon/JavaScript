
// Открытие и закрытие локации

const locationCity = document.querySelector('.location__city')
// Название выбранного города
const locationCityName = document.querySelector('.location__city-name')
const locationSublist = document.querySelector('.location__sublist')

// Открываем и закрываем список городов
function openCloseCityList() {
    locationCity.classList.toggle('location__city--active')
}

// Выбераем город
export function initLocationSelect() {
    locationCity.addEventListener('click', openCloseCityList)

    locationSublist.addEventListener('click', function(e){
    
        const link = e.target.closest('.location__sublink')
    
        if(!link){
            return
        }
    
        const selectedCity = link.textContent.trim()
        
        if(locationCityName) {
            locationCityName.textContent = selectedCity        
            locationCity.classList.remove('location__city--active')
        }
    })
}
