



const { ipcRenderer } = require('electron')




//return value {addOnTime: bool, minutes #}
//addOnTime is true when user is prompting timer to add time, if user explicitly chooses value addOnTime=false
document.getElementById('submit-time-btn').addEventListener('click' , ()=> {
  //sending the time to update timer: regular expression to only send numebr
  let minutes = document.getElementById('slider-value').innerHTML.replace(/\D/g, "")
  ipcRenderer.send('time-entered', {'addOnTime': false, 'minutes': minutes} )
  console.log('clicked')
})



//event listener on time slider to update display
let slider = document.getElementById('myMinutes')
slider.addEventListener('input', changeTimeValue);
function changeTimeValue(){
  let suffix = 'minutes';
  if(this.value == 1) { suffix = 'minute'; }
  document.getElementById('slider-value').innerHTML = `${this.value} ${suffix}`;
}
