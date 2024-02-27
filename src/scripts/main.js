const apiKey = "5d392e52f28e664bfbe979d1e8ce5db1"; // Replace with your API key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", () => {
  const city = cityInput.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      weatherInfo.innerHTML = ""; // Clear previous results

      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
      const description = data.weather[0].description;

      weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="${description}">
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch(error => {
      console.error(error);
      weatherInfo.textContent = "Error fetching weather data!";
    });
});


// event listener for the enter key
cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});