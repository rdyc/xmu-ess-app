import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerPostPayload, ILookupCustomerPutPayload } from '@lookup/classes/request/customer';
import { ICustomer } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
  withStateHandlers 
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { LookupCustomerFormData } from './forms/LookupCustomerForm';
import { LookupCustomerEditorView } from './LookupCustomerEditorView';

interface OwnHandlers {
  handleValidate: (payload: LookupCustomerFormData) => FormErrors;
  handleSubmit: (payload: LookupCustomerFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  customerUid: string;
}

interface OwnState {
  formMode: FormMode;
  customerUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupCustomerEditorProps
  = WithLookupCustomer
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<LookupCustomerEditorProps, OwnHandlers> = {
  handleValidate: (props: LookupCustomerEditorProps) => (formData: LookupCustomerFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'companyUid', 'name', 'emailAddress'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.lookupCustomer.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: LookupCustomerEditorProps) => (formData: LookupCustomerFormData) => {
    const { formMode, customerUid, intl } = props;
    const { createRequest, updateRequest } = props.lookupCustomerDispatch;

    const payload = {
      ...formData.information
    };

    const companyId = payload.companyUid;
    // creating
    if (formMode === FormMode.New && !isNullOrUndefined(companyId)) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: companyId,
          data: payload as ILookupCustomerPostPayload
        });
      });
    }

    // update checking
    if (!customerUid) {
      alert('sini');
      const message = intl.formatMessage(lookupMessage.company.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit && !isNullOrUndefined(companyId)) {
      return new Promise((resolve, reject) => {
        updateRequest({
          customerUid,
          resolve,
          reject,
          companyUid: companyId,
          data: payload as ILookupCustomerPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: LookupCustomerEditorProps) => (response: ICustomer) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.lookupCustomer.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.lookupCustomer.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/customer/${response.uid}`);
  },
  handleSubmitFail: (props: LookupCustomerEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

      if (formMode === FormMode.New) {
        message = intl.formatMessage(lookupMessage.lookupCustomer.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.lookupCustomer.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<LookupCustomerEditorProps, OwnState> = (props: LookupCustomerEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<LookupCustomerEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupCustomerDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.lookupCustomer.page.newTitle,
      subTitle: lookupMessage.company.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.lookupCustomer.page.modifyTitle;
      view.subTitle = lookupMessage.lookupCustomer.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        customerUid: history.location.state.uid
      });

      loadDetailRequest({
        customerUid: history.location.state.uid,
        companyUid: history.location.state.companyUid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupCustomer,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, lookupCustomerDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    lookupCustomerDispatch.createDispose();
    lookupCustomerDispatch.updateDispose();
  }
};

export default compose<LookupCustomerEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupCustomer,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupCustomerEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupCustomerEditorProps, {}>(lifecycles),
)(LookupCustomerEditorView);
