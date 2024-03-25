const { app, BrowserWindow, ipcMain } = require('electron');
require('dotenv').config();
const path = require('path');
const url = require('url');

ipcMain.on('close', () => app.quit());

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, '../icon.ico'),
  });
  mainWindow.setMenu(null);
  mainWindow.maximize();
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  ipcMain.on('open-file', (event, filePath) => {
    // Отправляем событие в основное окно
    mainWindow.webContents.send('open-file', filePath);
  });
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
