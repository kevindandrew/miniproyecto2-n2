import React from 'react'
import Image from 'next/image'
export default function Card({title, img, temp1, temp2}) {
  return (
    <>
        <div className='bg-[#1E213A] flex flex-col w-28 h-40 items-center justify-center gap-3'>
            <h2>{title}</h2>
            <Image
                src={img}
                alt='tarjeta1'
                width={50}
                height={50}
            />
            <p>{temp1} -{temp2}</p>
        </div>
    </>
  )
}
