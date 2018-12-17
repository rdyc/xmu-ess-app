import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupDiemDeletePayload } from '@lookup/classes/request/diem';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupDiemListView } from './LookupDiemListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  diemUid: string;
  callback?: () => void;
  reload: boolean;
  action?: DiemUserAction;
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

const createProps: mapper<LookupDiemListProps, OwnState> = (props: LookupDiemListProps): OwnState => ({
  diemUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LookupDiemListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: LookupDiemListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: DiemUserAction.Delete,
    diemUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    diemUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LookupDiemListProps, OwnHandlers> = {
  handleOnDelete: (props: LookupDiemListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: LookupDiemListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: LookupDiemListProps) => () => {
    const { response } = props.lookupDiemState.all;
    const { deleteRequest, loadAllDispose } = props.lookupDiemDispatch;
    const { diemUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: diemUid
    };
    
    const message = intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, {uid: diemUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupDiemDeletePayload
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
      props.history.push(`/lookup/diemvalue/list`);
    });
  },
};

export type LookupDiemListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupDiem;

export default compose<LookupDiemListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupDiem,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupDiemListProps, OwnHandlers>(handlerCreators),
)(LookupDiemListView);