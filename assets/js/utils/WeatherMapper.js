// Get & Organize Data
export class WeatherMapper {
    static toUIModel(data) {
        return {
            city: data.location.name,
            temp: Math.round(data.current.temp_c),
            humidity: Math.round(data.current.humidity),
            wind: Math.round(data.current.wind_kph),
            code: data.current.condition.code,
        };
    }
}