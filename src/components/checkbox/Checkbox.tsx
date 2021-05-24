import React, { FC } from 'react';

type Props = {
   handleCuisineTypeChange: any;
};

const CheckboxesGroup: FC<Props> = (props) => {
   const { handleCuisineTypeChange } = props;

   const cuisineTypes = [
      { id: '1', type: 'Italian' },
      { id: '2', type: 'Lebanese' },
      { id: '3', type: 'Japanese' },
      { id: '4', type: 'Belgian' },
   ];

   return (
      <div>
         <div className="mt-3 mb-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            <h3>Cuisine type</h3>
         </div>
         <div className="ml-1 mb-3">
            <form>
               {cuisineTypes.map((cuisineType) => {
                  return (
                     <div className="mt-3">
                        <input
                           key={cuisineType.id}
                           id={cuisineType.id}
                           type="checkbox"
                           value={cuisineType.type}
                           name={cuisineType.type}
                           onChange={handleCuisineTypeChange}
                        />
                        <label className="ml-3 mt-3" htmlFor={cuisineType.id}>
                           {cuisineType.type}
                        </label>
                     </div>
                  );
               })}
            </form>
         </div>
      </div>
   );
};

export default CheckboxesGroup;
