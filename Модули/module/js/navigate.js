import { getFromLocalStorage } from "./localstorage.js"
import { getLoaderEl } from "./components.js"

// Функция навигации по страницам
export async function navigate(cardName) {

  const appEl = document.getElementById('app')
  appEl.innerHTML = ''  

  const loaderEl = getLoaderEl()
  appEl.append(loaderEl)

  switch(cardName) {
      case 'add':
        const formCard = await import("./formCard.js")
        formCard.createFormCard()        
        break;
      case 'table':
        const tableCard = await import("./tableCard.js")
        tableCard.createTableCard()        
        break;
      default:
          if(getFromLocalStorage().length<1) {
              const formCard = await import("./formCard.js")
              formCard.createFormCard()              
          } else {
              const tableCard = await import("./tableCard.js")
              tableCard.createTableCard()
          }                     
    }
}