import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormLabel, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
   root: {
      display: 'flex',
   },
}));

const CheckboxesGroup: FC = () => {
   const classes = useStyles();
   const [state, setState] = useState({
      Italian: false,
      Lebanese: false,
      Japanese: false,
      Belgian: false,
   });

   const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
   };

   const { Italian, Lebanese, Japanese, Belgian } = state;

   return (
      <div className={classes.root}>
         <FormControl component="fieldset">
            <Box mb={2} mt={2}>
               <FormLabel component="legend">Select cuisine type preferences</FormLabel>
            </Box>
            <FormGroup>
               <FormControlLabel
                  control={<Checkbox checked={Italian} onChange={handleChange} name="Italian" />}
                  label="Italian"
               />
               <FormControlLabel
                  control={<Checkbox checked={Lebanese} onChange={handleChange} name="Lebanese" />}
                  label="Lebanese"
               />
               <FormControlLabel
                  control={<Checkbox checked={Japanese} onChange={handleChange} name="Japanese" />}
                  label="Japanese"
               />
               <FormControlLabel
                  control={<Checkbox checked={Belgian} onChange={handleChange} name="Belgian" />}
                  label="Belgian"
               />
            </FormGroup>
            {/* <FormHelperText>Be careful</FormHelperText> */}
         </FormControl>
      </div>
   );
};

export default CheckboxesGroup;
