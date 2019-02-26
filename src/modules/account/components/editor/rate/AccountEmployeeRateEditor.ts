import { IEmployeeRatePutPayload } from '@account/classes/request/employeeRate';
import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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
import { AccountEmployeeRateFormData } from './form/AccountEmployeeRateForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeRateFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeRateFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  handleValidity: (valid: boolean) => void;
}

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode;
  rateUid: string;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
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
  & RouteComponentProps<OwnRouteParams>
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
    const { formMode, rateUid, intl } = props;
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
      employeeUid: props.match.params.employeeUid,
    };

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          employeeUid: props.match.params.employeeUid,
          data: putPayload as IEmployeeRatePutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeRateEditorProps) => (response: IEmployeeRate) => {
    const { formMode, intl, employeeUid, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';
    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, {state: 'Rate'});
    }

    alertAdd({
      message,
      time: new Date()
    });
    
    history.push(`/account/employee/${employeeUid}/rate/${response.uid}`);
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
  },
  handleValidity: (props: AccountEmployeeRateEditorProps) => (valid: boolean) => {
    props.stateUpdate({
      validity: valid
    });
  }
};

const createProps: mapper<AccountEmployeeRateEditorProps, OwnState> = (props: AccountEmployeeRateEditorProps): OwnState => ({
  rateUid: props.history.location.state.rateUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Education'}),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'education'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeRateDispatch;
    const { user } = this.props.userState;

    const view = {
      title: accountMessage.shared.page.newTitle,
      subTitle: accountMessage.shared.page.newSubHeader
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = accountMessage.shared.page.modifyTitle;
      view.subTitle = accountMessage.shared.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        employeeUid: this.props.match.params.employeeUid,
        rateUid: history.location.state.rateUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Rate'}),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'Rate'})
      });

      loadDetailRequest({
        employeeUid: this.props.match.params.employeeUid,
        rateId: history.location.state.rateUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title, {state: 'Note'}),
        subTitle : intl.formatMessage(view.subTitle)
      },
      parentUrl: `/account/employee/${this.props.match.params.employeeUid}/rate`,
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, accountEmployeeRateDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    accountEmployeeRateDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeRateEditorProps, {}>(
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