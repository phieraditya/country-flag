'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

///////////////////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  request.send()

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText)
    console.log(data)

    const html = `
      <article class="country">
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
  })
}

getCountryData('indonesia')
getCountryData('brunei')
getCountryData('timor')
