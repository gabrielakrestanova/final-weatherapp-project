function formatSunrise(timestamp) {
  let date = new Date(timestamp * 1000);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatSunset(timestamp) {
  let date = new Date(timestamp * 1000);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

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
  let weekday = days[date.getDay()];
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatTimezoneDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[date.getDay()];
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekday}, ${day}.${month} ${hours}:${minutes}`;
}

// Forecast

function formatDay(timestamp) {
  date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");

  let dailyForecast = response.data.daily;

  let forecastHTML = `<div class="row row-cols-5">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col daily-forecast">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img class="forecast-icon" width="60px" src="icons/${
            forecastDay.weather[0].icon
          }.png">
          <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span> 
              <span class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
          </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.current.dt * 1000
  );
  document.querySelector("#local-date").innerHTML = formatTimezoneDate(
    response.data.current.dt + response.data.timezone_offset - 3600
  );
  document.querySelector("#sunrise").innerHTML = formatSunrise(
    response.data.current.sunrise + response.data.timezone_offset - 3600
  );
  document.querySelector("#sunset").innerHTML = formatSunset(
    response.data.current.sunset + response.data.timezone_offset - 3600
  );
}

function getForecast(coordinates) {
  let apiKey = "cf74cb383f57c3a59e8730c4319ab78d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  document
    .querySelector("#weather-icon")
    .setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  getForecast(response.data.coord);
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

// Geolocation

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "cf74cb383f57c3a59e8730c4319ab78d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", getLocation);

let submit = document.querySelector("#enter-city");
submit.addEventListener("submit", handleSubmit);

search("Prague");
