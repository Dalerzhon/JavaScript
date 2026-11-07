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

// function startProgress() {
//     let elem = document.getElementById('progressBar');
//     let width = 0;
//     let id = setInterval(frame, 10); // Увеличение каждые 10мс
  
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//       } else {
//         width++;
//         elem.style.width = width + '%';
//         // elem.innerHTML = width * 1 + '%'; // Текст внутри
//         timer.innerHTML = width * 1 + '%'; // Текст внутри
//       }
//     }
// }

// // 1. Задаем время окончания (например, через 10 секунд от текущего)
// const totalDuration = 10 * 1000; // 10 секунд в миллисекундах
// const startTime = Date.now();
// const endTime = startTime + totalDuration;

// const bar = document.getElementById("progressBar");
// const status = document.getElementById("timer");

// // 2. Функция обновления
// function updateProgress() {
//   const now = Date.now();
//   const timeLeft = endTime - now;
//   const progress = 100 - (timeLeft / totalDuration) * 100;

//   if (progress >= 100) {
//       bar.style.width = '100%';
//       bar.innerHTML = '100%';
      
//       clearInterval(interval); // Останавливаем таймер
//   } else {
//       bar.style.width = progress + '%';
//       bar.innerHTML = Math.round(progress) + '%';
//       status.innerHTML = now.tos;
//   }
// }

// // 3. Запускаем обновление каждые 50-100 мс для плавности
// const interval = setInterval(updateProgress, 50);

// window.onload = () => {
//   // alert('hi')
//     // startProgress() 
//     interval()
// }