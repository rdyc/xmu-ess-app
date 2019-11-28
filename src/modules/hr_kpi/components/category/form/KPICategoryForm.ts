import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIMeasurementPostPayload } from '@kpi/classes/request';
import { IKPICategoryMeasurementPostPayload, IKPICategoryPutPayload } from '@kpi/classes/request/category';
import { IKPICategoryDetail } from '@kpi/classes/response/category';
import { IKPIMeasurementFormValue } from '@kpi/components/measurement/Form/KPIMeasurementForm';
import { WithKPICategory, withKPICategory } from '@kpi/hoc/withKPICategory';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
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
import { KPICategoryFormView } from './KPICategoryFormView';

export interface IKPICategoryFormValue {
  uid: string;
  name: string;
  group: 'kpi' | 'personal';
  items: IKPIMeasurementFormValue[];
}

interface IOwnRouteParams {
  categoryUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IKPICategoryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPICategoryFormValue>>>;

  filterCommonSystem: ISystemListFilter;

  isItemEditing: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetIsItemEditing: () => void;
  handleAddItem: () => void;
  handleRemoveItem: () => void;
  handleSaveItem: (values: IKPIMeasurementFormValue, index: number) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPICategoryFormValue, action: FormikActions<IKPICategoryFormValue>) => void;
}

export type KPICategoryFormProps
  = WithKPICategory
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

const createProps: mapper<KPICategoryFormProps, IOwnState> = (props: KPICategoryFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    name: '',
    group: 'kpi',
    items: []
  },

  validationSchema: Yup.object().shape<Partial<IKPICategoryFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.category.field.name))
      .max(100)
      .required(),

    group: Yup.mixed()
      // .matches(/(kPI|personal)/)
      .required(),
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },

  isItemEditing: false,
});

const stateUpdaters: StateUpdaters<KPICategoryFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPICategoryFormProps, IOwnHandler> = {
  handleSetIsItemEditing: (props: KPICategoryFormProps) =>  () => {
    props.stateUpdate({
      isItemEditing: !props.isItemEditing
    });
  },
  handleAddItem: (props: KPICategoryFormProps) => () => {
    const formValues = props.initialValues;

    formValues.items.push({
      uid: '',
      measurementName: '',
      description: '',
      isInUse: false,
      measurementType: '',
      weight: 0
    });

    props.stateUpdate({
      initialValues: formValues
    });
  },
  handleRemoveItem: (props: KPICategoryFormProps) => () => {
    const formValues = props.initialValues;

    formValues.items.pop();

    props.stateUpdate({
      initialValues: formValues,
      isItemEditing: !props.isItemEditing
    });
  },
  handleSaveItem: (props: KPICategoryFormProps) => (values: IKPIMeasurementFormValue, index: number) => {
    const formValues = props.initialValues;

    formValues.items[index] = ({
      uid: '',
      measurementName: values.measurementName,
      isInUse: values.isInUse,
      description: values.description,
      measurementType: values.measurementType,
      weight: values.weight
    });

    props.stateUpdate({
      initialValues: formValues,
      isItemEditing: !props.isItemEditing
    });
  },
  handleOnLoadDetail: (props: KPICategoryFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const CategoryUid = props.history.location.state.uid;
      const { isLoading } = props.kpiCategoryState.detail;

      if (user && CategoryUid && !isLoading) {
        props.kpiCategoryDispatch.loadDetailRequest({
          categoryUid: CategoryUid
        });
      }
    }
  },
  handleOnSubmit: (props: KPICategoryFormProps) => (values: IKPICategoryFormValue, actions: FormikActions<IKPICategoryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const itemPayload: IKPIMeasurementPostPayload[] = values.items.map((item) => ({
          uid: '',
          description: item.description,
          measurementType: item.measurementType,
          weight: item.weight,
        }));

        const payload: IKPICategoryMeasurementPostPayload = {
          name: values.name,
          group: values.group,
          items: itemPayload,
        };

        promise = new Promise((resolve, reject) => {
          props.kpiCategoryDispatch.measurementCreateRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const categoryUid = props.history.location.state.uid;

        // must have categoryUid
        if (categoryUid) {

          // fill payload 
          const payload: IKPICategoryPutPayload = {
            name: values.name,
            group: values.group,
          };

          promise = new Promise((resolve, reject) => {
            props.kpiCategoryDispatch.updateRequest({              
              categoryUid,
              resolve,
              reject,              
              data: payload as IKPICategoryPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPICategoryDetail) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.message.createSuccess : kpiMessage.category.message.updateSuccess)
        });

        props.history.push(`/kpi/categories/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.message.createFailure : kpiMessage.category.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPICategoryFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPICategoryFormProps) {
    // handle category detail response
    const { response: thisResponse } = this.props.kpiCategoryState.detail;
    const { response: prevResponse } = prevProps.kpiCategoryState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPICategoryFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          group: thisResponse.data.group,
          items: []
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPICategoryForm = compose<KPICategoryFormProps, IOwnOption>(
  setDisplayName('KPIcategoryForm'),
  withUser,
  withRouter,
  withKPICategory,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPICategoryFormView);
