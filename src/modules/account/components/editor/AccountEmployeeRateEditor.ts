import { IEmployeeRatePutPayload } from '@account/classes/request/employeeRate';
import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { AccountEmployeeRateEditorView } from './AccountEmployeeRateEditorView';
import { AccountEmployeeRateFormData } from './form/rate/AccountEmployeeRateForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeRateFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeRateFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnProps {
  formMode?: FormMode;
  employeeUid: string;
  rateUid?: string;
  isOpenDialog: boolean;
  initialValues?: AccountEmployeeRateFormData;
  handleDialogClose: () => void;
}

interface OwnState {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeRateEditorProps
  = WithAccountEmployeeRate
  & WithUser
  & WithLayout
  & WithWidth
  & WithAppBar
  & RouteComponentProps
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnProps
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeRateEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeRateEditorProps) => (formData: AccountEmployeeRateFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'value'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(accountMessage.rate.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeRateEditorProps) => (formData: AccountEmployeeRateFormData) => { 
    const { formMode, rateUid, intl, employeeUid } = props;
    const { user } = props.userState;
    const { updateRequest } = props.accountEmployeeRateDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // update checking
    if (!rateUid) {
      const message = intl.formatMessage(accountMessage.access.message.emptyProps);

      return Promise.reject(message);
    }

    const putPayload = {
      ...formData.information,
      employeeUid,
    };

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          employeeUid,
          data: putPayload as IEmployeeRatePutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeRateEditorProps) => (response: IEmployeeRate) => {
    const { formMode, intl, employeeUid, handleDialogClose } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadAllRequest } = props.accountEmployeeRateDispatch;
    
    let message: string = '';
    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, {state: 'Rate'});
    }

    handleDialogClose();

    alertAdd({
      message,
      time: new Date()
    });

    loadAllRequest({
      employeeUid,
      filter: {
        orderBy: 'uid',
        direction: 'descending'
      }
    });
    
    // history.push(`/account/employee/${employeeUid}/access`);
  },
  handleSubmitFail: (props: AccountEmployeeRateEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.shared.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeRateEditorProps, OwnState> = (): OwnState => {
  return {
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateEditorProps, {}> = {
  componentWillUnmount() {
    const { updateDispose } = this.props.accountEmployeeRateDispatch;

    updateDispose();
  }
};

export default compose<AccountEmployeeRateEditorProps, OwnProps>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withWidth(),
  withAccountEmployeeRate,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeRateEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeRateEditorProps, {}>(lifecycles),
)(AccountEmployeeRateEditorView);