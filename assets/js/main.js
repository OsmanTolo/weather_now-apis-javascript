let searchInputEl = document.querySelector("#search-input");
let searchBtnEl = document.querySelector("#search-button");

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
      console.log(city);
      console.log(`City Name: ${city.name}`);

      let cityDataQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`;

      fetch(cityDataQueryURL)
        .then((response) => response.json())
        .then((cityData) => {
          let cityWeatherInfo = cityData.list;
          console.log(cityWeatherInfo);

          cityWeatherInfo.forEach((forcast, i) => {});
        });
    });
});

/** Geolocation URL
 * https://api.openweathermap.org/geo/1.0/direct?q=bristol&limit=5&appid=40640050a45cbd8cf8d35ada1e14fee3
 */
/** Bristol forecastURL
 * https://api.openweathermap.org/data/2.5/forecast?lat=51.4538022&lon=-2.5972985&appid=40640050a45cbd8cf8d35ada1e14fee3
 */
