import { IAccountEmployee } from '@account/classes';
import { IEmployeeListFilter } from '@account/classes/filters';
import { ICommonSystem } from '@common/classes';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types/FormMode';
import { ISelectFieldOption } from '@layout/components/fields/SelectField';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';
import { IProjectAssignmentDetail, IProjectList } from '@project/classes/response';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { projectMessage } from '@project/locales/messages/projectMessage';
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

import { ProjectAssignmentFormView } from './ProjectAssignmentFormView';

interface IProjectAssignmentItemFormValue {
  uid?: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  role: string;
  jobDescription: string;
  mandays: number;
  allocatedHours?: number;
  consumedHours?: number;
  statusType?: string;
  status?: ICommonSystem;
  rejectedReason?: string;
}

export interface IProjectAssignmentFormValue {
  uid?: string;
  projectUid: string;
  customerUid: string;
  projectType: string;
  contractNumber: string;
  name: string;
  description: string;
  ownerEmployeeUid: string;
  start: string;
  end: string;
  maxHours: number;
  assignedHours: number;
  unassignedHours: number;
  items: IProjectAssignmentItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  
  initialValues: IProjectAssignmentFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectAssignmentFormValue>>>;
  
  filterAccountEmployee?: IEmployeeListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSelectProject: (value?: ISelectFieldOption) => void;
  handleOnSubmit: (values: IProjectAssignmentFormValue, actions: FormikActions<IProjectAssignmentFormValue>) => void;
}

export type ProjectAssignmentFormProps
  = WithProjectAssignment
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectAssignmentFormProps, IOwnState> = (props: ProjectAssignmentFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    projectUid: '',
    customerUid: '',
    projectType: '',
    contractNumber: '',
    name: '',
    description: '',
    ownerEmployeeUid: '',
    start: '',
    end: '',
    maxHours: 0,
    assignedHours: 0,
    unassignedHours: 0,
    items: [],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IProjectAssignmentFormValue>>({
    projectUid: Yup.string()
      .label(props.intl.formatMessage(projectMessage.assignment.field.projectUid))
      .required(),

    assignedHours: Yup.number()
      .label(props.intl.formatMessage(projectMessage.assignment.field.assignedHours))
      .max(Yup.ref('maxHours')),

    items: Yup.array()
      .of(
        Yup.object().shape({
          employeeUid: Yup.string()
            .label(props.intl.formatMessage(projectMessage.assignment.field.employeeUid))
            .length(5)
            .required(),

          role: Yup.string()
            .label(props.intl.formatMessage(projectMessage.assignment.field.role))
            .max(50)
            .required(),

          jobDescription: Yup.string()
            .label(props.intl.formatMessage(projectMessage.assignment.field.jobDesc))
            .max(200)
            .required(),

          mandays: Yup.number()
            .label(props.intl.formatMessage(projectMessage.assignment.field.mandays))
            .min(1)
            .integer()
            .required(),
          
          allocatedHours: Yup.number()
            .label(props.intl.formatMessage(projectMessage.assignment.field.allocatedHours))
            .min(Yup.ref('consumedHours'))
        })
      )
      .min(1, props.intl.formatMessage(projectMessage.assignment.field.itemsMinimum))
  }),

  // filter props
  filterAccountEmployee: {
    companyUids: props.userState.user && props.userState.user.company.uid,
    useAccess: true,
    orderBy: 'fullName',
    direction: 'ascending'
  },
  filterProject: {
    find: props.userState.user && props.userState.user.uid,
    findBy: 'ownerEmployeeUid',
    companyUid: props.userState.user && props.userState.user.company.uid,
    statusTypes: ([WorkflowStatusType.Approved, WorkflowStatusType.ReOpened]).join(','),
    assignmentStatus: 'unassigned',
  }
});

const stateUpdaters: StateUpdaters<ProjectAssignmentFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<ProjectAssignmentFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectAssignmentFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const assignmentUid = props.history.location.state.assignmentUid;
      const { isLoading } = props.projectAssignmentState.detail;

      if (user && assignmentUid && !isLoading) {
        props.projectAssignmentDispatch.loadDetailRequest({
          assignmentUid,
          companyUid: user.company.uid
        });
      }
    }
  },
  handleOnSelectProject: (props: ProjectAssignmentFormProps) => (value?: ISelectFieldOption) => {
    if (value && value.data) {
      const data: IProjectList = value.data;
      
      const initialValues: IProjectAssignmentFormValue = {
        uid: 'Auto Generated',
        projectUid: data.uid,
        ownerEmployeeUid: data.owner && data.owner.fullName || data.ownerEmployeeUid,
        customerUid: data.customer && data.customer.name || data.customerUid,
        projectType: data.project && data.project.value || data.projectType,
        contractNumber: data.contractNumber || '-',
        name: data.name,
        description: data.description || '-',
        start: data.start,
        end: data.end,
        maxHours: data.maxHours,
        assignedHours: 0,
        unassignedHours: 0,
        items: [],
      };

      props.setInitialValues(initialValues);
    }
  },
  handleOnSubmit: (props: ProjectAssignmentFormProps) => (values: IProjectAssignmentFormValue, actions: FormikActions<IProjectAssignmentFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // fill payload
      const payload: IProjectAssignmentPatchPayload = {
        items: []
      };

      // fill payload items
      values.items.forEach((item, index) => payload.items.push({
        uid: item.uid,
        employeeUid: item.employeeUid,
        role: item.role,
        jobDescription: item.jobDescription,
        mandays: item.mandays
      }));
      
      // set the promise
      promise = new Promise((resolve, reject) => {
        props.projectAssignmentDispatch.patchRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          projectUid: values.projectUid,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then((response: IProjectAssignmentDetail) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.message.createSuccess : projectMessage.assignment.message.updateSuccess)
        });
       
        // redirect to detail
        props.history.push(`/project/assignments/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.message.createFailure : projectMessage.assignment.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectAssignmentFormProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAssignmentFormProps) {
    // handle project detail response
    const { response } = this.props.projectAssignmentState.detail;

    if (response !== prevProps.projectAssignmentState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectAssignmentFormValue = {
          uid: response.data.uid,
          projectUid: response.data.projectUid,
          ownerEmployeeUid: response.data.owner && response.data.owner.fullName || response.data.ownerEmployeeUid,
          customerUid: response.data.customer && response.data.customer.name || response.data.customerUid,
          projectType: response.data.project && response.data.project.value || response.data.projectType,
          contractNumber: response.data.contractNumber || '',
          name: response.data.name,
          description: response.data.description || '',
          start: response.data.start,
          end: response.data.end,
          maxHours: response.data.maxHours,
          assignedHours: response.data.assignedHours,
          unassignedHours: response.data.unassignedHours,
          items: [],
        };

        // fill assignment items
        response.data.items.forEach(item =>
          initialValues.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            employee: item.employee,
            role: item.role || '',
            jobDescription: item.jobDescription || '',
            mandays: item.mandays,
            allocatedHours: item.allocatedHours,
            consumedHours: item.consumedHours,
            statusType: item.statusType,
            status: item.status,
            rejectedReason: item.rejectedReason || ''
          })
        );

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const ProjectAssignmentForm = compose<ProjectAssignmentFormProps, IOwnOption>(
  setDisplayName('ProjectAssignmentForm'),
  withUser,
  withRouter,
  withProjectAssignment,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectAssignmentFormView);