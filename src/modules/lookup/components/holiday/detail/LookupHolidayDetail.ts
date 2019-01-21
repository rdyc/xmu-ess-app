import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
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
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
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
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Time Limit'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'Time Limit'}),
      });
    }
  },
  handleOnCloseDialog: (props: LookupHolidayDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: LookupHolidayDetailProps) => () => {
    const { response } = props.lookupHolidayState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let holidayUid: string | undefined;
    let companyUid: string | undefined;

    // get uid
    if (response.data) {
      holidayUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/holidays/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, {
        companyUid,
        uid: holidayUid
      });
    }

  },
  handleSubmit: (props: LookupHolidayDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupHolidayDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.holidayUid) {
      const message = intl.formatMessage(lookupMessage.holiday.message.emptyProps);
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
  handleSubmitSuccess: (props: LookupHolidayDetailProps) => (response: boolean) => {
    props.history.push('/lookup/holidays/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.holiday.message.deleteSuccess, { uid : props.match.params.holidayUid })
    });
  },
  handleSubmitFail: (props: LookupHolidayDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.holiday.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LookupHolidayDetail = compose<LookupHolidayDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLookupHoliday,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupHolidayDetailProps, OwnHandler>(handlerCreators),
)(LookupHolidayDetailView);