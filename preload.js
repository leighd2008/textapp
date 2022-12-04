const { contextBridge, ipcRenderer } = require("electron");
 
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, data) => {
    ipcRenderer.on(channel, (event, ...args) => {
      // todo
    });
  },
});