import React, { FC } from 'react';
import SignInPage from './sign-in';
import FoodRecommendationsPage from './map';

const IndexPage: FC = () => {
   return (
      <div>
         <FoodRecommendationsPage />
      </div>
   );
};
export default IndexPage;
