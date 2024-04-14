document.addEventListener('DOMContentLoaded', function() {
  const datetimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: handleDateSelection
  });

  let timerInterval;

  function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function updateTimer(endTime) {
    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById('start-button').disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    document.querySelectorAll('.value').forEach(function(element) {
      const type = element.getAttribute('data-type');
      element.textContent = addLeadingZero(eval(type));
    });
  }

  function handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.Failure('Please choose a date in the future');
      document.getElementById('start-button').disabled = true;
    } else {
      Notiflix.Notify.Success('Date selected successfully!');
      document.getElementById('start-button').disabled = false;
    }
  }

  document.getElementById('start-button').addEventListener('click', function() {
    const selectedDate = datetimePicker.selectedDates[0].getTime();
    timerInterval = setInterval(function() {
      updateTimer(selectedDate);
    }, 1000);
    updateTimer(selectedDate);
  });
});
