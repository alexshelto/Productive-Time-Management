
const { ipcRenderer } = require('electron')

const timesUpEmojiList = ['0x1F389', '0x1F38A', '0x1F3C5', '0x1F3C6', '0x1F48E', '0x1F4AB', '0x1F37E', '0x1F37B', '0x2705']

const studyingEmojiList = ['0x1F4A1', '0x1F4B0', '0x1F4C8', '0x1F4DD', '0x1F4F5', '0x1F4F4']




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
  if(args == '00:00') {
    console.log(args, " ayayyyyyyayyy")
    outputString = args + getRandomTimesUpEmoji() + getRandomTimesUpEmoji();
    // document.getElementById('theCount').innerHTML = args;
  }
  // if (args[3] == '0') { //if less than 10 minutes left
  //   outputString = args + getRandomStudyEmoji() 
  // }
  // else {
  //   outputString = args
  // }
  document.getElementById('theCount').innerText = outputString;
})



//called after timer, user can add time after time is complete
ipcRenderer.on('addTimeToTimer', (event, args) => {

  ipcRenderer.send('time-entered', {'addOnTime': true, 'minutes': args}) //start timer with inputted time
  console.log("Calling timer again")
})