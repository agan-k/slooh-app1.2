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