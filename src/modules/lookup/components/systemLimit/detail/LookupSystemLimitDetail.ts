import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimitDeletePayload } from '@lookup/classes/request';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
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
import { LookupSystemLimitDetailView } from './LookupSystemLimitDetailView';

interface OwnRouteParams {
  systemLimitUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnOpenDialog: (action: SystemLimitUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: (payload: DeleteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  action?: SystemLimitUserAction;
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

export type SystemLimitDetailProps
  = WithUser
  & WithLayout
  & WithLookupSystemLimit
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<SystemLimitDetailProps, OwnState> = (props: SystemLimitDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<SystemLimitDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<SystemLimitDetailProps, OwnHandler> = {
  handleOnOpenDialog: (props: SystemLimitDetailProps) => (action: SystemLimitUserAction) => {
    if (action === SystemLimitUserAction.Modify) {
      props.stateUpdate({
        action: SystemLimitUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
      });
    } else if (action === SystemLimitUserAction.Delete) {
      props.stateUpdate({
        action: SystemLimitUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: SystemLimitDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: SystemLimitDetailProps) => () => {
    const { response } = props.systemLimitState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let systemLimitUid: string | undefined;
    let companyUid: string | undefined;

    // get uid
    if (response.data) {
      systemLimitUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      SystemLimitUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case SystemLimitUserAction.Modify:
          next = '/lookup/systemlimits/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, {
        companyUid,
        uid: systemLimitUid
      });
    }

  },
  handleSubmit: (props: SystemLimitDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.systemLimitDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.systemLimitUid) {
      const message = intl.formatMessage(lookupMessage.systemLimit.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.systemLimitUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ISystemLimitDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: SystemLimitDetailProps) => (response: boolean) => {
    props.history.push('/lookup/systemlimits/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, { uid : props.match.params.systemLimitUid })
    });
  },
  handleSubmitFail: (props: SystemLimitDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.systemLimit.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LookupSystemLimitDetail = compose<SystemLimitDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SystemLimitDetailProps, OwnHandler>(handlerCreators),
)(LookupSystemLimitDetailView);