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
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import { ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { SettlementApprovalDetailProps } from '@purchase/components/settlementHistories/detail/SettlementApprovalDetail';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { isNullOrUndefined } from 'util';

export const SettlementApprovalDetailView: React.SFC<SettlementApprovalDetailProps> = props => {
  const {
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.settlementApprovalState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="purchase-detail-dialog-title"
      aria-describedby="purchase-detail-dialog-description"
    >
      <DialogTitle id="purchase-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="purchase-detail-dialog-description">
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

  const renderDetail = (purchase: ISettlementDetail) => (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="purchase.infoTitle" />}
        subheader={<FormattedMessage id="purchase.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.uid" />}
          value={purchase.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.date" />}
          value={purchase.date ?
            intl.formatDate(purchase.date, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.createdBy" />}
          value={purchase.changes && purchase.changes.created && purchase.changes.created.fullName ? purchase.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.advance" />}
          value={(purchase.advance || purchase.advance !== 0 ) ? purchase.advance : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.project" />}
          value={purchase.project ? `${purchase.project.uid} - ${purchase.project.name}` : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.customer" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.request" />}
          value={intl.formatNumber(purchase.request)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.requestIDR" />}
          value={intl.formatNumber(purchase.requestInIDR)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.actual" />}
          value={intl.formatNumber(purchase.actual)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.actualIDR" />}
          value={intl.formatNumber(purchase.actualInIDR)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.difference" />}
          value={intl.formatNumber(purchase.difference)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.differenceIDR" />}
          value={intl.formatNumber(purchase.differenceInIDR || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.notes" />}
          value={purchase.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.status" />}
          value={purchase.status ? purchase.status.value : 'N/A'}
        />
        {!isNullOrUndefined(purchase.reject) ?
          <TextField
            fullWidth
            contentEditable={false}
            margin="normal"
            label={<FormattedMessage id="purchase.field.information.rejectedReason" />}
            value={purchase.reject || 'N/A'}
          /> : ''
        }

      </CardContent>
    </Card>
  );
  const render = (
    <React.Fragment>
      {
        isLoading &&
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
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
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps &&
              <WorkflowStep steps={response.data.workflow.steps} />
            }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );
  return render;
};