// import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
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
  IMileageRequestDetail,
  IMileageRequestItem
} from '@mileage/classes/response';
import { MileageUserAction } from '@mileage/classes/types';
import withApiMileageRequestDetail, {
  WithApiMileageRequestDetailHandler
} from '@mileage/enhancers/request/withApiMileageRequestDetail';
import withMileageRequestDetail, {
  WithMileageRequestDetail
} from '@mileage/enhancers/request/withMileageRequestDetail';

import { WorkflowStep } from '@organization/components';
import * as React from 'react';
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from 'react-intl';
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
  withStateHandlers
} from 'recompose';

interface Handler {
  handleMileageRefresh: () => void;
  handleMileageClose: () => void;
  handleDialogOpen: (
    title: string,
    description: string,
    cancelText?: string,
    confirmText?: string,
    fullScreen?: boolean
  ) => void;
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

type AllProps = Handler &
  WithMileageRequestDetail &
  WithApiMileageRequestDetailHandler &
  WithLayout &
  WithAppBar &
  RouteComponentProps<RouteParams> &
  InjectedIntlProps &
  State &
  Updaters;

const mileagerequestDetail: React.SFC<AllProps> = props => {
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
  const { isLoading, response } = props.mileagerequestDetailState;

  const month: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

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
      <CardHeader
        title={<FormattedMessage id="mileage.request.infoTitle" />}
        subheader={<FormattedMessage id="mileage.request.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          margin="normal"
          label={<FormattedMessage id="mileage.request.field.uid" />}
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
          value={month[mileage.month]}
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
                      {item.projectUid} &bull; {item.project && item.project.name}
                    </Typography>
                    <Typography noWrap color="textSecondary" variant="caption">
                      <FormattedDate year="numeric" month="short" day="numeric" value={item.date} />
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

  return (
    <React.Fragment>
      {isLoading && (
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      )}
      {response && 
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
          { response && response.data && response.data.workflow && response.data.workflow.steps && <WorkflowStep steps={response.data.workflow.steps} />}
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok'
});

const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
  stateUpdate: (prevState: State) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: State) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok'
  })
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleMileageRefresh: (props: AllProps) => () => {
    const { match } = props;

    props.apiMileageRequestDetailGet(match.params.mileageUid);
  },

  handleMileageClose: (props: AllProps) => () => {
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({
        id: 'mileage.request.dialog.closeTitle'
      }),
      dialogDescription: intl.formatMessage({
        id: 'mileage.request.dialog.closeDescription'
      }),
      dialogCancelText: intl.formatMessage({ id: 'global.action.discard' }),
      dialogConfirmedText: intl.formatMessage({ id: 'global.action.continue' })
    });
  },

  handleDialogOpen: (props: AllProps) => (
    title: string,
    description: string,
    cancelText?: string,
    confirmText?: string,
    fullScreen?: boolean
  ) => {
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText:
        cancelText || intl.formatMessage({ id: dialogCancelText }),
      dialogConfirmedText:
        confirmText || intl.formatMessage({ id: dialogConfirmedText })
    });
  },

  handleDialogClose: (props: AllProps) => () => {
    const { stateReset } = props;

    stateReset();
  },

  handleDialogConfirmed: (props: AllProps) => () => {
    const { stateReset } = props;
    // const mileageUid = match.params.mileageUid;

    stateReset();

    // history.push('/mileage/form/', { uid: mileageUid });
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const {
      layoutDispatch,
      appBarDispatch,
      intl,
      handleMileageRefresh,
      handleMileageClose,
      match,
      apiMileageRequestDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({ id: 'mileage.request.detail.title' }),
      subTitle: intl.formatMessage({ id: 'mileage.request.detail.subTitle' })
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case MileageUserAction.Refresh:
          handleMileageRefresh();
          break;

        case MileageUserAction.Close:
          handleMileageClose();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiMileageRequestDetailGet(match.params.mileageUid);
  },

  componentWillReceiveProps(nextProps: AllProps) {
    if (
      nextProps.mileagerequestDetailState.response !==
      this.props.mileagerequestDetailState.response
    ) {
      const { intl } = nextProps;
      // const { response } = nextProps.mileagerequestDetailState;
      const { assignMenus } = nextProps.appBarDispatch;

      // const isStatusTypeEquals = ()

      const currentMenus = [
        {
          id: MileageUserAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
          enabled: true,
          visible: true
        },
        {
          id: MileageUserAction.Close,
          name: intl.formatMessage({ id: 'global.action.close' }),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },

  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('MileageRequestDetail'),
  withApiMileageRequestDetail,
  withLayout,
  withAppBar,
  withMileageRequestDetail,
  withRouter,
  injectIntl,

  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, Handler>(handlerCreators),
  lifecycle<AllProps, {}>(lifecycles)
)(mileagerequestDetail);
