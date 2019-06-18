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
import { IExpense } from '@expense/classes/response';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IPurchasePostPayload, IPurchasePutPayload } from '@purchase/classes/request/purchaseRequest';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { PurchaseRequestFormView } from './PurchaseRequestFormView';

interface IPurchaseItemFormValue {
  uid?: string;
  description: string;
  request: number;
}

export interface IPurchaseRequestFormValue {
  uid: string;
  customerUid: string;
  projectUid: string;
  advance?: number;
  date: string;
  currencyType: string;
  rate: number;
  request: number;
  requestInIDR: number;
  notes: string;
  items: IPurchaseItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IPurchaseRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IPurchaseRequestFormValue>>>;

  filterLookupCustomer: ILookupCustomerGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setProjectFilter: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetProjectFilter: (customerUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IPurchaseRequestFormValue, actions: FormikActions<IPurchaseRequestFormValue>) => void;
}

export type PurchaseRequestFormProps
  = WithPurchaseRequest
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

const createProps: mapper<PurchaseRequestFormProps, IOwnState> = (props: PurchaseRequestFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    customerUid: '',
    projectUid: '',
    advance: 0,
    date: '',
    currencyType: '',
    rate: 1,
    request: 0,
    requestInIDR: 0,
    notes: '',
    items: [{
      uid: '',
      description: '',
      request: 0,
    }, ],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IPurchaseRequestFormValue>>({
    customerUid: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.request.field.customerUid))
      .required(),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.request.field.projectUid))
      .required(),

    advance: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.request.field.advance))
      .integer(),

    date: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.request.field.date))
      .required(),

    currencyType: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.request.field.projectUid))
      .required(),

    rate: Yup.number()
      .min(1)
      .label(props.intl.formatMessage(purchaseMessage.request.field.advance))
      .integer()
      .required(),

    request: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.request.field.request)),

    requestInIDR: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.request.field.requestInIDR)),

    notes: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(purchaseMessage.request.field.notes)),

    items: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string()
            .max(200)
            .label(props.intl.formatMessage(purchaseMessage.request.items.description))
            .required(),

          request: Yup.number()
            .min(1)
            .label(props.intl.formatMessage(purchaseMessage.request.items.request))
            .required(),
        })
      )
      .min(1, props.intl.formatMessage(purchaseMessage.request.items.itemsMinimum))
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

const stateUpdaters: StateUpdaters<PurchaseRequestFormProps, IOwnState, IOwnStateUpdater> = {
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

const handlerCreators: HandleCreators<PurchaseRequestFormProps, IOwnHandler> = {
  handleSetProjectFilter: (props: PurchaseRequestFormProps) => (customerUid: string) => {
    props.setProjectFilter(customerUid);
  },
  handleOnLoadDetail: (props: PurchaseRequestFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const purchaseUid = props.history.location.state.uid;
      const { isLoading } = props.purchaseRequestState.detail;

      if (user && purchaseUid && !isLoading) {
        props.purchaseRequestDispatch.loadDetailRequest({
          purchaseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: PurchaseRequestFormProps) => (values: IPurchaseRequestFormValue, actions: FormikActions<IPurchaseRequestFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IPurchasePostPayload = {
          customerUid: values.customerUid,
          projectUid: values.projectUid,
          advance: values.advance,
          date: values.date,
          currencyType: values.currencyType,
          rate: values.rate,
          notes: values.notes,
          items: [],
        };

        // fill items
        values.items.forEach(item => payload.items && payload.items.push({
          description: item.description,
          request: item.request,
        }));
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.purchaseRequestDispatch.createRequest({
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
        const purchaseUid = props.history.location.state.uid;

        // must have expenseUid
        if (purchaseUid) {
          // fill payload
          const payload: IPurchasePutPayload = {
            customerUid: values.customerUid,
            projectUid: values.projectUid,
            advance: values.advance,
            date: values.date,
            currencyType: values.currencyType,
            rate: values.rate,
            notes: values.notes,
            items: [],
          };

          // fill items
          values.items.forEach(item => payload.items && payload.items.push({
            uid: item.uid,
            description: item.description,
            request: item.request,
          }));

          promise = new Promise((resolve, reject) => {
            props.purchaseRequestDispatch.updateRequest({
              purchaseUid, 
              resolve, 
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload as IPurchasePutPayload, 
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.message.createSuccess : purchaseMessage.request.message.updateSuccess, { uid: response.uid })
        });
       
        props.history.push(`/purchase/requests/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.message.createFailure : purchaseMessage.request.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<PurchaseRequestFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {    
  },
  componentDidUpdate(prevProps: PurchaseRequestFormProps) {
    // handle project detail response
    const { response } = this.props.purchaseRequestState.detail;

    if (response !== prevProps.purchaseRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IPurchaseRequestFormValue = {
          uid: response.data.uid,
          customerUid: response.data.customerUid,
          projectUid: response.data.projectUid || '',
          advance: response.data.advance,
          date: response.data.date,
          currencyType: response.data.currencyType,
          rate: response.data.rate || 0,
          request: response.data.request || 0,
          requestInIDR: response.data.requestIDR || 0,
          notes: response.data.notes || '',
          items: [],
        };

        // fill items
        if (response.data.items) {
          response.data.items.forEach(item => initialValues.items && initialValues.items.push({
            uid: item.uid,
            description: item.description,
            request: item.requestValue,
          }));
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const PurchaseRequestForm = compose<PurchaseRequestFormProps, IOwnOption>(
  setDisplayName('PurchaseRequestForm'),
  withUser,
  withMasterPage,
  withRouter,
  withPurchaseRequest,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(PurchaseRequestFormView);