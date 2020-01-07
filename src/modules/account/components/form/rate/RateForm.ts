import { IEmployeeRatePutPayload } from '@account/classes/request/employeeRate';
import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { RateFormView } from './RateFormView';

export interface IRateFormValue {
  rateId: string;
  employeeUid: string;
  value: number;
}

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  employeeUidRoute: string;
  initialValues?: IRateFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IRateFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IRateFormValue, actions: FormikActions<IRateFormValue>) => void;
}

export type RateFormProps
  = WithAccountEmployeeRate
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

const createProps: mapper<RateFormProps, IOwnState> = (props: RateFormProps): IOwnState => ({
  employeeUidRoute: props.match.params.employeeUid,

  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    rateId: 'Auto Generated',
    value: 0,
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IRateFormValue>>({
    // information
    value: Yup.number()
      .integer()
      .label(props.intl.formatMessage(accountMessage.rate.field.value))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<RateFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<RateFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: RateFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.employeeUidRoute;
      const rateId = props.history.location.state.rateId;
      const { isLoading } = props.accountEmployeeRateState.detail;

      if (user && employeeUid && !isLoading && rateId !== '') {
        props.accountEmployeeRateDispatch.loadCurrentRequest({
          employeeUid
        });
      }
    }
  },
  handleOnSubmit: (props: RateFormProps) => (values: IRateFormValue, actions: FormikActions<IRateFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.employeeUidRoute;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // Edit
      const payload: IEmployeeRatePutPayload = {
        value: values.value
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.accountEmployeeRateDispatch.updateRequest({
          resolve,
          reject,
          employeeUid,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then((response: IEmployeeRate) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Rate' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/rate`);
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<RateFormProps, IOwnState> = {
  componentDidMount() {
    //
    console.log('kambing');
  },
  componentDidUpdate(prevProps: RateFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeRateState.current;
    const { response: prevResponse } = prevProps.accountEmployeeRateState.current;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IRateFormValue = {
            rateId: thisResponse.data.uid,
            employeeUid: this.props.employeeUidRoute,
            value: thisResponse.data.value,
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const RateForm = compose<RateFormProps, IOwnOption>(
  setDisplayName('RateForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeRate,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(RateFormView);