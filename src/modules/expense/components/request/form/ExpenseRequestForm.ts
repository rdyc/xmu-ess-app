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
import { SystemLimitType } from '@common/classes/types/SystemLimitType';
import { IExpenseRequestPostPayload, IExpenseRequestPutPayload } from '@expense/classes/request/request';
import { IExpense } from '@expense/classes/response';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import * as moment from 'moment';
import { ExpenseRequestFormView } from './ExpenseRequestFormView';

interface IExpenseClientFormValue {
  name: string;
  title: string;
}

export interface IExpenseRequestFormValue {
  uid: string;
  date: string;
  expenseType: string;
  customerUid: string;
  projectUid: string;
  value: number;
  location: string;
  address: string;
  client: IExpenseClientFormValue;
  notes: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  minDate: Date;

  initialValues: IExpenseRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IExpenseRequestFormValue>>>;

  filterLookupCustomer: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setProjectFilter: StateHandler<IOwnState>;
  setMinDate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetProjectFilter: (customerUid: string) => void;
  handleSetMinDate: (days: number, fromDate?: Date | null) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IExpenseRequestFormValue, actions: FormikActions<IExpenseRequestFormValue>) => void;
}

export type ExpenseRequestFormProps
  = WithExpenseRequest
  & WithCommonSystem
  & WithLookupSystemLimit
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
  minDate: moment().toDate(),

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
    client: {
      name: '',
      title: '',
    },
    notes: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IExpenseRequestFormValue>>({
    date: Yup.string()
      .label(props.intl.formatMessage(expenseMessage.request.field.date))
      .required(),

    expenseType: Yup.string()
      .label(props.intl.formatMessage(expenseMessage.request.field.expenseType))
      .required(),

    customerUid: Yup.string()
      .label(props.intl.formatMessage(expenseMessage.request.field.customerUid))
      .required(),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(expenseMessage.request.field.projectUid))
      .required(),

    value: Yup.number()
      .min(1)
      .label(props.intl.formatMessage(expenseMessage.request.field.value))
      .required()
      .integer(),

    location: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(expenseMessage.request.field.location))
      .required(),

    address: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(expenseMessage.request.field.address))
      .required(),

    client: Yup.object().shape({
      name: Yup.string()
        .max(50)
        .label(props.intl.formatMessage(expenseMessage.request.field.name))
        .required(),

      title: Yup.string()
        .max(100)
        .label(props.intl.formatMessage(expenseMessage.request.field.title))
        .required(),
    }),    

    notes: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(expenseMessage.request.field.notes))
      .required(),
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
  // filterProject: {
  //   statusTypes: ([WorkflowStatusType.Approved]).toString(),
  //   direction: 'ascending'
  // },
});

const stateUpdaters: StateUpdaters<ExpenseRequestFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setProjectFilter: () => (customerUid: string): Partial<IOwnState> => ({
    filterProject: {
      customerUids: customerUid,
      statusTypes: [WorkflowStatusType.Approved, WorkflowStatusType.ReOpened].join(),
      direction: 'ascending'
    },
  }),
  setMinDate: () => (minDate: Date): Partial<IOwnState> => ({
    minDate
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestFormProps, IOwnHandler> = {
  handleSetMinDate: (props: ExpenseRequestFormProps) => (days: number, fromDate?: Date | null) => {
    let today = moment(); // create date today

    if (!isNullOrUndefined(fromDate)) { // is fromDate exist, use from date instead
      today = moment(fromDate);
    }

    const minDate = today.subtract(days, 'days'); // substract date using momentjs, because using native date in js sucks

    if (moment(props.minDate).format('DD/MM/YYYY') !== minDate.format('DD/MM/YYYY')) { // only update minDate state once
      props.setMinDate(minDate.toDate());
    }
  },
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
            name: values.client.name,
            title: values.client.title,
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
              name: values.client.name,
              title: values.client.title,
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
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
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
  componentDidMount() {
    const { loadAmountRequest } = this.props.systemLimitDispatch;
    const { user } = this.props.userState;

    if (user) {
      loadAmountRequest({
        companyUid: user.company.uid,
        categoryType: SystemLimitType.Expense
      });
    }    
  },
  componentDidUpdate(prevProps: ExpenseRequestFormProps) {
    // handle project detail response
    const { response } = this.props.expenseRequestState.detail;
    const { response: amountResponse } = this.props.systemLimitState.amount;

    if (response !== prevProps.expenseRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IExpenseRequestFormValue = {
          uid: response.data.uid,
          date: response.data.date || '',
          expenseType: response.data.expenseType,
          customerUid: response.data.customerUid,
          projectUid: response.data.projectUid,
          value: response.data.value,
          location: response.data.location,
          address: response.data.address,
          client: {
            name: response.data.client && response.data.client.name || '',
            title: response.data.client && response.data.client.title || '',
          },
          notes: response.data.notes || '',
        };

        this.props.setProjectFilter(response.data.customerUid);
        
        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }

    if (amountResponse !== prevProps.systemLimitState.detail.response) {
      if (amountResponse && amountResponse.data) {
        if (this.props.formMode === FormMode.New) {
          this.props.handleSetMinDate(amountResponse.data.days);
        } else {
          this.props.handleSetMinDate(amountResponse.data.days, response && response.data.changes && response.data.changes.createdAt);
        }        
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
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ExpenseRequestFormView);