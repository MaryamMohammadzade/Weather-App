import { WeatherIcons } from "../utils/WeatherIcons.js";

// Updating Ui
export class WeatherUI {
    constructor() {
        this.temp = document.querySelector(".temp");
        this.city = document.querySelector(".city");
        this.humidity = document.querySelector(".humidity");
        this.wind = document.querySelector(".wind");
        this.icon = document.querySelector(".weather-icon");
        this.sections = document.querySelectorAll(".weather, .details");
        this.invalid = document.querySelector(".invalid"),
        this.historyList = document.querySelector(".history-list"),
        this.historyDiv = document.querySelector(".history")
    }

    update(model) {
        this.temp.textContent = `${model.temp}°C`;
        this.city.textContent = model.city;
        this.humidity.textContent = `${model.humidity}%`;
        this.wind.textContent = `${model.wind} km/h`;
        this.icon.src = WeatherIcons.getIcon(model.code);

            this.historyDiv.style.display = "block";

        this.invalid.style.display = "none";
        this.sections.forEach(el => el.style.display = "flex");
    }

  renderHistory(historyArr) {
    const ul = document.querySelector(".history-list");

    if (!historyArr || historyArr.length === 0) {
        ul.innerHTML = "<li class='empty'>No recent searches</li>";
        return;
    }
        ul.innerHTML = historyArr.map(city => `<li data-city="${city}">${city}</li>`)
        .join("");
}


    showError() {
        this.sections.forEach(el => el.style.display = "none");
        this.invalid.style.display = "block";
    }
}