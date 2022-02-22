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
          ).toFixed(1)}M people</p>
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)

    return response.json()
  })
}

///////////////////////////////////////////////////

// Country 1
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then((data) => {
      renderCountry(data[0])
      const neighbour = data[0].borders[0]

      if (!neighbour) throw new Error('No neighbour found!')

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      )
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(`${err.message} 💥💥💥`)
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
    })
  // .finally(() => {
  //   countriesContainer.style.opacity = 1
  // })
}

// btn.addEventListener('click', function () {
//   getCountryData('russia')
// })

///////////////////////////////////////////////////

// Get Position
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition()
    const { latitude: lat, longitude: lng } = pos.coords

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    if (!resGeo.ok) throw new Error(`Problem getting location data 💥💥`)

    const dataGeo = await resGeo.json()

    // Country data
    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    )
    if (!response.ok) throw new Error(`Problem getting country 💥💥`)

    const data = await response.json()
    renderCountry(data[0])

    return `You are in ${dataGeo.city}, ${dataGeo.country}`
  } catch (err) {
    renderError(`${err.message}`)

    // Reject promise returned from async function
    throw err
  }
}

// btn.addEventListener('click', whereAmI)

console.log('1: Will get location')
whereAmI()
  .then((city) => console.log(`2: ${city}`))
  .catch((err) => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finished getting location'))
