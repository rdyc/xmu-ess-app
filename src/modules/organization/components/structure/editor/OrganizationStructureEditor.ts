import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IOrganizationStructurePostPayload, IOrganizationStructurePutPayload } from '@organization/classes/request/structure';
import { IStructure } from '@organization/classes/response/structure';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
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
import { OrganizationStructureFormData } from './form/StructureForm';
import { CommonEditorView } from './OrganizationStructureEditorView';

interface OwnHandlers {
  handleValidate: (payload: OrganizationStructureFormData) => FormErrors;
  handleSubmit: (payload: OrganizationStructureFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  structureUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type OrganizationStructureEditorProps
  = WithOrganizationStructure
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<OrganizationStructureEditorProps, OwnHandlers> = {
  handleValidate: (props: OrganizationStructureEditorProps) => (formData: OrganizationStructureFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'companyUid', 'positionUid', 'inactiveDate'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(organizationMessage.structure.fieldFor(field, 'fieldRequired'));
      }
    });

    if (formData.item.items) {
      const requiredItemFields = ['positionUid', 'start', 'end'];
      
      const itemErrors: any[] = [];
      
      formData.item.items.forEach((item, index) => {
        const itemError: any = {};
        
        if (!item) { return ; }

        requiredItemFields.forEach(field => {
          if (!item[field] || isNullOrUndefined(item[field])) {
            Object.assign(itemError, {[`${field}`]: props.intl.formatMessage(organizationMessage.structure.fieldFor(field, 'fieldRequired'))});
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors, {
          items: itemErrors
        });
      }
    }
    
    return errors;
  },
  handleSubmit: (props: OrganizationStructureEditorProps) => (formData: OrganizationStructureFormData) => { 
    const { formMode, intl, location, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.organizationStructureDispatch;

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
          positionUid: item.positionUid,
          start: item.start,
          end: item.end
        })
      );

      return payloadItems;
    };

    const parsedItemsPut = () => {
      const payloadItems: any[] = [];

      formData.item.items.forEach(item => 
        payloadItems.push({
          uid: item.uid,
          positionUid: item.positionUid,
          start: item.start,
          end: item.end
        })
      );

      return payloadItems;
    };
    
    const payloadHeader = {
      positionUid: formData.information.positionUid,
      description: formData.information.description,
      inactiveDate: formData.information.inactiveDate,
    };

    const payloadPost = {
      ...payloadHeader,
      reportTo: parsedItemsPost()
    };

    const payloadPut = {
      ...payloadHeader,
      reportTo: parsedItemsPut()
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          companyUid: formData.information.companyUid || '',
          data: payloadPost as IOrganizationStructurePostPayload
        });
      });
    }

    // update checking
    if (!location.state.structureUid && !formData.information.companyUid) {
      const message = intl.formatMessage(organizationMessage.structure.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          structureUid: location.state.structureUid,
          companyUid: formData.information.companyUid || '',
          data: payloadPut as IOrganizationStructurePutPayload 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: OrganizationStructureEditorProps) => (response: IStructure) => {
    const { formMode, intl, history, companyUid } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadDetailDispose } = props.organizationStructureDispatch;
    
    let message: string = '';
    loadDetailDispose();

    if (formMode === FormMode.New) {
      message = intl.formatMessage(organizationMessage.structure.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(organizationMessage.structure.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/organization/structure/${response.uid}`, {companyUid});
  },
  handleSubmitFail: (props: OrganizationStructureEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(organizationMessage.structure.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(organizationMessage.structure.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<OrganizationStructureEditorProps, OwnState> = (props: OrganizationStructureEditorProps): OwnState => {
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

const lifecycles: ReactLifeCycleFunctions<OrganizationStructureEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.organizationStructureDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: intl.formatMessage(organizationMessage.structure.page.newTitle),
      subTitle: intl.formatMessage(organizationMessage.structure.page.newSubHeader),
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = intl.formatMessage(organizationMessage.structure.page.modifyTitle);
      view.subTitle = intl.formatMessage(organizationMessage.structure.page.modifySubHeader);

      stateUpdate({ 
        formMode: FormMode.Edit,
      });

      loadDetailRequest({
        companyUid: this.props.location.state && this.props.location.state.companyUid,
        structureUid: this.props.location.state.structureUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupOrganizationStructure,
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
    const { layoutDispatch, appBarDispatch, organizationStructureDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    organizationStructureDispatch.createDispose();
    organizationStructureDispatch.updateDispose();
  }
};

export default compose<OrganizationStructureEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationStructureEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<OrganizationStructureEditorProps, {}>(lifecycles),
)(CommonEditorView);