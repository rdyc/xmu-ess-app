import { IEmployeeEducationList } from '@account/classes/response/employeeEducation';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Fade, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeEducationProps } from './AccountEmployeeEducation';

export const AccountEmployeeEducationView: React.SFC<
  AccountEmployeeEducationProps
> = props => {
  const { response, isLoading } = props.accountEmployeeEducationState.list;

  const renderEducation = (item: IEmployeeEducationList) => {
    return (
      <Fade
        in={!isLoading}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
      <Card square key={item.uid}>
        <CardHeader title="Education" />
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label="Institution"
            value={item.institution}
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
        response && response.data && response.data.map(item => renderEducation(item))
      }
    </React.Fragment>
  );
};
