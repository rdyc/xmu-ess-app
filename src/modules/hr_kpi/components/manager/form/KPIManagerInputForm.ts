import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIEmployeePutAchievedPayload } from '@kpi/classes/request';
import { IKPIEmployee } from '@kpi/classes/response';
import { WithKPIEmployee, withKPIEmployee } from '@kpi/hoc/withKPIEmployee';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import * as moment from 'moment';
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
import { KPIManagerInputFormView } from './KPIManagerInputFormView';

interface IKPIEmployeeItemFormValue {
  uid?: string;
  categoryUid: string;
  categoryValue: string;
  categoryName: string;
  measurementUid: string;
  measurementValue: string;
  measurementType: string;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
  achieved: number;
  progress: number;
  score: number;
}

export interface IKPIEmployeeFormValue {
  uid: string;
  employeeUid: string;
  employeeName?: string;
  templateUid: string;
  templateName: string;
  isFinal: boolean;
  revision: string;
  year: number;
  period: number;
  totalWeight: number;
  totalScore: number;
  items: IKPIEmployeeItemFormValue[];
}

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IKPIEmployeeFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIEmployeeFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIEmployeeFormValue, action: FormikActions<IKPIEmployeeFormValue>) => void;
}

export type KPIManagerInputFormProps
  = WithKPIEmployee
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

const createProps: mapper<KPIManagerInputFormProps, IOwnState> = (props: KPIManagerInputFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    employeeUid: props.match.params.employeeUid,
    employeeName: props.history.location.state && props.history.location.state.employeeName && props.history.location.state.employeeName || '',
    templateUid: '',
    templateName: '',
    year: moment().year(),
    period: 1,
    totalWeight: 0,
    totalScore: 0,
    isFinal: false,
    revision: '',
    items: [{
      uid: '',
      categoryUid: '',
      categoryValue: '',
      categoryName: '',
      measurementUid: '',
      measurementValue: '',
      measurementType: '',
      measurementDescription: '',
      target: '',
      weight: 0,
      threshold: 0,
      amount: 0,
      achieved: 0,
      progress: 0,
      score: 0,
    }]
  },

  validationSchema: Yup.object().shape<Partial<IKPIEmployeeFormValue>>({
    employeeUid: Yup.string(),

    templateUid: Yup.string(),

    templateName: Yup.string(),

    year: Yup.number(),

    period: Yup.number(),

    totalWeight: Yup.number(),

    totalScore: Yup.number(),

    isFinal: Yup.boolean(),

    revision: Yup.string(),

    items: Yup.array()
      .of(
        Yup.object().shape({
          categoryUid: Yup.string(),

          categoryValue: Yup.string(),
            
          categoryName: Yup.string(),

          measurementUid: Yup.string(),

          measurementType: Yup.string(),

          measurementValue: Yup.string(),
            
          measurementDescription: Yup.string(),

          target: Yup.string(),

          weight: Yup.number(),

          threshold: Yup.number(),

          amount: Yup.number(),

          achieved: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.achieved))
            .integer()
            .min(0)
            .required(),
          
          progress: Yup.number(),
          
          score: Yup.number(),
        })
      )
      .min(1, props.intl.formatMessage(kpiMessage.employee.field.itemsMinimum))
  }),
});

const stateUpdaters: StateUpdaters<KPIManagerInputFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIManagerInputFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIManagerInputFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const kpiUid = props.history.location.state.uid;
      const { isLoading } = props.kpiEmployeeState.detail;

      if (user && kpiUid && !isLoading) {
        props.kpiEmployeeDispatch.loadDetailRequest({
          employeeUid,
          kpiUid
        });
      }
    }
  },
  handleOnSubmit: (props: KPIManagerInputFormProps) => (values: IKPIEmployeeFormValue, actions: FormikActions<IKPIEmployeeFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // editing 
      if (props.formMode === FormMode.Edit) {
        const kpiUid = props.history.location.state.uid;

        // must have templateUid
        if (kpiUid) {

          // fill payload 
          const payload: IKPIEmployeePutAchievedPayload = {
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
            uid: item.uid,
            achieved: item.achieved,
          }));

          promise = new Promise((resolve, reject) => {
            props.kpiEmployeeDispatch.updateAchievedRequest({
              kpiUid,
              resolve,
              reject,
              employeeUid: props.match.params.employeeUid,
              data: payload as IKPIEmployeePutAchievedPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPIEmployee) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createSuccess : kpiMessage.employee.message.updateSuccess, { uid: response.uid })
        });

        props.history.push(`/kpi/managerinputs/${props.match.params.employeeUid}/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createFailure : kpiMessage.employee.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIManagerInputFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIManagerInputFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.kpiEmployeeState.detail;
    const { response: prevResponse } = prevProps.kpiEmployeeState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIEmployeeFormValue = {
          uid: thisResponse.data.uid,
          employeeUid: thisResponse.data.employeeUid,
          employeeName: thisResponse.data.employee && thisResponse.data.employee.fullName || '',
          templateUid: thisResponse.data.templateUid,
          templateName: thisResponse.data.template && thisResponse.data.template.name || '',
          year: thisResponse.data.year,
          period: thisResponse.data.period,
          totalWeight: thisResponse.data.items && thisResponse.data.items.reduce((a, b) => a + b.weight, 0) || 0,
          totalScore: thisResponse.data.totalScore,
          isFinal: thisResponse.data.isFinal,
          revision: '',
          items: []
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              categoryUid: item.categoryUid,
              categoryValue: item.category && item.category.name || '',
              categoryName: item.categoryName,
              measurementUid: item.measurementUid,
              measurementValue: item.measurement && item.measurement.description || '',
              measurementType: item.measurement && item.measurement.measurementType || '',
              measurementDescription: item.measurement && item.measurement.description || '',
              target: item.target,
              weight: item.weight,
              threshold: item.threshold || 0,
              amount: item.amount,
              achieved: item.achieved,
              progress: item.progress,
              score: item.score,
            })
          );
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPIManagerInputForm = compose<KPIManagerInputFormProps, IOwnOption>(
  setDisplayName('KPIManagerInputForm'),
  withUser,
  withRouter,
  withKPIEmployee,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIManagerInputFormView);
