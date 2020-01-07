import { IEmployeeContractPostPayload, IEmployeeContractPutPayload } from '@account/classes/request/employeeContract';
import { IEmployeeContract } from '@account/classes/response/employeeContract';
import { WithAccountEmployeeContract, withAccountEmployeeContract } from '@account/hoc/withAccountEmployeeContract';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
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
import { ContractFormView } from './ContractFormView';

export interface IContractFormValue {
  contractUid: string;
  employeeUid: string;
  contractNumber: string;
  start: string;
  end: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  contractUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IContractFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IContractFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IContractFormValue, actions: FormikActions<IContractFormValue>) => void;
}

export type ContractFormProps
  = WithAccountEmployeeContract
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ContractFormProps, IOwnState> = (props: ContractFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    contractUid: 'Auto Generated',
    contractNumber: '',
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IContractFormValue>>({
    // information
    contractNumber: Yup.string()
      .label(props.intl.formatMessage(accountMessage.contract.field.contractNumber))
      .max(50)
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(accountMessage.contract.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(accountMessage.contract.field.end))
      .required(),

  })
});

const stateUpdaters: StateUpdaters<ContractFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<ContractFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ContractFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const contractUid = props.history.location.state.contractUid;
      const { isLoading } = props.accountEmployeeContractState.detail;

      if (user && employeeUid && contractUid && !isLoading) {
        props.accountEmployeeContractDispatch.loadDetailRequest({
          employeeUid,
          contractUid
        });
      }
    }
  },
  handleOnSubmit: (props: ContractFormProps) => (values: IContractFormValue, actions: FormikActions<IContractFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeContractPostPayload = {
          contractNumber: values.contractNumber,
          start: values.start,
          end: values.end
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeContractDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const contractUid = props.history.location.state.contractUid;

        // must have contractUid
        if (contractUid) {
          const payload: IEmployeeContractPutPayload = {
            contractUid: values.contractUid,
            contractNumber: values.contractNumber,
            start: values.start,
            end: values.end
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeContractDispatch.updateRequest({
              resolve,
              reject,
              employeeUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployeeContract) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Contract' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/contract/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ContractFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: ContractFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeContractState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeContractState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IContractFormValue = {
            contractUid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            contractNumber: thisResponse.data.contractNumber,
            start: thisResponse.data.start,
            end: thisResponse.data.end
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const ContractForm = compose<ContractFormProps, IOwnOption>(
  setDisplayName('ContractForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeContract,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ContractFormView);