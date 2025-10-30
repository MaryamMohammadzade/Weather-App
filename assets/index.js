const apiUrl = "https://api.weatherapi.com/v1/current.json?key=67f4a448c1dd49dcba9175417252310&aqi=no&q=";

// Elements
const elements = {
  searchInput: document.querySelector(".search input"),
  searchBtn: document.querySelector(".search button"),
  temp: document.querySelector(".temp"),
  city: document.querySelector(".city"),
  humidity: document.querySelector(".humidity"),
  wind: document.querySelector(".wind"),
  weatherIcon: document.querySelector(".weather-icon"),
  invalid: document.querySelector(".invalid"),
  weatherSections: document.querySelectorAll(".weather, .details")
};

// Hide / Show Sections
function showWeather() {
  elements.invalid.style.display = "none";
  elements.weatherSections.forEach(el => el.style.display = "flex");
}

function hideWeather() {
  elements.weatherSections.forEach(el => el.style.display = "none");
}

function showError() {
  hideWeather();
  elements.invalid.style.display = "block";
}

// Fetch Weather Data
async function fetchWeather(city) {
  try {
    const response = await fetch(apiUrl + city);
    if (!response.ok) throw new Error("Invalid city");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Get Weather Icon by Code
function getWeatherIconByCode(code) {
  const weatherMap = {
    clear: [1000],
    clouds: [1003, 1006, 1009],
    mist: [1030, 1135, 1147],
    drizzle: [1069, 1072, 1150, 1153, 1168, 1171],
    rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
    snow: [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
  };

  for (const [type, codes] of Object.entries(weatherMap)) {
    if (codes.includes(code)) return `images/${type}.png`;
  }

  return "images/clear.png";
}

// Update UI
function updateUI(data) {
  elements.temp.textContent = Math.round(data.current.temp_c) + "°C";
  elements.city.textContent = data.location.name;
  elements.humidity.textContent = Math.round(data.current.humidity) + "%";
  elements.wind.textContent = Math.round(data.current.wind_kph) + "km/h";
  elements.weatherIcon.src = getWeatherIconByCode(data.current.condition.code);
  showWeather();
}

// Main Controller Function
async function checkWeather(city) {
  if (!city) return;
  try {
    const data = await fetchWeather(city);
    updateUI(data);
  } catch {
    showError();
  }
}

// Event Listeners - Run
elements.searchBtn.addEventListener("click", () => {
  const city = elements.searchInput.value.trim();
  checkWeather(city);
});

elements.searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") elements.searchBtn.click();
});
