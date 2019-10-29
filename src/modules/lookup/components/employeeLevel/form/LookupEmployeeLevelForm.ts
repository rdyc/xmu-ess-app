import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { IEmployeeLevelPostPayload, IEmployeeLevelPutPayload } from '@lookup/classes/request';
import { IEmployeeLevel } from '@lookup/classes/response';
import { WithEmployeeLevel, withEmployeeLevel } from '@lookup/hoc/withEmployeeLevel';
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

import { LookupEmployeeLevelFormView } from './LookupEmployeeLevelFormView';

export interface IEmployeeLevelFormValue {
  uid: string;
  seq: number;
  subSequence: number;
  value: string;
  description: string;
}

interface IOwnRouteParams {
  employeeLevelUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IEmployeeLevelFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IEmployeeLevelFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IEmployeeLevelFormValue, actions: FormikActions<IEmployeeLevelFormValue>) => void;
}

export type EmployeeLevelFormProps
  = WithEmployeeLevel
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<EmployeeLevelFormProps, IOwnState> = (props: EmployeeLevelFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    seq: 0,
    subSequence: 0,
    value: '',
    description: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IEmployeeLevelFormValue>>({
    seq: Yup.number()
      .min(0)
      .label(props.intl.formatMessage(lookupMessage.employeeLevel.field.seq))
      .required(),

    subSequence: Yup.number()
      .min(0)
      .label(props.intl.formatMessage(lookupMessage.employeeLevel.field.subSequence))
      .required(),

    value: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.employeeLevel.field.value))
      .required(),

    description: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.employeeLevel.field.description))
      .max(100)
      .required(),
  })
});

const stateUpdaters: StateUpdaters<EmployeeLevelFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<EmployeeLevelFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: EmployeeLevelFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeLevelUid = props.history.location.state.uid;
      const { isLoading } = props.employeeLevelState.detail;

      if (user && employeeLevelUid && !isLoading) {
        props.employeeLevelDispatch.loadDetailRequest({
          employeeLevelUid
        });
      }
    }
  },
  handleOnSubmit: (props: EmployeeLevelFormProps) => (values: IEmployeeLevelFormValue, actions: FormikActions<IEmployeeLevelFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeLevelPostPayload = {
          seq: values.seq,
          subSequence: values.subSequence,
          value: values.value,
          description: values.description
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.employeeLevelDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const employeeLevelUid = props.history.location.state.uid;

        // must have employeeLevelUid
        if (employeeLevelUid) {
          const payload: IEmployeeLevelPutPayload = {
            seq: values.seq,
            subSequence: values.subSequence,
            value: values.value,
            description: values.description
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.employeeLevelDispatch.updateRequest({
              employeeLevelUid,
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
      .then((response: IEmployeeLevel) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.employeeLevel.message.createSuccess : lookupMessage.employeeLevel.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/employeelevels/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.employeeLevel.message.createFailure : lookupMessage.employeeLevel.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<EmployeeLevelFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: EmployeeLevelFormProps) {
    const { response: thisResponse } = this.props.employeeLevelState.detail;
    const { response: prevResponse } = prevProps.employeeLevelState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IEmployeeLevelFormValue = {
          uid: thisResponse.data.uid,
          seq: thisResponse.data.seq,
          subSequence: thisResponse.data.subSequence,
          value: thisResponse.data.value,
          description: thisResponse.data.description
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupEmployeeLevelForm = compose<EmployeeLevelFormProps, IOwnOption>(
  setDisplayName('LookupEmployeeLevelForm'),
  withUser,
  withMasterPage,
  withRouter,
  withEmployeeLevel,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupEmployeeLevelFormView);