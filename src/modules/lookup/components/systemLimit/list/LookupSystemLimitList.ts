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
  handleOnCreate: () => void;
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  systemLimitUid: string;
  callback?: () => void;
  action?: SystemLimitUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setCreate: StateHandler<OwnState>;
  setDelete: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

const createProps: mapper<SystemLimitListProps, OwnState> = (props: SystemLimitListProps): OwnState => ({
  systemLimitUid: '',
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<SystemLimitListProps, OwnState, OwnStateUpdaters> = {
  setCreate: (prevState: OwnState, props: SystemLimitListProps) => (): Partial<OwnState> => ({
    action: SystemLimitUserAction.Create,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.createTitle), 
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.createDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.cancel),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.ok)
  }),
  setDelete: (prevState: OwnState, props: SystemLimitListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: SystemLimitUserAction.Delete,
    systemLimitUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    systemLimitUid: '',
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<SystemLimitListProps, OwnHandlers> = {
  handleOnCreate: (props: SystemLimitListProps) => () => { 
    props.setCreate();
  },
  handleOnDelete: (props: SystemLimitListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: SystemLimitListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: SystemLimitListProps) => () => {
    const { response } = props.systemLimitState.all;
    const { deleteRequest, loadAllDispose } = props.systemLimitDispatch;
    const { action, systemLimitUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: systemLimitUid
    };
    
    const message = intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, {uid: systemLimitUid});

    if (action === SystemLimitUserAction.Create) {
      props.history.push('systemlimits/form');
    } else if (action === SystemLimitUserAction.Delete) {

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
    }

    return null;
  }
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