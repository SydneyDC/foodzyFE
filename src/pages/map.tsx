import { FC, useState } from 'react';
import Cookies from 'js-cookie';

import 'tailwindcss/tailwind.css';

import api from '../utils/api';
import { Button } from '../components/common/button/Button';
import Map from '../components/google-map/GoogleMap';

const FoodRecommendationsPage: FC = () => {
   const logout = () => {
      Cookies.remove('token');
      delete api.defaults.headers.Authorization;
      window.location.pathname = '/';
   };

   const [isLoading, setIsLoading] = useState(false);

   const handleClick = () => {
      setIsLoading(true);
      logout();
   };

   return (
      <div>
         {/* <h1>
            Foodzy
            <span role="img" aria-label="fork and knife with plate">
               🍽
            </span>
         </h1> */}
         {/* <Button disabled={isLoading} type="button" onClick={() => handleClick()}>
            Logout
         </Button> */}
         <Map />
      </div>
   );
};

export default FoodRecommendationsPage;
