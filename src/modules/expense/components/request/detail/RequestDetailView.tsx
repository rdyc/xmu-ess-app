import { IExpenseDetail } from '@expense/classes/response';
import { RequestDetailProps } from '@expense/components/request/detail/RequestDetail';
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
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { isNullOrUndefined } from 'util';

export const RequestDetailView: React.SFC<RequestDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.expenseRequestState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="expense-detail-dialog-title"
      aria-describedby="expense-detail-dialog-description"
    >
      <DialogTitle id="expense-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="expense-detail-dialog-description">
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

  const renderDetail = (expense: IExpenseDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="expense.infoTitle"/>}
        subheader={<FormattedMessage id="expense.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.uid" />}
          value={expense.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.date" />}
          value={expense.date ?
            intl.formatDate(expense.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.createdBy" />}
          value={expense.changes && expense.changes.created && expense.changes.created.fullName ? expense.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.type" />}
          value={expense.expense ? expense.expense.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.project" />}
          value={expense.project ? `${expense.project.uid} - ${expense.project.name}` : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.customer" />}
          value={expense.customer ? expense.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.value" />}
          value={intl.formatNumber(expense.value || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.location" />}
          value={expense.location}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.address" />}
          value={expense.address || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.clientName" />}
          value={expense.client ? expense.client.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.clientTitle" />}
          value={expense.client ? expense.client.title : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.notes" />}
          value={expense.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.status" />}
          value={expense.status ? expense.status.value : 'N/A'}
        />
        {!isNullOrUndefined(expense.rejectedReason) ?
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.rejectedReason" />}
          value={expense.rejectedReason || 'N/A'}
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