import createContainerAndHeader from './js/containerAndHeader.js';
import createInput from './js/textInput.js';
import createKeyboard from './js/keyboard.js';
import keyData from './js/keydata.js';


createContainerAndHeader();
createInput();
createKeyboard();

const rows = document.querySelectorAll('.row')
const input = document.querySelector('.input')
const caps = document.querySelector('.CapsLock')


rows.forEach(e => {
  e.addEventListener('click', event => {
    if(event.target.textContent.length === 1){
      input.value += event.target.textContent
    }
  })
})



document.addEventListener('keydown', (e) => {
  if (e.altKey && e.ctrlKey) {
    console.log(123)
    
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < rows[i].children.length; j++){
        rows[i].children[j].innerHTML = keyData[i][j].key.ru
      }
    }
  }
  document.querySelector(`.${e.code}`).classList.add('key-active')
  if(e.key === 'Shift'){
    console.log(keyData[0][1].shift.en)
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < rows[i].children.length; j++){
        if(keyData[i][j].hasOwnProperty('shift')){
          rows[i].children[j].innerHTML = keyData[i][j].shift.en
        }
      }
    }
  }
  else if(e.key === 'CapsLock'){
    caps.classList.add('key_caps')
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < rows[i].children.length; j++){
        if(keyData[i][j].hasOwnProperty('shift')){
          rows[i].children[j].innerHTML = keyData[i][j].shift.en
        }
      }
    }
  }
  
})

document.addEventListener('keyup', (e) => {
  document.querySelector(`.${e.code}`).classList.remove('key-active')
  if(e.key === 'Shift'){
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < rows[i].children.length; j++){
        rows[i].children[j].innerHTML = keyData[i][j].key.en
      }
    }
  }
})

