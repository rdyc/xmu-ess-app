import { IEmployeePostPayload, IEmployeePutPayload } from '@account/classes/request';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithStyles, withStyles } from '@material-ui/core';
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
import { EmployeeFormView } from './EmployeeFormView';

export interface IEmployeeFormValue {
  // information
  uid: string;
  employmentNumber: string;
  fullName: string;
  genderType: string;
  birthPlace: string;
  dateOfBirth: string;
  companyUid: string;
  employmentType: string;
  joinDate: string;
  inactiveDate?: string;
  taxType: string;
  religionType: string;
  bloodType?: string;
  // bank
  familyCardNumber: string;
  citizenNumber: string;
  taxNumber: string;
  bpjsEmploymentNumber?: string;
  bpjsHealthCareNumber?: string;
  bankAccount: string;
  bankAccountName: string;
  bankAccountBranch?: string;
  // contact
  address: string;
  addressAdditional?: string;
  email?: string;
  emailPersonal?: string;
  phone?: string;
  mobilePhone?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;
  emergencyContactPhoneAdditional?: string;

  image?: string;
}

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IEmployeeFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IEmployeeFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IEmployeeFormValue, actions: FormikActions<IEmployeeFormValue>) => void;
}

export type EmployeeFormProps
  = WithAccountEmployee
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<EmployeeFormProps, IOwnState> = (props: EmployeeFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    uid: 'Auto Generated',
    companyUid: '',
    employmentNumber: '',
    employmentType: '',
    joinDate: '',
    inactiveDate: '',
    fullName: '',
    dateOfBirth: '',
    birthPlace: '',
    genderType: '',
    religionType: '',
    taxType: '',
    bloodType: '',
    // bank
    familyCardNumber: '',
    citizenNumber: '',
    taxNumber: '',
    bpjsEmploymentNumber: '',
    bpjsHealthCareNumber: '',
    bankAccount: '',
    bankAccountName: '',
    bankAccountBranch: '',
    // contact
    address: '',
    addressAdditional: '',
    email: '',
    emailPersonal: '',
    phone: '',
    mobilePhone: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    emergencyContactPhoneAdditional: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IEmployeeFormValue>>({
    // information
    companyUid: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.company))
      .required(),

    employmentNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.nik))
      .required(),
      
    employmentType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.employment))
      .required(),

    fullName: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.name))
      .required(),

    joinDate: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.joinDate))
      .required(),

    inactiveDate: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.inactiveDate)),

    dateOfBirth: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.birthDate))
      .required(),

    birthPlace: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.birthPlace))
      .required(),

    genderType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.gender))
      .required(),
  
    religionType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.religion))
      .required(),

    taxType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.ptkp))
      .required(),

    bloodType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.blood)),

    // Bank
    familyCardNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.kartuKeluarga))
      .required(),

    citizenNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.ktp))
      .required(),

    taxNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.npwp))
      .required(),

    bpjsEmploymentNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.bpjsKetenagakerjaan)),

    bpjsHealthCareNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.bpjsKesehatan)),

    bankAccount: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.bcaNumber))
      .required(),

    bankAccountName: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.bcaName))
      .required(),

    bankAccountBranch: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.bcaBranch)),

    // contact
    address: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.addressKtp))
      .required(),

    addressAdditional: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.addressNpwp)),

    email: Yup.string()
      .email()
      .label(props.intl.formatMessage(accountMessage.employee.field.companyEmail)),

    emailPersonal: Yup.string()
      .email()
      .label(props.intl.formatMessage(accountMessage.employee.field.email)),

    phone: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.phone)),

    mobilePhone: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.mobile)),

    emergencyContactName: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.emergencyName)),

    emergencyContactRelation: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.emergencyRelation)),

    emergencyContactPhone: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.emergencyPhone1)),

    emergencyContactPhoneAdditional: Yup.string()
      .label(props.intl.formatMessage(accountMessage.employee.field.emergencyPhone2)),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<EmployeeFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<EmployeeFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: EmployeeFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.history.location.state.uid;
      const { isLoading } = props.accountEmployeeState.detail;

      if (user && employeeUid && !isLoading) {
        props.accountEmployeeDispatch.loadDetailRequest({
          employeeUid
        });
      }
    }
  },
  handleOnSubmit: (props: EmployeeFormProps) => (values: IEmployeeFormValue, actions: FormikActions<IEmployeeFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeePostPayload = {
          // information
          companyUid: values.companyUid,
          employmentNumber: values.employmentNumber,
          employmentType: values.employmentType,
          fullName: values.fullName,
          joinDate: values.joinDate,
          inactiveDate: values.inactiveDate,
          dateOfBirth: values.dateOfBirth,
          birthPlace: values.birthPlace,
          genderType: values.genderType,
          religionType: values.religionType,
          taxType: values.taxType,
          bloodType: values.bloodType,
          // bank
          familyCardNumber: values.familyCardNumber,
          citizenNumber: values.citizenNumber,
          taxNumber: values.taxNumber,
          bpjsEmploymentNumber: values.bpjsEmploymentNumber,
          bpjsHealthCareNumber: values.bpjsHealthCareNumber,
          bankAccount: values.bankAccount,
          bankAccountName: values.bankAccountName,
          bankAccountBranch: values.bankAccountBranch,
          // contact
          address: values.address,
          addressAdditional: values.addressAdditional,
          email: values.email,
          emailPersonal: values.emailPersonal,
          phone: values.phone,
          mobilePhone: values.mobilePhone,
          emergencyContactName: values.emergencyContactName,
          emergencyContactRelation: values.emergencyContactRelation,
          emergencyContactPhone: values.emergencyContactPhone,
          emergencyContactPhoneAdditional: values.emergencyContactPhoneAdditional,

          image: null
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const employeeUid = props.history.location.state.uid;

        // must have employeeUid
        if (employeeUid) {
          const payload: IEmployeePutPayload = {
            // information
            uid: values.uid,
            companyUid: values.companyUid,
            employmentNumber: values.employmentNumber,
            employmentType: values.employmentType,
            fullName: values.fullName,
            joinDate: values.joinDate,
            inactiveDate: values.inactiveDate,
            dateOfBirth: values.dateOfBirth,
            birthPlace: values.birthPlace,
            genderType: values.genderType,
            religionType: values.religionType,
            taxType: values.taxType,
            bloodType: values.bloodType,
            // bank
            familyCardNumber: values.familyCardNumber,
            citizenNumber: values.citizenNumber,
            taxNumber: values.taxNumber,
            bpjsEmploymentNumber: values.bpjsEmploymentNumber,
            bpjsHealthCareNumber: values.bpjsHealthCareNumber,
            bankAccount: values.bankAccount,
            bankAccountName: values.bankAccountName,
            bankAccountBranch: values.bankAccountBranch,
            // contact
            address: values.address,
            addressAdditional: values.addressAdditional,
            email: values.email,
            emailPersonal: values.emailPersonal,
            phone: values.phone,
            mobilePhone: values.mobilePhone,
            emergencyContactName: values.emergencyContactName,
            emergencyContactRelation: values.emergencyContactRelation,
            emergencyContactPhone: values.emergencyContactPhone,
            emergencyContactPhoneAdditional: values.emergencyContactPhoneAdditional,

            image: null
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeDispatch.updateRequest({
              resolve,
              reject,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployee) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Employee' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        // console.log(error);

        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<EmployeeFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: EmployeeFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IEmployeeFormValue = {
          // information
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid || '',
          employmentNumber: thisResponse.data.employmentNumber,
          employmentType: thisResponse.data.employmentType,
          fullName: thisResponse.data.fullName,
          joinDate: thisResponse.data.joinDate,
          inactiveDate: thisResponse.data.inactiveDate || '',
          dateOfBirth: thisResponse.data.dateOfBirth || '',
          birthPlace: thisResponse.data.birthPlace || '',
          genderType: thisResponse.data.genderType || '',
          religionType: thisResponse.data.religionType || '',
          taxType: thisResponse.data.taxType || '',
          bloodType: thisResponse.data.bloodType || '',
          // bank
          familyCardNumber: thisResponse.data.familyCardNumber || '',
          citizenNumber: thisResponse.data.citizenNumber || '',
          taxNumber: thisResponse.data.taxNumber || '',
          bpjsEmploymentNumber: thisResponse.data.bpjsEmploymentNumber || '',
          bpjsHealthCareNumber: thisResponse.data.bpjsHealthCareNumber || '',
          bankAccount: thisResponse.data.bank && thisResponse.data.bank.account || '',
          bankAccountName: thisResponse.data.bank && thisResponse.data.bank.name || '',
          bankAccountBranch: thisResponse.data.bank && thisResponse.data.bank.branch || '',
          // contact
          address: thisResponse.data.address || '',
          addressAdditional: thisResponse.data.addressAdditional || '',
          email: thisResponse.data.email,
          emailPersonal: thisResponse.data.emailPersonal || '',
          phone: thisResponse.data.phone || '',
          mobilePhone: thisResponse.data.mobilePhone || '',
          emergencyContactName: thisResponse.data.contact && thisResponse.data.contact.name || '',
          emergencyContactRelation: thisResponse.data.contact && thisResponse.data.contact.relation || '',
          emergencyContactPhone: thisResponse.data.contact && thisResponse.data.contact.phone || '',
          emergencyContactPhoneAdditional: thisResponse.data.contact && thisResponse.data.contact.phoneAdditional || '',
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const EmployeeForm = compose<EmployeeFormProps, IOwnOption>(
  setDisplayName('EmployeeForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployee,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(EmployeeFormView);