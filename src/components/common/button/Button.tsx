import cx from 'classnames';
import { ReactNode, forwardRef } from 'react';
import 'tailwindcss/tailwind.css';
import Skeleton from 'react-loading-skeleton';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import { Loader } from '../loader/Loader';

type Ref = HTMLButtonElement;

type Props = {
   children?: ReactNode;
   disabled?: boolean;
   isLoading?: boolean;
   isSubmitting?: boolean;
   onClick?: () => void;
   type?: 'button' | 'submit';
   variant?: 'primary' | 'secondary';
};

export const Button = forwardRef<Ref, Props>((props, ref) => {
   const {
      children,
      disabled,
      isLoading,
      isSubmitting,
      onClick,
      type = 'button',
      variant = 'primary',
      ...rest
   } = props;

   const baseClasses =
      'min-h-button inline-flex items-center px-4 py-2 font-sans text-base font-medium leading-6 border rounded-md transition duration-150 ease-in-out';
   const primaryClasses =
      'text-white hover:bg-green-400 bg-green-500 active:bg-green-600 focus:border-green-700 border-transparent focus:outline-none focus:shadow-outline-green';
   const secondaryClasses =
      'hover:text-gray-500 text-gray-700 active:text-gray-800 active:bg-gray-50 bg-white border-gray-300 focus:outline-none';
   const disabledClasses = 'text-gray-500 bg-green-100 border-transparent cursor-not-allowed';

   const classes = cx({
      [`${baseClasses}`]: true,
      [`${primaryClasses}`]: !disabled && variant === 'primary',
      [`${secondaryClasses}`]: !disabled && variant === 'secondary',
      [`${disabledClasses}`]: disabled || isSubmitting,
   });

   if (isLoading) {
      return (
         <div className="rounded-md">
            <Skeleton height="47px" width="120px" />
         </div>
      );
   }

   return (
      <span className="inline-flex rounded-md shadow-sm" {...rest}>
         <button
            ref={ref}
            className={classes}
            disabled={disabled || isSubmitting}
            type={type}
            onClick={onClick}
         >
            {isSubmitting ? (
               <span className="flex items-center">
                  <Loader />
                  <span className="flex-shrink-0 ml-2">{children}</span>
               </span>
            ) : (
               <span>{children}</span>
            )}
         </button>
      </span>
   );
});
