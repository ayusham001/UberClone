import React, { useState } from 'react'
import { CarListData } from '../../utils/CarListData'
import CarListItem from './CarListItem'
import { useRouter } from 'next/navigation';

function CarListOption({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const router = useRouter();
  return (
    <div className='mt-5 overflow-auto h-[500px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div className={`cursor-pointer p-2 px-4 rounded-md border-black
          ${activeIndex === index ? 'border-[3px]' : ''}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item)
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
      {selectedCar ? (
        <div className='flex text-[14px] md:pr-0 pr-10 z-10 justify-between fixed bottom-2 bg-white rounded-lg shadow-xl w-full md:w-[30%] border-[1px] items-center'>
          <p className='p-1'>Make Payment of <b>${(selectedCar.amount * distance).toFixed(2)}</b></p>
          <button
            className='p-3 bg-black text-white rounded-lg text-center'
            onClick={() => {
              router.push('/payments?amount=' + (selectedCar.amount * distance).toFixed(2))
            }}
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}

    </div>
  )
}

export default CarListOption