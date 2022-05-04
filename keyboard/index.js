import createContainerAndHeader from './js/containerAndHeader.js';
import createInput from './js/textInput.js';
import createKeyboard from './js/keyboard.js';

createContainerAndHeader();
createInput();
createKeyboard();

const rows = document.querySelectorAll('.row')
const input = document.querySelector('.input')


rows.forEach(e => {
  e.addEventListener('click', event => {
    if(event.target.textContent.length === 1){
      input.value += event.target.textContent
    }
  })
})