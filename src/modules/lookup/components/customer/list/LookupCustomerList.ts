import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerDeletePayload } from '@lookup/classes/request/customer';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { lookupCustomerListView } from './LookupCustomerListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  customerUid: string;
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

const createProps: mapper<LookupCustomerListProps, OwnState> = (props: LookupCustomerListProps): OwnState => ({
  customerUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LookupCustomerListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: LookupCustomerListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: SystemLimitUserAction.Delete,
    customerUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    customerUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LookupCustomerListProps, OwnHandlers> = {
  handleOnDelete: (props: LookupCustomerListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: LookupCustomerListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: LookupCustomerListProps) => () => {
    const { response } = props.lookupCustomerState.all;
    const { deleteRequest, loadAllDispose } = props.lookupCustomerDispatch;
    const { customerUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: customerUid
    };
    
    const message = intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, {uid: customerUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupCustomerDeletePayload
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
      props.history.push(`/lookup/customer/list`);
    });
  },
};

export type LookupCustomerListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupCustomer;

export default compose<LookupCustomerListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupCustomer,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupCustomerListProps, OwnHandlers>(handlerCreators),
)(lookupCustomerListView);