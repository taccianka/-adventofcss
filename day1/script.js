const startStopButton = document.querySelector('.startStop');
const timer = document.querySelector('.timer');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const settings = document.querySelector('.settings');
const timeValues = document.querySelectorAll('input[type="number"]');
const progress = document.querySelector('.progress');
const animateBorder = document.querySelector('.timerContainer');

class Timer {
  constructor(minutes, seconds, startButton) {
    this.minutes = minutes.value;
    this.seconds = seconds.value;
    this.controlButton = startStopButton;
    this.state = Number(this.minutes) * 60 + Number(this.seconds);
    this.countDown = this.countDown.bind(this);
  }

  startDown() {
    this.timerId = window.setInterval(this.countDown, 1000);
    this.controlButton.innerHTML = 'stop';
    timeValues.forEach((el) => {
      el.classList.remove('edit');
    });
    if (settings.classList.contains('check')) {
      settings.classList.remove('check');
      settings.classList.add('gear');
      this.updateState(minutes.value, seconds.value);
      progress.style.animation = `countdown ${this.state}s linear forwards`;
    }
    if (progress.style.animationPlayState != 'paused') {
      progress.style.animation = `countdown ${this.state}s linear forwards`;
    } else {
      progress.style.animationPlayState = 'running';
    }
  }

  countDown() {
    if (this.state > 0) {
      this.state--;
      this.update();
    } else {
      alert('Please, set timer time and retry');
      this.stop();
    }
  }

  stop() {
    window.clearTimeout(this.timerId);
    startStopButton.innerHTML = 'start';
    progress.style.animationPlayState = 'paused';
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
      if (this.seconds == 0 && this.minutes == 0) {
        seconds.value = '00';
        this.stop();
      } else {
        seconds.value = '0' + this.seconds;
      }
    }
  }

  updateState(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.state = Number(this.minutes) * 60 + Number(this.seconds);
  }

  isStop() {
    if (!this.timerId) return true;
    return false;
  }
}

let myTimer = new Timer(minutes, seconds, startStopButton);

startStopButton.addEventListener('click', () => {
  if (startStopButton.innerHTML === 'start') {
    myTimer.startDown();
  } else {
    myTimer.stop();
  }
});

settings.addEventListener('click', () => {
  if (settings.classList.contains('gear')) {
    myTimer.stop();
    timeValues.forEach((el) => {
      el.classList.add('edit');
    });
    settings.classList.remove('gear');
    settings.classList.add('check');
    progress.style.animation = 'none';
  } else if (settings.classList.contains('check')) {
    myTimer.startDown();
    timeValues.forEach((el) => {
      el.classList.remove('edit');
    });
  }
  myTimer.updateState(minutes.value, seconds.value);
});

timeValues.forEach((el) => {
  el.addEventListener('input', (event) => {
    if (parseInt(el.value) < 10) {
      el.value = '0' + el.value;
    }
  });
});
