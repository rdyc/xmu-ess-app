import { IEmployeeExperienceList } from '@account/classes/response/employeeExperience';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Fade, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeExperienceProps } from './AccountEmployeeExperience';

export const AccountEmployeeExperienceView: React.SFC<
  AccountEmployeeExperienceProps
> = props => {
  const { response, isLoading } = props.accountEmployeeExperienceState.list;

  const renderExperience = (item: IEmployeeExperienceList) => {
    return (
      <Fade
        in={!isLoading}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
      <Card square key={item.uid}>
        <CardHeader title="Experience" />
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label="Position"
            value={item.position}
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
        response && response.data && response.data.map(item => renderExperience(item))
      }
    </React.Fragment>
  );
};
