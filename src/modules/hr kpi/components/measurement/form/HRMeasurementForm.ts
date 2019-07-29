import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIMeasurementPostPayload, IKPIMeasurementPutPayload } from '@KPI/classes/request/measurement';
import { IKPIMeasurementDetail } from '@KPI/classes/response/measurement';
import { WithKPIMeasurement, withKPIMeasurement } from '@KPI/hoc/withKPIMeasurement';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, witKPIouter } from 'react-router';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { KPIMeasurementFormView } from './KPIMeasurementFormView';

export interface IKPIMeasurementFormValue {
  uid: string;
  description: string;
  measurementType: string;
  weight: number;
}

interface IOwnRouteParams {
  measurementUidUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IKPIMeasurementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIMeasurementFormValue>>>;

  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIMeasurementFormValue, action: FormikActions<IKPIMeasurementFormValue>) => void;
}

export type KPIMeasurementFormProps
  = WithKPIMeasurement
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

const createProps: mapper<KPIMeasurementFormProps, IOwnState> = (props: KPIMeasurementFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    description: '',
    measurementType: '',
    weight: 0
  },

  validationSchema: Yup.object().shape<Partial<IKPIMeasurementFormValue>>({
    measurementType: Yup.string()
      .label(props.intl.formatMessage(KPIMessage.measurement.field.measurementType))
      .required(),

      weight: Yup.number()
      .label(props.intl.formatMessage(KPIMessage.measurement.field.weight))
      .integer()
      .min(0)
      .required(),
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<KPIMeasurementFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIMeasurementFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIMeasurementFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const MeasurementUid = props.history.location.state.uid;
      const { isLoading } = props.KPIMeasurementState.detail;

      if (user && MeasurementUid && !isLoading) {
        props.KPIMeasurementDispatch.loadDetailRequest({
          measurementUid: MeasurementUid
        });
      }
    }
  },
  handleOnSubmit: (props: KPIMeasurementFormProps) => (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPIMeasurementPostPayload = {
          description: values.description,
          measurementType: values.measurementType,
          weight: values.weight
        };

        promise = new Promise((resolve, reject) => {
          props.KPIMeasurementDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const measurementUid = props.history.location.state.uid;

        // must have measurementUid
        if (measurementUid) {

          // fill payload 
          const payload: IKPIMeasurementPutPayload = {
            description: values.description,
            measurementType: values.measurementType,
            weight: values.weight
          };

          promise = new Promise((resolve, reject) => {
            props.KPIMeasurementDispatch.updateRequest({              
              measurementUid,
              resolve,
              reject,              
              data: payload as IKPIMeasurementPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPIMeasurementDetail) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.message.createSuccess : KPIMessage.measurement.message.updateSuccess, { uid: response.uid })
        });

        props.history.push(`/kpi/measurement/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);

        // set form status
        actions.setStatus(error);

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item =>
            actions.setFieldError(item.field, props.intl.formatMessage({ id: item.message }))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.message.createFailure : KPIMessage.measurement.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIMeasurementFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIMeasurementFormProps) {
    // handle measurement detail response
    const { response: thisResponse } = this.props.KPIMeasurementState.detail;
    const { response: prevResponse } = prevProps.KPIMeasurementState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIMeasurementFormValue = {
          uid: thisResponse.data.uid,
          description: thisResponse.data.description,
          measurementType: thisResponse.data.measurementType,
          weight: thisResponse.data.weight
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPImeasurementForm = compose<KPIMeasurementFormProps, IOwnOption>(
  setDisplayName('KPImeasurementForm'),
  withUser,
  witKPIouter,
  withKPIMeasurement,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIMeasurementFormView);
