import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IOrganizationHierarchyPostPayload, IOrganizationHierarchyPutPayload } from '@organization/classes/request/hierarchy';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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
import { OrganizationHierarchyFormData } from './forms/HierarchyForm';
import { CommonEditorView } from './OrganizationHierarchyEditorView';

interface OwnHandlers {
  handleValidate: (payload: OrganizationHierarchyFormData) => FormErrors;
  handleSubmit: (payload: OrganizationHierarchyFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  hierarchyUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type OrganizationHierarchyEditorProps
  = WithOrganizationHierarchy
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<OrganizationHierarchyEditorProps, OwnHandlers> = {
  handleValidate: (props: OrganizationHierarchyEditorProps) => (formData: OrganizationHierarchyFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'companyUid', 'name', 'positionUid', 'sequence', 'RelationType'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(organizationMessage.hierarchy.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: OrganizationHierarchyEditorProps) => (formData: OrganizationHierarchyFormData) => { 
    const { formMode, intl, location, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.organizationHierarchyDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    stateUpdate({
      companyUid: formData.information.companyUid
    });

    const parsedItemsPost = () => {
      const payloadItems: any[] = [];

      formData.item.items.forEach(item => 
        payloadItems.push({
          sequence: item.sequence,
          positionUid: item.positionUid,
          relationType: item.relationType
        })
      );

      return payloadItems;
    };

    const parsedItemsPut = () => {
      const payloadItems: any[] = [];

      formData.item.items.forEach(item => 
        payloadItems.push({
          uid: item.uid,
          sequence: item.sequence,
          positionUid: item.positionUid,
          relationType: item.relationType
        })
      );

      return payloadItems;
    };
    
    const payloadHeader = {
      name: formData.information.name,
      description: formData.information.description,
      inactiveDate: formData.information.inactiveDate,
    };

    const payloadPost = {
      ...payloadHeader,
      items: parsedItemsPost()
    };

    const payloadPut = {
      ...payloadHeader,
      items: parsedItemsPut()
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: formData.information.companyUid || '',
          data: payloadPost as IOrganizationHierarchyPostPayload
        });
      });
    }

    // update checking
    if (!location.state.hierarchyUid && !formData.information.companyUid) {
      const message = intl.formatMessage(organizationMessage.hierarchy.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          hierarchyUid: location.state.hierarchyUid,
          companyUid: formData.information.companyUid || '',
          data: payloadPut as IOrganizationHierarchyPutPayload 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: OrganizationHierarchyEditorProps) => (response: IHierarchy) => {
    const { formMode, intl, history, companyUid } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadDetailDispose } = props.organizationHierarchyDispatch;
    
    let message: string = '';
    loadDetailDispose();

    if (formMode === FormMode.New) {
      message = intl.formatMessage(organizationMessage.hierarchy.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(organizationMessage.hierarchy.message.createSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/organization/hierarchy/${response.uid}`, {companyUid});
  },
  handleSubmitFail: (props: OrganizationHierarchyEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(organizationMessage.hierarchy.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(organizationMessage.hierarchy.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<OrganizationHierarchyEditorProps, OwnState> = (props: OrganizationHierarchyEditorProps): OwnState => {
  return {
    formMode: FormMode.New,
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.organizationHierarchyDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: intl.formatMessage(organizationMessage.hierarchy.page.newTitle),
      subTitle: intl.formatMessage(organizationMessage.hierarchy.page.newSubHeader),
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = intl.formatMessage(organizationMessage.hierarchy.page.modifyTitle);
      view.subTitle = intl.formatMessage(organizationMessage.hierarchy.page.modifySubHeader);

      stateUpdate({ 
        formMode: FormMode.Edit,
      });

      loadDetailRequest({
        companyUid: this.props.location.state && this.props.location.state.companyUid,
        hierarchyUid: this.props.location.state.hierarchyUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupApprovalHierarchy,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage({id: view.title}),
        subTitle : intl.formatMessage({id: view.subTitle})
      },
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
    const { layoutDispatch, appBarDispatch, organizationHierarchyDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    organizationHierarchyDispatch.createDispose();
    organizationHierarchyDispatch.updateDispose();
  }
};

export default compose<OrganizationHierarchyEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationHierarchyEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<OrganizationHierarchyEditorProps, {}>(lifecycles),
)(CommonEditorView);