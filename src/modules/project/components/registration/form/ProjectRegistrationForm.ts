import { IEmployeeListFilter } from '@account/classes/filters';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ISelectFieldOption } from '@layout/components/fields/SelectField';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithStyles, withStyles } from '@material-ui/core';
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
import * as Yup from 'yup';

import { ProjectRegistrationFormView } from './ProjectRegistrationFormView';

interface IProjectDocumentFormValue {
  label: string;
  value: string;
  checked: boolean;
}

export interface IProjectRegistrationFormValue {
  uid?: string;
  ownerEmployeeUid?: string;
  customerUid?: string;
  projectType?: string;
  contractNumber?: string;
  name?: string;
  description?: string;
  start?: string;
  end?: string;
  currencyType?: string;
  rate?: number;
  valueUsd?: number;
  valueIdr?: number;
  hours?: number;
  documentProjects: IProjectDocumentFormValue[];
  documentPreSales: IProjectDocumentFormValue[];
  sales: ISelectFieldOption[];
}

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  initialValues?: IProjectRegistrationFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectRegistrationFormValue>>>;

  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterAccountEmployee?: IEmployeeListFilter;

  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setInitialDocumentProjectValues: StateHandler<IOwnState>;
  setInitialDocumentPreSalesValues: StateHandler<IOwnState>;
  setValidationSchema: StateHandler<IOwnState>;
  setFilterLookupCustomer: StateHandler<IOwnState>;
  setFilterCommonSystem: StateHandler<IOwnState>;
  setFilterAccountEmployee: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnLoadDocumentProject: (filter?: ISystemListFilter) => void;
  handleOnLoadDocumentPreSales: (filter?: ISystemListFilter) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnSubmit: (values: IProjectRegistrationFormValue, actions: FormikActions<IProjectRegistrationFormValue>) => void;
}

export type ProjectRegistrationFormProps
  = WithProjectRegistration
  & WithAccountSalesRoles
  & WithCommonSystem
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<ProjectRegistrationFormProps, IOwnState, IOwnStateUpdater> = {
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
  },
  setValidationSchema: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    validationSchema: values
  }),
  setFilterLookupCustomer: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterLookupCustomer: values
  }),
  setFilterCommonSystem: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterCommonSystem: values
  }),
  setFilterAccountEmployee: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterAccountEmployee: values
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationFormProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectRegistrationFormProps) => () => {
    //
  },
  handleOnLoadDocumentProject: (props: ProjectRegistrationFormProps) => (filter?: ISystemListFilter) => {
    props.commonDispatch.documentListRequest({ 
      filter,
      category: 'document'
    });
  },
  handleOnLoadDocumentPreSales: (props: ProjectRegistrationFormProps) => (filter?: ISystemListFilter) => {
    props.commonDispatch.documentPresalesListRequest({ 
      filter,
      category: 'documentPreSales'
    });
  },
  handleOnCloseDialog: (props: ProjectRegistrationFormProps) => () => {
    //
  },
  handleOnConfirm: (props: ProjectRegistrationFormProps) => () => {
    //
  },
  handleOnSubmit: (props: ProjectRegistrationFormProps) => (values: IProjectRegistrationFormValue, actions: FormikActions<IProjectRegistrationFormValue>) => {
    //
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectRegistrationFormProps, IOwnState> = {
  componentDidMount() {
    // 1. define initial values
    const initialValues: IProjectRegistrationFormValue = {
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
      sales: [
        {
          'value': 'E0022',
          'label': 'AHMAD FAISAL'
        },
        {
          'value': 'E0202',
          'label': 'AHMED EMIR ROSYADI'
        }
      ]
    };

    this.props.setInitialValues(initialValues);

    // 2. define validation schema
    const validationSchema = Yup.object().shape<Partial<IProjectRegistrationFormValue>>({
      customerUid: Yup.string()
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('customerUid', 'fieldRequired'))),

      projectType: Yup.string()
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('projectType', 'fieldRequired'))),

      contractNumber: Yup.string()
        .when('projectType', {
          is: (value: string) => value !== ProjectType.PreSales,
          then: Yup.string()
            .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('contractNumber', 'fieldRequired')))
        }),
  
      name: Yup.string()
        .min(2).max(50)
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('name', 'fieldRequired'))),

      start: Yup.string()
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('start', 'fieldRequired'))),

      end: Yup.string()
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('end', 'fieldRequired'))),
      
      rate: Yup.number()
        .min(1)
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('rate', 'fieldRequired'))),
      
      valueUsd: Yup.number()
        .min(0)
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('valueUsd', 'fieldRequired'))),

      sales: Yup.array()
        .of<ISelectFieldOption>(Yup.object())
        .min(1, this.props.intl.formatMessage(projectMessage.registration.fieldFor('sales', 'fieldRequired')))
    });

    this.props.setValidationSchema(validationSchema);

    // 3. define customer filter
    const filterCustomer: ILookupCustomerGetListFilter = {
      companyUid: this.props.userState.user && this.props.userState.user.company.uid,
      orderBy: 'name',
      direction: 'ascending'
    };

    this.props.setFilterLookupCustomer(filterCustomer);

    // 4. define common project filter
    const filterCommonSystem: ISystemListFilter = {
      orderBy: 'value',
      direction: 'ascending'
    };

    this.props.setFilterCommonSystem(filterCommonSystem);

    // 5. define account employee filter
    const filterAccountEmployee: IEmployeeListFilter = {
      companyUids: this.props.userState.user && this.props.userState.user.company.uid,
      roleUids: this.props.roleSalesUids && this.props.roleSalesUids.join(','),
      orderBy: 'fullName',
      direction: 'ascending'
    };

    this.props.setFilterAccountEmployee(filterAccountEmployee);

    // 6. load common system
    this.props.handleOnLoadDocumentProject(filterCommonSystem);
    this.props.handleOnLoadDocumentPreSales(filterCommonSystem);
  },
  componentDidUpdate(prevProps: ProjectRegistrationFormProps) {
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