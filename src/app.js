const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const countdown = require('./countdown')

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
  buttons: ['Okay'],
  defaultId: 0,
  title: 'Back to work',
  message: 'Time to get back to work',
  detail: "You've enjoyed your break time to get back to work",
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


ipcMain.on('time-entered', async(event, args) => {
  isContinue = false;
  console.log(`Recieved arg backend: ${args}`) 
  // let outputTime

  //logic for timer
  let count = parseInt(args) * 60
  unchangedtime = parseInt(args)
  while(count > 0) {
    await sleep(1000)
    count -= 1
    console.log(count)
    //creating output string and pushing to webpage for current time
    let hours = Math.floor(count / 60 / 60)
    if(hours < 1) outputTime = `${Math.floor(count/60)}:${Math.floor(count % 60)}`
    else outputTime = `${hours}:${Math.floor(count/60)}:${Math.floor(count % 60)}`
    win.webContents.send('countdown', outputTime);
  }
  console.log("Timer completed")

  let userChoice = new Promise((resolve, reject) => {
    dialog.showMessageBox(win, options).then(userInput => {
      resolve(userInput['response']);
    })
  })
  let optionValue = await userChoice;

  if(optionValue == 0) win.webContents.send('addTimeToTimer', 5)
  else if(optionValue == 1) win.webContents.send('addTimeToTimer', 10)
  else {
    console.log('they hit okay')
    await sleep(5000)
    console.log('out of sleep')
    dialog.showMessageBox(win, backToWork).then(() => {
      win.webContents.send('addTimeToTimer', unchangedtime)
    });
  }


});

