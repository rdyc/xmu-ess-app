import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimitDeletePayload } from '@lookup/classes/request';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupSystemLimitListView } from './LookupSystemLimitListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  systemLimitUid: string;
  callback?: () => void;
  reload: boolean;
  action?: SystemLimitUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDelete: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

const createProps: mapper<SystemLimitListProps, OwnState> = (props: SystemLimitListProps): OwnState => ({
  systemLimitUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<SystemLimitListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: SystemLimitListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: SystemLimitUserAction.Delete,
    systemLimitUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    systemLimitUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<SystemLimitListProps, OwnHandlers> = {
  handleOnDelete: (props: SystemLimitListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: SystemLimitListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: SystemLimitListProps) => () => {
    const { response } = props.systemLimitState.all;
    const { deleteRequest, loadAllDispose } = props.systemLimitDispatch;
    const { systemLimitUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: systemLimitUid
    };
    
    const message = intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, {uid: systemLimitUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ISystemLimitDeletePayload
      });

      alertAdd({
        message,
        time: new Date()
      });
  
      if (response && props.callback) {
        loadAllDispose();
        props.callback();
      }
      props.setDefault();
      props.history.push(`/lookup/systemlimits/`);
    });
  },
};

export type SystemLimitListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupSystemLimit;

export default compose<SystemLimitListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupSystemLimit,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SystemLimitListProps, OwnHandlers>(handlerCreators),
)(LookupSystemLimitListView);