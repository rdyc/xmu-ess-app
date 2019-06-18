import { IEmployeeListFilter } from '@account/classes/filters';
import { isMemberOfPMO } from '@account/helper/isMemberOfPMO';
import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { WithAccountPMRoles, withAccountPMRoles } from '@account/hoc/withAccountPMRoles';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectOwnerPutPayload } from '@project/classes/request/owner';
import { IProject } from '@project/classes/response';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
import { WithProjectOwner, withProjectOwner } from '@project/hoc/withProjectOwner';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectOwnerMessage } from '@project/locales/messages/projectOwnerMessage';
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

import { ProjectOwnerFormView } from './ProjectOwnerFormView';

export interface IProjectOwnerFormValue {
  statusType: string;
  projectUid: string;
  childProjectUid?: string;
  ownerEmployeeUid: string;
  customerUid: string;
  projectType: string;
  maxHours: number;
  contractNumber?: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  currencyType: string;
  rate: number;
  valueUsd: number;
  valueIdr: number;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  projectUid: string;
  isRequestor: boolean;
  isAdmin: boolean;

  initialValues: IProjectOwnerFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectOwnerFormValue>>>;

  filterCommonSystem: ISystemListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setIsRequestor: StateHandler<IOwnState>;
  setIsAdmin: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  setFilterAccountEmployee: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IProjectOwnerFormValue, actions: FormikActions<IProjectOwnerFormValue>) => void;
}

export type ProjectOwnerFormProps
  = WithProjectRegistration
  & WithProjectOwner
  & WithAccountSalesRoles
  & WithAccountPMRoles
  & WithAllowedProjectType
  & WithCommonSystem
  & WithOidc
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectOwnerFormProps, IOwnState> = (props: ProjectOwnerFormProps): IOwnState => ({
  // form props
  formMode: FormMode.Edit,
  projectUid: props.history.location.state.uid,
  isRequestor: false,
  isAdmin: false,

  // form values
  initialValues: {
    statusType: '',
    projectUid: '',
    ownerEmployeeUid: '',
    customerUid: '',
    projectType: '',
    maxHours: 0,
    contractNumber: '',
    name: '',
    description: '',
    start: '',
    end: '',
    currencyType: '',
    rate: 0,
    valueUsd: 0,
    valueIdr: 0
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IProjectOwnerFormValue>>({
    ownerEmployeeUid: Yup.string()
      .label(props.intl.formatMessage(projectMessage.registration.field.ownerEmployeeUid))
      .required(),

    projectType: Yup.string()
      .label(props.intl.formatMessage(projectMessage.registration.field.projectType))
      .required()
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
  filterAccountEmployee: {
    companyUids: props.userState.user && props.userState.user.company.uid,
    useAccess: true,
    orderBy: 'fullName',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<ProjectOwnerFormProps, IOwnState, IOwnStateUpdater> = {
  setIsRequestor: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isRequestor: !state.isRequestor
  }),
  setIsAdmin: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isAdmin: !state.isAdmin
  }),
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setFilterAccountEmployee: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterAccountEmployee: {
      ...state.filterAccountEmployee,
      roleUids: values
    }
  })
};

const handlerCreators: HandleCreators<ProjectOwnerFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectOwnerFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const projectUid = props.history.location.state.uid;
      const { isLoading } = props.projectRegisterState.detail;

      if (user && projectUid && !isLoading) {
        props.projectRegisterDispatch.loadDetailRequest({
          projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: ProjectOwnerFormProps) => (values: IProjectOwnerFormValue, actions: FormikActions<IProjectOwnerFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // editing
      if (props.formMode === FormMode.Edit) {
        // must have projectUid
        if (props.projectUid) {
          
          // fill payload
          const payload: IProjectOwnerPutPayload = {
            employeeUid: values.ownerEmployeeUid,
            projectType: values.projectType
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.projectOwnerDispatch.updateRequest({
              resolve, 
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              projectUid: props.projectUid, 
              data: payload, 
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IProject) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // define response message
        let message: string = '';

        if (response && response.childProjectUid) {
          message = props.intl.formatMessage(projectOwnerMessage.cloneSuccess, {pid: response.childProjectUid});
        } else {
          message = props.intl.formatMessage(projectOwnerMessage.updateSuccess);
        }
        
        // show flash message
        props.masterPage.flashMessage({
          message
        });
       
        // redirect to list or detail
        if (props.isRequestor) {
          props.history.push('/project/requests');
        } else {
          props.history.push(`/project/requests/${response.childProjectUid || response.uid}`);
        }
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(projectMessage.registration.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectOwnerFormProps, IOwnState> = {
  componentDidMount() {
    // checking admin status
    const { user } = this.props.oidcState;
    let isAdmin: boolean = false;
    
    if (user) {
      const role: string | string[] | undefined = user.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }

      // admin checking
      if (isAdmin) {
        // set as admin
        this.props.setIsAdmin();
      } else {
        // isn't admin
        const { user: userState } = this.props.userState;
        let roleUids = undefined;

        if (userState) {
          // checking member of sales
          if (isMemberOfSales(userState.role.uid)) {
            roleUids = this.props.roleSalesUids && this.props.roleSalesUids.join(',');
          }
          
          // checking member of pmo
          if (isMemberOfPMO(userState.role.uid)) {
            roleUids = this.props.rolePmUids && this.props.rolePmUids.join(',');
          }
        }

        // set filter account to use defined role uids
        if (roleUids) {
          this.props.setFilterAccountEmployee(roleUids);
        }
      }
    }
  },
  componentDidUpdate(prevProps: ProjectOwnerFormProps) {
    // handle project detail response
    const { response } = this.props.projectRegisterState.detail;

    if (response !== prevProps.projectRegisterState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectOwnerFormValue = {
          statusType: response.data.status && response.data.status.value || response.data.statusType,
          projectUid: response.data.uid,
          childProjectUid: response.data.childProjectUid,
          ownerEmployeeUid: response.data.ownerEmployeeUid,
          customerUid: response.data.customer && response.data.customer.name || response.data.customerUid,
          projectType: response.data.projectType,
          maxHours: response.data.maxHours,
          contractNumber: response.data.contractNumber || 'N/A',
          name: response.data.name,
          description: response.data.description || 'N/A',
          start: response.data.start,
          end: response.data.end,
          currencyType: response.data.currency && response.data.currency.value || response.data.currencyType,
          rate: response.data.rate,
          valueUsd: response.data.valueUsd,
          valueIdr: response.data.valueIdr
        };

        // set initial values
        this.props.setInitialValues(initialValues);

        // update isRequestor status
        if (this.props.userState.user && response.data.changes) {
          if (this.props.userState.user.uid === response.data.changes.createdBy) {
            this.props.setIsRequestor();
          }
        }
      }
    }
  }
};

export const ProjectOwnerForm = compose<ProjectOwnerFormProps, IOwnOption>(
  setDisplayName('ProjectOwnerForm'),
  withOidc,
  withUser,
  withRouter,
  withProjectRegistration,
  withProjectOwner,
  withAccountSalesRoles,
  withAccountPMRoles,
  withAllowedProjectType,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectOwnerFormView);