import './toggleLogic.js'
// const pianoSound = document.querySelector(`audio[data-key="${inputTypeValue(e)}"]`);
let _TEST_NOTE;
export const slooh = document.querySelector('.slooh');
const _VALID_COMP_KEYS = ["65", "83", "68", "70", "71", "72", "74", "75", "76", "87", "69", "84", "89", "85", "79"]

// // +++++++++++++++++++++++++
// function inputType(e) {
//    let event;
//    if (e.type == 'keydown') {
//       event = e.keyCode.toString();
//    } else if (e.type == 'click') {
//       event = e.target.getAttribute('data-key')
//    }
//    return event;
// }
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

// // ++++++++++++++++++++++++
// function validateInput(e) {
   
//    let valid = _VALID_COMP_KEYS.includes(e.keyCode.toString());//true
//    invalidInputMessage(valid)//display message if invalid input
//    if (!valid) return;//exit if invalid input
//    playPiano(e);
// }
// ++++++++++++++++++++++++
function validateInput(e, input) {
   // if (input.type )
   let valid = _VALID_COMP_KEYS.includes(input);//true
   invalidInputMessage(valid)//display message if invalid input
   if (!valid) return;//exit if invalid input
   playPiano(e, input);
   
}

// ++++++++++++++++++++++++++++++++++
function invalidInputMessage(valid) {
   let test_note = document.getElementById('test-note');
   let correct_note = document.getElementById('correct-note');
   test_note.innerHTML = '';
   correct_note.innerHTML = '';
   let monitor = document.getElementById('monitor');
   let heading = document.createElement("H1");
   let paragraph = document.createElement("P");
   if (monitor.hasChildNodes()) {
      while (monitor.firstChild) { monitor.removeChild(monitor.firstChild); }
   }
   if (!valid) {
      monitor.appendChild(paragraph);
      paragraph.innerHTML = "Invalid input. Use the assigned keys or click on the Piano keyboard."
   }
   else {
      monitor.appendChild(heading);
      heading.innerHTML = "slo͞oh"
   }
}

// // ++++++++++++++++++++++++++++++
// export const playPiano = (e) => {
//    if (!e) return; // exit any of the trainer modes but keep power on;
//    if (e.repeat) return; // stop event 'keydown' from continuous fireing
//    // user triggers second event ('guess') after blinkAll() is called and thus calls evaluateGuess(e)
//    if (document.querySelector('.blink')) return evaluateGuess(e);
//    // If refference key NOT 'Do'(C) and Tendency Mode active, exit (mute other piano keys).
//    if (!yellowReffNote(e) && document.querySelector('.slooh.tendency-mode')) return;
//    //piano sounds and keys move
//    getPianoSound(e);
//    pressPianoKey(e);
//    //display current solfege
//    let current_note_display = document.getElementById('current-note')
//    if (document.querySelector('.slooh.on-off')) displaySolfege(e, current_note_display);
//    //go to Tendency Mode
//    if (document.querySelector('.slooh.tendency-mode')) return playTendencyNotes(e);
//    // if chromatic mode not active, exit function
//    if (!document.querySelector('.chromatic-mode') && !document.querySelector('.diatonic-mode')) return;
//    let range = setRange(); //range is set by either diatonic or chromatic toggle
//    playRandomPitch(range);
//    lightAllKeys();
// }
// ++++++++++++++++++++++++++++++
export const playPiano = (e, input) => {
   if (!input) return; // exit any of the trainer modes but keep power on;
   // user triggers second event ('guess') after blinkAll() is called and thus calls evaluateGuess(e)
   if (document.querySelector('.blink')) return evaluateGuess(input);
   // If refference key NOT 'Do'(C) and Tendency Mode active, exit (mute other piano keys).
   if (!yellowReffNote(input) && document.querySelector('.slooh.tendency-mode')) return;
   //piano sounds and keys move
   getPianoSound(input);
   // console.log(input)
   // debugger
   pressPianoKey(e, input);
   //display current solfege
   let current_note_display = document.getElementById('current-note')
   if (document.querySelector('.slooh.on-off')) displaySolfege(input, current_note_display);
   //go to Tendency Mode
   if (document.querySelector('.slooh.tendency-mode')) return playTendencyNotes(e,input);
   // if chromatic mode not active, exit function
   if (!document.querySelector('.chromatic-mode') && !document.querySelector('.diatonic-mode')) return;
   let range = setRange(); //range is set by either diatonic or chromatic toggle
   playRandomPitch(range);
   lightAllKeys();
}

// // ++++++++++++++++++++++++
// function getPianoSound(e) {
//    let pianoSound = document.
//       querySelector(`audio[data-key="${inputTypeValue(e)}"]`);
//    if (!pianoSound) return; // ignore comp keys without audio
//    pianoSound.currentTime = 0;// don't wait for the entire audio sample to ring out
//    pianoSound.play();   
// }
// ++++++++++++++++++++++++
function getPianoSound(input) {
   let pianoSound = document.querySelector(`audio[data-key="${input}"]`);
   if (!pianoSound) return; // ignore comp keys without audio
   pianoSound.currentTime = 0;// don't wait for the entire audio sample to ring out
   pianoSound.play();   
}

// // ++++++++++++++++++++++++
// function pressPianoKey(e) {
//    let pianoKey = document.querySelector(`.key[data-key="${inputTypeValue(e)}"]`)
//    // hold piano keys down util release
//    pianoKey.classList.add('finger-down');
//    if (e.type == 'keydown') {
//       let pressedKeys = document.querySelectorAll('.key')
//       pressedKeys.forEach(item => item.addEventListener('keyup', function (e) {
//          if (pianoKey.getAttribute('data-key') == e.keyCode)
//             pianoKey.classList.remove('finger-down');
//       }));
//    } else if (e.type == 'click') {
//       setTimeout(function () {
//          pianoKey.classList.remove('finger-down')
//       }, 100);
//    }
// }
// ++++++++++++++++++++++++
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


// // +++++++++++++++++++++++++++
// let count = -1;
// // ++++++++++++++++++++++++++++
// export const playTendencyNotes = (e) => {
//    if (!e) return count = -1;//coming from toggleTendency (off)
//    if (!yellowReffNote(e)) return;//accept only root (yellow key) input
   
//    const chromatic_scale = document.querySelectorAll('audio');
//    //tendency pairs represented in chromatic scale
//    let tendency_list = [[1, 0], [3, 2], [5, 4], [6, 7], [4, 0]];
//    count += 1;
//    if (count == tendency_list.length) count = 0;
//    let tendency_pair = tendency_list[count];
  
//    let data_key0 = chromatic_scale[tendency_pair[0]].getAttribute('data-key');
//    let data_key1 = chromatic_scale[tendency_pair[1]].getAttribute('data-key');
//    let tendency1_display = document.getElementById('test-note');
//    let tendency2_display = document.getElementById('correct-note');
//       setTimeout(function() {
//          chromatic_scale[tendency_pair[0]].play()
//          chromatic_scale[tendency_pair[0]].currentTime = 0;
//          //display tendency pair
//          tendency1_display.innerHTML = document.
//             querySelector(`.key[data-key='${data_key0}']`).getAttribute('id');
//          tendency1_display.style.color = 'rgb(231, 100, 100)'
//          setTimeout(function () {
//             //display tendency pair
//             tendency2_display.innerHTML = document.
//                querySelector(`.key[data-key='${data_key1}']`).getAttribute('id');
//             tendency2_display.style.color = 'rgb(163, 231, 240)'
//             chromatic_scale[tendency_pair[1]].play()
//             chromatic_scale[tendency_pair[1]].currentTime = 0;
//          }, 700);
//       }, 700);
// }
// +++++++++++++++++++++++++++
let count = -1;
// ++++++++++++++++++++++++++++
export const playTendencyNotes = (e, input) => {
   if (!e) return count = -1;//coming from toggleTendency (off)
   if (!yellowReffNote(e)) return;//accept only root (yellow key) input
   
   const chromatic_scale = document.querySelectorAll('audio');
   //tendency pairs represented in chromatic scale
   let tendency_list = [[1, 0], [3, 2], [5, 4], [6, 7], [4, 0]];
   count += 1;
   if (count == tendency_list.length) count = 0;
   let tendency_pair = tendency_list[count];
  
   let data_key0 = chromatic_scale[tendency_pair[0]].getAttribute('data-key');
   let data_key1 = chromatic_scale[tendency_pair[1]].getAttribute('data-key');
   let tendency1_display = document.getElementById('test-note');
   let tendency2_display = document.getElementById('correct-note');
      setTimeout(function() {
         chromatic_scale[tendency_pair[0]].play()
         chromatic_scale[tendency_pair[0]].currentTime = 0;
         //display tendency pair
         tendency1_display.innerHTML = document.
            querySelector(`.key[data-key='${data_key0}']`).getAttribute('id');
         tendency1_display.style.color = 'rgb(231, 100, 100)'
         setTimeout(function () {
            //display tendency pair
            tendency2_display.innerHTML = document.
               querySelector(`.key[data-key='${data_key1}']`).getAttribute('id');
            tendency2_display.style.color = 'rgb(163, 231, 240)'
            chromatic_scale[tendency_pair[1]].play()
            chromatic_scale[tendency_pair[1]].currentTime = 0;
         }, 700);
      }, 700);
}

function yellowReffNote(e) {
   let refferenceNote = '65';
   if (e.type == 'keydown') {
      return e.keyCode.toString() == refferenceNote;
   } else if (e.type == 'click') {
      return e.target.getAttribute('data-key') == refferenceNote;
   }
}

// // ++++++++++++++++++++++++++++++++++
// function displaySolfege(e, display) {
//    let src;
//    if (e.type == 'keydown') {
//       src = document.querySelector(`.key[data-key='${e.keyCode}']`).getAttribute('id');
//    } else if (e.type = 'click') {
//       src = e.target.getAttribute('id');
//    };
//    display.innerHTML = src;
// }
// ++++++++++++++++++++++++++++++++++
function displaySolfege(input, display) {
   let src = document.querySelector(`.key[data-key='${input}']`).getAttribute('id');
   display.innerHTML = src;
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

// +++++++++++++++++++++++++++++
function playRandomPitch(range) {
   // random index to pick random note
   let random_index = Math.floor(Math.random() * Math.floor(range));
   if (random_index == 0) random_index = 1; //avoid unison
   
   // pool for chromatic scale (all the 15 notes, octave plus two)
   const all_notes = document.querySelectorAll('audio');
   let chromatic_scale = [];

   for (let i = 0; i < 15; i++) {
      chromatic_scale.push(all_notes[i])
   }
   
   // ++ pool for diatonic scale (notes, octave minus the root and plus maj9th) ++
   let diatonic_scale = [];
   // iterate trough chromatic scale, 
   for (let i = 0; i < 9; i++) {
      diatonic_scale.push(chromatic_scale[i]);
   }

   if (range == 15) {
      _TEST_NOTE = chromatic_scale[random_index];
   } else if (range == 9) {
      _TEST_NOTE = diatonic_scale[random_index];
   }

   setTimeout(function () {
      _TEST_NOTE.currentTime = 0;
      _TEST_NOTE.play();
      // display CTA (question mark ?) in html element
      document.querySelector('#test-note').innerHTML = "?"
   }, 800) 
}

// ++++++++++++++++++
function lightAllKeys() {
   const blinking_keys = document.querySelectorAll('.key');
      setTimeout(function() {
         blinking_keys.forEach(item => item.classList.add('blink'))
      }, 800)
}


// ++++++++++++++++++++++++
export const evaluateGuess = (e) => {
   //remove highlight from piano keys
   const blinking_keys = document.querySelectorAll('.blink');
   const stop_blink = blinking_keys.forEach(item => item.classList.remove('blink'));
   if (!e) return stop_blink;// exit if triggered by toggleDiatonic/Chromatic (off)
   let test_note = _TEST_NOTE.getAttribute('data-key');
   let correct_answer;
   let wrong_answer;
   let guess;
   // assign value to guess variable
   if (e.type == 'keydown') {
      guess = e.keyCode.toString();
      stop_blink;
   } else if (e.type == 'click') {
      guess = e.target.getAttribute("data-key");
      stop_blink; 
   }
   // +++display corresponding user input+++
   let display_guess = document.getElementById('test-note');
   // pass user input (guess)
   displaySolfege(e, display_guess )
   // compare user input with correct_note
   let display_correct = document.getElementById('correct-note')
   displaySolfege(e, display_correct)

   //+++color user input acordingly+++
   if (guess !== test_note) {
      document.getElementById('test-note').style.color = 'red';
   } else {
      document.getElementById('test-note').style.color = 'green';
   };

   // these values of 'answers' only to be displayed for comparing user's input.
   correct_answer = document.
   querySelector(`.key[data-key="${test_note}"]`).getAttribute('id');
   wrong_answer = document.
   querySelector(`.key[data-key="${guess}"]`).getAttribute('id');
   
   // RESULT OUTPUT
   let para = document.createElement("P");
   let monitor = document.getElementById('monitor');
   if (monitor.hasChildNodes()) {
      while (monitor.firstChild) {
         monitor.removeChild(monitor.firstChild)
      }
   }
   if (guess == test_note) {
      para.innerText = `Yes, it was "${correct_answer}". Nice work!`
      monitor.appendChild(para);
   } else if (guess !== test_note) {
      para.innerText = `You guessed "${wrong_answer}". The correct note was "${correct_answer}".`
      monitor.appendChild(para);
   };
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// for unwanted clicks outside of piano keyboard
window.addEventListener('click', function () {
   pianoKeys.forEach(item => item.focus());
})

const pianoKeys = document.querySelectorAll('.key');
// pianoKeys.forEach(item => item.addEventListener('click', playPiano));
pianoKeys.forEach(item => item.addEventListener('click', inputTypeValue));
pianoKeys.forEach(item => item.focus());
// pianoKeys.forEach(item => item.addEventListener('keydown', validateInput));
pianoKeys.forEach(item => item.addEventListener('keydown', inputTypeValue));




