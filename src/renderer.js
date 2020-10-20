



const { ipcRenderer } = require('electron')




document.getElementById('submit-time-btn').addEventListener('click' , ()=> {
  //sending the time to update timer: regular expression to only send numebr
  ipcRenderer.send('time-entered', document.getElementById('slider-value').innerHTML)//.replace(/\D/g, ""))
  console.log('clicked')
})

ipcRenderer.on('addTimeToTimer', (event, args) => {
  ipcRenderer.send('time-entered', args) //start timer with inputted time
  console.log("Calling timer again")
})


ipcRenderer.on('countdown', (event, args) => {
  document.getElementById('theCount').innerHTML = args;
})


// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')