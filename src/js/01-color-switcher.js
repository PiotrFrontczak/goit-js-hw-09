function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('button[data-action]').forEach(function(button) {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      if (action === 'start' && !intervalId) {
        intervalId = setInterval(function() {
          document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        document.querySelectorAll('button[data-action="start"]').forEach(function(btn) {
          btn.setAttribute('disabled', 'true');
        });
        document.querySelectorAll('button[data-action="stop"]').forEach(function(btn) {
          btn.removeAttribute('disabled');
        });
      } else if (action === 'stop' && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.querySelectorAll('button[data-action="start"]').forEach(function(btn) {
          btn.removeAttribute('disabled');
        });
        document.querySelectorAll('button[data-action="stop"]').forEach(function(btn) {
          btn.setAttribute('disabled', 'true');
        });
      }
    });
  });
});