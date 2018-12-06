import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayDeletePayload } from '@lookup/classes/request';
import { LookupHolidayUserAction } from '@lookup/classes/types';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupHolidayListView } from './LookupHolidayListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  holidayUid: string;
  callback?: () => void;
  reload: boolean;
  action?: LookupHolidayUserAction;
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

const createProps: mapper<HolidayListProps, OwnState> = (props: HolidayListProps): OwnState => ({
  holidayUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<HolidayListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: HolidayListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: LookupHolidayUserAction.Delete,
    holidayUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    holidayUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<HolidayListProps, OwnHandlers> = {
  handleOnDelete: (props: HolidayListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: HolidayListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: HolidayListProps) => () => {
    const { response } = props.lookupHolidayState.all;
    const { deleteRequest, loadAllDispose } = props.lookupHolidayDispatch;
    const { holidayUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: holidayUid
    };
    
    const message = intl.formatMessage(lookupMessage.holiday.message.deleteSuccess, {uid: holidayUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupHolidayDeletePayload
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
      props.history.push(`/lookup/holiday/`);
    });
  },
};

export type HolidayListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupHoliday;

export default compose<HolidayListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupHoliday,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<HolidayListProps, OwnHandlers>(handlerCreators),
)(LookupHolidayListView);