import { FC } from 'react';
import { AuthProvider } from '../context/AuthContext';
import type { AppProps } from 'next/app';

const App: FC<AppProps> = ({ Component, pageProps }) => {
   return (
      <AuthProvider>
         <Component {...pageProps} />
      </AuthProvider>
   );
};

export default App;
