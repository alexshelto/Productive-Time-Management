
module.exports = function countdown(time){
  let count = parseInt(time) * 60
  let timer = setInterval(() => {
    count--;
    if(count == -1){
      clearInterval(timer)
    }
  }, 1000);
}