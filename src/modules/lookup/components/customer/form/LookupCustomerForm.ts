import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ILookupCustomerPostPayload, ILookupCustomerPutPayload } from '@lookup/classes/request/customer';
import { ICustomer } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { LookupCustomerFormView } from './LookupCustomerFormView';

export interface ICustomerFormValue {
  uid: string;
  name: string;
  companyUid: string;
  npwp?: string;
  address?: string;
  addressAdditional?: string;
  phone?: string;
  phoneAdditional?: string;
  mobile?: string;
  mobileAdditional?: string;
  fax?: string;
  emailAddress?: string;
  contactPerson?: string;
  contactTitle?: string;
  contactPersonAdditional?: string;
  contactTitleAdditional?: string;
  isActive?: boolean;
}

interface IOwnRouteParams {
  customerUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICustomerFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICustomerFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICustomerFormValue, actions: FormikActions<ICustomerFormValue>) => void;
}

export type CustomerFormProps
  = WithLookupCustomer
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

const createProps: mapper<CustomerFormProps, IOwnState> = (props: CustomerFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    companyUid: '',
    npwp: '',
    address: '',
    addressAdditional: '',
    phone: '',
    phoneAdditional: '',
    mobile: '',
    mobileAdditional: '',
    fax: '',
    emailAddress: '',
    contactPerson: '',
    contactTitle: '',
    contactPersonAdditional: '',
    contactTitleAdditional: '',
    isActive: false
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICustomerFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.customer.field.name))
      .required(),

    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.customer.field.companyUid))
      .required(),

    npwp: Yup.string()
      .max(30)
      .label(props.intl.formatMessage(lookupMessage.customer.field.npwp)),

    address: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(lookupMessage.customer.field.address)),

    addressAdditional: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(lookupMessage.customer.field.addressAdditional)),

    phone: Yup.string()
      .max(50)
      .label(props.intl.formatMessage(lookupMessage.customer.field.phone)),

    phoneAdditional: Yup.string()
      .max(50)
      .label(props.intl.formatMessage(lookupMessage.customer.field.phoneAdditional)),

    mobile: Yup.string()
      .max(20)
      .label(props.intl.formatMessage(lookupMessage.customer.field.mobile)),

    mobileAdditional: Yup.string()
      .max(20)
      .label(props.intl.formatMessage(lookupMessage.customer.field.mobileAdditional)),

    fax: Yup.string()
      .max(20)
      .label(props.intl.formatMessage(lookupMessage.customer.field.fax)),

    emailAddress: Yup.string()
      .email()
      .max(50)
      .label(props.intl.formatMessage(lookupMessage.customer.field.emailAddress)),

    contactPerson: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(lookupMessage.customer.field.contactPerson)),

    contactTitle: Yup.string()
      .max(50)
      .label(props.intl.formatMessage(lookupMessage.customer.field.contactTitle)),

    contactPersonAdditional: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(lookupMessage.customer.field.contactPersonAdditional)),

    contactTitleAdditional: Yup.string()
      .max(50)
      .label(props.intl.formatMessage(lookupMessage.customer.field.contactTitleAdditional)),

    isActive: Yup.boolean()
      .label(props.intl.formatMessage(lookupMessage.customer.field.isActive)),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<CustomerFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<CustomerFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: CustomerFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const customerUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.lookupCustomerState.detail;

      if (user && companyUid && customerUid && !isLoading) {
        props.lookupCustomerDispatch.loadDetailRequest({
          customerUid,
          companyUid
        });
      }
    }
  },
  handleOnSubmit: (props: CustomerFormProps) => (values: ICustomerFormValue, actions: FormikActions<ICustomerFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupCustomerPostPayload = {
          name: values.name,
          npwp: values.npwp,
          address: values.address,
          addressAdditional: values.addressAdditional,
          phone: values.phone,
          phoneAdditional: values.phoneAdditional,
          mobile: values.mobile,
          mobileAdditional: values.mobileAdditional,
          fax: values.fax,
          emailAddress: values.emailAddress,
          contactPerson: values.contactPerson,
          contactTitle: values.contactTitle,
          contactPersonAdditional: values.contactPersonAdditional,
          contactTitleAdditional: values.contactTitleAdditional,
          isActive: values.isActive
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupCustomerDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const customerUid = props.history.location.state.uid;

        // must have customerUid
        if (customerUid) {
          const payload: ILookupCustomerPutPayload = {
            name: values.name,
            npwp: values.npwp,
            address: values.address,
            addressAdditional: values.addressAdditional,
            phone: values.phone,
            phoneAdditional: values.phoneAdditional,
            mobile: values.mobile,
            mobileAdditional: values.mobileAdditional,
            fax: values.fax,
            emailAddress: values.emailAddress,
            contactPerson: values.contactPerson,
            contactTitle: values.contactTitle,
            contactPersonAdditional: values.contactPersonAdditional,
            contactTitleAdditional: values.contactTitleAdditional,
            isActive: values.isActive
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupCustomerDispatch.updateRequest({
              customerUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ICustomer) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.customer.message.createSuccess : lookupMessage.customer.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/customers/${response.uid}`, { companyUid: response.companyUid });
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.customer.message.createFailure : lookupMessage.customer.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CustomerFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: CustomerFormProps) {
    const { response: thisResponse } = this.props.lookupCustomerState.detail;
    const { response: prevResponse } = prevProps.lookupCustomerState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICustomerFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          companyUid: thisResponse.data.companyUid,
          npwp: thisResponse.data.npwp || '',
          address: thisResponse.data.address || '',
          addressAdditional: thisResponse.data.addressAdditional || '',
          phone: thisResponse.data.phone || '',
          phoneAdditional: thisResponse.data.phoneAdditional || '',
          mobile: thisResponse.data.mobile || '',
          mobileAdditional: thisResponse.data.mobileAdditional || '',
          fax: thisResponse.data.fax || '',
          emailAddress: thisResponse.data.email || '',
          contactPerson: thisResponse.data.contactPerson || '',
          contactTitle: thisResponse.data.contactTitle || '',
          contactPersonAdditional: thisResponse.data.contactPersonAdditional || '',
          contactTitleAdditional: thisResponse.data.contactTitleAdditional || '',
          isActive: thisResponse.data.isActive || false
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupCustomerForm = compose<CustomerFormProps, IOwnOption>(
  setDisplayName('LookupCustomerForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupCustomer,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupCustomerFormView);