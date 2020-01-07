import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPITemplateGetListFilter } from '@kpi/classes/filter';
import { IKPIAssignPostBulkPayload } from '@kpi/classes/request';
import { IKPIAssign } from '@kpi/classes/response';
import { WithKPIAssign, withKPIAssign } from '@kpi/hoc/withKPIAssign';
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
import * as Yup from 'yup';
import { KPIAssignBulkFormView } from './KPIAssignBulkFormView';

export interface IKPIAssignListFormValue {
  employeeUid: string;
  isChecked: boolean;
  fullName: string;
}

export interface IKPIAssignBulkFormValue {
  companyUid: string;
  positionUid: string;
  templateUid: string;
  year: string;
  employees: IKPIAssignListFormValue[];
}

interface IOwnRouteParams {
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  loadItem: boolean;
  listItem: IKPIAssignListFormValue[];

  initialValues: IKPIAssignBulkFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIAssignBulkFormValue>>>;

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
  handleOnSubmit: (values: IKPIAssignBulkFormValue, action: FormikActions<IKPIAssignBulkFormValue>) => void;
}

export type KPIAssignBulkFormProps
  = WithKPIAssign
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

const createProps: mapper<KPIAssignBulkFormProps, IOwnState> = (props: KPIAssignBulkFormProps): IOwnState => ({
  // form props 
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,
  loadItem: false,
  listItem: [],

  initialValues: {
    companyUid: '',
    positionUid: '',
    templateUid: '',
    year: '0',
    employees: [],
  },

  validationSchema: Yup.object().shape<Partial<IKPIAssignBulkFormValue>>({
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

const stateUpdaters: StateUpdaters<KPIAssignBulkFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setEmployeesValues: () => (items: IKPIAssignListFormValue[]): Partial<IOwnState> => ({
    listItem: items,
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIAssignBulkFormProps, IOwnHandler> = {
  handleSetFilter: (props: KPIAssignBulkFormProps) => (companyUid: string, positionUid: string) => {
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
  handleSetLoadItem: (props: KPIAssignBulkFormProps) => () => {
    props.stateUpdate({
      loadItem: !props.loadItem,
    });
  },
  handleLoadTemplate: (props: KPIAssignBulkFormProps) => (companyUid: string, positionUid: string, templateUid: string) => {
    props.kpiTemplateDispatch.loadDetailRequest({
      companyUid,
      positionUid,
      templateUid
    });
  },
  handleLoadEmployee: (props: KPIAssignBulkFormProps) => (companyUid: string, positionUid: string) => {
    if (companyUid !== '' && positionUid !== '') {
      props.accountEmployeeDispatch.loadListRequest({
        filter: ({
          companyUids: companyUid,
          positionUids: positionUid,
          useAccess: false,
          orderBy: 'fullName',
          direction: 'ascending'
        })
      });
    }
  },
  handleOnSubmit: (props: KPIAssignBulkFormProps) => (values: IKPIAssignBulkFormValue, actions: FormikActions<IKPIAssignBulkFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPIAssignPostBulkPayload = {
          year: parseInt(values.year, 10),
          templateUid: values.templateUid,
          employees: []
        };

        values.employees.forEach(item => payload.employees.push({
          employeeUid: item.employeeUid,
          isChecked: item.isChecked,
        }));

        promise = new Promise((resolve, reject) => {
          props.kpiAssignDispatch.createBulkRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }
    }

    // handling promise 
    promise
      .then((response: IKPIAssign[]) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createsSuccess : kpiMessage.employee.message.updateSuccess)
        });

        props.history.push(`/kpi/assigns`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.message.createFailure : kpiMessage.employee.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIAssignBulkFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIAssignBulkFormProps) {
    // handle list & detail response
    const { response: thisEmployeeResponse } = this.props.accountEmployeeState.list;
    const { response: prevEmployeeResponse } = prevProps.accountEmployeeState.list;

    if (thisEmployeeResponse !== prevEmployeeResponse) {
      if (thisEmployeeResponse && thisEmployeeResponse.data) {
        const employees: IKPIAssignListFormValue[] = [];
        
        thisEmployeeResponse.data.forEach(item => employees.push({
          employeeUid: item.uid,
          isChecked: true,
          fullName: item.fullName,
        }));

        this.props.setEmployeesValues(employees);
        this.props.handleSetLoadItem();
      }
    }
  }
};

export const KPIAssignBulkForm = compose<KPIAssignBulkFormProps, IOwnOption>(
  setDisplayName('KPIAssignBulkForm'),
  withUser,
  withRouter,
  withKPIAssign,
  withKPITemplate,
  withAccountEmployee,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIAssignBulkFormView);
