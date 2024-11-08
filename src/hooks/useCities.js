import { useState, useEffect } from 'react';
import citiesData from '@/data/cities.json';

export default function useCities() {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setCities(citiesData);
        setFilteredCities(citiesData);
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value || ''; 
        setSearchQuery(query);
        const lowerCaseQuery = query.toLowerCase();

        const filtered = cities.filter((city) =>
            city.name.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredCities(filtered);
    };
    const findCityByCoordinates = (latitude, longitude) => {
        if (!cities || cities.length === 0) {
            console.error("No se cargaron los datos de las ciudades.");
            return null;
        }
    

        const threshold = 0.5; 
    
    
        const city = cities.find(city => {
            const latDiff = Math.abs(city.lat - latitude);
            const lonDiff = Math.abs(city.lon - longitude); 
            return latDiff < threshold && lonDiff < threshold;
        });
    
        return city ? city.name : null;
    };
    
    ;
    

    return {
        cities,
        filteredCities,
        searchQuery,
        handleSearch,
        findCityByCoordinates,
    };
}
