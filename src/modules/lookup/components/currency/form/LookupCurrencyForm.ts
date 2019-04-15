import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCurrencyPostPayload, ILookupCurrencyPutPayload } from '@lookup/classes/request/currency';
import { ICurrency } from '@lookup/classes/response';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/withLookupCurrency';
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
import { LookupCurrencyFormView } from './LookupCurrencyFormView';

export interface ICurrencyFormValue {
  uid: string;
  name: string;
  symbol: string;
  rate: number;
  isActive: boolean;
}

interface IOwnRouteParams {
  currencyUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICurrencyFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICurrencyFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICurrencyFormValue, actions: FormikActions<ICurrencyFormValue>) => void;
}

export type CurrencyFormProps
  = WithLookupCurrency
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

const createProps: mapper<CurrencyFormProps, IOwnState> = (props: CurrencyFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    symbol: '',
    rate: 0,
    isActive: false
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICurrencyFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.currency.field.name))
      .required(),

    symbol: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.currency.field.symbol))
      .required(),

    rate: Yup.number()
      .integer()
      .label(props.intl.formatMessage(lookupMessage.currency.field.rate))
      .min(1)
      .required(),

    isActive: Yup.boolean()
      .label(props.intl.formatMessage(lookupMessage.currency.field.isActive)),
  })
});

const stateUpdaters: StateUpdaters<CurrencyFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<CurrencyFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: CurrencyFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const currencyUid = props.history.location.state.uid;
      const { isLoading } = props.lookupCurrencyState.detail;

      if (user && currencyUid && !isLoading) {
        props.lookupCurrencyDispatch.loadDetailRequest({
          currencyUid
        });
      }
    }
  },
  handleOnSubmit: (props: CurrencyFormProps) => (values: ICurrencyFormValue, actions: FormikActions<ICurrencyFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupCurrencyPostPayload = {
          name: values.name,
          symbol: values.symbol,
          rate: values.rate,
          isActive: values.isActive
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupCurrencyDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const currencyUid = props.history.location.state.uid;

        // must have currencyUid
        if (currencyUid) {
          const payload: ILookupCurrencyPutPayload = {
            name: values.name,
            symbol: values.symbol,
            rate: values.rate,
            isActive: values.isActive
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupCurrencyDispatch.updateRequest({
              currencyUid,
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
      .then((response: ICurrency) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.currency.message.createSuccess : lookupMessage.currency.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/currencies/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.currency.message.createFailure : lookupMessage.currency.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CurrencyFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: CurrencyFormProps) {
    const { response: thisResponse } = this.props.lookupCurrencyState.detail;
    const { response: prevResponse } = prevProps.lookupCurrencyState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICurrencyFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          symbol: thisResponse.data.symbol,
          rate: thisResponse.data.rate,
          isActive: thisResponse.data.isActive
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupCurrencyForm = compose<CurrencyFormProps, IOwnOption>(
  setDisplayName('LookupCurrencyForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupCurrency,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupCurrencyFormView);