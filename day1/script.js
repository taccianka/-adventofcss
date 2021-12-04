const startStopButton = document.querySelector('.startStop');
const timer = document.querySelector('.timer');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const settings = document.querySelector('.settings');
const timeValues = document.querySelectorAll('input[type="number"]');


class Timer {
  constructor() {
    this.minutes = minutes.value;
    this.seconds = seconds.value;
    this.state = Number(this.minutes) * 60 + Number(this.seconds);
    this.countDown = this.countDown.bind(this);
    console.log('const', this.state);
  }

  startDown() {
    this.timerId = window.setInterval(this.countDown, 1000);
  }

  countDown() {
    this.state--;
    console.log('yes', this.state);
    this.update();
  }

  update() {
    this.seconds = this.state % 60;
    this.minutes = Math.trunc(this.state / 60);
    if (this.minutes == 0 && this.seconds === 0) {
      let audio = new Audio('./assets/sounds/alarm.wav');
      audio.play();
    }
    if (this.minutes >= 10) {
      minutes.value = this.minutes;
    } else {
      minutes.value = '0' + this.minutes;
    }
    if (this.seconds >= 10) {
      seconds.value = this.seconds;
    } else {
      if (this.seconds == 0 && this.minutes == 0) this.stop();
      seconds.value = '0' + this.seconds;
    }
  }

  updateState(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    // console.log('state = ', this.minutes, minu)
    this.state = Number(this.minutes) * 60 + Number(this.seconds);
  }

  isStop() {
    if (!this.timerId) return true;
    return false;
  }

  stop() {
    window.clearTimeout(this.timerId);
  }

  resume() {
    this.timerId = window.setInterval(this.countUp, 1000);
  }
}

let myTimer = new Timer();

startStopButton.addEventListener('click', () => {
  if (startStopButton.innerHTML === 'start') {
    console.log(myTimer);
    myTimer.startDown();
    startStopButton.innerHTML = 'stop';
  } else {
    myTimer.stop();
    startStopButton.innerHTML = 'start';
  }
});
