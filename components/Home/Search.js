"use client"
import React, { useEffect,useContext } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '../../context/SourceContext'
import { DestinationContext } from '../../context/DestinationContext'

function Search() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setdestination } = useContext(DestinationContext);
  useEffect(()=>{
    if(source && destination){
    }
  },[source,destination])
  return (
    <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get a ride</p>
      <InputItem type='source' />
      <InputItem type='destination' />
      <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
    </div>
  )
}

export default Search 