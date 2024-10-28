import React from 'react';
import Image from 'next/image';

export default function Wind({ speed, windDirection, unit }) {
    const getWindDirection = (deg) => {
        const directions = [
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"
        ];
        return directions[Math.round(deg / 22.5) % 16];
    };

    const cardinalDirection = getWindDirection(windDirection);

    const windStyle = {
        transform: `rotate(${windDirection}deg)`,
        transition: 'transform 0.3s ease',
    };

    const speedToShow = unit === 'imperial' ? (speed * 2.23694).toFixed(1) : speed.toFixed(1); 
    const unitLabel = unit === 'imperial' ? 'mph' : 'm/s'; 

    return (
        <div className='bg-[#1E213A] w-full h-48 flex flex-col items-center justify-center gap-7'>
            <h3 className='text-white'>Wind Status</h3>
            <span className='text-white text-5xl font-bold'>{speedToShow} {unitLabel}</span>
            <div className='flex gap-2 items-center'>
                <div style={windStyle}>
                    <Image
                        src="/images/navigation.svg"
                        alt='imagen de dirección del viento'
                        width={30}
                        height={30}
                        className='bg-gray-500 rounded-full p-2'
                    />
                </div>
                <p className='text-white'>{cardinalDirection}</p>
            </div>
        </div>
    );
}
