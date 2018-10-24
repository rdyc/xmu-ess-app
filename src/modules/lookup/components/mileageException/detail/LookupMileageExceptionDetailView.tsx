import { IMileageExceptionDetail } from '@lookup/classes/response';
import { LookupMileageExceptionDetailProps } from '@lookup/components/mileageException/detail/LookupMileageExceptionDetail';
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
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const LookupMileageExceptionDetailView: React.SFC<LookupMileageExceptionDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed
  } = props;
  
  const { isLoading, response } = props.lookupMileageExceptionState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="mileageException-detail-dialog-title"
      aria-describedby="mileageException-detail-dialog-description"
    >
      <DialogTitle id="mileageException-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="mileageException-detail-dialog-description">
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

  const renderDetail = (mileageexception: IMileageExceptionDetail) => (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="lookup.mileageException.detail" />}
      />
      <CardContent>
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.uid" />}
          value={mileageexception.uid}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.company.name" />}
          value={mileageexception.role && mileageexception.role.company && mileageexception.role.company.name}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.role.name" />}
          value={mileageexception.role.name}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.type.value" />}
          value={
            mileageexception.type == null
              ? 'Office'
              : mileageexception.type.value
          }
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.project.name" />}
          value={
            mileageexception.project == null
              ? 'N/A'
              : mileageexception.project.name
          }
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={
            <FormattedMessage id="lookup.mileageException.projectsite.name" />
          }
          value={
            mileageexception.projectSite == null
              ? 'N/A'
              : mileageexception.projectSite.name
          }
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.percentage" />}
          value={mileageexception.percentage || '0.00'}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.description" />}
          value={mileageexception.description || 'N/A'}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.reason" />}
          value={mileageexception.reason || 'N/A'}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="lookup.mileageException.inactiveDate" />}
          value={mileageexception.inactiveDate || 'N/A'}
          InputProps={{
            readOnly: true
          }}
        />
      </CardContent>
    </Card>
  );

  const render = (
    <React.Fragment>
      {isLoading &&
        !response && (
          <Typography variant="body2">
            <FormattedMessage id="global.loading" />
          </Typography>
        )}
      {response && (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {response && response.data && renderDetail(response.data)}
          </Grid>
        </Grid>
      )}
      {renderDialog}
    </React.Fragment>
  );

  return render;
};