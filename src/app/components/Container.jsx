import React, { useState } from 'react';
import Card from './Card';
import Wind from './Wind';
import Humidity from './Humidity';
import Visibility from './Visibility';
import Air from './Air';

export default function Container({ weatherData, unit, toggleUnit }) {
  const [currentUnit, setCurrentUnit] = useState(unit);

  const handleToggleUnit = (newUnit) => {
    setCurrentUnit(newUnit);
    toggleUnit(newUnit);
  };
  const convertTemp = (temp) => (currentUnit === 'C' ? temp : (temp * 9) / 5 + 32);


  if (!weatherData) {
    return <div className='text-white'>Error: no se encontraron datos del clima.</div>;
  }

  const dailyForecast = weatherData.list || [];
  if (dailyForecast.length === 0) {
    return <div className='text-white'>No hay pronósticos disponibles.</div>;
  }

  const dailyData = {};
  dailyForecast.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        temp_max: forecast.main.temp_max,
        temp_min: forecast.main.temp_min,
        weather: forecast.weather[0],
        wind: forecast.wind,
        humidity: forecast.main.humidity,
        visibility: forecast.visibility,
        pressure: forecast.main.pressure,
      };
    } else {
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, forecast.main.temp_max);
      dailyData[date].temp_min = Math.min(dailyData[date].temp_min, forecast.main.temp_min);
    }
  });

  const dailyArray = Object.entries(dailyData).slice(0, 5).map(([date, data]) => ({
    date,
    ...data,
  }));

  const isImperial = currentUnit === 'F';

  return (
    <div className='bg-[#100E1D] w-full flex flex-col items-center justify-center md:w-[70%] md:h-full p-5'>
      <div className='flex gap-4 items-center justify-end w-[70%] mt-5 px-16 max-w-[750px]'>
        <button
          className={`rounded-full w-10 h-10 font-bold ${currentUnit === 'C' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          onClick={() => handleToggleUnit('C')}
        >
          C
        </button>
        <button
          className={`rounded-full w-10 h-10 font-bold ${currentUnit === 'F' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          onClick={() => handleToggleUnit('F')}
        >
          F
        </button>
      </div>

      <div className='grid grid-cols-2 justify-center gap-4 mt-5 sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5'>
        {dailyArray.map((day, index) => (
          <Card
            key={index}
            title={new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short' })}
            img={`/images/weather/${day.weather.icon}.png`}
            temp1={`${Math.round(convertTemp(day.temp_max))}°${currentUnit}`}
            temp2={`${Math.round(convertTemp(day.temp_min))}°${currentUnit}`}
          />
        ))}
      </div>

      <div className='mt-5 w-full max-w-[650px]'>
        <h3 className='text-white font-bold text-left text-2xl'>Today&apos;s Highlights</h3>

        <div className='flex flex-col items-center justify-center gap-5 md:grid md:grid-cols-2'>
          <Wind
            speed={dailyArray[0]?.wind.speed}
            windDirection={dailyArray[0]?.wind.deg}
            unit={isImperial ? 'imperial' : 'metric'}
          />
          <Humidity value={Math.round(dailyArray[0]?.humidity)} />
          <Visibility distance={dailyArray[0]?.visibility / 1000 || 0} unit={currentUnit} />
          <Air value={dailyArray[0]?.pressure} />
        </div>
      </div>
    </div>
  );
}
