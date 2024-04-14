// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     resolve({ position, delay });
//   } else {
//     reject({ position, delay });
//   }
// }

import Notiflix from 'notiflix'

  // Złap formularz
  const form = document.querySelector('.form');

  // Nasłuchuj zdarzenie submit formularza
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Zapobiega domyślnej akcji przesyłania formularza

    // Pobierz wartości z pól formularza
    const delay = parseInt(form.elements.delay.value);
    const step = parseInt(form.elements.step.value);
    const amount = parseInt(form.elements.amount.value);

    // Stwórz obietnice na podstawie danych z formularza
    for (let i = 0; i < amount; i++) {
      try {
        const result = await createPromise(i + 1, delay + i * step);
        Notiflix.Notify.success(`✅ Fulfilled promise ${i + 1} in ${delay + i * step}ms`);
      } catch (error) {
        Notiflix.Notify.failure(`❌ Rejected promise ${i + 1} in ${delay + i * step}ms`);
      }
    }
  });

  // Funkcja createPromise z wykorzystaniem Notiflix
  async function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }