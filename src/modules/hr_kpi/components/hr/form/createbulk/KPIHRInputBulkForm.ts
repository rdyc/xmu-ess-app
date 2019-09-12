import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPITemplateGetListFilter } from '@kpi/classes/filter';
import { IKPIEmployeePostBulkPayload } from '@kpi/classes/request';
import { IKPITemplate } from '@kpi/classes/response';
import { WithKPIEmployee, withKPIEmployee } from '@kpi/hoc/withKPIEmployee';
import { WithKPITemplate, withKPITemplate } from '@kpi/hoc/withKPITemplate';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
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
import { KPIHRInputBulkFormView } from './KPIHRInputBulkFormView';

export interface IEmployeeListFormValue {
  employeeUid: string;
  isChecked: boolean;
  fullName: string;
}

export interface IKPIEmployeeBulkFormValue {
  companyUid: string;
  positionUid: string;
  templateUid: string;
  year: string;
  period: string;
  employees: IEmployeeListFormValue[];
}

interface IOwnRouteParams {
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  loadItem: boolean;
  listItem: IEmployeeListFormValue[];

  initialValues: IKPIEmployeeBulkFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIEmployeeBulkFormValue>>>;

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterKPITemplate: IKPITemplateGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setEmployeesValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetFilter: (companyUid: string, positionUid: string) => void;
  handleSetLoadItem: () => void;
  handleLoadTemplate: (companyUid: string, positionUid: string, templateUid: string) => void;
  handleLoadEmployee: (companyUid: string, positionUid: string) => void;
  handleOnSubmit: (values: IKPIEmployeeBulkFormValue, action: FormikActions<IKPIEmployeeBulkFormValue>) => void;
}

export type KPIHRInputBulkFormProps
  = WithKPIEmployee
  & WithKPITemplate
  & WithAccountEmployee
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

const createProps: mapper<KPIHRInputBulkFormProps, IOwnState> = (props: KPIHRInputBulkFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  loadItem: false,
  listItem: [],

  initialValues: {
    companyUid: '',
    positionUid: '',
    templateUid: '',
    year: '0',
    period: '0',
    employees: [],
  },

  validationSchema: Yup.object().shape<Partial<IKPIEmployeeBulkFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.template.field.companyUid))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.template.field.positionUid))
      .required(),

    templateUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.employee.field.templateUid))
      .required(),

    year: Yup.string()
      .min(4)
      .max(4)
      .label(props.intl.formatMessage(kpiMessage.employee.field.year)),

    period: Yup.string()
      .min(1)
      .max(1)
      .label(props.intl.formatMessage(kpiMessage.employee.field.period))
      .required(),

    employees: Yup.array()
      .of(
        Yup.object().shape({
          employeeUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.employee.field.employeeUid)),

          isChecked: Yup.boolean(),

          fullName: Yup.string(),
        })
      )
      .min(1, props.intl.formatMessage(kpiMessage.employee.field.itemsMinimum))
  }),

  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterKPITemplate: {
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<KPIHRInputBulkFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setEmployeesValues: (state: IOwnState) => (items: IEmployeeListFormValue[]): Partial<IOwnState> => ({
    listItem: items,
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIHRInputBulkFormProps, IOwnHandler> = {
  handleSetFilter: (props: KPIHRInputBulkFormProps) => (companyUid: string, positionUid: string) => {
    if (companyUid !== '' && positionUid !== '') {
      props.stateUpdate({
        filterKPITemplate: {
          companyUid,
          positionUid,
          orderBy: 'name',
          direction: 'ascending',
        }
      });
    }
    
  },
  handleSetLoadItem: (props: KPIHRInputBulkFormProps) => () => {
    props.stateUpdate({
      loadItem: !props.loadItem,
    });
  },
  handleLoadTemplate: (props: KPIHRInputBulkFormProps) => (companyUid: string, positionUid: string, templateUid: string) => {
    props.kpiTemplateDispatch.loadDetailRequest({
      companyUid,
      positionUid,
      templateUid
    });
  },
  handleLoadEmployee: (props: KPIHRInputBulkFormProps) => (companyUid: string, positionUid: string) => {
    if (companyUid !== '' && positionUid !== '') {
      props.accountEmployeeDispatch.loadListRequest({
        filter: ({
          companyUids: companyUid,
          positionUids: positionUid,
          useAccess: true,
          orderBy: 'fullName',
          direction: 'ascending'
        })
      });
    }
  },
  handleOnSubmit: (props: KPIHRInputBulkFormProps) => (values: IKPIEmployeeBulkFormValue, actions: FormikActions<IKPIEmployeeBulkFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPIEmployeePostBulkPayload = {
          templateUid: values.templateUid,
          year: parseInt(values.year, 10),
          period: parseInt(values.period, 10),
          employees: []
        };

        values.employees.forEach(item => payload.employees.push({
          employeeUid: item.employeeUid,
          isChecked: item.isChecked,
        }));

        promise = new Promise((resolve, reject) => {
          props.kpiEmployeeDispatch.createBulkRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            data: payload
          });
        });
      }

      // editing 
      // if (props.formMode === FormMode.Edit) {
      //   const templateUid = props.history.location.state.uid;

      //   // must have templateUid
      //   if (templateUid) {

      //     // fill payload 
      //     const payload: IKPITemplatePutPayload = {
      //       companyUid: values.companyUid,
      //       positionUid: values.positionUid,
      //       name: values.name,
      //       items: []
      //     };

      //     // fill payload items
      //     values.items.forEach(item => payload.items.push({
      //       uid: item.uid,
      //       categoryUid: item.categoryUid,
      //       categoryName: item.categoryName,
      //       measurementUid: item.measurementUid,
      //       target: item.target,
      //       weight: item.weight,
      //       threshold: item.threshold,
      //       amount: item.amount,
      //     }));

      //     promise = new Promise((resolve, reject) => {
      //       props.kpiTemplateDispatch.updateRequest({
      //         templateUid,
      //         resolve,
      //         reject,
      //         companyUid: payload.companyUid,
      //         positionUid: payload.positionUid,
      //         data: payload as IKPITemplatePutPayload,
      //       });
      //     });
      //   }
      // }
    }

    // handling promise 
    promise
      .then((response: IKPITemplate) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createSuccess : kpiMessage.employee.message.updateSuccess, { uid: response.uid })
        });

        props.history.push(`/kpi/hrinputs`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIHRInputBulkFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIHRInputBulkFormProps) {
    // handle list & detail response
    const { response: thisEmployeeResponse } = this.props.accountEmployeeState.list;
    const { response: prevEmployeeResponse } = prevProps.accountEmployeeState.list;

    if (thisEmployeeResponse !== prevEmployeeResponse) {
      if (thisEmployeeResponse && thisEmployeeResponse.data) {
        const employees: IEmployeeListFormValue[] = [];
        
        thisEmployeeResponse.data.forEach(item => employees.push({
          employeeUid: item.uid,
          isChecked: false,
          fullName: item.fullName,
        }));

        this.props.setEmployeesValues(employees);
        this.props.handleSetLoadItem();
      }
    }
  }
};

export const KPIHRInputBulkForm = compose<KPIHRInputBulkFormProps, IOwnOption>(
  setDisplayName('KPIHRInputBulkForm'),
  withUser,
  withRouter,
  withKPIEmployee,
  withKPITemplate,
  withAccountEmployee,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIHRInputBulkFormView);
