"use client";
import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import useWeather from "@/hooks/useWeather";
import useCities from '@/hooks/useCities';

export default function Home() {
    const apiKey = '8bfdadce3eae01a8bb5ff14516fce05b';
    const { weatherData, city, setCity } = useWeather('Tokyo', apiKey);
    const { cities, filteredCities, searchQuery, handleSearch, findCityByCoordinates } = useCities();
    const [showModal, setShowModal] = useState(false);
    const [unit, setUnit] = useState('C');
    const toggleUnit = (newUnit) => setUnit(newUnit);
    const getLocationAndFetchWeather = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Coordenadas obtenidas:", latitude, longitude);

                    const cityName = await findCityByCoordinates(latitude, longitude);
                    console.log("Ciudad encontrada:", cityName);

                    if (cityName) {
                        setCity(cityName);
                    } else {
                        alert("No se encontró ninguna ciudad en esa ubicación.");
                    }
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("La geolocalización no es soportada por este navegador.");
        }
    };



    const selectCity = (cityName) => {
        setCity(cityName);
        setShowModal(false);
    };

    return (
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
    );
}
