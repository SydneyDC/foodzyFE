import { FC, useState } from 'react';
import Cookies from 'js-cookie';

import api from '../utils/api';
import { Button } from '../components/common/button/Button';
import Map from '../components/google-map/GoogleMap';
import NavBar from '../components/navbar/Navbar';

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
      <div className="flex flex column">
         {/* <Button disabled={isLoading} type="button" onClick={() => handleClick()}>
            Logout
         </Button> */}
         <div className="w-1/5">
            <NavBar />
         </div>
         <Map />
      </div>
   );
};

export default FoodRecommendationsPage;
