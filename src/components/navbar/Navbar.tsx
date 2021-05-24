/* eslint-disable no-use-before-define */
import React, { FC, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';
import Drawer from '../drawer/Drawer';
import Checkbox from '../checkbox/Checkbox';
import { Button } from '../common/button/Button';

const NavBar: FC = () => {
   const useStyles = makeStyles(() => ({
      formControl: {
         width: '100%',
      },
   }));

   const classes = useStyles();

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
         <Box padding={4}>
            <Box marginBottom={3} marginTop={3}>
               <FormControl className={classes.formControl}>
                  <InputLabel id="price">Choose a price range</InputLabel>
                  <Select labelId="price" id="price" value={price} onChange={handlePriceChange}>
                     {priceRange.map((price) => {
                        return (
                           <MenuItem key={price.returnValue} value={price.returnValue}>
                              {price.label}
                           </MenuItem>
                        );
                     })}
                  </Select>
               </FormControl>
               <Box marginBottom={3} marginTop={3}>
                  <FormControl className={classes.formControl}>
                     <InputLabel id="price">Choose a maximum distance</InputLabel>
                     <Select
                        labelId="price"
                        id="price"
                        value={distance}
                        onChange={handleDistanceChange}
                     >
                        {distanceRange.map((distance) => {
                           return (
                              <MenuItem key={distance.returnValue} value={distance.returnValue}>
                                 {distance.label}
                              </MenuItem>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Box>
               <Checkbox
                  cuisineType={cuisineType}
                  handleCuisineTypeChange={handleCuisineTypeChange}
               />
               <Box marginBottom={3} marginTop={3}>
                  <Button onClick={handleSubmit}>Search for lunch places !</Button>
               </Box>
            </Box>
         </Box>
      </>
   );

   return (
      <>
         <Drawer form={form} />
      </>
   );
};

export default NavBar;
