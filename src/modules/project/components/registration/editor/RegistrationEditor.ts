import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectPutDocument, IProjectPutPayload, IProjectPutSales } from '@project/classes/request';
import { ProjectRegistrationFormData } from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationEditorView } from '@project/components/registration/editor/RegistrationEditorView';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
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

interface OwnHandlers {
  handleValidate: (payload: ProjectRegistrationFormData) => FormErrors;
  handleSubmit: (payload: ProjectRegistrationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
}

interface OwnState {
  mode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type RegistrationEditorProps
  = WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<RegistrationEditorProps, OwnHandlers> = {
  handleValidate: (props: RegistrationEditorProps) => (payload: ProjectRegistrationFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'customerUid', 'projectType', 'name',  
      'start', 'end', 'currencyType', 'valueUsd'
    ];
  
    requiredFields.forEach(field => {
      if (!payload.information[field] || isNullOrUndefined(payload.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `project.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: RegistrationEditorProps) => (payload: ProjectRegistrationFormData) => { 
    const { mode, projectUid, apiRegistrationDetailPost, apiRegistrationDetailPut } = props;
    const { user } = props.userState;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const parsedDocuments = () => {
      if (
        payload.information.projectType === ProjectType.ExtraMiles || 
        payload.information.projectType === ProjectType.NonProject
      ) {
        return null;
      }

      const _documents: IProjectPutDocument[] = [];
  
      if (payload.information.projectType === ProjectType.Project) {
        payload.document.project.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isChecked
          })
        );
      }
      
      if (payload.information.projectType === ProjectType.PreSales) {
        payload.document.preSales.forEach(item => 
          _documents.push({
            uid: item.uid,
            documentType: item.documentType,
            isChecked: item.isChecked
          })
        );
      }
      
      return _documents;
    };

    const parsedSales = () => {
      if (!payload.sales) {
        return null;
      }
  
      const _sales: IProjectPutSales[] = [];
  
      payload.sales.employees.forEach(item => 
        _sales.push({
          uid: item.uid,
          employeeUid: item.employeeUid
        })
      );
      
      return _sales;
    };

    const putPayload: IProjectPutPayload = ({
      customerUid: payload.information.customerUid || 'n/a',
      projectType: payload.information.projectType || 'n/a',
      currencyType: payload.information.currencyType || 'n/a',
      contractNumber: payload.information.contractNumber,
      name: payload.information.name || 'n/a',
      description: payload.information.description,
      start: payload.information.start || '',
      end: payload.information.end || '',
      rate: payload.information.rate,
      valueUsd: payload.information.valueUsd,
      valueIdr: payload.information.valueIdr,
      documents: parsedDocuments(),
      sales: parsedSales()
    });

    console.log(putPayload);

    if (mode === FormMode.New) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPost(projectUid, putPayload, resolve, reject);
      });
    }

    if (!projectUid) {
      return Promise.reject('project uid was not found');
    }

    if (mode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        apiRegistrationDetailPut(projectUid, putPayload, resolve, reject);
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: RegistrationEditorProps) => (result: any, dispatch: Dispatch<any>) => {
    // console.log(result);
    // console.log(dispatch);
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: 'Success bro!!!'
    });
  },
  handleSubmitFail: (props: RegistrationEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = props.layoutDispatch;
    
    if (submitError) {
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<RegistrationEditorProps, OwnState> = (props: RegistrationEditorProps): OwnState => ({ 
  mode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<RegistrationEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, apiRegistrationDetailGet } = this.props;
    const { user } = this.props.userState;
    
    const view = {
      title: 'project.form.newTitle',
      subTitle: 'project.form.newSubTitle',
    };

    if (user) {
      stateUpdate({ 
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'project.form.editTitle';
      view.subTitle = 'project.form.editSubTitle';

      stateUpdate({ 
        mode: FormMode.Edit,
        projectUid: history.location.state.uid
      });

      apiRegistrationDetailGet(history.location.state.uid);
    }

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<RegistrationEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RegistrationEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<RegistrationEditorProps, {}>(lifecycles),
)(RegistrationEditorView);