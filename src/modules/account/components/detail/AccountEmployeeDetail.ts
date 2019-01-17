import { IEmployeeDeletePayload } from '@account/classes/request';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { AccountEmployeeDetailView } from './AccountEmployeeDetailView';

interface OwnRouteParams {
  employeeUid: string;
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

interface OwnHandler {
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeDetailProps
  = OwnState
  & OwnHandler
  & OwnStateUpdaters
  & RouteComponentProps<OwnRouteParams>
  & WithUser
  & WithLayout
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeDetailProps, OwnState> = (props: AccountEmployeeDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<AccountEmployeeDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AccountEmployeeDetailProps, OwnHandler> = {
  handleOnOpenDialog: (props: AccountEmployeeDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(accountMessage.employee.confirm.modifyDescription),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(accountMessage.employee.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: AccountEmployeeDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: AccountEmployeeDetailProps) => () => {
    const { response } = props.accountEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/account/employee/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        uid: employeeUid 
      });
    }
  },
  handleSubmit: (props: AccountEmployeeDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.accountEmployeeDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.employeeUid) {
      const message = intl.formatMessage(accountMessage.employee.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.employeeUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IEmployeeDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: AccountEmployeeDetailProps) => (response: boolean) => {
    props.history.push('/account/employee/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(accountMessage.employee.message.deleteSuccess, { uid : props.match.params.employeeUid })
    });
  },
  handleSubmitFail: (props: AccountEmployeeDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(accountMessage.employee.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const AccountEmployeeDetail = compose<AccountEmployeeDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeDetailProps, OwnHandler>(handlerCreators)
)(AccountEmployeeDetailView);