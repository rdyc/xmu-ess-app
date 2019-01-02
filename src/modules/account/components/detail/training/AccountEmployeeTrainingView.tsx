import { IEmployeeTrainingList } from '@account/classes/response/employeeTraining';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeTrainingProps } from './AccountEmployeeTraining';

export const AccountEmployeeTrainingView: React.SFC<
  AccountEmployeeTrainingProps
> = props => {
  const { response } = props.accountEmployeeTrainingState.list;

  const renderTraining = (item: IEmployeeTrainingList) => {
    return (
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
    );
  };

  return (
    <React.Fragment>
      {
        response && response.data && response.data.map(item => renderTraining(item))
      }
    </React.Fragment>
  );
};
