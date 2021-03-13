
function displaySolfege(input, display) {
   let src = document.querySelector(`.key[data-key='${input}']`).getAttribute('id');
   display.innerHTML = src;
}

function yellowReffNote(input) {
   let refferenceNote = '65';
   return refferenceNote == input;
}