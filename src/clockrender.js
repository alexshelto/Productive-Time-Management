
const { ipcRenderer } = require('electron')

const timesUpEmojiList = ['\u26A1','\u2705','\u2615']




function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomStudyEmoji() {
  return String.fromCharCode(studyingEmojiList[getRandomInt(studyingEmojiList.length)])
}

function getRandomTimesUpEmoji() {
  return String.fromCharCode(timesUpEmojiList[getRandomInt(timesUpEmojiList.length)])
}


ipcRenderer.on('countdown', (event, args) => {

  
  hours = args['hours'].toString()
  mins = args['minutes'].toString()
  secs = args['seconds'].toString()
  if(hours.length < 2) hours = '0' + hours;
  if(mins.length < 2) mins = '0' + mins;
  if(secs.length < 2) secs = '0' + secs;

  
 
  document.getElementById('theCount').innerText = `${hours}:${mins}:${secs}`;

})



//called after timer, user can add time after time is complete
ipcRenderer.on('addTimeToTimer', (event, args) => {

  ipcRenderer.send('time-entered', {'addOnTime': true, 'minutes': args}) //start timer with inputted time
  console.log("Calling timer again")
})