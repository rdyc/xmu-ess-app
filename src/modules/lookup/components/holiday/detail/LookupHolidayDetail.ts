import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { LookupHolidayDetailView } from './LookupHolidayDetailView';

interface OwnRouteParams {
  holidayUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupHolidayDetailProps 
  = WithUser
  & WithLayout
  & WithLookupHoliday
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupHolidayDetailProps, OwnState> = (props: LookupHolidayDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<LookupHolidayDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<LookupHolidayDetailProps, OwnHandler> = {
  handleOnOpenDialog: (props: LookupHolidayDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: LookupHolidayDetailProps) => () => { 
    props.setDefault({      
      dialogOpen: false});
  },
  handleOnConfirm: (props: LookupHolidayDetailProps) => () => { 
    const { response } = props.lookupHolidayState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let holidayUid: string | undefined;

    // get Leave uid
    if (response.data) {
      holidayUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify, 
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/holiday/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: holidayUid 
      });
    }
  },

  handleDelete: (props: LookupHolidayDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupHolidayDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.holidayUid) {
      const message = intl.formatMessage(lookupMessage.role.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.holidayUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupHolidayDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: LookupHolidayDetailProps) => (response: boolean) => {
    props.history.push('/lookup/holiday');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.role.message.deleteSuccess, { uid : props.match.params.holidayUid })
    });
  },
  handleDeleteFail: (props: LookupHolidayDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.role.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LookupHolidayDetail = compose(
  withRouter,
  withUser,
  withLayout,
  withLookupHoliday,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(LookupHolidayDetailView);