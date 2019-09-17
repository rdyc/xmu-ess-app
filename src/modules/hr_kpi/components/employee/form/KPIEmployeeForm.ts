import { IEmployeeListFilter } from '@account/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIEmployeePostPayload, IKPIEmployeePutPayload } from '@kpi/classes/request';
import { IKPIEmployee } from '@kpi/classes/response';
import { withKPIAssign, WithKPIAssign } from '@kpi/hoc/withKPIAssign';
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
import { KPIEmployeeFormView } from './KPIEmployeeFormView';

interface IKPIEmployeeItemFormValue {
  uid?: string;
  kpiAssignItemUid: string;
  categoryName: string;
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
  kpiAssignUid: string;
  templateName: string;
  year: string;
  period: string;
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
  loadAssign: boolean;
  assignData: IKPIEmployeeFormValue;

  initialValues: IKPIEmployeeFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIEmployeeFormValue>>>;

  filterAccountEmployee: IEmployeeListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setAssignValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetLoadAssign: () => void;
  handleLoadAssign: (employeeUid: string, year: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIEmployeeFormValue, action: FormikActions<IKPIEmployeeFormValue>) => void;
}

export type KPIEmployeeFormProps
  = WithKPIEmployee
  & WithKPIAssign
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

const createProps: mapper<KPIEmployeeFormProps, IOwnState> = (props: KPIEmployeeFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  loadAssign: false,

  initialValues: {
    uid: 'Auto Generated',
    employeeUid: props.match.params.employeeUid,
    employeeName: props.history.location.state && props.history.location.state.employeeName && props.history.location.state.employeeName || '',
    kpiAssignUid: '',
    templateName: '',
    year: moment().year().toString(),
    period: '1',
    totalScore: 0,
    items: []
  },
  
  assignData: props.initialValues,

  validationSchema: Yup.object().shape<Partial<IKPIEmployeeFormValue>>({
    employeeUid: Yup.string(),

    kpiAssignUid: Yup.string()
      .required(),

    templateName: Yup.string(),

    year: Yup.string()
      .min(4)
      .max(4),

    period: Yup.string()
      .max(2),

    totalScore: Yup.number(),

    items: Yup.array()
      .of(
        Yup.object().shape({
          categoryUid: Yup.string(),

          kpiAssignItemUid: Yup.string()
            .required(),
            
          categoryName: Yup.string(),

          measurementType: Yup.string(),
            
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

  filterAccountEmployee: ({
    companyUids: props.userState.user && props.userState.user.company.uid,
    positionUids: props.userState.user && props.userState.user.position.uid,
    useAccess: true,
    useSuperOrdinate: true,
  }),
});

const stateUpdaters: StateUpdaters<KPIEmployeeFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setAssignValues: () => (data: IKPIEmployeeFormValue): Partial<IOwnState> => ({
    assignData: data
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIEmployeeFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIEmployeeFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const kpiUid = props.history.location.state.uid;
      const { isLoading } = props.kpiEmployeeState.detail;

      if (user && kpiUid && !isLoading) {
        props.kpiEmployeeDispatch.loadDetailRequest({
          kpiUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    }
  },
  handleSetLoadAssign: (props: KPIEmployeeFormProps) => () => {
    props.stateUpdate({
      loadAssign: !props.loadAssign,
    });
  },
  handleLoadAssign: (props: KPIEmployeeFormProps) => (employeeUid: string, year: string) => {
    props.kpiAssignDispatch.loadByYearRequest({
      employeeUid,
      year: parseInt(year, 10),
    });
  },
  handleOnSubmit: (props: KPIEmployeeFormProps) => (values: IKPIEmployeeFormValue, actions: FormikActions<IKPIEmployeeFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // create 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPIEmployeePostPayload = {
          kpiAssignUid: values.kpiAssignUid,
          period: parseInt(values.period, 10),
          items: []
        };

        // fill payload items
        values.items.forEach(item => payload.items.push({
          kpiAssignItemUid: item.kpiAssignItemUid,
          achieved: item.achieved,
        }));

        promise = new Promise((resolve, reject) => {
          props.kpiEmployeeDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload,
          });
        });
      }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const kpiUid = props.history.location.state.uid;

        // must have templateUid
        if (kpiUid) {

          // fill payload 
          const payload: IKPIEmployeePutPayload = {
            kpiAssignUid: values.kpiAssignUid,
            period: parseInt(values.period, 10),
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
            uid: item.uid || '',
            achieved: item.achieved,
          }));

          promise = new Promise((resolve, reject) => {
            props.kpiEmployeeDispatch.updateRequest({
              kpiUid,
              resolve,
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload,
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

        props.history.push(`/kpi/employees/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIEmployeeFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIEmployeeFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.kpiEmployeeState.detail;
    const { response: prevResponse } = prevProps.kpiEmployeeState.detail;
    
    const { response: thisAssignResponse } = this.props.kpiAssignState.byYear;
    const { response: prevAssignResponse } = prevProps.kpiAssignState.byYear;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIEmployeeFormValue = {
          uid: thisResponse.data.uid,
          employeeUid: thisResponse.data.kpiAssign && thisResponse.data.kpiAssign.employeeUid || '',
          employeeName: thisResponse.data.kpiAssign && thisResponse.data.kpiAssign.employee && thisResponse.data.kpiAssign.employee.fullName || '',
          kpiAssignUid: thisResponse.data.kpiAssign && thisResponse.data.kpiAssign.uid || '',
          templateName: thisResponse.data.kpiAssign && thisResponse.data.kpiAssign.template && thisResponse.data.kpiAssign.template.name || '',
          year: thisResponse.data.kpiAssign && thisResponse.data.kpiAssign.year.toString() || '0',
          period: thisResponse.data.period.toString() || '0',
          totalScore: thisResponse.data.totalScore,
          items: []
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              kpiAssignItemUid: item.kpiAssignItemUid || '',
              categoryName: item.kpiAssignItem && item.kpiAssignItem.categoryName || '',
              measurementType: item.kpiAssignItem && item.kpiAssignItem.measurement && item.kpiAssignItem.measurement.measurementType || '',
              measurementDescription: item.kpiAssignItem && item.kpiAssignItem.measurement && item.kpiAssignItem.measurement.description || '',
              target: item.kpiAssignItem && item.kpiAssignItem.target || '',
              weight: item.kpiAssignItem && item.kpiAssignItem.weight || 0,
              threshold: item.kpiAssignItem && item.kpiAssignItem.threshold || 0,
              amount: item.kpiAssignItem && item.kpiAssignItem.amount || 0,
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

    if (thisAssignResponse !== prevAssignResponse) {
      if (thisAssignResponse && thisAssignResponse.data) {
        // define initial values 
        const initialValues: IKPIEmployeeFormValue = {
          uid: this.props.initialValues.uid,
          employeeUid: thisAssignResponse.data.employeeUid || '',
          employeeName: thisAssignResponse.data.employee && thisAssignResponse.data.employee.fullName || '',
          kpiAssignUid: thisAssignResponse.data.uid || '',
          templateName: thisAssignResponse.data.template && thisAssignResponse.data.template.name || '',
          year: thisAssignResponse.data.year.toString() || '0',
          period: this.props.initialValues.period,
          totalScore: this.props.initialValues.totalScore,
          items: []
        };

        if (thisAssignResponse.data.items) {
          // fill template items
          thisAssignResponse.data.items.forEach((item, index) =>
            initialValues.items.push({
              uid: '',
              kpiAssignItemUid: item.uid,
              categoryName: item.categoryName,
              measurementType: item.measurement && item.measurement.measurementType || '',
              measurementDescription: item.measurement && item.measurement.description || '',
              target: item.target,
              weight: item.weight,
              threshold: item.threshold || 0,
              amount: item.amount,
              achieved: this.props.formMode === FormMode.Edit && this.props.initialValues.items[index].achieved || 0,
              progress: this.props.formMode === FormMode.Edit && this.props.initialValues.items[index].progress || 0,
              score: this.props.formMode === FormMode.Edit && this.props.initialValues.items[index].score || 0,
            })
          );
        }

        // set initial values
        this.props.setAssignValues(initialValues);
        this.props.handleSetLoadAssign();
      } else {
        this.props.setAssignValues(this.props.initialValues);
        this.props.handleSetLoadAssign();
      }
    }
  }
};

export const KPIEmployeeForm = compose<KPIEmployeeFormProps, IOwnOption>(
  setDisplayName('KPIEmployeeForm'),
  withUser,
  withRouter,
  withKPIEmployee,
  withKPIAssign,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIEmployeeFormView);
