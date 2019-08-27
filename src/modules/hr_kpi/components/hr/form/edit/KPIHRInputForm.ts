import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPITemplateGetListFilter } from '@kpi/classes/filter';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { IKPIEmployeePutPayload } from '@kpi/classes/request';
import { IKPIEmployee } from '@kpi/classes/response';
import { WithKPIEmployee, withKPIEmployee } from '@kpi/hoc/withKPIEmployee';
import { WithKPITemplate, withKPITemplate } from '@kpi/hoc/withKPITemplate';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
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
import { KPIHRInputFormView } from './KPIHRInputFormView';

interface IKPIEmployeeItemFormValue {
  uid?: string;
  isOpen: boolean;
  categoryUid: string;
  categoryValue: string;
  categoryName: string;
  measurementUid: string;
  measurementValue: string;
  measurementType?: string;
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
  companyUid?: string;
  positionUid?: string;
  templateUid: string;
  isFinal: boolean;
  isFirst: boolean;
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

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterLookupPosition: IPositionGetListFilter;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  filterKPITemplate: IKPITemplateGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetTemplateFilter: (companyUid: string, positionUid: string) => void;
  handleLoadTemplate: (companyUid: string, positionUid: string, templateUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIEmployeeFormValue, action: FormikActions<IKPIEmployeeFormValue>) => void;
}

export type KPIHRInputFormProps
  = WithKPIEmployee
  & WithKPITemplate
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithWidth
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<KPIHRInputFormProps, IOwnState> = (props: KPIHRInputFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    employeeUid: props.match.params.employeeUid,
    employeeName: props.history.location.state && props.history.location.state.employeeName && props.history.location.state.employeeName || '',
    companyUid: '',
    positionUid: '',
    templateUid: '',
    year: moment().year(),
    period: 1,
    totalWeight: 0,
    totalScore: 0,
    isFinal: false,
    isFirst: true,
    revision: '',
    items: []
  },

  validationSchema: Yup.object().shape<Partial<IKPIEmployeeFormValue>>({
    employeeUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.employeeUid)),

    templateUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.templateUid))
      .required(),

    year: Yup.number()
      .min(1900)
      .label(props.intl.formatMessage(kpiMessage.employee.field.year))
      .required(),

    period: Yup.number()
      .min(1)
      .label(props.intl.formatMessage(kpiMessage.employee.field.period))
      .required(),

    totalWeight: Yup.number()
      .min(100)
      .max(100)
      .label(props.intl.formatMessage(kpiMessage.employee.field.totalWeight)),

    totalScore: Yup.number(),

    isFinal: Yup.boolean()
      .label(props.intl.formatMessage(kpiMessage.employee.field.isFinal)),

    isFirst: Yup.boolean(),

    revision: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.revision))
      .when('isFinal', ({
        is: false,
        then: Yup.string().required(),
      }))
      .when('isFirst', ({
        is: false,
        then: Yup.string().required(),
      })),

    items: Yup.array()
      .of(
        Yup.object().shape({
          isOpen: Yup.boolean(),

          categoryUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.categoryUid))
            .required(),

          categoryValue: Yup.string(),
            
          categoryName: Yup.string()
          .max(100)
          .label(props.intl.formatMessage(kpiMessage.employee.field.categoryName))
          .required(),

          measurementUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.measurementUid))
            .required(),

          measurementValue: Yup.string(),
            
          measurementDescription: Yup.string()
            .max(300)
            .label(props.intl.formatMessage(kpiMessage.employee.field.categoryName))
            .required(),

          target: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.target))
            .required(),

          weight: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.weight))
            .integer()
            .min(0)
            .required(),

          threshold: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.threshold))
            .integer(),

          amount: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.amount))
            .integer()
            .min(0)
            .required(),

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

  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterLookupPosition: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterKPICategory: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterKPIMeasurement: {
    orderBy: 'description',
    direction: 'ascending'
  },
  filterKPITemplate: {
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<KPIHRInputFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIHRInputFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIHRInputFormProps) => () => {
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
  handleSetTemplateFilter: (props: KPIHRInputFormProps) => (companyUid: string, positionUid: string) => {
    props.stateUpdate({
      filterKPITemplate: {
        companyUid,
        positionUid,
        orderBy: 'name',
        direction: 'ascending',
      }
    });
  },
  handleLoadTemplate: (props: KPIHRInputFormProps) => (companyUid: string, positionUid: string, templateUid: string) => {
    props.kpiTemplateDispatch.loadDetailRequest({
      companyUid,
      positionUid,
      templateUid
    });
  },
  handleOnSubmit: (props: KPIHRInputFormProps) => (values: IKPIEmployeeFormValue, actions: FormikActions<IKPIEmployeeFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      // if (props.formMode === FormMode.New) {
      //   // fill payload 
      //   const payload: IKPIEmployeePostPayload = {
      //     templateUid: values.templateUid,
      //     year: values.year,
      //     period: values.period,
      //     items: []
      //   };

      //   // fill payload items
      //   values.items.forEach(item => payload.items.push({
      //     uid: item.uid,
      //     categoryUid: item.categoryUid,
      //     categoryName: item.categoryName,
      //     measurementUid: item.measurementUid,
      //     measurementDescription: item.measurementDescription,
      //     target: item.target,
      //     weight: item.weight,
      //     threshold: item.threshold,
      //     amount: item.amount,
      //     achieved: item.achieved,
      //   }));

      //   promise = new Promise((resolve, reject) => {
      //     props.kpiEmployeeDispatch.createRequest({
      //       resolve,
      //       reject,
      //       employeeUid: props.match.params.employeeUid,
      //       data: payload
      //     });
      //   });
      // }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const kpiUid = props.history.location.state.uid;

        // must have templateUid
        if (kpiUid) {

          // fill payload 
          const payload: IKPIEmployeePutPayload = {
            templateUid: values.templateUid,
            year: values.year,
            period: values.period,
            isFinal: values.isFinal,
            revision: values.revision,
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
            uid: item.uid,
            categoryUid: item.categoryUid,
            categoryName: item.categoryName,
            measurementUid: item.measurementUid,
            measurementDescription: item.measurementDescription,
            target: item.target,
            weight: item.weight,
            threshold: item.threshold,
            amount: item.amount,
            achieved: item.achieved,
          }));

          promise = new Promise((resolve, reject) => {
            props.kpiEmployeeDispatch.updateRequest({
              kpiUid,
              resolve,
              reject,
              employeeUid: props.match.params.employeeUid,
              data: payload as IKPIEmployeePutPayload,
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

        props.history.push(`/kpi/hrinputs/${props.match.params.employeeUid}/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIHRInputFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIHRInputFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.kpiEmployeeState.detail;
    const { response: prevResponse } = prevProps.kpiEmployeeState.detail;

    const { response: thisTemplate } = this.props.kpiTemplateState.detail;
    const { response: prevTemplate } = prevProps.kpiTemplateState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIEmployeeFormValue = {
          uid: thisResponse.data.uid,
          employeeUid: thisResponse.data.employeeUid,
          employeeName: thisResponse.data.employee && thisResponse.data.employee.fullName || '',
          companyUid: thisResponse.data.template && thisResponse.data.template.companyUid || '',
          positionUid: thisResponse.data.template && thisResponse.data.template.positionUid || '',
          templateUid: thisResponse.data.templateUid,
          year: thisResponse.data.year,
          period: thisResponse.data.period,
          totalWeight: thisResponse.data.items && thisResponse.data.items.reduce((a, b) => a + b.weight, 0) || 0,
          totalScore: thisResponse.data.totalScore,
          isFinal: thisResponse.data.isFinal,
          isFirst: thisResponse.data.changes && !thisResponse.data.changes.updated || false,
          revision: '',
          items: []
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              isOpen: false,
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

      if (thisTemplate !== prevTemplate) {
        if (thisTemplate && thisTemplate.data) {
          // define initial values 
          const initialValues: IKPIEmployeeFormValue = {
            uid: this.props.initialValues.uid,
            employeeUid: this.props.initialValues.employeeUid,
            employeeName: this.props.initialValues.employeeName,
            companyUid: this.props.initialValues.companyUid,
            positionUid: this.props.initialValues.positionUid,
            templateUid: this.props.initialValues.uid,
            year: this.props.initialValues.year,
            period: this.props.initialValues.period,
            totalWeight: thisTemplate.data.items && thisTemplate.data.items.reduce((a, b) => a + b.weight, 0) || 0,
            totalScore: 0,
            isFinal: true,
            isFirst: this.props.initialValues.isFirst,
            revision: '',
            items: []
          };
  
          if (thisTemplate.data.items) {
            // fill template items
            thisTemplate.data.items.forEach(item =>
              initialValues.items.push({
                uid: '',
                isOpen: false,
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
                achieved: 0,
                progress: 0,
                score: 0,
              })
            );
          }
  
          // set initial values
          this.props.setInitialValues(initialValues);
        }
      }
    }
  }
};

export const KPIHRInputForm = compose<KPIHRInputFormProps, IOwnOption>(
  setDisplayName('KPIHRInputForm'),
  withUser,
  withRouter,
  withKPIEmployee,
  withKPITemplate,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withWidth(),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIHRInputFormView);
