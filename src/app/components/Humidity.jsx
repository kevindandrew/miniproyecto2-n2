import React from 'react';

const Humidity = ({ value }) => {
    return (
        <div className="bg-[#1E213A] text-white p-6 text-center w-full h-48">
            <h2 className="text-lg font-medium mb-4">Humidity</h2>
            <div className="text-5xl font-bold mb-4">
                {value}%
            </div>
            <div className="flex justify-between text-sm mt-2">
                <span>0</span>
                <span>50</span>
                <span>100</span>  
            </div>
            <div className="relative h-2 bg-white rounded-full overflow-hidden mb-2">
                <div
                    className="bg-yellow-400 h-full rounded-full"
                    style={{ width: `${value}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-sm mt-2">
                <span></span>
                <span></span>
                <span>%</span>  
            </div>
        </div>
    );
};

export default Humidity;
