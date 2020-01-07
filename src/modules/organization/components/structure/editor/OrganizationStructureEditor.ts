import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WithStyles, withStyles } from '@material-ui/core';
import { IOrganizationStructurePostPayload, IOrganizationStructurePutPayload } from '@organization/classes/request/structure';
import { IStructure } from '@organization/classes/response/structure';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
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
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type OrganizationStructureEditorProps
  = WithOrganizationStructure
  & WithOidc
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<OrganizationStructureEditorProps, OwnHandlers> = {
  handleValidate: (props: OrganizationStructureEditorProps) => (formData: OrganizationStructureFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'companyUid', 'positionUid'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || (formData.information[field] === undefined || formData.information[field] === null)) {
        errors.information[field] = props.intl.formatMessage(organizationMessage.structure.fieldFor(field, 'fieldRequired'));
      }
    });

    if (formData.items) {
      const requiredItemFields = ['positionUid', 'start'];
      
      const itemErrors: any[] = [];
      
      formData.items.forEach((item, index) => {
        const itemError: any = {};
        
        if (!item) { return ; }

        requiredItemFields.forEach(field => {
          if (!item[field] || (item[field] === undefined || item[field] === null)) {
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

      formData.items.forEach(item => 
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

      formData.items.forEach(item => 
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
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
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
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<OrganizationStructureEditorProps, OwnState> = (props: OrganizationStructureEditorProps): OwnState => {
  return {
    formMode: FormMode.New,
    submitDialogTitle: props.intl.formatMessage(organizationMessage.structure.dialog.createTitle),
    submitDialogContentText: props.intl.formatMessage(organizationMessage.structure.dialog.createDescription),
    submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
    submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
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
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.organizationStructureDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: intl.formatMessage(organizationMessage.structure.page.newTitle),
      subTitle: intl.formatMessage(organizationMessage.structure.page.newSubHeader),
    };

    if (!user) {
      return;
    }

    // checking admin status
    const { user: oidc } = this.props.oidcState;
    let result: boolean = false;
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        stateUpdate({ 
          isAdmin: true
        });
      }
    }

    if (!(history.location.state === undefined || history.location.state === null)) {
      view.title = intl.formatMessage(organizationMessage.structure.page.modifyTitle);
      view.subTitle = intl.formatMessage(organizationMessage.structure.page.modifySubHeader);

      stateUpdate({ 
        formMode: FormMode.Edit,
        submitDialogTitle: intl.formatMessage(organizationMessage.structure.dialog.editTitle),
        submitDialogContentText: intl.formatMessage(organizationMessage.structure.dialog.editDescription),
      });

      loadDetailRequest({
        companyUid: this.props.location.state && this.props.location.state.companyUid,
        structureUid: this.props.location.state.structureUid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupOrganizationStructure,
      parentUid: AppMenu.Lookup,
      parentUrl: '/organization/structure',
      title: intl.formatMessage({id: view.title}),
    }); 
  },
  componentWillUnmount() {
    const { masterPage, organizationStructureDispatch } = this.props;

    masterPage.resetPage();

    organizationStructureDispatch.createDispose();
    organizationStructureDispatch.updateDispose();
  }
};

export default compose<OrganizationStructureEditorProps, {}>(
  setDisplayName('OrganizationStructureEditor'),
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withOrganizationStructure,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationStructureEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<OrganizationStructureEditorProps, {}>(lifecycles),
)(CommonEditorView);