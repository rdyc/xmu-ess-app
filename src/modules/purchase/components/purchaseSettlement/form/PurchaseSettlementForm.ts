import { FormMode } from '@generic/types/FormMode';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
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
import * as Yup from 'yup';

import { IExpense } from '@expense/classes/response';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { ISettlementPostPayload, ISettlementPutPayload } from '@purchase/classes/request/purchaseSettlement';
import { WithPurchaseSettlement, withPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { PurchaseSettlementFormView } from './PurchaseSettlementFormView';

interface IPurchaseItemFormValue {
  uid?: string;
  description: string;
  request: number;
  amount: number;
  variance: number;
}

export interface IPurchaseSettlementFormValue {
  uid: string;
  date: string;
  notes: string;
  customerUid: string;
  projectUid: string;
  advance: number;
  currencyType: string;
  rate: number;
  request: number;
  actual: number;
  difference: number;
  requestInIDR: number;
  actualInIDR: number;
  differenceInIDR: number;
  balanceDue: number;
  items: IPurchaseItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  isInIDR: boolean;

  initialValues: IPurchaseSettlementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IPurchaseSettlementFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setIsInIDR: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IPurchaseSettlementFormValue, actions: FormikActions<IPurchaseSettlementFormValue>) => void;
}

export type PurchaseSettlementFormProps
  = WithPurchaseSettlement
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<PurchaseSettlementFormProps, IOwnState> = (props: PurchaseSettlementFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state  === null) ? FormMode.New : FormMode.Edit,
  isInIDR: true,

  // form values
  initialValues: {
    uid: '',
    date: '',
    notes: '',
    customerUid: '',
    projectUid: '',
    advance: 0,
    currencyType: '',
    rate: 0,
    request: 0,
    actual: 0,
    difference: 0,
    requestInIDR: 0,
    actualInIDR: 0,
    differenceInIDR: 0,
    balanceDue: 0,
    items: [{
      uid: '',
      description: '',
      request: 0,
      amount: 0,
      variance: 0,
    }, ],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IPurchaseSettlementFormValue>>({
    date: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.request.field.date))
      .required(),

    notes: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.notes))
      .required(),
      
    customerUid: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.customerUid)),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.projectUid)),

    advance: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.advance)),

    currencyType: Yup.string()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.projectUid)),

    rate: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.advance)),

    request: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.request)),

    actual: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.actual)),

    difference: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.difference)),

    requestInIDR: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.requestInIDR)),

    actualInIDR: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.actualInIDR)),

    differenceInIDR: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.differenceInIDR)),

    balanceDue: Yup.number()
      .label(props.intl.formatMessage(purchaseMessage.settlement.field.balanceDue)),
  
    items: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string()
            .label(props.intl.formatMessage(purchaseMessage.settlement.items.description)),

          request: Yup.number()
            .label(props.intl.formatMessage(purchaseMessage.settlement.items.request)),

          amount: Yup.number()
            .min(0)
            .label(props.intl.formatMessage(purchaseMessage.settlement.items.actual))
            .required(),

          variance: Yup.number()
            .label(props.intl.formatMessage(purchaseMessage.settlement.items.variance)),
        })
      )
      .min(1, props.intl.formatMessage(purchaseMessage.request.items.itemsMinimum))
  }),
});

const stateUpdaters: StateUpdaters<PurchaseSettlementFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setIsInIDR: () => (isInIDR: boolean): Partial<IOwnState> => ({
    isInIDR
  }),
};

const handlerCreators: HandleCreators<PurchaseSettlementFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: PurchaseSettlementFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const purchaseUid = props.history.location.state.uid;
      const { isLoading } = props.purchaseSettlementState.detail;

      if (user && purchaseUid && !isLoading) {
        props.purchaseSettlementDispatch.loadDetailRequest({
          purchaseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: PurchaseSettlementFormProps) => (values: IPurchaseSettlementFormValue, actions: FormikActions<IPurchaseSettlementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        const purchaseUid = props.history.location.state.uid;

        // fill payload
        const payload: ISettlementPostPayload = {
          date: values.date,
          notes: values.notes,
          items: [],
        };

        // fill items
        values.items.forEach(item => payload.items && payload.items.push({
          uid: item.uid,
          amount: item.amount,
        }));
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.purchaseSettlementDispatch.createRequest({
            resolve,
            reject,
            purchaseUid,
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
          const payload: ISettlementPutPayload = {
            date: values.date,
            notes: values.notes,
            items: [],
          };

          // fill items
          values.items.forEach(item => payload.items && payload.items.push({
            uid: item.uid,
            amount: item.amount,
          }));

          promise = new Promise((resolve, reject) => {
            props.purchaseSettlementDispatch.updateRequest({
              purchaseUid, 
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
       
        props.history.push(`/purchase/settlement/requests/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.message.createFailure : purchaseMessage.request.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<PurchaseSettlementFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {    
  },
  componentDidUpdate(prevProps: PurchaseSettlementFormProps) {
    // handle project detail response
    const { response } = this.props.purchaseSettlementState.detail;

    if (response !== prevProps.purchaseSettlementState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IPurchaseSettlementFormValue = {
          uid: response.data.uid,
          notes: response.data.notes || '',
          date: response.data.date || '',
          customerUid: response.data.customer && response.data.customer.name || 'N/A',
          projectUid: response.data.project && response.data.project.name || 'N/A',
          advance: response.data.advance || 0,
          currencyType: response.data.currency && response.data.currency.value || 'N/A',
          rate: response.data.rate || 0,
          request: response.data.request || 0,
          actual: response.data.actual || 0,
          difference: response.data.difference || 0,
          requestInIDR: response.data.requestInIDR || 0,
          actualInIDR: response.data.actualInIDR || 0,
          differenceInIDR: response.data.differenceInIDR || 0,
          balanceDue: response.data.balanceDue || 0,
          items: [],
        };

        // fill items
        if (response.data.items) {
          response.data.items.forEach(item => initialValues.items && initialValues.items.push({
            uid: item.uid,
            description: item.description,
            request: item.requestValue,
            amount: item.actualValue || 0,
            variance: item.varianceValue || 0,
          }));
        }

        // set is in IDR
        this.props.setIsInIDR(response.data && response.data.currencyType === 'SCR01');

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const PurchaseSettlementForm = compose<PurchaseSettlementFormProps, IOwnOption>(
  setDisplayName('PurchaseSettlementForm'),
  withUser,
  withMasterPage,
  withRouter,
  withPurchaseSettlement,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(PurchaseSettlementFormView);