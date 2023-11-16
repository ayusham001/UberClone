"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { SourceContext } from '../context/SourceContext'
import { DestinationContext } from '../context/DestinationContext'
import Search from '../components/Home/Search'
import Maps from '../components/Home/Maps'
import { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

export default function Home() {
  const [source, setSource] = useState([])
  const [destination, setdestination] = useState([])
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setdestination }}>
        <LoadScript 
        libraries={['places']}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <Search />
            </div>
            <div className='col-span-2'>
              <Maps />
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  )
}
