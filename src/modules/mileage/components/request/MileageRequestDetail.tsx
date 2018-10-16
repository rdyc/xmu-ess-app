import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';

import { IMileageRequestDetail, IMileageRequestItem } from '@mileage/classes/response';
import { MileageUserAction } from '@mileage/classes/types';
import withApiMileageRequestDetail, { WithApiMileageRequestDetailHandler } from '@mileage/enhancers/request/withApiMileageRequestDetail';
import withMileageRequestDetail, { WithMileageRequestDetail } from '@mileage/enhancers/request/withMileageRequestDetail';

import { WorkflowStep } from '@organization/components';
import * as React from 'react';
import { FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';


interface Handler {
  handleMileageRefresh: () => void;
  handleMileageModify: () => void;
  handleMileageClose: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface State {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

interface RouteParams {
  mileageUid: string;
}

type AllProps
  = Handler 
  & WithMileageRequestDetail
  & WithApiMileageRequestDetailHandler
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams> 
  & InjectedIntlProps
  & State
  & Updaters;

const mileagerequestDetail: React.SFC<AllProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.mileagerequestDetailState;

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

  const renderDetail = (mileage: IMileageRequestDetail) => (
    <Card square>
      <CardHeader title={<FormattedMessage id="mileage.request.infoTitle"/>}
        subheader={<FormattedMessage id="mileage.request.infoSubTitle"/>}
      />
      <CardContent>
        <TextField 
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.uid" />}
          value={mileage.uid}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField 
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.employeeName" />}
          value={mileage.employee ? mileage.employee.fullName : ''}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField 
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.month" />}
          value={mileage.month}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField 
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.year" />}
          value={mileage.year}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField 
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.total" />}
          value={mileage.amount}
          InputProps={{
            readOnly: true,
          }}
        />
      </CardContent>
    </Card>
  );

  const renderItems = (items: IMileageRequestItem[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="mileage.request.itemsTitle" />}
        subheader={<FormattedMessage id="mileage.request.itemsSubTitle" />}
      />
      <CardContent>
        <List>
          {
            items.map(item => 
              <ListItem 
                disableGutters
                key={item.uid}
              >
                <Typography>
                  {item.project ? item.project.uid : 'N/A'} &bull;
                  {item.project ? item.project.name : 'N/A'} 
                </Typography>
              </ListItem>  
            )
          }
        </List>
      </CardContent>
    </Card>
  );

  return (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        response &&
        <Grid container spacing={24}>
          <Grid item xs={5}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          <Grid item xs={8}>
            {
              response &&
              response.data
              // && renderItems(response.data.items)
            }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  )
}