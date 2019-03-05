import { Dialog, DialogTitle, Grid } from '@material-ui/core';
import * as React from 'react';

import { AccountLeaveDetailProps } from './AccountLeave';
import { AccountLeaveInformation } from './AccountLeaveInformation';

export const AccountLeaveView: React.SFC<AccountLeaveDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle
  } = props;
  const { response } = props.accountEmployeeLeaveState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="leaveRequest-detail-dialog-title"
      aria-describedby="leaveRequest-detail-dialog-description"
    >
      <DialogTitle id="leaveRequest-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
    </Dialog>
  );

  const render = (
    <React.Fragment>
      {
        response && 
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12}>
            {
              response &&
              response.data &&
              <AccountLeaveInformation
                data={response.data}
              />
            }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};
