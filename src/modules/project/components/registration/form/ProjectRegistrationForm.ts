import { IEmployeeListFilter } from '@account/classes/filters';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
import { ISelectFieldOption } from '@layout/components/fields/SelectField';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationPostPayload } from '@project/classes/request/registration';
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
  label: string;
  value: string;
  checked: boolean;
}

export interface IProjectRegistrationFormValue {
  uid?: string;
  customerUid: string;
  projectType: string;
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
  sales: ISelectFieldOption[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  initialValues: IProjectRegistrationFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectRegistrationFormValue>>>;

  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFormMode: StateHandler<IOwnState>;
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
  & WithCommonSystem
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectRegistrationFormProps, IOwnState> = (props: ProjectRegistrationFormProps): IOwnState => ({
  // form props
  formMode: FormMode.New,
  initialValues: {
    customerUid: '',
    projectType: '',
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
      .of<ISelectFieldOption>(Yup.object())
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
    orderBy: 'fullName',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<ProjectRegistrationFormProps, IOwnState, IOwnStateUpdater> = {
  setFormMode: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    formMode: values
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
          employeeUid: item.value
        }));
        
        // create promise
        const promise = new Promise((resolve, reject) => {
          props.projectRegisterDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload
          });
        });

        // handle promise
        promise
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });

        // setTimeout(() => {
        //   actions.setSubmitting(false);
        //   actions.setFieldError('name', 'das dasdas');
        //   // actions.setFieldError('sales[1]', 'semprul...!');
          
        //   console.log({ values, actions });
        // },         3000);
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        // 
      }
    }
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectRegistrationFormProps, IOwnState> = {
  componentDidMount() {
    if (!isNullOrUndefined(this.props.history.location.state)) {
      // edit mode
      this.props.setFormMode(FormMode.Edit);
    
    } else {
      // new mode

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
          customerUid: response.data.customerUid,
          projectType: response.data.projectType,
          contractNumber: response.data.contractNumber,
          name: response.data.name,
          description: response.data.description,
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
          value: item.documentType,
          label: item.document && item.document.value || item.documentType,
          checked: item.isAvailable
        }));

        // fill document presales
        response.data.documentPreSales.forEach(item => initialValues.documentPreSales.push({
          value: item.documentType,
          label: item.document && item.document.value || item.documentType,
          checked: item.isAvailable
        }));

        // fill sales
        response.data.sales.forEach(item => initialValues.sales.push({
          value: item.employeeUid,
          label: item.employee && item.employee.fullName || item.employeeUid
        }));

        // set initial values
        this.props.setInitialValues(initialValues);
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
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectRegistrationFormView);