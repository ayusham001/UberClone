import Image from 'next/image'
import React from 'react'
import { FaUser } from "react-icons/fa6";

function CarListItem({ car,distance }) {
  return (
    <div className='mt-4 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <Image src={car.image}
            width={100} height={100}
          />
          <div>
            <div className='flex gap-5'>
              <h2 className='text-[18px] font-semibold '>{car.name}</h2>
              <span className='flex gap-2 items-center text-[14px]'>
                <FaUser />{car.seat}
              </span>
            </div>
            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className='text-[18px] font-semibold'>${(car.amount * distance).toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CarListItem