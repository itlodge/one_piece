// One piece

var gui = require('nw.gui');
var commic_manager = require('./commic_manager').commic_manager;

// Start here
commic_manager.show_volumns();

var btn_refresh = document.getElementById('btn-refresh');
btn_refresh.onclick = function() {
  commic_manager.show_volumns();
};

document.addEventListener('keyup', function(e) {
  if (e.keyCode == 'Q'.charCodeAt(0)) {
    gui.App.quit();
  } else if (e.keyCode == 'R'.charCodeAt(0)) {
    commic_manager.refresh_image();
  } else if (e.keyCode == 'J'.charCodeAt(0)) {
    window.scrollBy(0, 50);
  } else if (e.keyCode == 'K'.charCodeAt(0)) {
    window.scrollBy(0, -50);
  } else if (e.keyCode == 'H'.charCodeAt(0) ||
             e.keyCode == 37) {
    commic_manager.prev_image();
  } else if (e.keyCode == 'L'.charCodeAt(0) ||
             e.keyCode == 39) {
    commic_manager.next_image();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 'J'.charCodeAt(0)) {
    window.scrollBy(0, 50);
  } else if (e.keyCode == 'K'.charCodeAt(0)) {
    window.scrollBy(0, -50);
  }
  if ([37, 39].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
});
