import { InputCustomer } from '@lookup/components/customer/input';
import {  Grid, Paper, TextField, Typography } from '@material-ui/core';
import { SelectProject } from '@project/components/select/project';
import { ProgressProps } from '@summary/components/progress/Progress';
import * as React from 'react';
export const ProgressView: React.SFC<ProgressProps> = props => {
  const { handleChangeCustomer, handleChangeProject } = props;
  const { isLoading, response } = props.summaryState.progress;

  const RenderFilter = () => (
    <Grid container spacing={16}>
        <Grid item xs>
          <TextField
            name="Select Customer"
            margin="normal"
            InputProps={{
              inputComponent: InputCustomer
            }}
            onChange={handleChangeCustomer}
          />
        </Grid>
        <Grid item xs>
          <TextField
            name="Select Project"
            margin="normal"
            InputProps={{
              inputComponent: SelectProject,
            }}
            onChange={handleChangeProject}
          />
        </Grid>
      </Grid>
  );

  const render = (
    <React.Fragment>
        <Paper 
          square 
          elevation={1}
        >
          <RenderFilter />
        </Paper>
        {
          isLoading &&
          <Typography variant="body2">loading</Typography>
        }
        {
          !isLoading &&
          response &&
          <Typography variant="body2">loaded :)</Typography>
        }
    </React.Fragment>
  );

  return render;
};