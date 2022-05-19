let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}:${minute}`;

function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "1a5778b146e207bfc834fc561386c412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "1a5778b146e207bfc834fc561386c412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forcast-date"> ${formatDay(forecastDay.dt)} </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt=""
        width="42"/>
        <div class="weather-forcast-temp">
          <span class="weather-forecast-max">${Math.round(
            forecastDay.temp.max
          )}º</span> <span class="weather-forecast-min">${Math.round(
          forecastDay.temp.min
        )}º</span>
      </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("New York");
