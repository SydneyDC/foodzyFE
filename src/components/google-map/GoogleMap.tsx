import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import React, { FC, useState, useCallback, useRef } from 'react';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';

import mapStyles from '../../styles/mapstyles';

import { Button } from '../common/button/Button';
import SearchBar from '../search-bar/SearchBar';

// Map options
const libraries: Libraries = ['places'];

const mapContainerStyle = {
   width: '80vw',
   height: '100vh',
};

const center = {
   lat: 50.827758,
   lng: 4.372428,
};

const options: any = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
};

type Props = {
   handleChangeLatitude: any;
   handleChangeLongitude: any;
   restaurantMarkers: any;
};

const Map: FC<Props> = (props) => {
   const { handleChangeLatitude, handleChangeLongitude, restaurantMarkers } = props;
   const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries,
   });

   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState({ markerCoords: { lat: null, lng: null }, name: '' });

   // useCallback is used anytime you want to use a function that shouldn't change/will always retain the same value unless the properties passed in the "deps" array (at the end) change.
   const onMapClick = useCallback((event) => {
      setMarkers((current) => [
         ...current,
         { lat: event.latLng.lat(), lng: event.latLng.lng(), time: new Date() },
      ]);
   }, []);

   // use Ref when you want to retain state without causing rerenders
   // VS use State when you want to cause react to rerender when the state updates
   const mapRef = useRef(null);
   const onMapLoad = useCallback((map) => {
      mapRef.current = map;
   }, []);

   const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(16);
   }, []);

   type Props = { panTo: any };

   const Locate: FC<Props> = (props) => {
      const { panTo } = props;

      const getCurrentLocation = () => {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            () => null,
         );
      };

      return (
         <Button onClick={getCurrentLocation}>
            <MyLocationOutlinedIcon />
         </Button>
      );
   };

   if (loadError) return <div>'Error loading maps'</div>;
   if (!isLoaded) return <div>'Loading Maps'</div>;

   return (
      <div>
         <SearchBar
            panTo={panTo}
            handleChangeLatitude={handleChangeLatitude}
            handleChangeLongitude={handleChangeLongitude}
         />
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
                     setSelected({
                        markerCoords: { lat: marker.lat, lng: marker.lng },
                        name: marker.name,
                     });
                  }}
               />
            ))}

            {restaurantMarkers.map((marker) => (
               <Marker
                  key={marker.name}
                  position={{ lat: marker.restaurantLat, lng: marker.restaurantLng }}
                  onClick={() => {
                     setSelected({
                        markerCoords: { lat: marker.restaurantLat, lng: marker.restaurantLng },
                        name: marker.name,
                     });
                  }}
               />
            ))}

            {selected && selected.markerCoords.lat && selected.markerCoords.lng && selected.name ? (
               <InfoWindow
                  position={{ lat: selected.markerCoords.lat, lng: selected.markerCoords.lng }}
                  onCloseClick={() => setSelected(null)}
               >
                  <div>
                     <p>{selected.name}</p>
                  </div>
               </InfoWindow>
            ) : null}
         </GoogleMap>
      </div>
   );
};

export default Map;
