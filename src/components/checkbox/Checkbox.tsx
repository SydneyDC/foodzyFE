import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormLabel, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
   root: {
      display: 'flex',
   },
}));

type Props = {
   cuisineType: any;
   handleCuisineTypeChange: any;
};

const CheckboxesGroup: FC<Props> = (props) => {
   const { cuisineType, handleCuisineTypeChange } = props;
   const classes = useStyles();

   const { Italian, Lebanese, Japanese, Belgian } = cuisineType;

   return (
      <div className={classes.root}>
         <FormControl component="fieldset">
            <Box mb={2} mt={2}>
               <FormLabel component="legend">Select cuisine type preferences</FormLabel>
            </Box>
            <FormGroup>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={Italian}
                        onChange={handleCuisineTypeChange}
                        name="Italian"
                     />
                  }
                  label="Italian"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={Lebanese}
                        onChange={handleCuisineTypeChange}
                        name="Lebanese"
                     />
                  }
                  label="Lebanese"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={Japanese}
                        onChange={handleCuisineTypeChange}
                        name="Japanese"
                     />
                  }
                  label="Japanese"
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={Belgian}
                        onChange={handleCuisineTypeChange}
                        name="Belgian"
                     />
                  }
                  label="Belgian"
               />
            </FormGroup>
            {/* <FormHelperText>Be careful</FormHelperText> */}
         </FormControl>
      </div>
   );
};

export default CheckboxesGroup;
