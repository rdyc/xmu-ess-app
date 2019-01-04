import { IEmployeeTrainingList } from '@account/classes/response/employeeTraining';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Fade, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeTrainingProps } from './AccountEmployeeTraining';

export const AccountEmployeeTrainingView: React.SFC<
  AccountEmployeeTrainingProps
> = props => {
  const { response, isLoading } = props.accountEmployeeTrainingState.list;

  const renderTraining = (item: IEmployeeTrainingList) => {
    return (
      <Fade
        in={!isLoading}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
      <Card square key={item.uid}>
        <CardHeader title="TRAINING" />
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label="NAMA"
            value={item.name}
          />
        </CardContent>
      </Card>
      </Fade>
    );
  };

  return (
    <React.Fragment>
      { (response && !response.data || response && response.data && response.data.length < 1) && ( <Typography>No Data</Typography> )}
      {
        response && response.data && response.data.map(item => renderTraining(item))
      }
    </React.Fragment>
  );
};
