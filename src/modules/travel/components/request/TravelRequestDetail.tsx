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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { WorkflowStep } from '@organization/components';
import { ITravelRequestDetail, ITravelRequestItem } from '@travel/classes/response';
import { TravelUserAction } from '@travel/classes/types';
import withApiTravelRequestDetail, { WithApiTravelRequestDetailHandler } from '@travel/enhancers/request/withApiTravelRequestDetail';
import withTravelRequestDetail, { WithTravelRequestDetail } from '@travel/enhancers/request/withTravelRequestDetail';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
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
  handleTravelRefresh: () => void;
  handleTravelModify: () => void;
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
  travelUid: string;
}

type AllProps
  = Handler 
  & WithTravelRequestDetail
  & WithApiTravelRequestDetailHandler
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams> 
  & InjectedIntlProps
  & State
  & Updaters;

const requestDetail: React.SFC<AllProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.travelDetailState;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="travel-detail-dialog-title"
      aria-describedby="travel-detail-dialog-description"
    >
      <DialogTitle id="travel-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="travel-detail-dialog-description">
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

  const renderDetail = (travel: ITravelRequestDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.infoTitle"/>}
        subheader={<FormattedMessage id="travel.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.uid" />}
          value={travel.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.status" />}
          value={travel.status ? travel.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.requestor" />}
          value={travel.employee ? travel.employee.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.destination" />}
          value={travel.destination ? travel.destination.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.start" />}
          value={intl.formatDate(travel.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.end" />}
          value={intl.formatDate(travel.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.customer" />}
          value={travel.customer ? travel.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.activity" />}
          value={travel.activity ? travel.activity.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.objectives" />}
          value={travel.objective || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.target" />}
          value={travel.target || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.comment" />}
          value={travel.comment || 'N/A'}
        />        
      </CardContent>
    </Card>
  );

  const renderSummary = (travel: ITravelRequestDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.summaryTitle" />}
        subheader={<FormattedMessage id="travel.summarySubTitle" />}
      />
      <CardContent>
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.siteValue" />}
          value={intl.formatNumber(travel.site ? travel.site.value : 0)}
          />        
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.totalDuration" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalDuration : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.totalDiemValue" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalDiemValue : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.costTransport" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalCostTransport : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.costHotel" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalCostHotel : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.total" />}
          value={intl.formatNumber(travel.total || 0)}
        />        
      </CardContent>
    </Card>
  );

  const renderItems = (items: ITravelRequestItem[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.itemTitle" />}
        subheader={<FormattedMessage id="travel.itemSubTitle" />}
      />
      <CardContent>
        <List>
        {
          items.map(item => 
            item.employee &&
            <ListItem 
              disableGutters 
              key={item.employeeUid}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.employee.fullName} 
                >
                  <PersonIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.employee.fullName} 
                secondary={item.employee.email}
              />
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
          <Grid item xs={12} sm={12} md={4} xl={3}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={3}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                  {
                    response &&
                    response.data &&
                    renderSummary(response.data)
                  }
                </Grid>
                <Grid item xs={12}>
                  {
                    response &&
                    response.data &&
                    response.data.items &&
                    renderItems(response.data.items)
                  }
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={12} sm={12} md={8} xl={3}>
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
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
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
    dialogConfirmedText: 'global.action.ok',
  })
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleTravelRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiRequestDetailGet(match.params.travelUid);
  },
  handleTravelModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'travel.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'travel.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleDialogOpen: (props: AllProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({ 
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
      dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
    });
  },
  handleDialogClose: (props: AllProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: AllProps) => () => { 
    const { match, history, stateReset } = props;
    const travelUid = match.params.travelUid;

    stateReset();

    history.push('/travel/form/', { uid: travelUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handletravelRefresh, handleTravelModify, 
      match, apiRequestDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: 'travel.detail.title'}),
      subTitle : intl.formatMessage({id: 'travel.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TravelUserAction.Refresh:
          handletravelRefresh();
          break;
        
        case TravelUserAction.Modify:
          handleTravelModify();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRequestDetailGet(match.params.travelUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.travelDetailState.response !== this.props.travelDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.travelDetailState;
      const { assignMenus } = nextProps.appBarDispatch;
      
      const isStatusTypeEquals = (statusTypes: string[]): boolean => {
        let result = false;

        if (response && response.data) {
          result = statusTypes.indexOf(response.data.statusType) !== -1;
        }

        return result;
      };

      const currentMenus = [
        {
          id: TravelUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: TravelUserAction.Modify,
          name: intl.formatMessage({id: 'travel.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        },
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
  setDisplayName('TravelRequestDetail'),
  
  withApiTravelRequestDetail,
  withLayout,
  withAppBar,
  withTravelRequestDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(requestDetail);