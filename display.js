
export const displaySolfege = (input, id) => {
   let display = document.getElementById(id);
   let src = document.querySelector(`.key[data-key='${input}']`).getAttribute('id');
   display.innerHTML = src;
}

export const displayMonitor = (print) => {
   let monitor = document.getElementById('monitor');
   let heading = document.createElement('h1');
   
   let paragraph = document.createElement('p');
   paragraph.setAttribute('id', 'prompt');
   let blinking_cursor = document.createElement('span');
   blinking_cursor.setAttribute('id', 'blinking-cursor');
   if (monitor.hasChildNodes()) {
      while (monitor.firstChild) { monitor.removeChild(monitor.firstChild); }
   };
   if (print) {
      monitor.appendChild(paragraph);
      printText('prompt', `${print}`);
      paragraph.appendChild(blinking_cursor);
   } else {
      monitor.appendChild(heading).innerText = 'slo͞oh';
   };
}

function printText(id, text) {
   var node = document.createTextNode(""),
   i = 0,
   chars = 5;
   document.getElementById(id).appendChild(node);
   (function add(){
       node.data += text.substr(i, chars);
       i += chars;
       if (i < text.length)
           setTimeout(add, 200/6);
   })();
}
