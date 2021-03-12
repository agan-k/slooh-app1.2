import { slooh } from './main.js'
import { playPiano } from './main.js';
import { playTendencyNotes } from './main.js';
import { evaluateGuess } from './main.js';



// ++++++++++++++++++++
function powerFlash() {
   const blinking_keys = document.querySelectorAll('.key');
   // if (on_off == 'power-on-off') {
      function blinkBlink() {
         setTimeout(function () {
            blinking_keys.forEach(key =>
               key.classList.toggle('flash'));
         }, 50);
      }
      let blinking = setInterval(blinkBlink, 50);
      setTimeout(function () {
         clearInterval(blinking);
      }, 230);
      blinking_keys.forEach(item => item.classList.add('flash'))
      setTimeout(function () {
         blinking_keys.forEach(item => item.classList.remove('flash'))
      },800)
   // }
}

// +++++++++++++++++++++++
// index of the starting key (C) in Transpose mode
let keyOfIndex = 0;
// list of tonalities (keyOf). the hex is for the flat (b) sign
let keyOfArr = ['C', 'D&#9837;', 'D', 'E&#9837;', 'E', 'F', 'G&#9837;', 'G', 'A&#9837;', 'A', 'B&#9837;', 'B'];
// ++++++++++++++++++++++
function toggleTranspose() {
   if (!document.querySelector('.slooh.on-off')) return;//exit
   // trainer display corresponding tonalities   
   keyOfIndex += 1;// increase index to switch to the next tonality
   if (keyOfIndex == keyOfArr.length) keyOfIndex = 0;// circle back to the starting tonality (C)

   // display current tonality in the 'Trainer' and color them
   let current_keyOf = document.getElementById('key-of').innerHTML = keyOfArr[keyOfIndex];
   //color transposed elements
   if (keyOfIndex !== 0) {
      document.getElementById('toggle-transpose').style.color = 'green';//button
      // document.getElementById('Do').style.background = 'rgb(235, 218, 132)'//piano key root
      document.getElementById('current-note').style.color = 'rgb(235, 218, 132)';//font
   };

   // ++LOAD AUDIO SAMPLES FOR NEW TE TONALITY++
   // 1. initiate new 'oneOctaveSrc' array where src's for entire octave vill be stored
   let oneOctaveSrc = [];
   // 2. make list and store all the pointers (src attribute values) into an array and iterate trough them
   let srcPointersList = [
            {src: 'samples/01E2.mp3', name: 'E' },
            {src: 'samples/02F2.mp3', name: 'F' },
            {src: 'samples/03Gb2.mp3', name: 'G&#9837;' },
            {src: 'samples/04G2.mp3', name: 'G' },
            {src: 'samples/05Ab2.mp3', name: 'A&#9837;' },
            {src: 'samples/06A2.mp3', name: 'A' },
            {src: 'samples/07Bb2.mp3', name: 'B&#9837;' },
            {src: 'samples/08B2.mp3', name: 'B' },
            {src: 'samples/09C3.mp3', name: 'C' },
            {src: 'samples/10Db3.mp3', name: 'D&#9837;' },
            {src: 'samples/11D3.mp3', name: 'D' },
            {src: 'samples/12Eb3.mp3', name: 'E&#9837;' },
            {src: 'samples/13E3.mp3', name: '' },
            {src: 'samples/14F3.mp3', name: '' },
            {src: 'samples/15Gb3.mp3', name: '' },
            {src: 'samples/16G3.mp3', name: '' },
            {src: 'samples/17Ab3.mp3', name: '' },
            {src: 'samples/18A3.mp3', name: '' },
            {src: 'samples/19Bb3.mp3', name: '' },
            {src: 'samples/20B3.mp3', name: '' },
            {src: 'samples/21C4.mp3', name: '' },
            {src: 'samples/22Db4.mp3', name: '' },
            {src: 'samples/23D4.mp3', name: '' },
            {src: 'samples/24Eb4.mp3', name: '' },
            {src: 'samples/25E4.mp3', name: '' },
            {src: 'samples/26F4.mp3', name: '' },
   ] 
   // 3. get index of starting note in new tonality
   let startingNoteIndex = srcPointersList.findIndex(item => item.name == current_keyOf)
   // 4. isolate attributes (src) and push them into ->
   let oneOctaveList = srcPointersList.slice(startingNoteIndex, startingNoteIndex + 15);
   // 5. oneOctaveSrc.push() all samples (attribute src='string') from that index to the length of current key (15 notes)
   oneOctaveList.map(item => oneOctaveSrc.push(item.src));
   // rearrange - move the ebony keys to the back of the newTonality array
   // this step is neccessary because in the '.piano' layout (index.html) '.keys ivory' && '.keys ebony'
   // are in separate div elements
   let major_scale_index = [0, 2, 4, 5, 7, 9, 11, 12, 14]
   let newTonality = [];
      // let ivory_keys = constructScale(oneOctaveSrc, scale_index);
      function constructScale(chromaticArr, scaleIndexArr) {
         let scale = [];
         for (let i = 0; i < scaleIndexArr.length; i++) {
            let index = scaleIndexArr[i];
            scale.push(chromaticArr[index]);
         }
         return scale;
      }
   let ivory_keys = constructScale(oneOctaveSrc, major_scale_index);
   
      ivory_keys.map(item => newTonality.push(item));
   let ebony_keys = [];
   for (let i = 0; i < oneOctaveSrc.length; i++) {
      if (!ivory_keys.includes(oneOctaveSrc[i])) {
         ebony_keys.push(oneOctaveSrc[i])
      }
   }
   ebony_keys.map(item => newTonality.push(item))
      
   // 6. construct nested for loop and set new attributes
   let samples = document.querySelectorAll('audio');
   for (let i = 0; i < newTonality.length; i++) {
   samples[i].setAttribute('src', `${newTonality[i]}`)
   };
}
   let toggleTransposeButton = document.getElementById('toggle-transpose');
   toggleTransposeButton.onclick = toggleTranspose;


let tendencyMode;
let diatonicMode;
let chromaticMode;
const tendencyButton = document.getElementById('toggle-tendency');
const chromaticButton = document.getElementById('toggle-chromatic');
const diatonicButton = document.getElementById('toggle-diatonic');

// ++++++++++++++++++++++++++++++++
const buttons = [];
function ButtonColor(mode, button) {
   buttons.push(button);
   if (buttons.length > 2) buttons.shift();
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
      alert('hi')
   };
}

// ++++++++++++++++++++++++++++
function clearDisplay(button) {
   document.getElementById('test-note').innerHTML = '';
   document.getElementById('correct-note').innerHTML = '';
   if (button.getAttribute('id') == 'toggle-tendency') {
      playTendencyNotes();
   } else {
      evaluateGuess();
   };
}

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

// +++++++++++++++++++++
function toggleOnOff() {
   let cKey = document.querySelector(`.key[data-key='65']`);
   let key_of = document.getElementById('key-of');
   const button = document.getElementById('toggle-on-off');
   slooh.classList.toggle('on-off');
   if (slooh.getAttribute('class') == 'slooh on-off') {
      button.style.color = 'red';
      cKey.style.background = 'rgb(235, 218, 132)';
      key_of.innerHTML = 'C';
      key_of.style.color = 'rgb(235, 218, 132)';
      powerFlash();
   } else {
      button.style.color = 'rgb(200, 200, 200)';
      powerFlash();
      setTimeout(function () {
         location.reload();
      }, 600)
   }
}
   let toggleOnOffButton = document.getElementById('toggle-on-off');
   toggleOnOffButton.onclick = toggleOnOff;

