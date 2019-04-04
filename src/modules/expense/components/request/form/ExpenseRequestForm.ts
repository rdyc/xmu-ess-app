import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
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

import { WorkflowStatusType } from '@common/classes/types';
import { IExpenseRequestPostPayload, IExpenseRequestPutPayload } from '@expense/classes/request/request';
import { IExpense } from '@expense/classes/response';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { ExpenseRequestFormView } from './ExpenseRequestFormView';

export interface IExpenseRequestFormValue {
  uid: string;
  date: string;
  expenseType: string;
  customerUid: string;
  projectUid: string;
  value: number;
  location: string;
  address: string;
  name: string;
  title: string;
  notes: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  isRequestor: boolean;

  initialValues: IExpenseRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IExpenseRequestFormValue>>>;

  filterLookupCustomer: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterProject: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setProjectFilter: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetProjectFilter: (customerUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IExpenseRequestFormValue, actions: FormikActions<IExpenseRequestFormValue>) => void;
}

export type ExpenseRequestFormProps
  = WithExpenseRequest
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

const createProps: mapper<ExpenseRequestFormProps, IOwnState> = (props: ExpenseRequestFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  isRequestor: true,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    date: '',
    expenseType: '',
    customerUid: '',
    projectUid: '',
    value: 0,
    location: '',
    address: '',
    name: '',
    title: '',
    notes: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IExpenseRequestFormValue>>({
    date: Yup.string()
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('date', 'fieldRequired'))),

    expenseType: Yup.string()
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('expenseType', 'fieldRequired'))),

    customerUid: Yup.string()
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('customerUid', 'fieldRequired'))),

    projectUid: Yup.string()
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('projectUid', 'fieldRequired'))),

    value: Yup.number()
      .min(1)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('value', 'fieldRequired'))),

    location: Yup.string()
      .min(2).max(100)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('location', 'fieldRequired'))),

    address: Yup.string()
      .min(2).max(200)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('address', 'fieldRequired'))),

    name: Yup.string()
      .min(2).max(50)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('name', 'fieldRequired'))),

    title: Yup.string()
      .min(2).max(100)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('title', 'fieldRequired'))),

    notes: Yup.string()
      .min(2).max(200)
      .required(props.intl.formatMessage(expenseMessage.request.fieldFor('notes', 'fieldRequired'))),
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
  filterProject: {
    statusTypes: ([WorkflowStatusType.Approved]).toString(),
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<ExpenseRequestFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setProjectFilter: () => (customerUid: string): Partial<IOwnState> => ({
    filterProject: {
      customerUids: customerUid,
      statusTypes: ([WorkflowStatusType.Approved]).toString(),
      direction: 'ascending'
    },
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestFormProps, IOwnHandler> = {
  handleSetProjectFilter: (props: ExpenseRequestFormProps) => (customerUid: string) => {
    props.setProjectFilter(customerUid);
  },
  handleOnLoadDetail: (props: ExpenseRequestFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const expenseUid = props.history.location.state.uid;
      const { isLoading } = props.expenseRequestState.detail;

      if (user && expenseUid && !isLoading) {
        props.expenseRequestDispatch.loadDetailRequest({
          expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: ExpenseRequestFormProps) => (values: IExpenseRequestFormValue, actions: FormikActions<IExpenseRequestFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IExpenseRequestPostPayload = {
          date: values.date,
          expenseType: values.expenseType,
          customerUid: values.customerUid,
          projectUid: values.projectUid,
          value: values.value,
          location: values.location,
          address: values.address,
          client: {
            name: values.name,
            title: values.title,
          },
          notes: values.notes,
        };
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.expenseRequestDispatch.createRequest({
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
        const expenseUid = props.history.location.state.uid;

        // must have expenseUid
        if (expenseUid) {
          
          // requestor is updating the request
          if (props.isRequestor) {
            // fill payload
            const payload: IExpenseRequestPutPayload = {
              date: values.date,
              expenseType: values.expenseType,
              customerUid: values.customerUid,
              projectUid: values.projectUid,
              value: values.value,
              location: values.location,
              address: values.address,
              client: {
                name: values.name,
                title: values.title,
              },
              notes: values.notes,
            };

            promise = new Promise((resolve, reject) => {
              props.expenseRequestDispatch.updateRequest({
                expenseUid, 
                resolve, 
                reject,
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                data: payload as IExpenseRequestPutPayload, 
              });
            });

          } 
        }
      }
    }

    // handling promise
    promise
      .then((response: IExpense) => {
        console.log(response);
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.message.createSuccess : expenseMessage.request.message.updateSuccess, { uid: response.uid })
        });
       
        props.history.push(`/expense/requests/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.message.createFailure : expenseMessage.request.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ExpenseRequestFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {
    
  },
  componentDidUpdate(prevProps: ExpenseRequestFormProps) {
    // handle project detail response
    const { response } = this.props.expenseRequestState.detail;

    if (response !== prevProps.expenseRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IExpenseRequestFormValue = {
          uid: response.data.uid,
          date: response.data.date || '',
          expenseType: response.data.expenseType,
          customerUid: response.data.customerUid,
          projectUid: response.data.projectUid,
          value: 0,
          location: response.data.location,
          address: response.data.address,
          name: response.data.client && response.data.client.name || '',
          title: response.data.client && response.data.client.title || '',
          notes: response.data.notes || '',
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const ExpenseRequestForm = compose<ExpenseRequestFormProps, IOwnOption>(
  setDisplayName('ExpenseRequestForm'),
  withUser,
  withMasterPage,
  withRouter,
  withExpenseRequest,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ExpenseRequestFormView);