const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = electron;

let win;

// Minimum size (definition for "small" displays)
const smallWidth = 800;
const smallHeight = 480;

function createMainWindow() {
  // On small displays we want to be fullscreen and chromeless
  var size = electron.screen.getPrimaryDisplay();
  var useFullScreen = (size.height <= smallHeight || size.width <= smallWidth) ? true : false; 
  win = new BrowserWindow({
      width: smallWidth,
      height: smallHeight,
      fullscreen: useFullScreen,
      frame: !useFullScreen
    });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createMainWindow();
  }
});

ipcMain.on('changeApplet', (event, url) => {
  console.log(url);
  win.loadURL(url);
  event.returnValue = true;
});