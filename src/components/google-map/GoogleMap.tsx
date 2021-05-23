import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import React, { FC, useState, useCallback, useRef } from 'react';
import mapStyles from '../../styles/mapstyles';
import { Button } from '../common/button/Button';
import SearchBar from '../search-bar/SearchBar';

// Map options
const libraries: Libraries = ['places'];

const mapContainerStyle = {
   width: '100vw',
   height: '100vh',
};

const center = {
   lat: 50.827758,
   lng: 4.372428,
};

const options = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
};

const Map: FC = () => {
   const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries,
   });

   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);

   // useCallback is used anytime you want to use a function that shouldn't change/will always retain the same value unless the properties passed in the "deps" array (at the end) change.
   const onMapClick = useCallback((event) => {
      setMarkers((current) => [
         ...current,
         { lat: event.latLng.lat(), lng: event.latLng.lng(), time: new Date() },
      ]);
   }, []);

   // use Ref when you want to retain state without causing rerenders
   // VS use State when you want to cause react to rerender when the state updates
   const mapRef = useRef();
   const onMapLoad = useCallback((map) => {
      mapRef.current = map;
   }, []);

   const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(16);
   }, []);

   const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
         },
         () => null,
      );
   };

   const Locate = () => {
      return <Button onClick={getCurrentLocation}>My position</Button>;
   };

   if (loadError) return <div>'Error loading maps'</div>;
   if (!isLoaded) return <div>'Loading Maps'</div>;

   return (
      <div>
         <SearchBar panTo={panTo} />
         <div className="absolute bottom-8 right-16 z-10">
            <Locate panTo={panTo} />
         </div>
         <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={16}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
         >
            {markers.map((marker) => (
               <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => {
                     setSelected(marker);
                  }}
               />
            ))}

            {selected ? (
               <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => setSelected(null)}
               >
                  <div>
                     <h2>Marker Addres</h2>
                     <p>Restaurant Type</p>
                  </div>
               </InfoWindow>
            ) : null}
         </GoogleMap>
      </div>
   );
};

export default Map;
