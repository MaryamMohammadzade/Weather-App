// Turning Code To Icon
export class WeatherIcons {
    static getIcon(code) {
        const iconMap = {
            clear: [1000],
            clouds: [1003, 1006, 1009],
            mist: [1030, 1135, 1147],
            drizzle: [1069, 1072, 1150, 1153, 1168, 1171],
            rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
            snow: [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282]
        };

        for (let key in iconMap) {
            if (iconMap[key].includes(code)) {
                return `images/${key}.png`;
            }
        }

        return "images/clear.png";
    }
}