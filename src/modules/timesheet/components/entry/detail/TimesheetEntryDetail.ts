import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { TimesheetEntryDetailView } from '@timesheet/components/entry/detail/TimesheetEntryDetailView';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
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

interface OwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  timesheetUid: string;
}

export type EntryDetailProps
  = WithTimesheetEntry
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<EntryDetailProps, OwnState> = (props: EntryDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const handlerCreators: HandleCreators<EntryDetailProps, Handler> = {
  handleTimesheetRefresh: (props: EntryDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.timesheetDispatch;

    if (user) {
      loadDetailRequest({
        timesheetUid: match.params.timesheetUid,
      });
    }
  },
  handleTimesheetModify: (props: EntryDetailProps) => () => { 
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
  handleDialogOpen: (props: EntryDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: EntryDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: EntryDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const timesheetUid = match.params.timesheetUid;

    stateReset();

    history.push('/timesheet/entry/form/', { uid: timesheetUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<EntryDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleTimesheetRefresh, handleTimesheetModify,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.timesheetDispatch;

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

    if (user) {
      loadDetailRequest({
        timesheetUid: match.params.timesheetUid,
      });
    }
  },
  componentWillReceiveProps(nextProps: EntryDetailProps) {
    if (nextProps.timesheetState.detail.response !== this.props.timesheetState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.timesheetState.detail;
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
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress])
        },
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, timesheetDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    timesheetDispatch.loadDetailDispose();
  }
};

export const TimesheetEntryDetail = compose<EntryDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheetEntry,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<EntryDetailProps, Handler>(handlerCreators),
  lifecycle<EntryDetailProps, OwnState>(lifecycles),
)(TimesheetEntryDetailView);