import React, { useEffect, useState, useContext } from 'react'
import { GoogleMap, useJsApiLoader, Marker, OverlayView, DirectionsRenderer } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function Maps() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.5
  };

  const [center, setCenter] = useState({
    lat: 20.5937,
    lng: 78.9629
  });

  const { source, setSource } = useContext(SourceContext);
  const { destination, setdestination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([])

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng
      })

      setCenter({
        lat: source.lat,
        lng: source.lng
      })
    }
    if (source.length != [] && destination.length != []) {
      directionRoute();
    }
  }, [source])

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      })
    }
    if (source.length != [] && destination.length != []) {
      directionRoute();
    }
  }, [destination])

  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    },(result,status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result);
      } else {
        console.error('Error with direction route');
      }
    });
  }


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "f1c80e12d64a7a64" }}
    >
      {source.length != [] ? <Marker
        position={{ lat: source.lat, lng: source.lng }}
        icon={{
          url: '/source.png',
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      >
        <OverlayView
          position={{ lat: source.lat, lng: source.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='p-2 bg-white font-bold inline-block m-3 rounded-xl'>
            <p className='text-black text-[16px]'>{source.label}</p>
          </div>
        </OverlayView>
      </Marker> : null}

      {destination.length != [] ? <Marker
        position={{ lat: destination.lat, lng: destination.lng }}
        icon={{
          url: '/dest.png',
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      > <OverlayView
        position={{ lat: destination.lat, lng: destination.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
          <div className='p-2 bg-white font-bold inline-block m-4 rounded-xl'>
            <p className='text-black text-[16px]'>{destination.label}</p>
          </div>
        </OverlayView>
      </Marker> : null}

      <DirectionsRenderer 
      directions={directionRoutePoints}
      options={{
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#000",
          strokeWeight: 5,
        },
      }}
      />
    </GoogleMap>
  )

}

export default Maps