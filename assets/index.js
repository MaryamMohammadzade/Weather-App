const apiUrl = "https://api.weatherapi.com/v1/current.json?key=67f4a448c1dd49dcba9175417252310&aqi=no&q=";
var searchInput = document.querySelector(".search Input");
var searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") searchBtn.click();
});

// Check Weather Function
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city);

        if (!response.ok) {
            document.querySelectorAll(".weather, .details").forEach(el => {
                el.style.display = "none";
            });
            document.querySelector(".invalid").style.display = "block";
            return;
        }

        const data = await response.json();
        console.log(data);

        // Update DOM
        document.querySelector(".temp").textContent = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".city").textContent = data.location.name;
        document.querySelector(".humidity").textContent = Math.round(data.current.humidity) + "%";
        document.querySelector(".wind").textContent = Math.round(data.current.wind_kph) + "km/h";

        // Using Condition Code Of API To Get Weather Status
        const code = data.current.condition.code;
        const iconPath = getWeatherIconByCode(code);
        document.querySelector(".weather-icon").src = iconPath;

        // Display City/Weather Details
        document.querySelector(".invalid").style.display = "none";
        document.querySelectorAll(".weather, .details").forEach(el => {
            el.style.display = "flex";
        });

    } catch (error) {
        console.error("Fetch error:", error);
        document.querySelectorAll(".weather, .details").forEach(el => {
            el.style.display = "none";
        });
        document.querySelector(".invalid").style.display = "block";
    }
}

// Get Weather Status By Code Function
function getWeatherIconByCode(code) {
    // Clear
    if (code === 1000) {
        return "images/clear.png";
    }

    // Clouds
    else if ([1003, 1006, 1009].includes(code)) {
        return "images/clouds.png";
    }

    // Mist/ Fog
    else if ([1030, 1135, 1147].includes(code)) {
        return "images/mist.png";
    }

    // Drizzle
    else if ([1069, 1072, 1150, 1153, 1168, 1171].includes(code)) {
        return "images/drizzle.png";
    }

    // Rain
    else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276].includes(code)) {
        return "images/rain.png";
    }

    // Snow / Ice / Sleet
    else if ([1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282].includes(code)) {
        return "images/snow.png";
    }

    // Default
    else {
        return "images/clear.png";
    }
}
