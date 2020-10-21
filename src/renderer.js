



const { ipcRenderer } = require('electron')




//return value {addOnTime: bool, minutes #}
//addOnTime is true when user is prompting timer to add time, if user explicitly chooses value addOnTime=false
document.getElementById('submit-time-btn').addEventListener('click' , ()=> {
  //sending the time to update timer: regular expression to only send numebr
  let minutes = document.getElementById('slider-value').innerHTML.replace(/\D/g, "")

  ipcRenderer.send('time-entered', {'addOnTime': false, 'minutes': minutes} )
  console.log('clicked')
})




ipcRenderer.on('countdown', (event, args) => {
  document.getElementById('theCount').innerHTML = args;
})

