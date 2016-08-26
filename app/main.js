const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = electron;

// GPIO on Raspberry Pi 3
const hwHome = require('pi-pins').connect(21);
const hwSnooze = require('pi-pins').connect(12);
const hwF1 = require('pi-pins').connect(17);
const hwF2 = require('pi-pins').connect(27);
const hwF3 = require('pi-pins').connect(22);
const hwDisp = require('pi-pins').connect(18);
const hwPiezo = require('pi-pins').connect(26);

// Interval timer for buzzer
var ivBuzz;

// Electron window
let win;

////// Set up hardware buttons
hwHome.mode('in');
hwSnooze.mode('in');
hwF1.mode('in');
hwF2.mode('in');
hwF3.mode('in');
hwDisp.mode('in');
hwPiezo.mode('out');

// Minimum size (definition for "small" displays)
const smallWidth = 800;
const smallHeight = 480;

function clearFunctionButtons() {
  // Unbind all events before switching applet context
  hwF1.removeAllListeners();
  hwF2.removeAllListeners();
  hwF3.removeAllListeners();

  // ----- TEMPORARY -----
  // Test piezo
  var state = false;
  hwF1.on('rise', function() {
    buzzPiezo();
  });

  hwF2.on('rise', function() {
    clearInterval(ivBuzz);
    hwPiezo.value(false);
  });
  // ----- END TEMPORARY -----

  // Add this back in if I decide to allow applets to use 'snooze'
  //hwSnooze.removeAllListeners();
}

function buzzPiezo() {
  var oscillator = false;
  var buzzing = false;
  var ivInternal, ivOscillator;

  console.log('In buzzPiezo()');

  function startBuzz() {
    console.log('Starting buzz');
    ivOscillator = setInterval(function() {
      oscillator = !oscillator;
      hwPiezo.value(oscillator);
    }, 2);
  };

  function stopBuzz() {
    console.log('Stopping buzz');
    clearInterval(ivOscillator);
    clearInterval(ivInternal);
    hwPiezo.value(false);
  };

  console.log('Clearing any existing intervals...');
  clearInterval(ivBuzz);
  ivInternal = setInterval(function() {
    buzzing = !buzzing;
    if (buzzing) {
      console.log('Calling stopBuzz()');
      stopBuzz();
    }
    else {
      console.log('Calling startBuzz()');
      startBuzz();
    }
  }, 500);
}

function createApp() {
  // On small displays we want to be fullscreen and chromeless
  var size = electron.screen.getPrimaryDisplay();
  var useFullScreen = (size.height <= smallHeight || size.width <= smallWidth) ? true : false; 
  win = new BrowserWindow({
      width: smallWidth,
      height: smallHeight,
      fullscreen: useFullScreen,
      frame: !useFullScreen,
    });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });

  // Set up hardware buttons
  hwHome.on('rise', function() {
    clearFunctionButtons();
    win.loadURL(`file://${__dirname}/index.html`);
  });
  hwSnooze.on('rise', function() {
    // TODO - snooze active alarm, maybe pass event to active applet?
    // Think about this -- it might make sense to reserve this for the clock only
  });
  hwDisp.on('rise', function() {
    // TODO - toggle screen backlight
  });

  exports.hwF1 = hwF1;
  exports.hwF2 = hwF2;
  exports.hwF3 = hwF3;
  // Should we make the piezo buzzer available to applets?
  // exports.hwPiezo = hwPiezo;

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createApp);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createApp();
  }
});

// Don't create menu bars
app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

ipcMain.on('changeApplet', (event, url) => {
  clearFunctionButtons();
  console.log(url);
  win.loadURL(url);
  event.returnValue = true;
});
