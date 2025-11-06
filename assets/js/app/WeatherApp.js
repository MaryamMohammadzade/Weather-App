import { WeatherMapper } from "../utils/WeatherMapper.js";

// Weather App
export class WeatherApp {
    constructor(service, ui) {
        this.service = service;
        this.ui = ui;

        const input = document.querySelector(".search input");
        const btn = document.querySelector(".search button");

        btn.addEventListener("click", () => this.check(input.value));
        input.addEventListener("keypress", (e) => e.key === "Enter" && btn.click());
    }

    async check(city) {
        if (!city.trim()) return;

        try {
            const data = await this.service.fetchWeather(city);
            const model = WeatherMapper.toUIModel(data);
            this.ui.update(model);

        } catch (err) {
            this.ui.showError();
        }
    }
}