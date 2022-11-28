// first api call -  get lattitude and longitude of city from geocoding api
const apiKey = "d1f2c9428f8c619c2e08455b42c9e229"

const getGeoData = async () => {
    const cityName = document.querySelector("#cityName").value;
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`);
    const geoData = {
        lat: response.data[0].lat,
        lon: response.data[0].lon
    };
    return geoData;
}

// second api call - getting the weather at lat and lon retrieved in first api call

const getWeatherData = async () => {
    const geoData = await getGeoData();
    lat = geoData.lat;
    lon = geoData.lon;
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return response.data;
}

// we'll need this to display our results later

const DOM_elements = {
    weather_list: '.weather-list'
}

// converting Kelvin to Farenheit

const convertTemp = (temp) => {
    let F = ((temp - 273.15) * (9/5) + 32);
    return F
}

// setting our variables and displaying the infomation

const displayWeather = async () => {
    const data = await getWeatherData();
    let cityName = document.querySelector("#cityName").value;
    let currentTempK = data.main.temp;
    let highTempK = data.main.temp_max;
    let lowTempK = data.main.temp_min;
    let forecast = data.weather[0].description;
    let humidity = data.main.humidity;
    let currentTempF = Math.floor(convertTemp(currentTempK))
    let highTempF = Math.floor(convertTemp(highTempK))
    let lowTempF = Math.floor(convertTemp(lowTempK))
    const html = `<h1>${cityName} Weather</h1><br>
    <div class="card" style="width: 80%; id="current-temp">
    <div class="card-header">
      Current Temperature
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> ${currentTempF}</li>
    </ul>
  </div>
  <br>
  <div class="card" style="width: 80%; id="high-temp">
    <div class="card-header">
      Today's High
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> ${highTempF}</li>
    </ul>
  </div>
  <br>
  <div class="card" style="width: 80%; id="low-temp">
    <div class="card-header">
      Today's Low
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> ${lowTempF}</li>
    </ul>
  </div>
  <br>
  <div class="card" style="width: 80%; id="forecast">
    <div class="card-header">
      Forecast
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> ${forecast}</li>
    </ul>
  </div>
  <br>
  <div class="card" style="width: 80%; id="humidity">
    <div class="card-header">
      Humidity
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> ${humidity}</li>
    </ul>
  </div>
  <br>`
  document.querySelector(DOM_elements.weather_list).insertAdjacentHTML('beforeend', html)
}

// Function to clear data
const clearData = () => {
    document.querySelector(DOM_elements.weather_list).innerHTML = ''
}