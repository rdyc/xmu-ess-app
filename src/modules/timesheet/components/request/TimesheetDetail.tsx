import { WorkflowStatusType } from '@common/classes/types';
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
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import withApiTimesheetDetail, { WithApiTimesheetDetailHandler } from '@timesheet/enhancers/request/withApiTimesheetDetail';
import withTimesheetDetail, { WithTimesheetDetail } from '@timesheet/enhancers/request/withTimesheetDetail';
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
  handleTimesheetRefresh: () => void;
  handleTimesheetModify: () => void;
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
  timesheetUid: string;
}

type AllProps
  = Handler
  & WithTimesheetDetail
  & WithApiTimesheetDetailHandler
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
  const { isLoading, response } = props.timesheetDetailState;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="timesheet-detail-dialog-title"
      aria-describedby="timesheet-detail-dialog-description"
    >
      <DialogTitle id="timesheet-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="timesheet-detail-dialog-description">
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

  const renderDetail = (timesheet: ITimesheetDetail) => (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="timesheet.infoTitle" />}
        subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.uid" />}
          value={timesheet.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.date" />}
          value={intl.formatDate(timesheet.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.activityType" />}
          value={timesheet.activity ? timesheet.activity.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.customerName" />}
          value={timesheet.customer ? timesheet.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.projectName" />}
          value={timesheet.project ? timesheet.project.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.projectSite" />}
          value={timesheet.site ? timesheet.site.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.siteValue" />}
          value={timesheet.site ? timesheet.site.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.start" />}
          value={intl.formatTime(timesheet.start, {
            hour: 'numeric',
            minute: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.end" />}
          value={intl.formatTime(timesheet.end, {
            hour: 'numeric',
            minute: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.totalHours" />}
          value={timesheet.hours ? timesheet.hours : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="timesheet.field.information.notes" />}
          value={timesheet.notes ? timesheet.notes : 'N/A'}
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
  handleTimesheetRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiRequestDetailGet(match.params.timesheetUid);
  },
  handleTimesheetModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'timesheet.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'timesheet.dialog.modifyDescription'}),
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
    const timesheetUid = match.params.timesheetUid;

    stateReset();

    history.push('/timesheet/form/', { uid: timesheetUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleTimesheetRefresh, handleTimesheetModify,
      match, apiRequestDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetHistory,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({id: 'timesheet.detail.title'}),
      subTitle : intl.formatMessage({id: 'timesheet.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TimesheetUserAction.Refresh:
          handleTimesheetRefresh();
          break;
        
        case TimesheetUserAction.Modify:
          handleTimesheetModify();
          break;
        
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRequestDetailGet(match.params.timesheetUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.timesheetDetailState.response !== this.props.timesheetDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.timesheetDetailState;
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
          id: TimesheetUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: TimesheetUserAction.Modify,
          name: intl.formatMessage({id: 'timesheet.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
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
  setDisplayName('TimesheetDetail'),
  
  withApiTimesheetDetail,
  withLayout,
  withAppBar,
  withTimesheetDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(requestDetail);