import { FC, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie';
import api from '../utils/api';
import { Button } from '../components/common/button/Button';

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
         {/* <Button disabled={isLoading} type="button" onClick={() => handleClick()}>
            Logout
         </Button> */}
      </div>
   );
};

export default FoodRecommendationsPage;
