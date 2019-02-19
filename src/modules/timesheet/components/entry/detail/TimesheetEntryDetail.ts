import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { TimesheetEntryDetailView } from './TimesheetEntryDetailView';

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: TimesheetUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type TimesheetEntryDetailProps
  = WithOidc
  & WithUser
  & WithTimesheetEntry
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<TimesheetEntryDetailProps, IOwnState> = (props: TimesheetEntryDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  
  return { 
    isAdmin,
    dialogFullScreen: false,
    dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<TimesheetEntryDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: TimesheetEntryDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: IOwnState, props: TimesheetEntryDetailProps) => (): Partial<IOwnState> => ({
    action: TimesheetUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(timesheetMessage.entry.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(timesheetMessage.entry.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<TimesheetEntryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetEntryDetailProps) => () => {
    if (props.userState.user && props.match.params.timesheetUid && !props.timesheetEntryState.detail.isLoading) {
      props.timesheetEntryDispatch.loadDetailRequest({
        timesheetUid: props.match.params.timesheetUid
      });
    }
  },
  handleOnModify: (props: TimesheetEntryDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: TimesheetEntryDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: TimesheetEntryDetailProps) => () => {
    const { response } = props.timesheetEntryState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let timesheetUid: string | undefined;

    // get project uid
    if (response.data) {
      timesheetUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      TimesheetUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case TimesheetUserAction.Modify:
          next = '/timesheet/requests/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: timesheetUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<TimesheetEntryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetEntryDetailProps) {
    // handle updated route params
    if (this.props.match.params.timesheetUid !== prevProps.match.params.timesheetUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.timesheetEntryState.detail.response !== prevProps.timesheetEntryState.detail.response) {
      const { isLoading, response } = this.props.timesheetEntryState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => { 
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: TimesheetUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: TimesheetUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [ WorkflowStatusType.Submitted ]),
          onClick: this.props.handleOnModify
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TimesheetEntryDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withTimesheetEntry,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('TimesheetEntryDetail')
)(TimesheetEntryDetailView);