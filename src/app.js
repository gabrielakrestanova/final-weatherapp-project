function formatDate(timestamp) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "cf74cb383f57c3a59e8730c4319ab78d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

// Forecast

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 daily-forecast">
          <div class="forecast-day">${day}</div>
          <img class="forecast-icon" src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png">
          <div class="forecast-temperature">
              <span class="forecast-temperature-max">24°</span> 
              <span class="forecast-temperature-min">16°</span>
          </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let submit = document.querySelector("#enter-city");
submit.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-temperature");
celsiusLink.addEventListener("click", changeToCelsius);

search("New York");
displayForecast();
