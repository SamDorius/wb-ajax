import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div

  axios.get('https://dog.ceo/api/breeds/image/random')
  .then((response) => 
  {
    let randomImage = response.data.message;
    document.querySelector("#dog-image").innerHTML = `<img src="${randomImage}">`
  })
  .catch((error) => 
  {
    console.log('error')
  })
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

 async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  let url = `/weather.txt?zipcode=${zipcode}`
  let response = await axios.get(url)
  document.getElementById("weather-info").innerHTML = response.data;
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  evt.preventDefault();
  // TODO: show the result message after your form
  let qty = document.getElementById("qty-field").value
  let type = document.getElementById("cookie-type-field").value

  let pair =
  {
    cookieType: type,
    qty: qty
  }

  let response = await axios.post('/order-cookies.json', pair)

  document.querySelector('#order-status').innerHTML = response.data.message

  if (response.data.resultCode === 'ERROR')
  {
    document.querySelector('#order-status').innerHTML = `<div class="order-error">${response.data.message}</div>`
  }
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  let formData = {'term': searchTerm}
  let queryString = new URLSearchParams(formData).toString();

  let response = await axios.get(`https://itunes.apple.com/search?${queryString}`)
  
  let displayString = ''
  for (let result of response.data.results)
  {
    displayString += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`
  }
  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
  document.querySelector("#itunes-results").innerHTML = displayString;
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
