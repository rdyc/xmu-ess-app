import { IEmployeeTrainingPostPayload, IEmployeeTrainingPutPayload } from '@account/classes/request/employeeTraining';
import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
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
import { TrainingFormView } from './TrainingFormView';

export interface ITrainingFormValue {
  uid: string;
  employeeUid: string;
  name: string;
  organizer: string;
  trainingType: string;
  certificationType: string;
  start: string;
  end?: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  trainingUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ITrainingFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ITrainingFormValue>>>;

  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ITrainingFormValue, actions: FormikActions<ITrainingFormValue>) => void;
}

export type TrainingFormProps
  = WithAccountEmployeeTraining
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

const createProps: mapper<TrainingFormProps, IOwnState> = (props: TrainingFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    uid: 'Auto Generated',
    name: '',
    organizer: '',
    trainingType: '',
    certificationType: '',
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ITrainingFormValue>>({
    // information
    name: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.name))
      .required(),

    organizer: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.organizer))
      .required(),

    trainingType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.trainingType))
      .required(),

    certificationType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.certificationType))
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(accountMessage.training.field.end)),
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<TrainingFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<TrainingFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: TrainingFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const trainingUid = props.history.location.state.trainingUid;
      const { isLoading } = props.accountEmployeeTrainingState.detail;

      if (user && employeeUid && trainingUid && !isLoading) {
        props.accountEmployeeTrainingDispatch.loadDetailRequest({
          employeeUid,
          trainingUid
        });
      }
    }
  },
  handleOnSubmit: (props: TrainingFormProps) => (values: ITrainingFormValue, actions: FormikActions<ITrainingFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeTrainingPostPayload = {
          name: values.name,
          organizer: values.organizer,
          trainingType: values.trainingType,
          certificationType: values.certificationType,
          start: values.start,
          end: values.end
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeTrainingDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const trainingUid = props.history.location.state.trainingUid;

        // must have trainingUid
        if (trainingUid) {
          const payload: IEmployeeTrainingPutPayload = {
            uid: values.uid,
            name: values.name,
            organizer: values.organizer,
            trainingType: values.trainingType,
            certificationType: values.certificationType,
            start: values.start,
            end: values.end
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeTrainingDispatch.updateRequest({
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
      .then((response: IEmployeeTraining) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Training' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/training/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        // console.log(error);

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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<TrainingFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: TrainingFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeTrainingState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeTrainingState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ITrainingFormValue = {
            uid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            name: thisResponse.data.name,
            organizer: thisResponse.data.organizer,
            trainingType: thisResponse.data.trainingType,
            certificationType: thisResponse.data.certificationType,
            start: thisResponse.data.start,
            end: thisResponse.data.end || ''
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const TrainingForm = compose<TrainingFormProps, IOwnOption>(
  setDisplayName('TrainingForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeTraining,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(TrainingFormView);