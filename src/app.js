/*
Alex Shelton


*/


const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')

require('electron-reload')(__dirname);

let win


function createWindow () {
    win = new BrowserWindow({
    width: 500,
    height: 350,
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
  buttons: ['5 more minutes', '10 more minutes', 'Okay'],
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

  while(count > 0) {
    await sleep(50); //change back to 1000
    count -= 1;
    console.log(count);
    //creating output string and pushing to webpage for current time
    let hours = Math.floor(count / 60 / 60).toString();
    let mins = Math.floor(count/60).toString();
    let secs = Math.floor(count % 60).toString();
    if (hours.length < 2) hours = '0' + hours;
    if (mins.length < 2) mins = '0' + mins;
    if(secs.length < 2) secs = '0' + secs;
  
    if(hours < 1) outputTime = `${mins}:${secs}`;
    else outputTime = `${hours}:${mins}:${secs}`;

    win.webContents.send('countdown', outputTime);
  }
  console.log("Timer completed");

  //end timer

  let userChoice = new Promise((resolve, reject) => {
    shell.beep()
    dialog.showMessageBox(win, options).then(userInput => {
      resolve(userInput['response']);
    })
  })
  let optionValue = await userChoice;

  if(optionValue == 0) win.webContents.send('addTimeToTimer', 5)
  else if(optionValue == 1) win.webContents.send('addTimeToTimer', 10)
  else {
    console.log('handle okay')
    await sleep(1000);// * 5 * 60)

    let postBreakInput = new Promise((resolve, reject) => {
      shell.beep()
      dialog.showMessageBox(win, backToWork).then(userInput => {
        resolve(userInput['response'])
      })
    })

    let postBreakResponse = await postBreakInput.then(choice => {
      //choice 0 == okay: restarts timer with old time
      if(choice == 0) {
        console.log("Choice 0 okay")
        win.webContents.send('addTimeToTimer', unchangedtime)

      }
      if(choice == 1) {
        console.log("User selected exit")
        win.loadFile('./src/index.html')
        //sends back to the main page
      }
    });
  }//end else 

});

