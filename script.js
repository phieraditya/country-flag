'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

///////////////////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img src="${data.flag}" alt="" class="country__img" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <H4 class="country__region">${data.region}</H4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣 </span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
  `
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg)
  countriesContainer.style.opacity = 1
}

// Country 1
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0])
      const neighbour = data[0].borders[0]

      if (!neighbour) return

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(`${err} 💥💥`)
      renderError(`Something went wrong 💥 ${err.message}. Try again!`)
    })
}

btn.addEventListener('click', function () {
  getCountryData('cambodia')
})
