import { IEmployeeFamilyList } from '@account/classes/response/employeeFamily';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Fade, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeFamilyProps } from './AccountEmployeeFamily';

export const AccountEmployeeFamilyView: React.SFC<
  AccountEmployeeFamilyProps
> = props => {
  const { response, isLoading } = props.accountEmployeeFamilyState.list;

  const renderFamily = (item: IEmployeeFamilyList) => {
    return (
      <Fade
        in={!isLoading}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
      <Card square key={item.uid}>
        <CardHeader title="Family" />
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label="Nama"
            value={item.fullName}
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
        response && response.data && response.data.map(item => renderFamily(item))
      }
    </React.Fragment>
  );
};
