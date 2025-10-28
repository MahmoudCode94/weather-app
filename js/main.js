const apiKey = "e74439d4e4574a0198d190445252810";
const cityInput = document.getElementById("searchLocation");
const forecastContainer = document.querySelector(".forecast-cards");

function getWeather(city) {
  if (city.trim() === "") {
    city = "Cairo";
  }

  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      city +
      "&days=3&lang=en"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector(".weather-illustration i").className =
        getWeatherIcon(data.current.condition.code) + " fa-5x";

      document.querySelector("h1.display-3").innerHTML =
        data.current.temp_c + "°<span class='fs-3'>C</span>";

      document.querySelector("p.mb-1 strong").textContent = new Date(
        data.location.localtime
      ).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      document.querySelector("p.text-white-50").textContent =
        data.current.condition.text;

      document.querySelector("h1.fs-1").textContent = data.location.name;

      document.getElementById("feels-like").textContent =
        data.current.feelslike_c + "°C";
      document.getElementById("wind-speed").textContent =
        data.current.wind_kph + " km/h";
      document.getElementById("humidity").textContent =
        data.current.humidity + "%";
      document.getElementById("pressure").textContent =
        data.current.pressure_mb + " mb";
      document.getElementById("visibility").textContent =
        data.current.vis_km + " km";
      document.getElementById("uv").textContent = data.current.uv;

      forecastContainer.innerHTML = "";
      data.forecast.forecastday.forEach(function (day) {
        var date = new Date(day.date);
        var weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        var card =
          '<div class="col-md-4">' +
          '<div class="card text-center px-3 py-2 shadow-sm forecast-card d-flex align-items-center">' +
          '<i class="' +
          getWeatherIcon(day.day.condition.code) +
          ' fa-2x mb-2"></i>' +
          '<h6 class="fw-bold mb-1">' +
          weekday +
          "</h6>" +
          "<small>" +
          day.day.maxtemp_c +
          "°C / " +
          day.day.mintemp_c +
          "°C</small>" +
          "</div>" +
          "</div>";
        forecastContainer.innerHTML += card;
      });

      playWeatherAnimation();
    })
    .catch(function (err) {
      console.error("Error fetching weather:", err);
    });
}

function getWeatherIcon(code) {
  var icons = {
    1000: "fa-solid fa-sun text-warning",
    1003: "fa-solid fa-cloud-sun text-warning",
    1006: "fa-solid fa-cloud text-secondary",
    1009: "fa-solid fa-cloud text-muted",
    1030: "fa-solid fa-smog text-secondary",
    1063: "fa-solid fa-cloud-sun-rain text-primary",
    1183: "fa-solid fa-cloud-showers-heavy text-primary",
    1195: "fa-solid fa-cloud-rain text-primary",
    1273: "fa-solid fa-cloud-bolt text-primary",
  };
  return icons[code] || "fa-solid fa-cloud text-secondary";
}

function playWeatherAnimation() {
  const cards = document.querySelectorAll(".forecast-card");
  const infoCards = document.querySelectorAll(".info-card");
  const mainIcon = document.querySelector(".weather-illustration i");
  const tempText = document.querySelector("h1.display-3");

  mainIcon.style.opacity = "0";
  mainIcon.style.transform = "scale(0.7)";
  setTimeout(function () {
    mainIcon.style.transition = "all 0.6s ease";
    mainIcon.style.opacity = "1";
    mainIcon.style.transform = "scale(1)";
  }, 100);

  tempText.style.opacity = "0";
  tempText.style.transform = "translateY(-10px)";
  setTimeout(function () {
    tempText.style.transition = "all 0.6s ease";
    tempText.style.opacity = "1";
    tempText.style.transform = "translateY(0)";
  }, 150);

  infoCards.forEach(function (card, i) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(function () {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200 + i * 100);
  });

  cards.forEach(function (card, i) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(function () {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 400 + i * 150);
  });
}

cityInput.addEventListener("input", function () {
  getWeather(cityInput.value);
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey +
          "&q=" +
          lat +
          "," +
          lon +
          "&days=3&lang=en"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          cityInput.value = data.location.name;
          getWeather(data.location.name);
        })
        .catch(function () {
          getWeather("Cairo");
        });
    },
    function () {
      getWeather("Cairo");
    }
  );
} else {
  getWeather("Cairo");
}
