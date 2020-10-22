/*
Alex Shelton


*/


const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')

require('electron-reload')(__dirname);

let win


function createWindow () {
    win = new BrowserWindow({
    width: 350,
    height: 350,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./src/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})




const options = {
  type: 'question',
  buttons: ['5 more minutes', '10 more minutes', 'Okay', 'Exit'],
  defaultId: 2,
  title: 'Question',
  message: 'Stretch and relax',
  detail: "You've been productive, take a 5 minute break",
};

const backToWork = {
  buttons: ['Okay', 'Exit'],
  defaultId: 0,
  title: 'Back to work',
  message: 'Time to get back to work',
  detail: "You've enjoyed your break time to get back to work",
};




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let giveBreakAndPrompt = async() => {
  let t = await sleep(5000); //5 sec break rn lol
  let postBreakInput = new Promise((resolve, reject) => {
  shell.beep()
  dialog.showMessageBox(win, backToWork).then(userInput => {
    resolve(userInput['response'])
  }).catch(err => console.log('error in break and prompt'));
})
  return postBreakInput;
}


async function countdownTimer( count){
  while(count > 0) {
    let t = await sleep(100); /////change for debug
    count -= 1;
    console.log(count);
    //creating output string and pushing to webpage for current time
    let hours = Math.floor(count / 60 / 60)
    let mins = Math.floor(count/60)//.toString();
    let secs = Math.floor(count % 60)//.toString();

    let timeData = {'hours': hours, 'minutes': mins, 'seconds': secs}

    win.webContents.send('countdown', timeData);
  }
  let promptTimersUp = new Promise((resolve, reject) => {
  shell.beep()
  dialog.showMessageBox(win, options).then(userInput => {
    resolve(userInput['response'])
  }).catch(err => {
    console.log("error in dialog box");
    resolve(-1);
  })
})
  console.log("Inside of the count function: ", promptTimersUp);
  return promptTimersUp;
}





// Handling timer and break
//
ipcMain.on('time-entered', async(event, args) => {
  win.loadFile('./src/clock.html')

  isContinue = false;
  console.log(`Recieved arg backend: ${args}`) 
  // let outputTime

  //logic for timer
  if(args['addOnTime'] === false){
    console.log("Original time submitted, changing value")
    unchangedtime = parseInt(args['minutes'])
  } else {
    console.log("This is add on time, not changing original value")
  }

  let count = parseInt(args['minutes']) * 60

  //do countdown and prompt times up window, gets value
  let endTimerChoice = await countdownTimer(count);//.then((endTimerChoice) => {

  //handling user choice at end of timer popup
  // choices:  (0: add 5min to timer), (1: add 10 mins), (2: okay), (3: exit)
  if(endTimerChoice == 0) {
    win.webContents.send('addTimeToTimer', 5);
  }
  else if (endTimerChoice == 1) {
    win.webContents.send('addTimeToTimer', 10);
  }
  else if(endTimerChoice == 2) {
    console.log("chose break");
    response = await giveBreakAndPrompt();
    //response (0: back to work, set timer, 1: exit)
    if (response == 0) {
      win.webContents.send('addTimeToTimer', unchangedtime);
    } else { //exit to home
      win.loadFile('./src/index.html');
    }
  }
  else {  //else exit
    console.log("user chose to exit to index");
    win.loadFile('./src/index.html');
  }

});

