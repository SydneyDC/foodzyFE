import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from '@reach/combobox';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

type Props = { panTo: any; handleChangeLatitude: any; handleChangeLongitude: any };

const SearchBar: FC<Props> = (props) => {
   const { panTo, handleChangeLongitude, handleChangeLatitude } = props;

   const defaultRequestOptions = {
      requestOptions: {
         location: {
            lat: () => 50.827758,
            lng: () => 4.372428,
            equals: () => null,
            toJSON: () => null,
            toUrlValue: () => null,
         },
         radius: 20 * 1000,
         debounce: 200,
      },
   };

   const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
   } = usePlacesAutocomplete(defaultRequestOptions);

   return (
      <div className="absolute top-5 left-1/4 z-10 w-2/5 ">
         <Combobox
            onSelect={async (address) => {
               setValue(address, false);
               clearSuggestions();

               try {
                  const results = await getGeocode({ address });
                  const { lat, lng } = await getLatLng(results[0]);
                  handleChangeLatitude(lat);
                  handleChangeLongitude(lng);
                  panTo({ lat, lng });
               } catch (error) {
                  console.log('error !');
               }
            }}
         >
            <ComboboxInput
               className="w-full p-2 rounded-md"
               value={value}
               onChange={(event) => {
                  setValue(event.target.value);
               }}
               disabled={!ready}
               placeholder="Enter an address"
            />
            <ComboboxPopover className="bg-white rounded-md">
               <ComboboxList className="rounded-md">
                  {status === 'OK' &&
                     data.map(({ id, description }) => (
                        <ComboboxOption
                           key={id}
                           className="mt-2 mb-2 hover:bg-green-300 hover:border-green-500 pl-2 pt-2 pb-2 rounded-md"
                           value={description}
                        />
                     ))}
               </ComboboxList>
            </ComboboxPopover>
         </Combobox>
      </div>
   );
};

export default SearchBar;
