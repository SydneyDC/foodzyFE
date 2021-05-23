import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { FC } from 'react';

export const Loader: FC = () => {
   return (
      <div className="loader inline-flex items-center justify-center w-full h-full">
         <HourglassEmptyIcon />
      </div>
   );
};
