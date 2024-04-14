import Notiflix from 'notiflix';

function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
  }

  // Funkcja konwertująca milisekundy na obiekt z wartościami dni, godzin, minut i sekund
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

  // Funkcja aktualizująca licznik czasu na interfejsie
  function updateTimer(endTime) {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById('start-button').disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

  // Funkcja obsługująca zamknięcie wyboru daty
  function handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      alert('Please choose a date in the future');
      document.getElementById('start-button').disabled = true;
    } else {
      document.getElementById('start-button').disabled = false;
    }
  }

  // Inicjalizacja flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: handleDateSelection
  };

  const datetimePicker = flatpickr('#datetime-picker', options);

  // Obsługa kliknięcia przycisku Start
  document.getElementById('start-button').addEventListener('click', () => {
    const selectedDate = datetimePicker.selectedDates[0].getTime();
    const timerInterval = setInterval(() => updateTimer(selectedDate), 1000);
    updateTimer(selectedDate); // Natychmiastowa aktualizacja
  });