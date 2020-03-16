import { Grid, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from 'react';
export default function InfoGrid(props) {
  const { label, value } = props;
  return (
    <Grid item xs={4}>
      <h3>{label}</h3>
      <TextField
        value={value}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
    </Grid>
  );
}

InfoGrid.propsTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};