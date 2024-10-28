import React from 'react'

export default function Air({value}) {
  return (
    <div className='bg-[#1E213A] w-full h-48 flex flex-col items-center justify-center gap-7 text-white'>
      <h2 className="text-lg font-medium mb-4">Air Presure</h2>
      <div className="text-5xl font-bold">
        {value} <span className="text-xl">mb</span>
      </div>
    </div>
  )
}
