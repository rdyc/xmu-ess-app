import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
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

import { LeaveRequestDetailView } from './LeaveRequestDetailView';

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: LeaveRequestUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type LeaveRequestDetailProps
  = WithOidc
  & WithUser
  & WithLeaveRequest
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<LeaveRequestDetailProps, IOwnState> = (props: LeaveRequestDetailProps): IOwnState => {
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
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<LeaveRequestDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: LeaveRequestDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: LeaveRequestDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: LeaveRequestDetailProps) => (): Partial<IOwnState> => ({
    action: LeaveRequestUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(leaveMessage.request.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(leaveMessage.request.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
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

const handlerCreators: HandleCreators<LeaveRequestDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveRequestDetailProps) => () => {
    if (props.userState.user && props.match.params.leaveUid && !props.leaveRequestState.detail.isLoading) {
      props.leaveRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        leaveUid: props.match.params.leaveUid
      });
    }
  },
  handleOnSelectedMenu: (props: LeaveRequestDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LeaveRequestUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LeaveRequestUserAction.Modify:
        props.setModify();
        break;    
      default:
        break;
    }
  },
  handleOnCloseDialog: (props: LeaveRequestDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: LeaveRequestDetailProps) => () => {
    const { response } = props.leaveRequestState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let leaveUid: string | undefined;

    // get Leave uid
    if (response.data) {
      leaveUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LeaveRequestUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LeaveRequestUserAction.Modify:
          next = '/leave/requests/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, {
        uid: leaveUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveRequestDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveRequestDetailProps) {
    // handle updated route params
    if (this.props.match.params.leaveUid !== prevProps.match.params.leaveUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.leaveRequestState.detail.response !== prevProps.leaveRequestState.detail.response) {
      const { isLoading, response } = this.props.leaveRequestState.detail;

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
      const options: IPopupMenuOption[] = [
        {
          id: LeaveRequestUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: LeaveRequestUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [WorkflowStatusType.Submitted]),
        },

      ];

      this.props.setOptions(options);
    }
  }
};

export const LeaveRequestDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLeaveRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LeaveRequestDetail')
)(LeaveRequestDetailView);