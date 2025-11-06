import { WeatherService } from "./services/WeatherService.js";
import { WeatherUI } from "./ui/WeatherUI.js";
import { WeatherApp } from "./app/WeatherApp.js";
// Start
const API_KEY = "67f4a448c1dd49dcba9175417252310";
const API_URL = "https://api.weatherapi.com/v1/current.json";

const service = new WeatherService(API_KEY, API_URL);
const ui = new WeatherUI();
new WeatherApp(service, ui);