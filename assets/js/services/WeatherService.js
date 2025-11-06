import { IWeatherService } from "./IWeatherService.js";
// API Handling
export class WeatherService extends IWeatherService{
    constructor(apiKey, apiUrl) {
        super();
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    async fetchWeather(city) {
        const url = `${this.apiUrl}?key=${this.apiKey}&aqi=no&q=${city}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");//1
        }

        return response.json();
    }
}