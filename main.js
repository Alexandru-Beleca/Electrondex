const { app, BrowserWindow, autoUpdater } = require('electron')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: autoUpdater,
    height: 660,
    minWidth:430,
    minHeight:665,
    webPreferences: {
     nodeIntegration: true
    }
  });

  mainWindow.loadFile('public/index.html')
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () =>{
  if(mainWindow === null) createWindow()
})

