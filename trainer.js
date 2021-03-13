import { yellowReffNote } from './main.js'


let _TEST_NOTE;

let count = -1;
export const playTendencyNotes = (e, input) => {
   if (!e) return count = -1;//coming from toggleTendency (off)
   if (!yellowReffNote(input)) return;//accept only root (yellow key) input
   
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


export const  playRandomPitch = (range) => {
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


export const evaluateGuess = (e, input) => {
   //remove highlight from piano keys
   const blinking_keys = document.querySelectorAll('.blink');
   const stop_blink = blinking_keys.forEach(item => item.classList.remove('blink'));
   if (!e) return stop_blink;// exit if triggered by toggleDiatonic/Chromatic (off)
   let test_note = _TEST_NOTE.getAttribute('data-key');
   let correct_answer;
   let wrong_answer;
   let guess = input;
   // +++display corresponding user input+++
   let display_guess = document.getElementById('test-note');
   // pass user input (guess)
   displaySolfege(input, display_guess )
   // compare user input with correct_note
   let display_correct = document.getElementById('correct-note')
   displaySolfege(input, display_correct)

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