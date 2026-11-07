const bodyEl = document.querySelector('body')
const wrapEl =document.createElement('div')
wrapEl.classList.add('wrapElStyle')
bodyEl.append(wrapEl)
const imgContainer = document.createElement('div')
imgContainer.classList.add('imgContainerStyle')
wrapEl.append(imgContainer)
const imgEl1 = document.createElement('img')
imgEl1.src = 'imgfolder/1.jpg'
imgEl1.classList.add('img1Style', 'img')
imgContainer.append(imgEl1)
const imgEl2 = document.createElement('img')
imgEl2.src = 'imgfolder/2.jpg'
imgEl2.classList.add('img2Style', 'img')
imgContainer.append(imgEl2)
const imgEl3 = document.createElement('img')
imgEl3.src = 'imgfolder/3.jpg'
imgEl3.classList.add('img3Style', 'img')
imgContainer.append(imgEl3)

const imgContainerBig = document.createElement('div')
imgContainerBig.classList.add('imgContainerBigStyle')
imgContainer.append(imgContainerBig)

function makeImgBig(event) {
    imgContainerBig.innerHTML = ''
    const urlEl = event.target.src    
    const imgBig = document.createElement('img')
    imgBig.src = urlEl
    imgBig.classList.add('imgBigStyle')    
    imgContainerBig.append(imgBig)    
}
imgEl1.addEventListener('click', makeImgBig)
imgEl2.addEventListener('click', makeImgBig)
imgEl3.addEventListener('click', makeImgBig)

// // Альтернатива клика
// const allImg = document.querySelectorAll('img')
// allImg.forEach(img => {
//     img.addEventListener('click', makeImgBig)
// })