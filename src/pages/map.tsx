import { FC, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import api from '../utils/api';
// import { Button } from '../components/common/button/Button';
import Map from '../components/google-map/GoogleMap';
import NavBar from '../components/navbar/Navbar';

export const url = `?term=food&latitude=${latitude}&longitude=${longitude}&radius=${distance}&limit=10&price=${price}&${belgianFood}&${japaneseFood}&${lebaneseFood}&${italianFood}&sort_by=best_match`;

const FoodRecommendationsPage: FC = () => {
   // const logout = () => {
   //    Cookies.remove('token');
   //    delete api.defaults.headers.Authorization;
   //    window.location.pathname = '/';
   // };

   // const [isLoading, setIsLoading] = useState(false);

   // const handleClick = () => {
   //    setIsLoading(true);
   //    logout();
   // };

   const [options, setOptions] = useState({ cuisineType: null, distance: null, price: null });
   console.log(
      '%coptions :',
      'background: #444; color: #bada55; padding: 2px; border-radius:2px',
      options,
   );

   const handleChangeOptions = (options) => {
      setOptions(options);
   };

   // if (options.cuisineType !== null)
   const belgianFood =
      options.cuisineType && options.cuisineType.Belgian ? `categories=belgian` : null;
   const japaneseFood =
      options.cuisineType && options.cuisineType.Japanese ? `categories=japanese` : null;
   const lebaneseFood =
      options.cuisineType && options.cuisineType.Lebanese ? `categories=lebanese` : null;
   const italianFood =
      options.cuisineType && options.cuisineType.Italian ? `categories=italian` : null;

   const latitude = 50.827758;
   const longitude = 4.372428;
   const distance = options.distance * 1000;
   const price = options.price;

   const getFoodSuggestions = async () => {
      try {
         const resp = await axios.get(
            `?term=food&latitude=${latitude}&longitude=${longitude}&radius=${distance}&limit=10&price=${price}&${belgianFood}&${japaneseFood}&${lebaneseFood}&${italianFood}&sort_by=best_match`,
            {
               headers: {
                  'Access-Control-Allow-Origin': '*',
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
               },
            },
         );
         console.log(resp.data);
      } catch (err) {
         // Handle Error Here
         console.error(err);
      }
   };

   getFoodSuggestions();

   return (
      <div className="flex flex column">
         {/* <Button disabled={isLoading} type="button" onClick={() => handleClick()}>
            Logout
         </Button> */}
         <div className="w-1/5">
            <NavBar handleChangeOptions={handleChangeOptions} />
         </div>
         <Map />
      </div>
   );
};

export default FoodRecommendationsPage;
