import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
  [key: string]: boolean;
}

interface IProjectSalesFormValue {
  uid?: string;
  employeeUid: string;
  fullName: string;
  email: string;
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
  documentProject?: IProjectDocumentFormValue[];
  documentPreSales?: IProjectDocumentFormValue[];
  sales?: IProjectSalesFormValue[];
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

  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setValidationSchema: StateHandler<IOwnState>;
  setFilterLookupCustomer: StateHandler<IOwnState>;
  setFilterCommonSystem: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnSubmit: (values: IProjectRegistrationFormValue, actions: FormikActions<IProjectRegistrationFormValue>) => void;
}

export type ProjectRegistrationFormProps
  = WithProjectRegistration
  & WithUser
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
  setValidationSchema: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    validationSchema: values
  }),
  setFilterLookupCustomer: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterLookupCustomer: values
  }),
  setFilterCommonSystem: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterCommonSystem: values
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationFormProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectRegistrationFormProps) => () => {
    //
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
      valueIdr: 0
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
        .required(this.props.intl.formatMessage(projectMessage.registration.fieldFor('valueUsd', 'fieldRequired')))
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
  },
  // componentDidUpdate(prevProps: ProjectRegistrationFormProps) {
  //   console.log('component did update');
  // }
};

export const ProjectRegistrationForm = compose<ProjectRegistrationFormProps, IOwnOption>(
  setDisplayName('ProjectRegistrationForm'),
  withUser,
  withRouter,
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(ProjectRegistrationFormView);