
import './app/trainerButtons.js'
import './app/transposeTonality.js'
import './app/info.js'

import { playPiano } from './app/App.js'
import { displayMonitor } from './app/display.js'

export const slooh = document.querySelector('.slooh');
const _VALID_COMP_KEYS = ["65", "83", "68", "70", "71", "72", "74", "75", "76", "87", "69", "84", "89", "85", "79"];

// /////////////// START //////////////////////////////////////////////////
// for unwanted clicks outside of piano keyboard
window.addEventListener('click', function () {
   pianoKeys.forEach(item => item.focus());
})

const pianoKeys = document.querySelectorAll('.key');
pianoKeys.forEach(item => item.addEventListener('click', inputTypeValue));
pianoKeys.forEach(item => item.focus());
pianoKeys.forEach(item => item.addEventListener('keydown', inputTypeValue));

// +++++++++++++++++++++++++
function inputTypeValue(e) {
   if (e.repeat) return; //stop e 'keydown' from continuous fireing
   let input;
   if (e.type == 'keydown') {
      input = e.keyCode.toString();
   } else if (e.type == 'click') {
      input = e.target.getAttribute('data-key');
   }
   return validateInput(e, input);
}

// ++++++++++++++++++++++++
function validateInput(e, input) {
   if (!_VALID_COMP_KEYS.includes(input)) {
      displayMonitor(`
   Invalid input. Use the assigned keys or click on the Piano keyboard.`)
   } else {
      displayMonitor();
      playPiano(e, input);
   }
}





