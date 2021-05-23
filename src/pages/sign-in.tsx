import SignInForm from '../components/sign-in/SignInForm';
import React, { FC } from 'react';

const SignInPage: FC = () => {
   return (
      <div>
         <div>
            <h2>Sign in to your account</h2>
         </div>
         <div>
            <SignInForm />
         </div>
      </div>
   );
};

export default SignInPage;
