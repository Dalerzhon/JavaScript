// Задание 1
function hello() {
    console.log('Skill');
  }
  try { 
    helo();
  } catch(error) {console.log(error)}
  console.log('complete');


//   Задание 2
// function greeting() {
//     const username = prompt("Введите имя пользователя");    
    
//     if (username===null || username.trim()=== "") {
//         throw new Error("Имя обязательно для заполнения")
//     }
// }
//   try {     
//     greeting();
//   } catch(error) {    
    
//     alert(error.message);    
//   }


// Задание 3
// function globalError() {
//     const error = Error('Глобальная ошибка');
//     error.name = 'GlobalError';
//     throw error;
// }
  
// function localError() {
//     const error = Error('Локальная ошибка');
//     error.name = 'LocalError';
//     throw error;
// }
  
// function testErrorScope(fn) {
//     try {
//       try {
//         fn();            
//       } catch (error) {
//         if (error.name === 'GlobalError') {
//         throw error
//         }
//         console.log('Обнаружена локальная ошибка');
//         console.error(error);        
//       }
//     } catch (error) {
//         console.log('Обнаружена глобальная ошибка');
//         console.error(error);
//     }
//   }
//   testErrorScope(localError);
//   testErrorScope(globalError);