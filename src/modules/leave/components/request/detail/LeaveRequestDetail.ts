import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LeaveRequestDetailView } from './LeaveRequestDetailView';

interface OwnRouteParams {
  leaveUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LeaveRequestUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type LeaveRequestDetailProps 
  = WithUser
  & WithLeaveRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LeaveRequestDetailProps, OwnState> = (props: LeaveRequestDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LeaveRequestDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: LeaveRequestDetailProps) => (): Partial<OwnState> => ({
    action: LeaveRequestUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(leaveMessage.request.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(leaveMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LeaveRequestDetailProps, OwnHandler> = {
  handleOnModify: (props: LeaveRequestDetailProps) => () => { 
    props.setModify();
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

export const LeaveRequestDetail = compose(
  withRouter,
  withUser,
  withLeaveRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(LeaveRequestDetailView);