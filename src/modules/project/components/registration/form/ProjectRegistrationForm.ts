import { IEmployeeListFilter } from '@account/classes/filters';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithStyles, withStyles } from '@material-ui/core';
import {
  IProjectRegistrationPatchPayload,
  IProjectRegistrationPostPayload,
  IProjectRegistrationPutPayload,
} from '@project/classes/request/registration';
import { IProject } from '@project/classes/response';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import { FormikActions } from 'formik';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';

import { ProjectRegistrationFormView } from './ProjectRegistrationFormView';

interface IProjectDocumentFormValue {
  uid?: string;
  label: string;
  value: string;
  checked: boolean;
}

interface IProjectSalesFormValue {
  uid?: string;
  employeeUid: string;
}

export interface IProjectRegistrationFormValue {
  uid: string;
  ownerEmployeeUid: string;
  customerUid: string;
  projectType: string;
  maxHours: number;
  contractNumber?: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  currencyType: string;
  rate: number;
  valueUsd: number;
  valueIdr: number;
  documentProjects: IProjectDocumentFormValue[];
  documentPreSales: IProjectDocumentFormValue[];
  sales: IProjectSalesFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  isRequestor: boolean;

  initialValues: IProjectRegistrationFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectRegistrationFormValue>>>;

  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setIsRequestor: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  setInitialDocumentProjectValues: StateHandler<IOwnState>;
  setInitialDocumentPreSalesValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnLoadDocumentProject: () => void;
  handleOnLoadDocumentPreSales: () => void;
  handleOnSubmit: (values: IProjectRegistrationFormValue, actions: FormikActions<IProjectRegistrationFormValue>) => void;
}

export type ProjectRegistrationFormProps
  = WithProjectRegistration
  & WithAccountSalesRoles
  & WithAllowedProjectType
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectRegistrationFormProps, IOwnState> = (props: ProjectRegistrationFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  isRequestor: true,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    ownerEmployeeUid: props.userState.user && props.userState.user.fullName || '',
    customerUid: '',
    projectType: '',
    maxHours: 0,
    contractNumber: '',
    name: '',
    description: '',
    start: '',
    end: '',
    currencyType: '',
    rate: 1,
    valueUsd: 0,
    valueIdr: 0,
    documentProjects: [],
    documentPreSales: [],
    sales: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IProjectRegistrationFormValue>>({
    customerUid: Yup.string()
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('customerUid', 'fieldRequired'))),

    projectType: Yup.string()
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('projectType', 'fieldRequired'))),

    contractNumber: Yup.string()
      .when('projectType', {
        is: (value: string) => value !== ProjectType.PreSales,
        then: Yup.string()
          .required(props.intl.formatMessage(projectMessage.registration.fieldFor('contractNumber', 'fieldRequired')))
      }),

    name: Yup.string()
      .min(2).max(50)
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('name', 'fieldRequired'))),

    start: Yup.string()
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('start', 'fieldRequired'))),

    end: Yup.string()
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('end', 'fieldRequired'))),
    
    rate: Yup.number()
      .min(1)
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('rate', 'fieldRequired'))),
    
    valueUsd: Yup.number()
      .min(0)
      .required(props.intl.formatMessage(projectMessage.registration.fieldFor('valueUsd', 'fieldRequired'))),

    sales: Yup.array()
      .of(
        Yup.object().shape({
          employeeUid: Yup.string()
            .required(props.intl.formatMessage(projectMessage.registration.fieldFor('salesEmployeeUid', 'fieldRequired')))
        })
      )
      .min(1, props.intl.formatMessage(projectMessage.registration.fieldFor('sales', 'fieldRequired')))
  }),

  // filter props
  filterLookupCustomer: {
    companyUid: props.userState.user && props.userState.user.company.uid,
    orderBy: 'name',
    direction: 'ascending'
  },
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
  filterAccountEmployee: {
    companyUids: props.userState.user && props.userState.user.company.uid,
    roleUids: props.roleSalesUids && props.roleSalesUids.join(','),
    useAccess: true,
    orderBy: 'fullName',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<ProjectRegistrationFormProps, IOwnState, IOwnStateUpdater> = {
  setIsRequestor: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isRequestor: !state.isRequestor
  }),
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setInitialDocumentProjectValues: (state: IOwnState) => (values: any): Partial<IOwnState> => {
    const initialValues = state.initialValues;

    if (initialValues) {
      initialValues.documentProjects = values;
    }
    
    return {
      initialValues
    };
  },
  setInitialDocumentPreSalesValues: (state: IOwnState) => (values: any): Partial<IOwnState> => {
    const initialValues = state.initialValues;

    if (initialValues) {
      initialValues.documentPreSales = values;
    }
    
    return {
      initialValues
    };
  }
};

const handlerCreators: HandleCreators<ProjectRegistrationFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectRegistrationFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const projectUid = props.history.location.state.uid;
      const { isLoading } = props.projectRegisterState.detail;

      if (user && projectUid && !isLoading) {
        props.projectRegisterDispatch.loadDetailRequest({
          projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnLoadDocumentProject: (props: ProjectRegistrationFormProps) => () => {
    const { isLoading } = props.commonDocumentListState;
    
    if (!isLoading) {
      props.commonDispatch.documentListRequest({ 
        filter: props.filterCommonSystem,
        category: 'document'
      });
    }
  },
  handleOnLoadDocumentPreSales: (props: ProjectRegistrationFormProps) => () => {
    const { isLoading } = props.commonDocumentPresalesListState;
    
    if (!isLoading) {
      props.commonDispatch.documentPresalesListRequest({ 
        filter: props.filterCommonSystem,
        category: 'documentPreSales'
      });
    }
  },
  handleOnSubmit: (props: ProjectRegistrationFormProps) => (values: IProjectRegistrationFormValue, actions: FormikActions<IProjectRegistrationFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IProjectRegistrationPostPayload = {
          customerUid: values.customerUid,
          projectType: values.projectType,
          currencyType: values.currencyType,
          contractNumber: values.contractNumber === '' ? undefined : values.contractNumber,
          name: values.name,
          description: values.description === '' ? undefined : values.description,
          start: values.start,
          end: values.end,
          rate: values.rate,
          valueUsd: values.valueUsd,
          valueIdr: values.valueIdr,
          documents: [],
          sales: []
        };

        // fill payload documents
        if (payload.projectType !== ProjectType.PreSales) {
          values.documentProjects.forEach(item => payload.documents.push({
            documentType: item.value,
            isChecked: item.checked
          }));
        } else {
          values.documentPreSales.forEach(item => payload.documents.push({
            documentType: item.value,
            isChecked: item.checked
          }));
        }

        // fill payload sales
        values.sales.forEach(item => payload.sales.push({
          employeeUid: item.employeeUid
        }));
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.projectRegisterDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const projectUid = props.history.location.state.uid;

        // must have projectUid
        if (projectUid) {
          
          // requestor is updating the request
          if (props.isRequestor) {
            // fill payload
            const payload: IProjectRegistrationPutPayload = {
              customerUid: values.customerUid,
              projectType: values.projectType,
              currencyType: values.currencyType,
              contractNumber: values.contractNumber === '' ? undefined : values.contractNumber,
              name: values.name,
              description: values.description === '' ? undefined : values.description,
              start: values.start,
              end: values.end,
              rate: values.rate,
              valueUsd: values.valueUsd,
              valueIdr: values.valueIdr,
              documents: [],
              sales: []
            };

            // fill payload documents
            if (payload.projectType !== ProjectType.PreSales) {
              values.documentProjects.forEach(item => payload.documents.push({
                uid: item.uid,
                documentType: item.value,
                isChecked: item.checked
              }));
            } else {
              values.documentPreSales.forEach(item => payload.documents.push({
                uid: item.uid,
                documentType: item.value,
                isChecked: item.checked
              }));
            }

            // fill payload sales
            values.sales.forEach(item => payload.sales.push({
              uid: item.uid,
              employeeUid: item.employeeUid
            }));

            promise = new Promise((resolve, reject) => {
              props.projectRegisterDispatch.updateRequest({
                projectUid, 
                resolve, 
                reject,
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                data: payload as IProjectRegistrationPutPayload, 
              });
            });

          } else {
            // next owner (isn't requestor) patching the request
            // fill payload
            const payload: IProjectRegistrationPatchPayload = {
              projectType: values.projectType,
              contractNumber: values.contractNumber === '' ? undefined : values.contractNumber,
              name: values.name,
              description: values.description === '' ? undefined : values.description,
              start: values.start,
              end: values.end,
              documents: [],
              sales: []
            };

            // fill payload documents
            if (values.projectType !== ProjectType.PreSales) {
              values.documentProjects.forEach(item => payload.documents.push({
                uid: item.uid,
                documentType: item.value,
                isChecked: item.checked
              }));
            } else {
              values.documentPreSales.forEach(item => payload.documents.push({
                uid: item.uid,
                documentType: item.value,
                isChecked: item.checked
              }));
            }

            // fill payload sales
            values.sales.forEach(item => payload.sales.push({
              uid: item.uid,
              employeeUid: item.employeeUid
            }));

            // set the promise
            promise = new Promise((resolve, reject) => {
              props.projectRegisterDispatch.patchRequest({
                projectUid, 
                resolve, 
                reject,
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                data: payload, 
              });
            });
          }

        }
      }
    }

    // handling promise
    promise
      .then((response: IProject) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.registration.message.createSuccess : projectMessage.registration.message.updateSuccess, { uid: response.uid })
        });
       
        // redirect to detail
        props.history.push(`/project/requests/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.registration.message.createFailure : projectMessage.registration.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectRegistrationFormProps, IOwnState> = {
  componentDidMount() {
    // new mode
    if (isNullOrUndefined(this.props.history.location.state)) {
      // load common system
      this.props.handleOnLoadDocumentProject();
      this.props.handleOnLoadDocumentPreSales();
    }
  },
  componentDidUpdate(prevProps: ProjectRegistrationFormProps) {
    // handle common document project response
    if (this.props.commonDocumentListState !== prevProps.commonDocumentListState) {
      if (this.props.commonDocumentListState.response && this.props.commonDocumentListState.response.data) {
        const checklist: IProjectDocumentFormValue[] = [];

        this.props.commonDocumentListState.response.data.forEach(item => checklist.push({
          label: item.name,
          value: item.type,
          checked: false
        }));

        this.props.setInitialDocumentProjectValues(checklist);
      }
    }

    // handle common document presales response
    if (this.props.commonDocumentPresalesListState !== prevProps.commonDocumentPresalesListState) {
      if (this.props.commonDocumentPresalesListState.response && this.props.commonDocumentPresalesListState.response.data) {
        const checklist: IProjectDocumentFormValue[] = [];

        this.props.commonDocumentPresalesListState.response.data.forEach(item => checklist.push({
          label: item.name,
          value: item.type,
          checked: false
        }));

        this.props.setInitialDocumentPreSalesValues(checklist);
      }
    }

    // handle project detail response
    const { response } = this.props.projectRegisterState.detail;

    if (response !== prevProps.projectRegisterState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectRegistrationFormValue = {
          uid: response.data.uid,
          ownerEmployeeUid: response.data.owner && response.data.owner.fullName || response.data.ownerEmployeeUid,
          customerUid: response.data.customerUid,
          projectType: response.data.projectType,
          maxHours: response.data.maxHours,
          contractNumber: response.data.contractNumber || '',
          name: response.data.name,
          description: response.data.description || '',
          start: response.data.start,
          end: response.data.end,
          currencyType: response.data.currencyType,
          rate: response.data.rate,
          valueUsd: response.data.valueUsd,
          valueIdr: response.data.valueIdr,
          documentProjects: [],
          documentPreSales: [],
          sales: []
        };

        // fill document projects
        response.data.documents.forEach(item => initialValues.documentProjects.push({
          uid: item.uid,
          value: item.documentType,
          label: item.document && item.document.value || item.documentType,
          checked: item.isAvailable
        }));

        // fill document presales
        response.data.documentPreSales.forEach(item => initialValues.documentPreSales.push({
          uid: item.uid,
          value: item.documentType,
          label: item.document && item.document.value || item.documentType,
          checked: item.isAvailable
        }));

        // fill sales
        response.data.sales.forEach(item => initialValues.sales.push({
          uid: item.uid,
          employeeUid: item.employeeUid
        }));

        // set initial values
        this.props.setInitialValues(initialValues);

        // update isRequestor status
        if (this.props.userState.user && response.data.changes) {
          if (this.props.userState.user.uid !== response.data.changes.createdBy) {
            this.props.setIsRequestor();
          }
        }
      }
    }
  }
};

export const ProjectRegistrationForm = compose<ProjectRegistrationFormProps, IOwnOption>(
  setDisplayName('ProjectRegistrationForm'),
  withUser,
  withRouter,
  withProjectRegistration,
  withAccountSalesRoles,
  withAllowedProjectType,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectRegistrationFormView);