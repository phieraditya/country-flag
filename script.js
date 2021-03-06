'use strict';

///////////////////////////////////////////////////
// Select Elements

const btnCountry = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

///////////////////////////////////////////////////
// Render

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img src="${data.flag}" alt="" class="country__img" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <H4 class="country__region">${data.region}</H4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣 </span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
};

///////////////////////////////////////////////////
// Helper to fetch API data

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////////////////
// Country 1
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(data[0].borders);

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btnCountry.addEventListener('click', function () {
  getCountryData('timor');
});

btn.addEventListener('click', function () {
  search.classList.toggle('active');
  input.focus();
  getCountryData(`${input.value}`);
  console.log(input.value);
});
