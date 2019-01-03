import { IEmployeeAccessHistoryList } from '@account/classes/response/employeeAccessHistory';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Fade, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeAccessHistoryProps } from './AccountEmployeeAccessHistory';

export const AccountEmployeeAccessHistoryView: React.SFC<
  AccountEmployeeAccessHistoryProps
> = props => {
  const { response, isLoading } = props.accountEmployeeAccessHistoryState.list;

  const renderAccessHistory = (item: IEmployeeAccessHistoryList) => {
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
            value={item.company ? item.company.name : 'N/A'}
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
        response && response.data && response.data.map(item => renderAccessHistory(item))
      }
    </React.Fragment>
  );
};
