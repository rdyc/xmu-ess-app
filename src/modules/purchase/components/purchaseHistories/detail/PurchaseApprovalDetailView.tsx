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
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { PurchaseApprovalDetailProps } from '@purchase/components/purchaseHistories/detail/PurchaseApprovalDetail';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { isNullOrUndefined } from 'util';

export const PurchaseApprovalDetailView: React.SFC<PurchaseApprovalDetailProps> = props => {
  const {
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.purchaseApprovalState.detail;

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

  const renderDetail = (purchase: IPurchaseDetail) => (
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
          label={<FormattedMessage id="purchase.field.uid" />}
          value={purchase.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.date" />}
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
          label={<FormattedMessage id="purchase.field.createdBy" />}
          value={purchase.changes && purchase.changes.created && purchase.changes.created.fullName ? purchase.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.advance" />}
          value={(purchase.advance || purchase.advance !== 0 ) ? purchase.advance : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.project" />}
          value={purchase.project ? `${purchase.project.uid} - ${purchase.project.name}` : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.customer" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.request" />}
          value={intl.formatNumber(purchase.request || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.requestIDR" />}
          value={intl.formatNumber(purchase.requestIDR || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.clientTitle" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.notes" />}
          value={purchase.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.status" />}
          value={purchase.status ? purchase.status.value : 'N/A'}
        />
        {!isNullOrUndefined(purchase.reason) ?
          <TextField
            fullWidth
            contentEditable={false}
            margin="normal"
            label={<FormattedMessage id="purchase.field.rejectedReason" />}
            value={purchase.reason || 'N/A'}
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