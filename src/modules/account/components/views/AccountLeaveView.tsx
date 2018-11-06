import {
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AccountLeaveDetailProps } from './AccountLeave';
import { AccountLeaveInformation } from './shared/AccountLeaveInformation';

export const AccountLeaveView: React.SFC<AccountLeaveDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle
  } = props;
  const { isLoading, response } = props.accountEmployeeLeaveState.detail;

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
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
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
