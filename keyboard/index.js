import createContainerAndHeader from './js/containerAndHeader.js';
import createInput from './js/textInput.js';
import createKeyboard from './js/keyboard.js';
import keyData from './js/keydata.js';

createContainerAndHeader();
createInput();
createKeyboard();

const rows = document.querySelectorAll('.row');
const input = document.querySelector('.input');
const caps = document.querySelector('.CapsLock');

let lang = 'en';
input.focus();
let cursor = input.selectionStart;

function shiftChange(e) {
  if (e.type === 'keydown') {
    if (!caps.classList.contains('key_caps')) {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          if (Object.keys(keyData[i][j]).includes('shift')) {
            rows[i].children[j].innerHTML = keyData[i][j].shift[lang];
          }
        }
      }
    } else {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          if (Object.keys(keyData[i][j]).includes('shift') && rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].shift[lang].toLowerCase();
          }
        }
      }
    }
  }
  if (e.type === 'keyup') {
    if (!caps.classList.contains('key_caps')) {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          rows[i].children[j].innerHTML = keyData[i][j].key[lang];
        }
      }
    } else {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          if (rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].key[lang].toUpperCase();
          }
        }
      }
    }
  }
}

function capsChange() {
  if (!caps.classList.contains('key_caps')) {
    caps.classList.add('key_caps');
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < rows[i].children.length; j += 1) {
        if (rows[i].children[j].textContent.length === 1) {
          rows[i].children[j].innerHTML = rows[i].children[j].innerHTML.toUpperCase();
        }
      }
    }
  } else {
    caps.classList.remove('key_caps');
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < rows[i].children.length; j += 1) {
        if (rows[i].children[j].textContent.length === 1) {
          rows[i].children[j].innerHTML = rows[i].children[j].innerHTML.toLowerCase();
        }
      }
    }
  }
}

rows.forEach((e) => {
  e.addEventListener('click', (event) => {
    if (event.target.textContent.length === 1) {
      if (input.selectionStart === input.value.length) {
        cursor = input.value.length;
      }
      input.setSelectionRange(cursor, cursor);
      const text = [...input.value];
      text.splice(cursor, 0, event.target.textContent);
      input.value = text.join('');
      cursor += 1;
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.ctrlKey) {
    if (lang === 'en') {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].key.ru;
          } else if (rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].key.ru.toUpperCase();
          }
        }
      }
      lang = 'ru';
    } else {
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < rows[i].children.length; j += 1) {
          if (!caps.classList.contains('key_caps') && rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].key.en;
          } else if (rows[i].children[j].textContent.length === 1) {
            rows[i].children[j].innerHTML = keyData[i][j].key.en.toUpperCase();
          }
        }
      }
      lang = 'en';
    }
  }
  document.querySelector(`.${e.code}`).classList.add('key-active');
  if (e.key === 'Shift') {
    shiftChange(e);
  } else if (e.key === 'CapsLock') {
    capsChange();
  } else if (e.key.length === 1) {
    e.preventDefault();
    input.setSelectionRange(cursor, cursor);
    let text = [...input.value];
    const cur = e.key;
    text.splice(cursor, 0, cur);
    text = text.join('');
    input.value = text;
    cursor += 1;
    input.setSelectionRange(cursor, cursor);
  }
});

document.addEventListener('keyup', (e) => {
  document.querySelector(`.${e.code}`).classList.remove('key-active');
  if (e.key === 'Shift') {
    shiftChange(e);
  }
});

input.addEventListener('click', () => {
  cursor = input.selectionStart;
  input.setSelectionRange(cursor, cursor);
});
