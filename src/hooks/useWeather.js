import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useWeather(initialCity, apiKey) {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(initialCity);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city) return;
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
    }, [city, apiKey]);

    return { weatherData, city, setCity };
}
