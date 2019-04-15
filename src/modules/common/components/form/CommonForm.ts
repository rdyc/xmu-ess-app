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
import { ExpenseRequestFormView } from './CommonFormView';

export interface ICommonFormValue {
  id: string;
  category: string;
  companyUid?: string;
  parentCode?: string ;
  name: string;
  description: string;
  isActive: boolean;
}

interface OwnRouteParams {
  category: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: ICommonFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICommonFormValue>>>;
  
  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICommonFormValue, actions: FormikActions<ICommonFormValue>) => void;
}

export type CommonFormProps
  = WithCommonSystem
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CommonFormProps, IOwnState> = (props: CommonFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    id: 'Auto Generated',
    category: props.match.params.category,
    companyUid: '',
    parentCode: '',
    name: '',
    description: '',
    isActive: false,
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICommonFormValue>>({
    
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<CommonFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
};

const handlerCreators: HandleCreators<CommonFormProps, IOwnHandler> = {
  handleSetMinDate: (props: CommonFormProps) => (days: number, fromDate?: Date | null) => {
    let today = moment(); // create date today

    if (!isNullOrUndefined(fromDate)) { // is fromDate exist, use from date instead
      today = moment(fromDate);
    }

    const minDate = today.subtract(days, 'days'); // substract date using momentjs, because using native date in js sucks

    if (moment(props.minDate).format('DD/MM/YYYY') !== minDate.format('DD/MM/YYYY')) { // only update minDate state once
      props.setMinDate(minDate.toDate());
    }
  },
  handleSetProjectFilter: (props: CommonFormProps) => (customerUid: string) => {
    props.setProjectFilter(customerUid);
  },
  handleOnLoadDetail: (props: CommonFormProps) => () => {
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
  handleOnSubmit: (props: CommonFormProps) => (values: ICommonFormValue, actions: FormikActions<ICommonFormValue>) => {
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

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonFormProps, IOwnState> = {
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
  componentDidUpdate(prevProps: CommonFormProps) {
    // handle project detail response
    const { response } = this.props.expenseRequestState.detail;
    const { response: amountResponse } = this.props.systemLimitState.amount;

    if (response !== prevProps.expenseRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: ICommonFormValue = {
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

export const CommonForm = compose<CommonFormProps, IOwnOption>(
  setDisplayName('CommonForm'),
  withRouter,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CommonFormView);