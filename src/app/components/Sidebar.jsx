import React from 'react';
import Image from 'next/image';

export default function Sidebar({
    weatherData,
    city,
    showModal,
    setShowModal,
    searchQuery,
    handleSearch,
    filteredCities,
    selectCity,
    getLocationAndFetchWeather, 
    unit,
}) {
    const convertTemp = (temp) => (unit === 'C' ? temp : (temp * 9 / 5) + 32);

    return (
        <div className='flex flex-col bg-[#1E213A] w-full h-full text-center py-5 md:w-[30%] md:min-w-[370px] md:h-full'>
            <div className='flex items-center justify-between px-16'>
                <button
                    aria-label="Search for Places"
                    className='bg-[#6E707A] p-1 px-4'
                    onClick={() => setShowModal(true)}
                >
                    Search for Places
                </button>
                <button
                    aria-label="Location Button"
                    className='bg-[#6E707A] p-2 rounded-full'
                    onClick={getLocationAndFetchWeather}
                >
                    <Image src="/images/location.svg" alt="Location Icon" width={20} height={20} />
                </button>
            </div>

            <div className="w-full h-80 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/images/others/Cloud-background.png')] bg-center bg-[length:150%_100%] opacity-5"></div>
                {weatherData && weatherData.list && weatherData.list.length > 0 && (
                    <Image
                        src={`/images/weather/${weatherData.list[0].weather[0].icon}.png`} 
                        alt="Weather Icon"
                        width={200}
                        height={200}
                        className="relative"
                    />
                )}
            </div>
            <div className='flex flex-col items-center justify-center gap-10'>
                {weatherData && weatherData.list ? (
                    <>
                        <h2 className='text-9xl mt-10 text-[#88869D]'>
                            {Math.round(convertTemp(weatherData.list[0].main.temp))}°{unit}
                        </h2>
                        <h3 className='text-3xl mt-5 text-[#A09FB1]'>
                            {weatherData.list[0].weather[0].description}
                        </h3>
                        <p className='text-[#88869D]'>
                            Today . {new Date().toLocaleDateString('en-GB', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                            })}
                        </p>
                        <div className='flex gap-3'>
                            <Image src="/images/location_on.svg" alt="Location Icon" width={20} height={20} />
                            <span className='text-xs text-[#88869D]'>{weatherData.city.name}</span>
                        </div>
                    </>
                ) : (
                    <p className='text-[#88869D]'>Loading...</p>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-y-0 left-0 bg-[#1E213A] flex flex-col p-5 text-center z-50 w-full md:w-[30%] h-auto">
                    <button
                        aria-label="Close Modal"
                        className="self-end bg-none p-2 rounded-full mb-4"
                        onClick={() => setShowModal(false)}
                    >
                       X
                    </button>
                    <input
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="bg-[#1E213A] border-white border-2 p-3 mb-4 text-white w-full"
                    />
                    <div className="overflow-y-auto max-h-[400px]">
                        {filteredCities.slice(0, 3).map((city) => (
                            <div
                                key={city.id}
                                onClick={() => selectCity(city.name)}
                                className="p-3 bg-none m-2 rounded-lg cursor-pointer hover:bg-[#131525] "
                            >
                                {city.name}, {city.country}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
