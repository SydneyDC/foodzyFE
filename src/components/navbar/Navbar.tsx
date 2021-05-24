/* eslint-disable no-use-before-define */
import React, { FC, useState } from 'react';
import Checkbox from '../checkbox/Checkbox';
import { Button } from '../common/button/Button';

const NavBar: FC = () => {
   const priceRange = [
      { returnValue: '< 10€', label: '< 10€' },
      { returnValue: '10€ - 20€', label: '10€ - 20€' },
      { returnValue: '20€ - 50€', label: '20€ - 50€' },
      { returnValue: '> 50€', label: '> 50€' },
   ];

   const distanceRange = [
      { returnValue: '< 1km', label: '< 1km' },
      { returnValue: '1km - 2km', label: '1km - 2km' },
      { returnValue: '2km - 5km', label: '2km - 5km' },
      { returnValue: '> 5km', label: '> 5km' },
   ];

   const [price, setPrice] = useState('');
   const [distance, setDistance] = useState('');

   const handlePriceChange = (event) => {
      setPrice(event.target.value);
   };

   const handleDistanceChange = (event) => {
      setDistance(event.target.value);
   };

   const handleSubmit = () => {
      console.log({ price, distance, cuisineType });
   };

   const [cuisineType, setCuisineType] = useState({
      Italian: false,
      Lebanese: false,
      Japanese: false,
      Belgian: false,
   });

   const handleCuisineTypeChange = (event) => {
      setCuisineType({ ...cuisineType, [event.target.name]: event.target.checked });
   };

   const form: any = (
      <>
         <div>
            <div className="ml-2 mr-2">
               <div className="mt-5 mb-5">
                  <form>
                     <p className="mb-3 mt-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Price range
                     </p>
                     <div className="flex justify-center">
                        <select
                           className="w-4/5 outline-none block align-center appearance-none border border-green-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                           id="price"
                           value={price}
                           onChange={handlePriceChange}
                        >
                           <option>Select price</option>
                           {priceRange.map((price) => {
                              return (
                                 <option key={price.returnValue} value={price.returnValue}>
                                    {price.label}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                  </form>
               </div>
               <div>
                  <div className="mt-5 mb-5">
                     <form>
                        <p className="mt-3 mb-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                           Distance radius
                        </p>
                        <div className="flex justify-center">
                           <select
                              className="w-4/5 outline-none block appearance-none border border-green-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="distance"
                              value={distance}
                              onChange={handleDistanceChange}
                           >
                              <option>Select distance</option>
                              {distanceRange.map((distance) => {
                                 return (
                                    <option key={distance.returnValue} value={distance.returnValue}>
                                       {distance.label}
                                    </option>
                                 );
                              })}
                           </select>
                        </div>
                     </form>
                  </div>
               </div>
               <Checkbox handleCuisineTypeChange={handleCuisineTypeChange} />
               <div className="flex justify-center">
                  <Button onClick={handleSubmit}>Search for lunch places !</Button>
               </div>
            </div>
         </div>
      </>
   );

   return <>{form}</>;
};

export default NavBar;
