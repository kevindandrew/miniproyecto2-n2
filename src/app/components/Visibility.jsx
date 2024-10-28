import React from 'react';

const Visibility = ({ distance, unit }) => {
  const displayDistance = typeof distance === 'number' && distance >= 0
    ? (unit === 'F' ? (distance * 0.621371).toFixed(1) : distance.toFixed(1)) 
    : 'N/A'; 

  const unitLabel = unit === 'F' ? 'miles' : 'km'; 

  return (
    <div className='bg-[#1E213A] w-full h-48 flex flex-col items-center justify-center gap-7 text-white'>
      <h2 className="text-lg font-medium mb-4">Visibility</h2>
      <div className="text-5xl font-bold">
        {displayDistance} <span className="text-xl">{unitLabel}</span>
      </div>
    </div>
  );
};

export default Visibility;
