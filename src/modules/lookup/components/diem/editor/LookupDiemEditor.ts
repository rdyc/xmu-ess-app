import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupDiemPostPayload, ILookupDiemPutPayload } from '@lookup/classes/request/diem';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
import { LookupDiemFormData } from './form/LookupDiemForm';
import { LookupDiemEditorView } from './LookupDiemEditorView';

interface OwnHandlers {
  handleValidate: (payload: LookupDiemFormData) => FormErrors;
  handleSubmit: (payload: LookupDiemFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  diemUid: string;
}

interface OwnState {
  formMode: FormMode;
  diemUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupDiemEditorProps
  = WithLookupDiem
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<LookupDiemEditorProps, OwnHandlers> = {
  handleValidate: (props: LookupDiemEditorProps) => (formData: LookupDiemFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'companyuid', 'projectType', 'travelType',
      'currencyUid', 'value'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = 'required';
      }
    });
    return errors;
  },
  handleSubmit: (props: LookupDiemEditorProps) => (formData: LookupDiemFormData) => {
    const { formMode, diemUid, intl } = props;
    const { createRequest, updateRequest } = props.lookupDiemDispatch;

    const payload = {
      ...formData.information,
    };

    // creating 
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ILookupDiemPostPayload
        });
      });
    }

    // update checking
    if (!diemUid) {
      const message = intl.formatMessage(projectMessage.registration.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          diemUid, 
          resolve, 
          reject,
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ILookupDiemPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: LookupDiemEditorProps) => (response: IDiem) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(projectMessage.registration.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectMessage.registration.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/lookup/diemvalue/list');
  },
  handleSubmitFail: (props: LookupDiemEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(projectMessage.registration.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(projectMessage.registration.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<LookupDiemEditorProps, OwnState> = (props: LookupDiemEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<LookupDiemEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.lookupDiemDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'New Diem Value' , // projectMessage.registration.page.newTitle,
      subTitle: projectMessage.registration.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'Modify Diem Value', // projectMessage.registration.page.modifyTitle;
      view.subTitle = projectMessage.registration.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        diemUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: history.location.state.company,
        diemUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupDiem,
      parentUid: AppMenu.Lookup,
      title: 'Diem Value' , // intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, lookupDiemDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    lookupDiemDispatch.createDispose();
    lookupDiemDispatch.updateDispose();
  }
};

export default compose<LookupDiemEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupDiem,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupDiemEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupDiemEditorProps, {}>(lifecycles),
)(LookupDiemEditorView);