import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectOwnerPutPayload } from '@project/classes/request/owner';
import { WithProjectOwner, withProjectOwner } from '@project/hoc/withProjectOwner';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectOwnerMessage } from '@project/locales/messages/projectOwnerMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { IProject } from '@project/classes/response';
import { ProjectOwnerFormData } from './forms/OwnerForm';
import { OwnerEditorView } from './OwnerEditorView';

interface IOwnHandlers {
  handleValidate: (payload: ProjectOwnerFormData) => FormErrors;
  handleSubmit: (payload: ProjectOwnerFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {

}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type OwnerEditorProps
  = WithProjectOwner
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const handlerCreators: HandleCreators<OwnerEditorProps, IOwnHandlers> = {
  handleValidate: (props: OwnerEditorProps) => (formData: ProjectOwnerFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['employeeUid', 'projectType'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(projectMessage.registration.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: OwnerEditorProps) => (formData: ProjectOwnerFormData) => { 
    const { projectUid, intl } = props;
    const { user } = props.userState;
    const { updateRequest } = props.projectOwnerDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!projectUid || !information.employeeUid || !information.projectType) {
      const message = intl.formatMessage(projectOwnerMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: IProjectOwnerPutPayload = {
      employeeUid: information.employeeUid,
      projectType: information.projectType
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      updateRequest({
        projectUid, 
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: OwnerEditorProps) => (response: IProject) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      if (response && response.childProjectUid) {
        message = intl.formatMessage(projectOwnerMessage.cloneSuccess, {pid: response.childProjectUid});
      } else {
        message = intl.formatMessage(projectOwnerMessage.updateSuccess);
      }
    }

    alertAdd({
      message,
      time: new Date()
    });

    // when owner was changed, it must removed form project list
    history.push('/project/requests');
  },
  handleSubmitFail: (props: OwnerEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(projectOwnerMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<OwnerEditorProps, IOwnState> = (props: OwnerEditorProps): IOwnState => {
  const { history } = props;
  
  return { 
    formMode: FormMode.Edit,
    projectUid: history.location.state.uid
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<OwnerEditorProps, {}> = {
  componentDidMount() {
    const { intl, history } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    if (!isNullOrUndefined(history.location.state) && user) {
      this.props.masterPage.changePage({
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        parentUrl: `/project/requests/${history.location.state.uid}`,
        title: intl.formatMessage(projectMessage.registration.page.ownerModifyTitle),
        description: intl.formatMessage(projectMessage.registration.page.ownerModifySubHeader)
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: history.location.state.uid
      });
    }
  },
  componentWillUnmount() {
    const { projectOwnerDispatch } = this.props;

    projectOwnerDispatch.updateDispose();
  }
};

export const OwnerEditor = compose<OwnerEditorProps, {}>(
  setDisplayName('OwnerEditor'),
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withProjectRegistration,
  withProjectOwner,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(OwnerEditorView);