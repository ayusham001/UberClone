"use client"
import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState('null');
  const { source, setSource } = useContext(SourceContext);
  const { destination, setdestination } = useContext(DestinationContext);

  useEffect(() => {
    type == 'source'
      ? setPlaceholder('Pickup Location')
      : setPlaceholder('Dropoff Location')
  }, [])

  const getLatandLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.geometry && result.geometry.location) {
        if (type == 'source') {
          setSource({
            lat:result.geometry.location.lat(),
            lng:result.geometry.location.lng(),
            name:result.formatted_address,
            label:result.name
        });
        } else {
          setdestination({
            lat:result.geometry.location.lat(),
            lng:result.geometry.location.lng(),
            name:result.formatted_address,
            label:result.name
        });
        }
        const lat = result.geometry.location.lat();
        const lng = result.geometry.location.lng();
      }
    });
  };


  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image src={type == 'source' ? '/source.png' : '/dest.png'} width={15} height={15} />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatandLng(place, type);
            setValue(place)
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full outline-none',
          components: {
            DropdownIndicator: false
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: '#00fff00',
              border: 'none'
            }),
          }
        }}
      />
    </div>
  )
}

export default InputItem