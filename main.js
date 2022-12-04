const electron = require('electron')
const fs = require('fs')
const { app, BrowserWindow, ipcMain, dialog } = electron
const path = require("path");
let win


app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), 
    //   nodeIntegration: true,
    //   contextIsolation: false,
    }
  })
  win.loadFile('index.html')
})

ipcMain.on('save', (event, text)=>{
  //save the test to a file
  dialog.showSaveDialog(win, {defaultPath: 'filename.txt'})
  .then((res) => {
    if(res.canceled === false) {
      fs.writeFile(res.filePath, text, (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
      })
    } else {
      console.log('File save was canceled.')
    }
  }).catch((err) => console.log(err))
  // fs.writeFile('samplefile.txt', text, (err) => {
  //   if(err) console.log('there was an error', err)
  //   console.log('file has been saved')
  // })
})