
module.exports = function countdown(tick){
  // console.log("Inputted: ", tick);
  let count = 10;
  let timer = setInterval(_ =>{
    count--;
    let hours = Math.floor(count / 60 / 60)
    let mins = Math.floor(count/60)//.toString();
    let secs = Math.floor(count % 60)//.toString();
    tick(`${hours}:${mins}:${secs}`);
    if(count === -1){
        clearInterval(timer);
    }
  }, 1000);
}