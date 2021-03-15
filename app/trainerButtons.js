import { slooh } from '../index.js'
import { evaluateGuess, playTendencyNotes } from './trainer.js';

let tendencyMode;
let diatonicMode;
let chromaticMode;
const tendencyButton = document.getElementById('toggle-tendency');
const chromaticButton = document.getElementById('toggle-chromatic');
const diatonicButton = document.getElementById('toggle-diatonic');

// +++++++++++++++++++++
function toggleOnOff() {
   let cKey = document.querySelector(`.key[data-key='65']`);
   let key_of = document.getElementById('key-of');
   const button = document.getElementById('toggle-on-off');
   slooh.classList.toggle('on-off');
   if (slooh.getAttribute('class') == 'slooh on-off') {
      button.style.color = 'red';
      cKey.style.background = 'rgb(200, 200, 200)';
      key_of.innerHTML = 'C';
      key_of.style.color = 'rgb(200, 200, 200)';
      powerFlash();
   } else {
      button.style.color = 'rgb(200, 200, 200)';
      powerFlash();
      setTimeout(function () {
         location.reload();
      }, 1000)
   }
}
   let toggleOnOffButton = document.getElementById('toggle-on-off');
   toggleOnOffButton.onclick = toggleOnOff;
   
// +++++++++++++++++++++++++
function toggleChromatic() {
   if (!document.querySelector('.slooh.on-off')) return;
   slooh.classList.toggle('chromatic-mode');
   slooh.classList.remove('tendency-mode');
   slooh.classList.remove('diatonic-mode');
   chromaticMode = slooh.className;
   ButtonColor(chromaticMode, chromaticButton)
}
   let toggleChromaticButton = document.getElementById('toggle-chromatic');
   toggleChromaticButton.onclick = toggleChromatic;

// +++++++++++++++++++++++
function toggleDiatonic() {
   if (!document.querySelector('.slooh.on-off')) return;
   slooh.classList.toggle('diatonic-mode');
   slooh.classList.remove('tendency-mode');
   slooh.classList.remove('chromatic-mode');
   diatonicMode = slooh.className;
   ButtonColor(diatonicMode, diatonicButton)
}
   let toggleDiatonicButton = document.getElementById('toggle-diatonic');
   toggleDiatonicButton.onclick = toggleDiatonic;

// +++++++++++++++++++++++
function toggleTendency() {
   if (!document.querySelector('.slooh.on-off')) return;
   slooh.classList.toggle('tendency-mode');
   slooh.classList.remove('diatonic-mode');
   slooh.classList.remove('chromatic-mode');
   tendencyMode = slooh.className;
   ButtonColor(tendencyMode, tendencyButton)
}
   let toggleTendencyButton = document.getElementById('toggle-tendency');
   toggleTendencyButton.onclick = toggleTendency;

// ++++++++++++++++++++
function powerFlash() {
   const blinking_keys = document.querySelectorAll('.key');
   const display = document.querySelector('.output');
   const buttons = document.querySelectorAll('.button');

      function blinkBlink() {
         setTimeout(function () {
            blinking_keys.forEach(key =>
               key.classList.toggle('flash'));
            display.classList.toggle('flash');
            buttons.forEach(button => button.classList.toggle('flash'));
         }, 50);
      }
      
      let blinking = setInterval(blinkBlink, 50);
      setTimeout(function () {
         clearInterval(blinking);
      }, 230);
      
      blinking_keys.forEach(item => item.classList.add('flash'));
      display.classList.add('flash');
      buttons.forEach(button => button.classList.add('flash'));
      
      setTimeout(function () {
         blinking_keys.forEach(item => item.classList.remove('flash'))
         display.classList.remove('flash');
         buttons.forEach(button => button.classList.remove('flash'));
      },800)
}

// ++++++++++++++++++++++++++++++++
const buttons = [];
function ButtonColor(mode, button) {
   buttons.push(button);
   if (buttons.length > 2) buttons.shift();
   let previousButton = buttons[0];
   let toggleOff = 'slooh on-off';
   if (buttons.length > 1) {
      previousButton.style.color = 'rgb(200, 200, 200)';
      clearDisplay(previousButton);
   };
   if (mode !== toggleOff) {
      button.style.color = 'green';
   } else {
      button.style.color = 'rgb(200, 200, 200)';
      clearDisplay(button);
   };
}

// ++++++++++++++++++++++++++++
function clearDisplay(button) {
   document.getElementById('display2').innerHTML = '';
   document.getElementById('display3').innerHTML = '';
   if (button.getAttribute('id') == 'toggle-tendency') {
      playTendencyNotes();
   } else {
      evaluateGuess();
   };
}



