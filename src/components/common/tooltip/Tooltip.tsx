// import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, Fragment, ReactNode, useState } from 'react';
import 'tailwindcss/tailwind.css';

type Props = {
   children: ReactNode;
   content: ReactNode;
   delay?: number;
};

export const Tooltip: FC<Props> = (props) => {
   const { children, content, delay = 200 } = props;

   let timeout: NodeJS.Timeout;
   const [active, setActive] = useState(false);

   const showTip = () => {
      timeout = setTimeout(() => {
         setActive(true);
      }, delay);
   };

   const hideTip = () => {
      clearInterval(timeout);
      setActive(false);
   };

   if (!content) {
      return <Fragment>{children}</Fragment>;
   }

   return (
      <div className="relative flex items-center" onMouseEnter={showTip} onMouseLeave={hideTip}>
         {children}
         {/* <span className="ml-2">
            <FontAwesomeIcon
               className="text-indigo-600"
               fixedWidth={true}
               icon={faInfoCircle}
               size="1x"
            />
         </span> */}
         {active && (
            <div className="text-md absolute z-40 p-2 font-sans bg-gray-200 rounded-md">
               {content}
            </div>
         )}
      </div>
   );
};
