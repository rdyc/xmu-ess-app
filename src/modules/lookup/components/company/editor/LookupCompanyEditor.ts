import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyPostPayload, ILookupCompanyPutPayload } from '@lookup/classes/request/company';
import { ICompany } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
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
import { LookupCompanyFormData } from './form/LookupCompanyForm';
import { LookupCompanyEditorView } from './LookupCompanyEditorView';

interface OwnHandlers {
  handleValidate: (payload: LookupCompanyFormData) => FormErrors;
  handleSubmit: (payload: LookupCompanyFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  companyUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type CompanyEditorProps
  = WithLookupCompany
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<CompanyEditorProps, OwnHandlers> = {
  handleValidate: (props: CompanyEditorProps) => (formData: LookupCompanyFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'code', 'name',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.company.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: CompanyEditorProps) => (formData: LookupCompanyFormData) => {
    const { formMode, companyUid, intl } = props;
    const { createRequest, updateRequest } = props.lookupCompanyDispatch;

    const payload = {
      ...formData.information
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          data: payload as ILookupCompanyPostPayload
        });
      });
    }

    // update checking
    if (!companyUid) {
      const message = intl.formatMessage(lookupMessage.company.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          companyUid,
          resolve,
          reject,
          data: payload as ILookupCompanyPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: CompanyEditorProps) => (response: ICompany) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.company.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.company.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/company/${response.uid}`);
  },
  handleSubmitFail: (props: CompanyEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(lookupMessage.company.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.company.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<CompanyEditorProps, OwnState> = (props: CompanyEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<CompanyEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupCompanyDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.company.page.newTitle,
      subTitle: lookupMessage.company.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.company.page.modifyTitle;
      view.subTitle = lookupMessage.company.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        companyUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, lookupCompanyDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    lookupCompanyDispatch.createDispose();
    lookupCompanyDispatch.updateDispose();
  }
};

export default compose<CompanyEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupCompany,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CompanyEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<CompanyEditorProps, {}>(lifecycles),
)(LookupCompanyEditorView);
