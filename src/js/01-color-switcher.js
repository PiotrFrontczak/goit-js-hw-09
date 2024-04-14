function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let intervalId = null;

  document.getElementById('startButton').addEventListener('click', function() {
    if (!intervalId) {
      intervalId = setInterval(function() {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      document.getElementById('startButton').setAttribute('disabled', 'true');
      document.getElementById('stopButton').removeAttribute('disabled');
    }
  });

  document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('startButton').removeAttribute('disabled');
    document.getElementById('stopButton').setAttribute('disabled', 'true');
  });