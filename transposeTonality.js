import { samplesAll } from './samplesAll.js'

// index of the starting key (C) in Transpose mode
let keyOfIndex = 0;
// list of tonalities (keyOf). the hex is for the flat (b) sign
let keyOfArr = ['C', 'D&#9837;', 'D', 'E&#9837;', 'E', 'F', 'G&#9837;', 'G', 'A&#9837;', 'A', 'B&#9837;', 'B'];


function transposeTonality() {
   if (!document.querySelector('.slooh.on-off')) return;//exit if power off
   // trainer display corresponding tonalities   
   keyOfIndex += 1;// increase index to switch to the next tonality
   if (keyOfIndex == keyOfArr.length) keyOfIndex = 0;// circle back to the starting tonality (C)

   // display current tonality in the 'Trainer' and color them
   let current_keyOf = document.getElementById('key-of').innerHTML = keyOfArr[keyOfIndex];
   //color transposed elements
   if (keyOfIndex !== 0) {
      document.getElementById('transpose').style.color = 'green';//button
      // document.getElementById('Do').style.background = 'rgb(235, 218, 132)'//piano key root
      document.getElementById('current-note').style.color = 'rgb(235, 218, 132)';//font
   };

   // ++LOAD AUDIO SAMPLES FOR NEW TE TONALITY++
   // 1. initiate new 'oneOctaveSrc' array where src's for entire octave vill be stored
   let samplesOneOctaveSrc = [];
   // 2. make list and store all the pointers (src attribute values) into an array and iterate trough them
    
   // 3. get index of starting note in new tonality
   let startingNoteIndex = samplesAll.findIndex(item => item.name == current_keyOf)
   // 4. isolate attributes (src) and push them into ->
   let samplesOneOctave = samplesAll.slice(startingNoteIndex, startingNoteIndex + 15);
   // 5. oneOctaveSrc.push() all samples (attribute src='string') from that index to the length of current key (15 notes)
   samplesOneOctave.map(item => samplesOneOctaveSrc.push(item.src));
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
   let ivory_keys = constructScale(samplesOneOctaveSrc, major_scale_index);
   
      ivory_keys.map(item => newTonality.push(item));
   let ebony_keys = [];
   for (let i = 0; i < samplesOneOctaveSrc.length; i++) {
      if (!ivory_keys.includes(samplesOneOctaveSrc[i])) {
         ebony_keys.push(samplesOneOctaveSrc[i])
      }
   }
   ebony_keys.map(item => newTonality.push(item))
      
   // 6. construct nested for loop and set new attributes
   let samples = document.querySelectorAll('audio');
   for (let i = 0; i < newTonality.length; i++) {
   samples[i].setAttribute('src', `${newTonality[i]}`)
   };
}
   let toggleTransposeButton = document.getElementById('transpose');
   toggleTransposeButton.onclick = transposeTonality;