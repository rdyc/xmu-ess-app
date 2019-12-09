import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIMeasurementDeletePayload, IKPIMeasurementPostPayload, IKPIMeasurementPutPayload } from '@kpi/classes/request';
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
import { KPIMeasurementFormView as KPIMeasurementFormView } from './KPIMeasurementFormView';

export interface IKPIMeasurementFormValue {
  uid: string;
  isInUse: boolean;
  description: string;
  measurementName: string;
  measurementType: string;
  weight: number;
}

export interface IKPIMeasurementFormValueList {
  measurementFormValue: IKPIMeasurementFormValue;
  isNew: boolean;
  isEditing: boolean;
  isDialogOpen: boolean;
}

interface OwnProps {
  categoryUid: string;
  categoryGroup: 'kpi' | 'personal';
  isItemEditing: boolean;
  parentFormMode: FormMode;
  handleSetIsItemEditing: () => void;
  handleAddItem: () => void;
  handleRemoveItem: () => void;
  handleSaveItem: (values: IKPIMeasurementFormValue, index: number) => void;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleMapItem: (measurements: IKPIMeasurementList[]) => void;
  handleSetEditMode: (index: number) => void;
  handleSetDialogOpen: (index: number) => void;
  handleCreateFormValueList: () => void;
  handleRemoveFormValueList: () => void;
  handleOnSubmit: (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>, index: number, isNew: boolean) => void;
  handleOnSubmitDelete: (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>, measurementUid: string, index: number) => void;
}

interface IOwnState {
  measurementValueList: IKPIMeasurementFormValueList[];
  initialValues: IKPIMeasurementFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIMeasurementFormValue>>>;
  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  setFormValueList: StateHandler<IOwnState>;
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
    measurementValueList: [],

    initialValues: {
      uid: 'Auto Generated',
      isInUse: false,
      description: '',
      measurementName: '',
      measurementType: '',
      weight: 0,
    },
  
    validationSchema: Yup.object().shape<Partial<IKPIMeasurementFormValue>>({
      description: Yup.string()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.description))
        .required(),
      isInUse: Yup.boolean(),
      measurementType: Yup.string()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.measurementType))
        .required(),
      weight: Yup.number()
        .label(props.intl.formatMessage(kpiMessage.measurement.field.weight))
        .min(0)
        .required(),
    }),

    filterCommonSystem: {
      orderBy: 'value',
      direction: 'ascending'
    },
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
  setFormValueList: () => (measurementValueList: IKPIMeasurementFormValueList[]) => ({
    measurementValueList
  })
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
        isInUse: item.isInUse,
        measurementName: item.measurement && item.measurement.value || '',
        measurementType: item.measurementType,
        weight: item.weight,
      },
      isNew: false,
      isEditing: false,
      isDialogOpen: false,
    }));

    props.setFormValueList(measurementValueList);
  },
  handleSetEditMode: (props: KPIMeasurementFormProps) =>  (index: number) => {
    const measurementValueList = props.measurementValueList;

    measurementValueList[index].isEditing = !measurementValueList[index].isEditing;

    props.setFormValueList(measurementValueList);
  },
  handleSetDialogOpen: (props: KPIMeasurementFormProps) =>  (index: number) => {
    const measurementValueList = props.measurementValueList;

    measurementValueList[index].isDialogOpen = !measurementValueList[index].isDialogOpen;

    props.setFormValueList(measurementValueList);
  },
  handleCreateFormValueList: (props: KPIMeasurementFormProps) => () => {
    const measurementValueList = props.measurementValueList;

    measurementValueList.push({
      measurementFormValue: {
        uid: 'Auto Generated',
        description: '',
        isInUse: false,
        measurementName: '',
        measurementType: '',
        weight: 0,
      },
      isNew: true,
      isEditing: true,
      isDialogOpen: false,
    });

    props.setFormValueList(measurementValueList);
    props.handleSetIsItemEditing();
    props.handleAddItem();
  },
  handleRemoveFormValueList: (props: KPIMeasurementFormProps) => () => {
    const measurementValueList = props.measurementValueList;

    measurementValueList.pop();

    props.setFormValueList(measurementValueList);
    props.handleRemoveItem();
  },
  handleOnSubmit: (props: KPIMeasurementFormProps) => (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>, index: number, isNew: boolean) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      if (props.parentFormMode === FormMode.New) {
        props.handleSaveItem(values, index);
        
        const measurementValueList = props.measurementValueList;

        measurementValueList[index].measurementFormValue = {
          uid: values.uid,
          description: values.description,
          isInUse: values.isInUse,
          measurementName: values.measurementName,
          measurementType: values.measurementType,
          weight: values.weight
        };
        measurementValueList[index].isNew = false;
        measurementValueList[index].isEditing = false;
        measurementValueList[index].isDialogOpen = false;

        props.setFormValueList(measurementValueList);
      } else {
        // creating 
        if (isNew) {
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
        if (!isNew) {
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
          message: props.intl.formatMessage(isNew ? kpiMessage.measurement.message.createSuccess : kpiMessage.measurement.message.updateSuccess)
        });

        const measurementValueList = props.measurementValueList;

        measurementValueList[index].measurementFormValue = {
          uid: response.uid,
          description: response.description,
          isInUse: response.isInUse,
          measurementName: response.measurement && response.measurement.value || '',
          measurementType: response.measurementType,
          weight: response.weight
        };
        measurementValueList[index].isNew = false;
        measurementValueList[index].isEditing = false;
        measurementValueList[index].isDialogOpen = false;

        props.setFormValueList(measurementValueList);
        props.handleSetIsItemEditing();
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
          message: props.intl.formatMessage(isNew ? kpiMessage.measurement.message.createFailure : kpiMessage.measurement.message.updateFailure)
        });
      });
  },
  handleOnSubmitDelete: (props: KPIMeasurementFormProps) => (values: IKPIMeasurementFormValue, actions: FormikActions<IKPIMeasurementFormValue>, measurementUid: string, index: number) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      const payload: IKPIMeasurementDeletePayload = {             
        measurementUid,
        categoryUid: props.categoryUid, 
      };

      promise = new Promise((resolve, reject) => {
        props.kpiMeasurementDispatch.deleteRequest({ 
          resolve,
          reject,       
          data: payload as IKPIMeasurementDeletePayload,
        });
      });
    }

    // handling promise 
    promise
      .then((response: boolean) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(kpiMessage.measurement.message.deleteSuccess)
        });

        const measurementValueList = props.measurementValueList;
        
        measurementValueList[index].isDialogOpen = false;
        measurementValueList.splice(index, 1);

        props.setFormValueList(measurementValueList);
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
          message: props.intl.formatMessage(kpiMessage.measurement.message.deleteFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<KPIMeasurementFormProps, IOwnState> = {
  componentDidMount() {
    if (this.props.kpiMeasurementState.list.response && this.props.kpiMeasurementState.list.response.data) {
      this.props.handleMapItem(this.props.kpiMeasurementState.list.response.data);
      this.props.setFormValueList([]);
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