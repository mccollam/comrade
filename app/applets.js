
const path = require('path');
const {ipcRenderer} = require('electron');
const electron = require('electron');

var hwF1 = electron.remote.require('./main').hwF1;
var hwF2 = electron.remote.require('./main').hwF2;
var hwF3 = electron.remote.require('./main').hwF3;


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

function pageLoaded() {
  // Set some default function button behaviors
  hwF1.on('rise', function () {
    console.log("F1 undefined");
  });
  hwF2.on('rise', function() {
    console.log("F2 undefined");
  });
  hwF3.on('rise', function() {
    console.log("F3 undefined");
  });
}