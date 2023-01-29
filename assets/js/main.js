let searchInputEl = document.querySelector("#search-input");
let searchBtnEl = document.querySelector("#search-button");
let todaySection = document.querySelector("#today");
let searchLocationEl = document.querySelector("#search-location");
let todayDateEl = document.querySelector("#today-date");
let todayTempEl = document.querySelector("#today-temp");
let todayWindEl = document.querySelector("#today-wind");
let todayHumidityEl = document.querySelector("#today-humidity");
let forecastContainerEl = document.querySelector("#forecast");

let apiKey = "40640050a45cbd8cf8d35ada1e14fee3";

/** Get user's location */
let userLocation = {};
if (window.navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      userLocation.latitude = latitude;
      userLocation.longitude = longitude;
    },
    (err) => console.log(err)
  );
}
// console.log(userLocation);

searchBtnEl.addEventListener("click", function (e) {
  e.preventDefault();

  let searchCity = searchInputEl.value;

  let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then(function (cityFound) {
      let city = cityFound[0];
      // console.log(city);
      // console.log(`City Name: ${city.name}`);

      // Display today's data for searched location

      let cityDataQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

      fetch(cityDataQueryURL)
        .then((response) => response.json())
        .then((cityData) => {
          let cityWeatherInfo = cityData.list;
          // console.log(cityWeatherInfo);
          // console.log(cityData.city.name);

          // Display today's data for searched location
          todayDateEl.textContent = displayDate(cityWeatherInfo[0].dt);

          searchLocationEl.textContent = cityData.city.name;
          todayTempEl.textContent = cityWeatherInfo[0].main.temp;
          todayHumidityEl.textContent = cityWeatherInfo[0].main.humidity;
          todayWindEl.textContent = cityWeatherInfo[0].wind.speed;

          // Display next 5 days data
          forecastContainerEl.innerHTML = `
          <div class="container">
            <div class="row"></div>
          </div>
          `;
          let fiveDayForecastArr = [
            cityWeatherInfo[0],
            cityWeatherInfo[8],
            cityWeatherInfo[16],
            cityWeatherInfo[24],
            cityWeatherInfo[32],
          ];

          fiveDayForecastArr.forEach((forecast) => {
            console.log(forecast.dt);
          });
        });
    });
});

function displayDate(unix) {
  return moment(unix, "X").format("dddd, MMM Do YYYY");
}

/** Geolocation URL
 * https://api.openweathermap.org/geo/1.0/direct?q=bristol&limit=5&appid=40640050a45cbd8cf8d35ada1e14fee3
 */
/** Bristol forecastURL
 * https://api.openweathermap.org/data/2.5/forecast?lat=51.4538022&lon=-2.5972985&appid=40640050a45cbd8cf8d35ada1e14fee3
 */

/**Openweather Weather condition codes
 * https://openweathermap.org/weather-conditions
 *
 * http://openweathermap.org/img/wn/10d@2x.png
 *
 */
