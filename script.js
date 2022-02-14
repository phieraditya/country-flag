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

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  request.send()

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    // console.log(data)

    // Render country 1
    renderCountry(data)

    // Get neighbour country (2)
    const [neighbour] = data.borders

    if (!neighbour) return

    // AJAX call country 2
    const request2 = new XMLHttpRequest()
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
    request2.send()

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText)
      // console.log(data2)

      // Render country 2
      renderCountry(data2, 'neighbour')
    })
  })
}

getCountryAndNeighbour('laos')

///////////////////////////////////////////////////
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
getCountryData('malaysia')
