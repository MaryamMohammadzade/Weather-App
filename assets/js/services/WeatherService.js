// API Handling
export class WeatherService {
    constructor(apiKey, apiUrl) {
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