import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPITemplateGetListFilter } from '@kpi/classes/filter';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { IKPIAssignPutPayload } from '@kpi/classes/request';
import { IKPIEmployee } from '@kpi/classes/response';
import { WithKPIAssign, withKPIAssign } from '@kpi/hoc/withKPIAssign';
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
import { KPIAssignFormView } from './KPIAssignFormView';

export interface IKPIAssignItemFormValue {
  uid?: string;
  isOpen: boolean;
  categoryUid: string;
  categoryValue: string;
  categoryName: string;
  categoryGroup: string;
  measurementUid: string;
  measurementValue: string;
  measurementType?: string;
  measurementDescription: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
}

export interface IKPIAssignFormValue {
  uid: string;
  employeeUid: string;
  employeeName?: string;
  companyUid: string;
  companyName?: string;
  positionUid: string;
  positionName?: string;
  templateUid: string;
  isFinal: boolean;
  isFirst: boolean;
  revision: string;
  note: string;
  year: string;
  totalWeight: number;
  finalDate?: string;
  items: IKPIAssignItemFormValue[];
}

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  loadItem: boolean;
  isDialogOpen: boolean;
  templateNotes: string;
  listItem: IKPIAssignItemFormValue[];

  initialValues: IKPIAssignFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIAssignFormValue>>>;

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterLookupPosition: IPositionGetListFilter;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  filterKPITemplate: IKPITemplateGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setItemValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetTemplateFilter: (companyUid: string, positionUid: string) => void;
  handleSetLoadItem: () => void;
  handleLoadTemplate: (companyUid: string, positionUid: string, templateUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIAssignFormValue, action: FormikActions<IKPIAssignFormValue>) => void;
  handleSetDialogOpen: () => void;
}

export type KPIAssignFormProps
  = WithKPIAssign
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

const createProps: mapper<KPIAssignFormProps, IOwnState> = (props: KPIAssignFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  loadItem: false,
  isDialogOpen: false,
  templateNotes: '',
  listItem: [],

  initialValues: {
    uid: 'Auto Generated',
    employeeUid: props.match.params.employeeUid,
    employeeName: props.history.location.state && props.history.location.state.employeeName && props.history.location.state.employeeName || '',
    companyUid: '',
    companyName: '',
    positionUid: '',
    positionName: '',
    templateUid: '',
    year: moment().year().toString(),
    totalWeight: 0,
    isFinal: false,
    isFirst: true,
    revision: '',
    note: '',
    items: []
  },

  validationSchema: Yup.object().shape<Partial<IKPIAssignFormValue>>({
    employeeUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.employeeUid)),

    templateUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.templateUid))
      .required(),

    year: Yup.string()
      .min(4)
      .max(4)
      .label(props.intl.formatMessage(kpiMessage.employee.field.year))
      .required(),

    totalWeight: Yup.number()
      .min(100, props.intl.formatMessage(kpiMessage.employee.field.weightNot100))
      .max(100, props.intl.formatMessage(kpiMessage.employee.field.weightNot100))
      .label(props.intl.formatMessage(kpiMessage.employee.field.totalWeight)),

    isFinal: Yup.boolean()
      .label(props.intl.formatMessage(kpiMessage.employee.field.isFinal)),

    isFirst: Yup.boolean(),

    revision: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.revision))
      .when('finalDate', ({
        is: undefined,
        then: Yup.string().required(),
      })),

    items: Yup.array()
      .of(
        Yup.object().shape({
          isOpen: Yup.boolean(),

          isAssignItemInUse: Yup.boolean(),

          categoryUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.categoryUid))
            .required(),

          categoryValue: Yup.string(),
            
          categoryName: Yup.string()
          .max(100)
          .label(props.intl.formatMessage(kpiMessage.employee.field.categoryName))
          .required(),

          categoryGroup: Yup.string(),

          measurementUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.measurementUid))
            .required(),

          measurementValue: Yup.string(),
            
          measurementDescription: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.categoryName))
            .required(),

          target: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.target))
            .required(),

          weight: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.weight))
            .min(0)
            .required(),

          threshold: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.threshold)),

          amount: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.employee.field.amount))
            .min(1)
            .required(),
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

const stateUpdaters: StateUpdaters<KPIAssignFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setItemValues: () => (items: IKPIAssignItemFormValue[], notes: string): Partial<IOwnState> => ({
    listItem: items,
    templateNotes: notes,
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIAssignFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIAssignFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const kpiAssignUid = props.history.location.state.uid;
      const { isLoading } = props.kpiAssignState.detail;

      if (user && kpiAssignUid && !isLoading) {
        props.kpiAssignDispatch.loadDetailRequest({
          employeeUid,
          kpiAssignUid
        });
      }
    }
  },
  handleSetLoadItem: (props: KPIAssignFormProps) => () => {
    props.stateUpdate({
      loadItem: !props.loadItem,
    });
  },
  handleSetTemplateFilter: (props: KPIAssignFormProps) => (companyUid: string, positionUid: string) => {
    props.stateUpdate({
      filterKPITemplate: {
        companyUid,
        positionUid,
        orderBy: 'name',
        direction: 'ascending',
      }
    });
  },
  handleLoadTemplate: (props: KPIAssignFormProps) => (companyUid: string, positionUid: string, templateUid: string) => {
    props.kpiTemplateDispatch.loadDetailRequest({
      companyUid,
      positionUid,
      templateUid
    });
  },
  handleOnSubmit: (props: KPIAssignFormProps) => (values: IKPIAssignFormValue, actions: FormikActions<IKPIAssignFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // editing 
      if (props.formMode === FormMode.Edit) {
        const kpiAssignUid = props.history.location.state.uid;

        // must have templateUid
        if (kpiAssignUid) {

          // fill payload 
          const payload: IKPIAssignPutPayload = {
            templateUid: values.templateUid,
            year: parseInt(values.year, 10),
            isFinal: values.isFinal,
            revision: values.revision,
            note: values.note,
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
          }));

          promise = new Promise((resolve, reject) => {
            props.kpiAssignDispatch.updateRequest({
              kpiAssignUid,
              resolve,
              reject,
              employeeUid: props.match.params.employeeUid,
              data: payload as IKPIAssignPutPayload,
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

        props.stateUpdate({
          isDialogOpen: false,
        });

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createSuccess : kpiMessage.employee.message.updateSuccess)
        });

        props.history.push(`/kpi/assigns/${props.match.params.employeeUid}/${response.uid}`);
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

        props.stateUpdate({
          isDialogOpen: false,
        });

        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createFailure : kpiMessage.employee.message.updateFailure)
        });
      });
  },
  handleSetDialogOpen: (props: KPIAssignFormProps) => () => {
    props.stateUpdate({
      isDialogOpen: !props.isDialogOpen,
    });
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIAssignFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIAssignFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.kpiAssignState.detail;
    const { response: prevResponse } = prevProps.kpiAssignState.detail;

    const { response: thisTemplate } = this.props.kpiTemplateState.detail;
    const { response: prevTemplate } = prevProps.kpiTemplateState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIAssignFormValue = {
          uid: thisResponse.data.uid,
          employeeUid: thisResponse.data.employeeUid,
          employeeName: thisResponse.data.employee && thisResponse.data.employee.fullName || '',
          companyUid: thisResponse.data.template && thisResponse.data.template.companyUid || '',
          companyName: thisResponse.data.template && thisResponse.data.template.company && thisResponse.data.template.company.name || '',
          positionUid: thisResponse.data.template && thisResponse.data.template.positionUid || '',
          positionName: thisResponse.data.template && thisResponse.data.template.position && thisResponse.data.template.position.name || '',
          templateUid: thisResponse.data.templateUid,
          year: thisResponse.data.year.toString(),
          totalWeight: thisResponse.data.items && thisResponse.data.items.reduce((a, b) => a + b.weight, 0) || 0,
          isFinal: thisResponse.data.isFinal,
          isFirst: thisResponse.data.changes && !thisResponse.data.changes.updated || false,
          revision: '',
          note: thisResponse.data.note || '',
          finalDate: thisResponse.data.finalDate,
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
              categoryGroup: item.category && item.category.group || '',
              measurementUid: item.measurementUid,
              measurementValue: item.measurement && item.measurement.description || '',
              measurementType: item.measurement && item.measurement.measurementType || '',
              measurementDescription: item.measurementDescription || '',
              target: item.target,
              weight: item.weight,
              threshold: item.threshold || 0,
              amount: item.amount,
            })
          );
        }

        // set initial values
        this.props.setInitialValues(initialValues);

        // set filter template
        this.props.handleSetTemplateFilter(thisResponse.data.template && thisResponse.data.template.companyUid || '', thisResponse.data.template && thisResponse.data.template.positionUid || '');
      }
    }

    if (thisTemplate !== prevTemplate) {
      if (thisTemplate && thisTemplate.data) {
        const items: IKPIAssignItemFormValue[] = [];

        if (thisTemplate.data.items) {
          // fill template items
          thisTemplate.data.items.forEach(item =>
            items.push({
              uid: '',
              isOpen: false,
              categoryUid: item.categoryUid,
              categoryValue: item.category && item.category.name || '',
              categoryName: item.categoryName,
              categoryGroup: item.category && item.category.group || '',
              measurementUid: item.measurementUid,
              measurementValue: item.measurement && item.measurement.description || '',
              measurementType: item.measurement && item.measurement.measurementType || '',
              measurementDescription: item.measurement && item.measurement.description || '',
              target: item.target,
              weight: item.weight,
              threshold: item.threshold || 0,
              amount: item.amount,
            })
          );
        }

        // set initial values
        this.props.setItemValues(items, thisTemplate.data.note || '');
        this.props.handleSetLoadItem();
      }
    }
  }
};

export const KPIAssignForm = compose<KPIAssignFormProps, IOwnOption>(
  setDisplayName('KPIAssignForm'),
  withUser,
  withRouter,
  withKPIAssign,
  withKPITemplate,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withWidth(),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIAssignFormView);
