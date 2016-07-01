
const path = require('path');
const {ipcRenderer} = require('electron');

function launch(applet) {
  // TODO: Error checking, etc.!
  // TODO: Dynamically generate list of applets
  switch(applet) {
    case 'clock':
        var appletPath = 'applets/clock/index.html';
        break;
    case 'mediaremote':
        var appletPath = 'applets/mediaremote/index.html';
        break;
    default:
        alert(applet + ": not a valid applet!");
        return false;
  }

  var page = path.join('file://', __dirname, appletPath);
  
  ipcRenderer.send('changeApplet', page);
}