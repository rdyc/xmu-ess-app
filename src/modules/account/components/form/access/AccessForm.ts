import { IEmployeeAccessPostPayload, IEmployeeAccessPutPayload } from '@account/classes/request/employeeAccess';
import { IEmployeeAccess } from '@account/classes/response/employeeAccess';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { IEmployeeLevelListFilter } from '@lookup/classes/filters';
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
  withStateHandlers,
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { AccessFormView } from './AccessFormView';

export interface IAccessFormValue {
  uid: string;
  employeeUid: string;
  companyUid: string;
  positionUid: string;
  roleUid: string;
  unitType?: string;
  departmentType?: string;
  levelType: string;
  start: string;
  end?: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  accessUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IAccessFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IAccessFormValue>>>;

  filterCommonSystem?: ISystemListFilter;
  filterDepartment?: ISystemListFilter;
  filterUnit?: ISystemListFilter;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterLookupLevel?: IEmployeeLevelListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleFilterDepartment: (companyUid: string, unitUid: string) => void;
  handleFilterUnit: (companyUid: string) => void;
  handleOnSubmit: (values: IAccessFormValue, actions: FormikActions<IAccessFormValue>) => void;
}

export type AccessFormProps
  = WithAccountEmployeeAccess
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

const createProps: mapper<AccessFormProps, IOwnState> = (props: AccessFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    uid: 'Auto Generated',
    companyUid: '',
    positionUid: '',
    roleUid: '',
    unitType: '',
    departmentType: '',
    levelType: '',
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IAccessFormValue>>({
    // information
    companyUid: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.companyUid))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.positionUid))
      .required(),

    roleUid: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.roleUid))
      .required(),

    unitType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.unitType)),

    departmentType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.departmentType)),

    levelType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.levelType))
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(accountMessage.access.field.end)),
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },

  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterLookupLevel: {
    orderBy: 'seq',
    direction: 'descending'
  }
});

const stateUpdaters: StateUpdaters<AccessFormProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<AccessFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: AccessFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const accessUid = props.history.location.state.accessUid;
      const { isLoading } = props.accountEmployeeAccessState.detail;

      if (user && employeeUid && accessUid && !isLoading) {
        props.accountEmployeeAccessDispatch.loadDetailRequest({
          employeeUid,
          accessUid
        });
      }
    }
  },
  handleFilterDepartment: (props: AccessFormProps) => (companyUid: string, unitUid: string) => {
    const filterDepartment: ISystemListFilter = {
      companyUid,
      parentCode: unitUid,
      orderBy: 'value',
      direction: 'ascending'
    };

    props.stateUpdate({
      filterDepartment
    });
  },
  handleFilterUnit: (props: AccessFormProps) => (companyUid: string) => {
    const filterUnit: ISystemListFilter = {
      companyUid,
      orderBy: 'value',
      direction: 'ascending'
    };

    props.stateUpdate({
      filterUnit
    });
  },
  handleOnSubmit: (props: AccessFormProps) => (values: IAccessFormValue, actions: FormikActions<IAccessFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeAccessPostPayload = {
          companyUid: values.companyUid,
          positionUid: values.positionUid,
          roleUid: values.roleUid,
          unitType: values.unitType || '',
          departmentType: values.departmentType || '',
          levelType: values.levelType,
          start: values.start,
          end: values.end || ''
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeAccessDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const accessUid = props.history.location.state.accessUid;

        // must have accessUid
        if (accessUid) {
          const payload: IEmployeeAccessPutPayload = {
            uid: values.uid,
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            roleUid: values.roleUid,
            unitType: values.unitType || '',
            departmentType: values.departmentType || '',
            levelType: values.levelType,
            start: values.start,
            end: values.end || ''
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeAccessDispatch.updateRequest({
              resolve,
              reject,
              employeeUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployeeAccess) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Access' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/access/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        // console.log(error);

        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AccessFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: AccessFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeAccessState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeAccessState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IAccessFormValue = {
            uid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            companyUid: thisResponse.data.companyUid,
            positionUid: thisResponse.data.positionUid,
            roleUid: thisResponse.data.roleUid,
            unitType: thisResponse.data.unitType || '',
            departmentType: thisResponse.data.departmentType || '',
            levelType: thisResponse.data.levelType,
            start: thisResponse.data.start,
            end: thisResponse.data.end || ''
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const AccessForm = compose<AccessFormProps, IOwnOption>(
  setDisplayName('AccessForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeAccess,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(AccessFormView);