import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import { ILeaveRequestDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import withApiLeaveRequestDetail, { WithApiLeaveRequestDetailHandler } from '@leave/enhancers/request/withApiLeaveRequestDetail';
import withLeaveRequestDetail, { WithLeaveRequestDetail } from '@leave/enhancers/request/withLeaveRequestDetail';
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
  handleLeaveRequestRefresh: () => void;
  handleLeaveRequestModify: () => void;
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
  leaveRequestUid: string;
}

type AllProps
  = Handler 
  & WithLeaveRequestDetail
  & WithApiLeaveRequestDetailHandler
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
  const { isLoading, response } = props.leaveRequestDetailState;

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
      <DialogContent>
        <DialogContentText id="leaveRequest-detail-dialog-description">
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

  const renderDetail = (leave: ILeaveRequestDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leaveRequest.infoTitle"/>}
        subheader={<FormattedMessage id="leaveRequest.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.uid" />}
          value={leave.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.status" />}
          value={leave.status ? leave.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.type" />}
          value={leave.leave ? leave.leave.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.regular" />}
          value={leave.regular ? leave.regular.leaveRequestUid : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.start" />}
          value={intl.formatDate(leave.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.end" />}
          value={intl.formatDate(leave.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.name" />}
          value={leave.address}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.contactNumber" />}
          value={leave.contactNumber}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.reason" />}
          value={leave.reason}
        />
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
  handleLeaveRequestRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiRequestDetailGet(match.params.leaveRequestUid);
  },
  handleLeaveRequestModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'leaveRequest.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'leaveRequest.dialog.modifyDescription'}),
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
    const leaveRequestUid = match.params.leaveRequestUid;

    stateReset();

    history.push('/leave/form/', { uid: leaveRequestUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleLeaveRequestRefresh, handleLeaveRequestModify,
      match, apiRequestDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.Leave,
      parentUid: AppMenu.LeaveRequest,
      title: intl.formatMessage({id: 'leaveRequest.detail.title'}),
      subTitle : intl.formatMessage({id: 'leaveRequest.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case LeaveRequestUserAction.Refresh:
          handleLeaveRequestRefresh();
          break;
        
        case LeaveRequestUserAction.Modify:
          handleLeaveRequestModify();
          break;
  
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRequestDetailGet(match.params.leaveRequestUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.leaveRequestDetailState.response !== this.props.leaveRequestDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.leaveRequestDetailState;
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
          id: LeaveRequestUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: LeaveRequestUserAction.Modify,
          name: intl.formatMessage({id: 'leaveRequest.action.modify'}),
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
  setDisplayName('LeaveRequestDetail'),
  
  withApiLeaveRequestDetail,
  withLayout,
  withAppBar,
  withLeaveRequestDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(requestDetail);