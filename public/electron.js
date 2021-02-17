const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {session} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

app.on('ready', createWindow);

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    session.defaultSession.loadExtension('/home/agustin/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_0');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});