
const { ipcRenderer } = require('electron')



ipcRenderer.on('countdown', (event, args) => {
  document.getElementById('theCount').innerHTML = args;
})



//called after timer, user can add time after time is complete
ipcRenderer.on('addTimeToTimer', (event, args) => {

  ipcRenderer.send('time-entered', {'addOnTime': true, 'minutes': args}) //start timer with inputted time
  console.log("Calling timer again")
})