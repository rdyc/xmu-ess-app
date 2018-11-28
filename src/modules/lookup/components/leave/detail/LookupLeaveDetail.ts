import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { LookupLeaveUserAction } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
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
import { LookupLeaveDetailView } from './LookupLeaveDetailView';

interface OwnRouteParams {
  leaveUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LookupLeaveUserAction;
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

export type LookupLeaveDetailProps 
  = WithUser
  & WithLookupLeave
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupLeaveDetailProps, OwnState> = (props: LookupLeaveDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LookupLeaveDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: LookupLeaveDetailProps) => (): Partial<OwnState> => ({
    action: LookupLeaveUserAction.Modify,
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

const handlerCreators: HandleCreators<LookupLeaveDetailProps, OwnHandler> = {
  handleOnModify: (props: LookupLeaveDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: LookupLeaveDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: LookupLeaveDetailProps) => () => { 
    const { response } = props.lookupLeaveState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let lookupLeaveUid: string | undefined;

    // get Leave uid
    if (response.data) {
      lookupLeaveUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupLeaveUserAction.Modify, 
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupLeaveUserAction.Modify:
          next = '/lookup/leave/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: lookupLeaveUid 
      });
    }
  },
};

export const LookupLeaveDetail = compose(
  withRouter,
  withUser,
  withLookupLeave,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(LookupLeaveDetailView);