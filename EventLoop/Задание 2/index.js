const container = document.createElement('div')
container.classList.add('container')

const progressBar = document.createElement('div')
progressBar.classList.add('progressBar')
progressBar.id = 'progress-bar'

const progressEl = document.createElement('div')
progressEl.classList.add('progressEl')
progressEl.id = 'progressEl'

const timerDisplay = document.createElement('div')
timerDisplay.classList.add('timerEl')
timerDisplay.id = 'timerEl'

progressBar.append(progressEl)
container.append(progressBar, timerDisplay)

document.body.append(container)

let currentTimer = null

// Функция отрисовки прогресса
function progress(time) {

    if (time < 2) {
      time = 2
    }

    if (currentTimer) {
      clearInterval(currentTimer)
      currentTimer = null
    }

    // Сбрасываем начальное состояние
    progressEl.style.transition = 'none'
    progressEl.style.transform = 'scaleX(0)'
    timerDisplay.textContent = '0 c'

    void progressEl.offsetWidth

    // Устанавливаем плавную анимацию
    progressEl.style.transition = `transform ${time}s linear`
    progressEl.style.transform = 'scaleX(1)'
    

    let secondPassed = 0
    currentTimer = setInterval(() => {
      secondPassed++
      timerDisplay.textContent = `${secondPassed} c`

      if(secondPassed >= time) {
        clearInterval(currentTimer)
        currentTimer = null
        timerDisplay.textContent = `${secondPassed} c`
      }

    }, 1000)  
}

progress(7)
