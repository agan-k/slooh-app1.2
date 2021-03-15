import {
   playRandomPitch, evaluateGuess, playTendencyNotes, rootRefference
} from './trainer.js'
import { displaySolfege } from './display.js'

// +++++++++++++++++++++++++++++++++++++
export const playPiano = (e, input) => {
   if (!e) return; // exit any of the trainer modes but keep power on;
   // user triggers second event ('guess') after blinkAll() is called and thus calls evaluateGuess(e)
   if (document.querySelector('.blink')) return evaluateGuess(e, input);
   // If refference key NOT 'Do'(C) and Tendency Mode active, exit (mute other piano keys).
   if (!rootRefference(input) && document.querySelector('.slooh.tendency-mode')) return;
   //piano sounds and keys move
   getPianoSound(input);
   pressPianoKey(e, input);
   //display current solfege
   if (document.querySelector('.slooh.on-off')) displaySolfege(input, 'display1');
   //go to Tendency Mode
   if (document.querySelector('.slooh.tendency-mode')) return playTendencyNotes(e, input);
   // if chromatic mode not active, exit function
   if (!document.querySelector('.chromatic-mode') && !document.querySelector('.diatonic-mode')) return;
   let range = setRange(); //range is set by either diatonic or chromatic toggle
   playRandomPitch(range);
   lightAllKeys();
}

// ++++++++++++++++++++++++++++
function getPianoSound(input) {
   let pianoSound = document.querySelector(`audio[data-key="${input}"]`);
   if (!pianoSound) return; // ignore comp keys without audio
   pianoSound.currentTime = 0;// don't wait for the entire audio sample to ring out
   pianoSound.play();   
}

// +++++++++++++++++++++++++++++++
function pressPianoKey(e, input) {
   let pianoKey = document.querySelector(`.key[data-key="${input}"]`)
   // hold piano keys down util release
   pianoKey.classList.add('finger-down');
   if (e.type == 'keydown') {
      let pressedKeys = document.querySelectorAll('.key')
      pressedKeys.forEach(item => item.addEventListener('keyup', function (e) {
         if (pianoKey.getAttribute('data-key') == e.keyCode)
            pianoKey.classList.remove('finger-down');
      }));
   // automatic release on click   
   } else if (e.type == 'click') {
      setTimeout(function () {
         pianoKey.classList.remove('finger-down')
      }, 100);
   }
}

// ++++++++++++++++++
function setRange() {
   //range represents the pool from which test note 
   // is picked. (the pool can be chromatic, diatonic etc.)
   let range;
   if (document.querySelector('.slooh.chromatic-mode')) {
         range = 15;
   } else if (document.querySelector('.slooh.diatonic-mode')) {
         range = 9;//nine notes minus the root
   }
   return range;
}

// ++++++++++++++++++++++
function lightAllKeys() {
   const blinking_keys = document.querySelectorAll('.key');
      setTimeout(function() {
         blinking_keys.forEach(item => item.classList.add('blink'))
      }, 800)
}

// ++++++++++++++++++
function openInfo() {
   document.getElementById('description-container').classList.add('open');
}
let openInfoButton = document.getElementById('info');
openInfoButton.onclick = openInfo;

// +++++++++++++++++++
function closeInfo() {
   document.getElementById('description-container').classList.remove('open');
}
let closeInfoButton = document.getElementById('description-container');
closeInfoButton.onclick = closeInfo;