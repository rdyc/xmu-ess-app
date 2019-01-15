import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IOrganizationWorkflowPostPayload, IOrganizationWorkflowPutHierarchy, IOrganizationWorkflowPutPayload } from '@organization/classes/request/workflow/request';
import { IWorkflow } from '@organization/classes/response/workflow';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { WorkflowFormData } from './forms/OrganizationWorkflowForm';
import { OrganizationWorkflowEditorView } from './OrganizationWorkflowEditorView';

interface OwnHandlers {
  handleValidate: (payload: WorkflowFormData) => FormErrors;
  handleSubmit: (payload: WorkflowFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  menuUid: string;
  companyUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  menuUid?: string | undefined;

}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type OrganizationWorkflowEditorProps
  = WithOrganizationWorkflow
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<OrganizationWorkflowEditorProps, OwnState> = (props: OrganizationWorkflowEditorProps): OwnState => {
  const { history } = props;

  const state = history.location.state;

  return {
    formMode: state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    menuUid: state ? state.menuUid : undefined,
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<OrganizationWorkflowEditorProps, OwnHandlers> = {
  handleValidate: (props: OrganizationWorkflowEditorProps) => (formData: WorkflowFormData) => {
    const errors = {
      hierarchy: {}
    };

    if (formData.hierarchy.hierarchies) {
      const requiredItemFields = ['hierarchyUid'];

      const itemErrors: any[] = [];

      formData.hierarchy.hierarchies.forEach((item, index) => {
        const itemError: any = {};

        if (!item) { return; }

        requiredItemFields.forEach(field => {
          if (!item[field] || isNullOrUndefined(item[field])) {
            Object.assign(itemError, { [`${field}`]: props.intl.formatMessage({ id: `travel.field.information.item.${field}.required` }) });
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors.hierarchy, {
          items: itemErrors
        });
      }
    }
    return errors;
  },
  handleSubmit: (props: OrganizationWorkflowEditorProps) => (formData: WorkflowFormData) => {
    const { formMode } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.organizationWorkflowDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // if (!formData.hierarchy.hierarchies.length) {
    //   return Promise.reject('At least one hierarchy must be entered');
    // }

    const parsedHierarchy = () => {
      if (!formData.hierarchy.hierarchies) {
        return null;
      }

      const _items: IOrganizationWorkflowPutHierarchy[] = [];

      formData.hierarchy.hierarchies.forEach(item =>
        _items.push({
          workflowUid: item.uid,
          hierarchyUid: item.hierarchyUid,
          priority: item.priority
        })
      );

      return _items;
    };

    const payload = {
      hierarchies: parsedHierarchy(),
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: props.companyUid || '',
          menuUid: props.menuUid || '',
          data: payload as IOrganizationWorkflowPostPayload
        });
      });
    }

    // update checking
    if (!props.menuUid) {
      // const message = intl.formatMessage(travelRequestMessage.emptyTravelUid);

      return Promise.reject('empty menuUid');
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve,
          reject,
          companyUid: props.companyUid || '',
          menuUid: props.menuUid || '',
          data: payload as IOrganizationWorkflowPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: OrganizationWorkflowEditorProps) => (response: IWorkflow) => {
    const { formMode, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = '' ; // intl.formatMessage(travelMessage.request.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = '' ; // intl.formatMessage(travelMessage.request.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/organization/workflows`);
  },
  handleSubmitFail: (props: OrganizationWorkflowEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode } = props;
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
        message = ''; // intl.formatMessage(travelMessage.request.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = ''; // intl.formatMessage(travelMessage.request.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }, 
};

const lifecycles: ReactLifeCycleFunctions<OrganizationWorkflowEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, history, stateUpdate } = this.props;
    const { loadListRequest } = this.props.organizationWorkflowDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'Workflow', // projectMessage.registration.page.newTitle,
      subTitle: '', // projectMessage.registration.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'edit'; // projectMessage.registration.page.modifyTitle;
      view.subTitle = ''; // projectMessage.registration.page.modifySubHeader;

      const filter: any = {
        menuUid: history.location.state.menuUid,
        companyUid: history.location.state.companyUid,
        orderBy: 'priority',
        direction: 'ascending'
      };

      stateUpdate({ 
        formMode: FormMode.Edit,
      });

      loadListRequest({
        filter        
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupWorkflow,
      parentUid: AppMenu.Lookup,
      title: '', // intl.formatMessage(view.title),
      subTitle : '' // intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, organizationWorkflowDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    // layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    organizationWorkflowDispatch.createDispose();
    organizationWorkflowDispatch.updateDispose();
  }   
};

export default compose<OrganizationWorkflowEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withOrganizationWorkflow,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationWorkflowEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<OrganizationWorkflowEditorProps, {}>(lifecycles),
)(OrganizationWorkflowEditorView);