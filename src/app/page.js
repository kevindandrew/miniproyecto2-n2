"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import axios from 'axios';

export default function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Tokyo');
    const [showModal, setShowModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [unit, setUnit] = useState('C');

    const apiKey = '8bfdadce3eae01a8bb5ff14516fce05b';

    const toggleUnit = (newUnit) => setUnit(newUnit);

    function getLocationAndFetchWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Latitud:", latitude, "Longitud:", longitude);
                    const cityName = await findCityByCoordinates(latitude, longitude);
                    if (cityName) {
                        setCity(cityName); 
                    } else {
                        alert("No se encontró ninguna ciudad en esa ubicación.");
                    }
                },
                (error) => {
                    console.error("Error al obtener la ubicación: ", error);
                    alert("No se pudo obtener la ubicación.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("La geolocalización no es soportada por este navegador.");
        }
    }
    const findCityByCoordinates = async (latitude, longitude) => {
        const margin = 0.05;
        try {
            const response = await fetch('/cities.json');
            const data = await response.json();

          
            const cityData = data.find(city => {
                return (
                    latitude >= city.lat - margin && latitude <= city.lat + margin &&
                    longitude >= city.lon - margin && longitude <= city.lon + margin
                );
            });

            return cityData ? cityData.name : null; 
        } catch (error) {
            console.error("Error al cargar los datos de las ciudades:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadCities = async () => {
            try {
                const response = await fetch('/static_json/cities.json');
                const data = await response.json();
                setCities(data);
                setFilteredCities(data);
            } catch (error) {
                console.error("Error al cargar los datos de las ciudades:", error);
            }
        };

        loadCities();
    }, []);

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


    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredCities(
            cities.filter((city) => city.name.toLowerCase().includes(query))
        );
    };

    const selectCity = (cityName) => {
        setCity(cityName);
        setShowModal(false); 
    };

    return (
        <>
            <div className="h-svh w-full md:flex">
                <Sidebar
                    weatherData={weatherData}
                    city={city}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    filteredCities={filteredCities}
                    selectCity={selectCity}
                    getLocationAndFetchWeather={getLocationAndFetchWeather}
                    unit={unit}
                />
                <Container
                    weatherData={weatherData}
                    unit={unit}
                    toggleUnit={toggleUnit}
                />
            </div>
        </>
    );
}
