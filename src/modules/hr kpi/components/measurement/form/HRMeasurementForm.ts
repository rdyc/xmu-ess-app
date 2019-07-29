import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IHRMeasurementPostPayload, IHRMeasurementPutPayload } from '@hr/classes/request/measurement';
import { IHRMeasurementDetail } from '@hr/classes/response/measurement';
import { WithHRMeasurement, withHRMeasurement } from '@hr/hoc/withHRMeasurement';
import { hrMessage } from '@hr/locales/messages/hrMessage';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { HRMeasurementFormView } from './HRMeasurementFormView';

export interface IHRMeasurementFormValue {
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

  initialValues: IHRMeasurementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IHRMeasurementFormValue>>>;

  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IHRMeasurementFormValue, action: FormikActions<IHRMeasurementFormValue>) => void;
}

export type HRMeasurementFormProps
  = WithHRMeasurement
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

const createProps: mapper<HRMeasurementFormProps, IOwnState> = (props: HRMeasurementFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    description: '',
    measurementType: '',
    weight: 0
  },

  validationSchema: Yup.object().shape<Partial<IHRMeasurementFormValue>>({
    measurementType: Yup.string()
      .label(props.intl.formatMessage(hrMessage.measurement.field.measurementType))
      .required(),

      weight: Yup.number()
      .label(props.intl.formatMessage(hrMessage.measurement.field.weight))
      .integer()
      .min(0)
      .required(),
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<HRMeasurementFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<HRMeasurementFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HRMeasurementFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const MeasurementUid = props.history.location.state.uid;
      const { isLoading } = props.hrMeasurementState.detail;

      if (user && MeasurementUid && !isLoading) {
        props.hrMeasurementDispatch.loadDetailRequest({
          measurementUid: MeasurementUid
        });
      }
    }
  },
  handleOnSubmit: (props: HRMeasurementFormProps) => (values: IHRMeasurementFormValue, actions: FormikActions<IHRMeasurementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IHRMeasurementPostPayload = {
          description: values.description,
          measurementType: values.measurementType,
          weight: values.weight
        };

        promise = new Promise((resolve, reject) => {
          props.hrMeasurementDispatch.createRequest({
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
          const payload: IHRMeasurementPutPayload = {
            description: values.description,
            measurementType: values.measurementType,
            weight: values.weight
          };

          promise = new Promise((resolve, reject) => {
            props.hrMeasurementDispatch.updateRequest({              
              measurementUid,
              resolve,
              reject,              
              data: payload as IHRMeasurementPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IHRMeasurementDetail) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.message.createSuccess : hrMessage.measurement.message.updateSuccess, { uid: response.uid })
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.message.createFailure : hrMessage.measurement.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HRMeasurementFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HRMeasurementFormProps) {
    // handle measurement detail response
    const { response: thisResponse } = this.props.hrMeasurementState.detail;
    const { response: prevResponse } = prevProps.hrMeasurementState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IHRMeasurementFormValue = {
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

export const HRmeasurementForm = compose<HRMeasurementFormProps, IOwnOption>(
  setDisplayName('HRmeasurementForm'),
  withUser,
  withRouter,
  withHRMeasurement,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HRMeasurementFormView);
