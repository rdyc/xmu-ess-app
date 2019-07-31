import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IKPIMeasurementPostPayload, IKPIMeasurementPutPayload } from '@kpi/classes/request';
import { IKPIMeasurement, IKPIMeasurementList } from '@kpi/classes/response';
import { WithKPIMeasurement, withKPIMeasurement } from '@kpi/hoc/withKPIMeasurement';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import * as Yup from 'yup';
import { KPIMeasurementDetailView as KPIMeasurementFormView } from './KPIMeasurementFormView';

export interface IKPIMeasurementFormValue {
  uid: string;
  description: string;
  measurementType: string;
  weight: number;
}

export interface IKPIMeasurementFormValueList {
  measurementFormValue: IKPIMeasurementFormValue;
  isEditing: boolean;
}

interface OwnProps {
  categoryUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleMapItem: (measurements: IKPIMeasurementList[]) => void;
  handleSetEditMode: (index: number) => void;
  handleOnSubmit: (values: IKPIMeasurementFormValue, action: FormikActions<IKPIMeasurementFormValue>) => void;
}

interface IOwnState {
  shouldLoad: boolean;
  measurementValueList: IKPIMeasurementFormValueList[];
  initialValues: IKPIMeasurementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIMeasurementFormValue>>>;
  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
}

export type KPIMeasurementFormProps
  = WithUser
  & OwnProps
  & IOwnStateUpdaters
  & WithOidc
  & WithLayout
  & WithKPIMeasurement
  & WithCommonSystem
  & WithMasterPage
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIMeasurementFormProps, IOwnState> = (props: KPIMeasurementFormProps): IOwnState => {
  //
  return {
    shouldLoad: false,
    measurementValueList: [],

    initialValues: {
      uid: 'Auto Generated',
      description: '',
      measurementType: '',
      weight: 0,
    },
  
    validationSchema: Yup.object().shape<Partial<IKPIMeasurementFormValue>>({
      description: Yup.string()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.description))
        .max(200)
        .required(),
      measurementType: Yup.string()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.measurementType))
        .required(),
      weight: Yup.number()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.weight))
        .min(1)
        .required(),
    }),

    filterCommonSystem: {
      orderBy: 'value',
      direction: 'ascending'
    }
  };
};

const stateUpdaters: StateUpdaters<KPIMeasurementFormProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
};

const handlerCreators: HandleCreators<KPIMeasurementFormProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIMeasurementFormProps) => () => { 
    if (props.userState.user && props.categoryUid && !props.kpiMeasurementState.detail.isLoading) {
      props.kpiMeasurementDispatch.loadListRequest({
        categoryUid: props.categoryUid,
      });
    }
  },
  handleMapItem: (props: KPIMeasurementFormProps) => (measurements: IKPIMeasurementList[]) => {
    const measurementValueList: IKPIMeasurementFormValueList[] = measurements.map((item) => ({
      measurementFormValue: {
        uid: item.uid,
        description: item.description,
        measurementType: item.measurementType,
        weight: item.weight,
      },
      isEditing: false
    }));

    props.stateUpdate({
      measurementValueList
    });
  },
  handleSetEditMode: (props: KPIMeasurementFormProps) =>  (index: number) => {
    const measurementValueList = props.measurementValueList;

    measurementValueList[index].isEditing = !measurementValueList[index].isEditing;

    props.stateUpdate({
      measurementValueList
    });
  },
  handleOnSubmit: (props: KPIMeasurementFormProps) => (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (false) {
        // fill payload 
        const payload: IKPIMeasurementPostPayload = {
          description: values.description,
          measurementType: values.measurementType,
          weight: values.weight,
        };

        promise = new Promise((resolve, reject) => {
          props.kpiMeasurementDispatch.createRequest({
            resolve,
            reject,
            categoryUid: props.categoryUid,
            data: payload
          });
        });
      }

      // editing 
      if (true) {
        // must have categoryUid
        if (values.uid) {

          // fill payload 
          const payload: IKPIMeasurementPutPayload = {
            description: values.description,
            measurementType: values.measurementType,
            weight: values.weight,
          };

          promise = new Promise((resolve, reject) => {
            props.kpiMeasurementDispatch.updateRequest({ 
              resolve,
              reject, 
              categoryUid: props.categoryUid,              
              measurementUid: values.uid,            
              data: payload as IKPIMeasurementPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPIMeasurement) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(false ? kpiMessage.category.message.createSuccess : kpiMessage.category.message.updateSuccess, { uid: response.uid })
        });

        // props.history.push(`/kpi/category/${response.uid}`);
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
          message: props.intl.formatMessage(false ? kpiMessage.category.message.createFailure : kpiMessage.category.message.updateFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<KPIMeasurementFormProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();

    if (this.props.kpiMeasurementState.list.response && this.props.kpiMeasurementState.list.response.data) {
      this.props.handleMapItem(this.props.kpiMeasurementState.list.response.data);
    }
  },
  componentDidUpdate(prevProps: KPIMeasurementFormProps) {
    // map response to state
    if (!this.props.kpiMeasurementState.list.isLoading && this.props.kpiMeasurementState.list.isLoading !== prevProps.kpiMeasurementState.list.isLoading) {
      if (this.props.kpiMeasurementState.list.response && this.props.kpiMeasurementState.list.response.data) {
        this.props.handleMapItem(this.props.kpiMeasurementState.list.response.data);
      }      
    }

    // handle updated route params
    if (this.props.categoryUid !== prevProps.categoryUid) {
      this.props.handleOnLoadApi();
    }
  }
};

export const KPIMeasurementForm = compose<KPIMeasurementFormProps, OwnProps>(
  setDisplayName('KPIMeasurementForm'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withKPIMeasurement,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStyles(styles),
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<KPIMeasurementFormProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(KPIMeasurementFormView);