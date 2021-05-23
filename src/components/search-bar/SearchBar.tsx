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

const SearchBar: FC = (props) => {
   const { panTo } = props;
   const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
   } = usePlacesAutocomplete({
      requestOptions: {
         location: { lat: () => 50.827758, lng: () => 4.372428 },
         radius: 5 * 1000,
      },
   });

   return (
      <div className="absolute top-4 left-1/2 z-10">
         <Combobox
            onSelect={async (address) => {
               setValue(address, false);
               clearSuggestions();

               try {
                  const results = await getGeocode({ address });
                  const { lat, lng } = await getLatLng(results[0]);
                  panTo({ lat, lng });
               } catch (error) {
                  console.log('error !');
               }
            }}
         >
            <ComboboxInput
               value={value}
               onChange={(event) => {
                  setValue(event.target.value);
               }}
               disabled={!ready}
               placeholder="Enter an address"
            />
            <ComboboxPopover>
               <ComboboxList>
                  {status === 'OK' &&
                     data.map(({ id, description }) => (
                        <ComboboxOption key={id} value={description} />
                     ))}
               </ComboboxList>
            </ComboboxPopover>
         </Combobox>
      </div>
   );
};

export default SearchBar;
