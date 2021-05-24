import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete';
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from '@reach/combobox';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

type Props = { panTo: any };

const SearchBar: FC<Props> = (props) => {
   const { panTo } = props;
   const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
   } = usePlacesAutocomplete({
      requestOptions: {
         location: {
            lat: () => 50.827758,
            lng: () => 4.372428,
            equals: () => null,
            toJSON: () => null,
            toUrlValue: () => null,
         },
         radius: 20 * 1000,
      },
   });

   // Restaurant suggestions
   // const parameter: any = {
   //    // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
   //    placeId: data,
   //    // Specify the return data that you want (optional)
   //    fields: ['name', 'rating'],
   // };

   // const restaurantSuggestions = () => {
   //    getDetails(parameter)
   //       .then((details) => {
   //          console.log('Details: ', details);
   //       })
   //       .catch((error) => {
   //          console.log('Error: ', error);
   //       });
   // };

   // restaurantSuggestions();

   return (
      <div className="absolute top-4 left-1/4 z-10 w-1/2">
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
               className="w-full"
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
