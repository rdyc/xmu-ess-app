import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from '@material-ui/core';
import {
  IMileageApprovalDetail,
  IMileageRequestItem
} from '@mileage/classes/response';
import { MileageApprovalDetailProps } from '@mileage/components/approval/detail/MileageApprovalDetail';
import { WorkflowStep } from '@organization/components';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

export const MileageApprovalDetailView: React.SFC<
  MileageApprovalDetailProps
> = props => {
  const {
    dialogFullScreen,
    dialogOpen,
    dialogTitle,
    dialogDescription,
    dialogCancelText,
    dialogConfirmedText,
    handleDialogClose,
    handleDialogConfirmed
  } = props;

  const { isLoading, response } = props.mileageApprovalState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="mileage-detail-dialog-title"
      aria-describedby="mileage-detail-dialog-description"
    >
      <DialogTitle id="mileage-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="mileage-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDetail = (mileage: IMileageApprovalDetail) => (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="mileage.approval.infoTitle" />}
        subheader={<FormattedMessage id="mileage.approval.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.approval.field.uid" />}
          value={mileage.uid}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.employeeName" />}
          value={mileage.employee ? mileage.employee.fullName : ''}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.month" />}
          value={moment.months(mileage.month - 1)}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.year" />}
          value={mileage.year}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.total" />}
          value={mileage.amount}
          InputProps={{
            readOnly: true
          }}
        />
      </CardContent>
    </Card>
  );

  const renderItems = (items: IMileageRequestItem[]) => {
    const len = items.length - 1;

    return (
      <Card square>
        <CardHeader
          title={<FormattedMessage id="mileage.request.itemsTitle" />}
          subheader={<FormattedMessage id="mileage.request.itemsSubTitle" />}
        />
        <CardContent>
          <List>
            {items.map((item, i) => (
              <div key={item.uid}>
                <ListItem disableGutters key={item.uid}>
                  <Grid container spacing={24}>
                    <Grid item xs={8} sm={8}>
                      <Typography noWrap color="primary" variant="body2">
                        {item.customer && item.customer.name}
                      </Typography>
                      <Typography noWrap variant="body1">
                        {item.projectUid} &bull;{' '}
                        {item.project && item.project.name}
                      </Typography>
                      <Typography
                        noWrap
                        color="textSecondary"
                        variant="caption"
                      >
                        <FormattedDate
                          year="numeric"
                          month="short"
                          day="numeric"
                          value={item.date}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography noWrap variant="body1" align="right">
                        {item.site && item.site.name}
                      </Typography>
                      <Typography
                        noWrap
                        color="secondary"
                        variant="caption"
                        align="right"
                      >
                        {item.status && item.status.value}
                      </Typography>
                      <Typography noWrap variant="caption" align="right">
                        {item.amount}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {len !== i && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  const render = (
    <React.Fragment>
      {isLoading && (
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      )}
      {response && (
        <Grid container spacing={24}>
          <Grid item xs={4}>
            {response && response.data && renderDetail(response.data)}
          </Grid>
          <Grid item xs={8}>
            {response &&
              response.data &&
              response.data.items &&
              renderItems(response.data.items)}
          </Grid>
          <Grid item xs={12} sm={12} md={8} xl={3}>
            {response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps && (
                <WorkflowStep steps={response.data.workflow.steps} />
              )}
          </Grid>
        </Grid>
      )}
      {renderDialog}
    </React.Fragment>
  );

  return render;
};
