import { FieldInputProps } from 'formik';
import { FC, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'tailwindcss/tailwind.css';

import { Tooltip } from '../tooltip/Tooltip';

type Props = {
   debounce?: number;
   disabled?: boolean;
   field: FieldInputProps<string>;
   isLoading?: boolean;
   label?: string;
   max?: number;
   min?: number;
   placeholder?: string;
   tooltip?: ReactNode;
   type?: 'text' | 'number' | 'password';
};

const Input: FC<Props> = (props) => {
   const {
      disabled,
      field,
      isLoading,
      label,
      placeholder = '',
      tooltip,
      type = 'text',
      ...rest
   } = props;

   const value = String(field.value);
   const onChange = field.onChange;

   if (isLoading) {
      return (
         <div>
            {label && (
               <div>
                  <Skeleton height="15px" width="120px" />
               </div>
            )}
            <div className="rounded-md">
               <Skeleton height="47px" width="100%" />
            </div>
         </div>
      );
   }

   return (
      <label className="block font-sans" htmlFor={field.name} {...rest}>
         {label && (
            <Tooltip content={tooltip}>
               <div>
                  <span className="text-gray-700 text-sm font-medium leading-5">{label}</span>
               </div>
            </Tooltip>
         )}
         <div>
            <input
               disabled={disabled}
               id={field.name}
               name={field.name}
               placeholder={placeholder}
               type={type}
               value={value}
               onBlur={field.onBlur}
               onChange={onChange}
               autoComplete="off"
            />
         </div>
      </label>
   );
};

export default Input;
