import { FC, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import api from '../utils/api';
// import { Button } from '../components/common/button/Button';
import Map from '../components/google-map/GoogleMap';
import NavBar from '../components/navbar/Navbar';

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

   const [options, setOptions] = useState({
      cuisineType: { Belgian: false, Japanese: false, Lebanese: false, Italian: false },
      distance: 1,
      price: 1,
   });

   const [latitude, setLatitude] = useState(50.827758);
   const handleChangeLatitude = (lat) => {
      setLatitude(lat);
   };

   const [longitude, setLongitude] = useState(4.372428);
   const handleChangeLongitude = (lng) => {
      setLongitude(lng);
   };

   const [restaurantMarkers, setRestaurantMarkers] = useState([]);
   const handleChangeRestaurantMarkers = (data) => {
      setRestaurantMarkers(data);
   };

   const belgianFood =
      options.cuisineType && options.cuisineType.Belgian ? `categories=belgian` : '';
   const japaneseFood =
      options.cuisineType && options.cuisineType.Japanese ? `categories=japanese` : '';
   const lebaneseFood =
      options.cuisineType && options.cuisineType.Lebanese ? `categories=lebanese` : '';
   const italianFood =
      options.cuisineType && options.cuisineType.Italian ? `categories=italian` : '';

   const distance = options.distance * 1000;
   const price = options.price;

   const handleChangeOptions = (options) => {
      setOptions(options);
      getFoodSuggestions();
   };

   const getFoodSuggestions = async () => {
      try {
         const resp = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&latitude=${latitude}&longitude=${longitude}&radius=${distance}&limit=10&price=${price}&${belgianFood}&${japaneseFood}&${lebaneseFood}&${italianFood}&sort_by=best_match`,
            {
               headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
               },
            },
         );
         console.log(resp.data.businesses);

         handleChangeRestaurantMarkers(
            resp.data.businesses.map((data) => ({
               name: data.name,
               restaurantLat: data.coordinates.latitude,
               restaurantLng: data.coordinates.longitude,
            })),
         );
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="flex flex column">
         {/* <Button disabled={isLoading} type="button" onClick={() => handleClick()}>
            Logout
         </Button> */}
         <div className="w-1/5">
            <NavBar handleChangeOptions={handleChangeOptions} />
         </div>
         <Map
            handleChangeLatitude={handleChangeLatitude}
            handleChangeLongitude={handleChangeLongitude}
            restaurantMarkers={restaurantMarkers}
         />
      </div>
   );
};

export default FoodRecommendationsPage;
