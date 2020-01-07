import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import { IOrganizationWorkflowPostPayload, IOrganizationWorkflowPutPayload } from '@organization/classes/request/workflow/request';
import { IWorkflow } from '@organization/classes/response/workflow';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import * as Yup from 'yup';
import { OrganizationWorkflowFormView } from './OrganizationWorkflowFormView';

export interface IWorkflowHierarchyFormValue {
  uid?: string;
  hierarchyUid: string;
  priority: number;
}

export interface IOrganizationWorkflowFormValue {
  menu: {
    uid?: string;
    name?: string;
  };
  hierarchies: IWorkflowHierarchyFormValue[];
}

interface IOwnRouteParams {
  menuUid: string;
  companyUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IOrganizationWorkflowFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IOrganizationWorkflowFormValue>>>;

  filterOrganizationHierarchy?: IOrganizationHierarchyListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IOrganizationWorkflowFormValue, actions: FormikActions<IOrganizationWorkflowFormValue>) => void;
}

export type WorkflowFormProps
  = WithOrganizationWorkflow
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<WorkflowFormProps, IOwnState> = (props: WorkflowFormProps): IOwnState => ({
  // form props
  formMode: FormMode.Edit,

  initialValues: {
    menu: {
      uid: '',
      name: ''
    },
    hierarchies: []
  },

  validationSchema: Yup.object().shape<Partial<IOrganizationWorkflowFormValue>>({
    hierarchies: Yup.array()
      .of(
        Yup.object().shape({
          hierarchyUid: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.workflowSetup.field.hierarchyUid))
            .required(),

          priority: Yup.number()
            .min(0)
            .label(props.intl.formatMessage(organizationMessage.workflowSetup.field.priority))
            .required(),
        })
      )
  }),

  filterOrganizationHierarchy: {
    companyUid: props.history.location.state.companyUid,
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<WorkflowFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
};

const handleCreators: HandleCreators<WorkflowFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: WorkflowFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const companyUid = props.history.location.state.companyUid;
      const menuUid = props.history.location.state.menuUid;
      const { isLoading } = props.organizationWorkflowState.certain;

      if (user && companyUid && menuUid && !isLoading) {
        props.organizationWorkflowDispatch.loadCertainRequest({
          companyUid,
          menuUid
        });
      }
    }
  },
  handleOnSubmit: (props: WorkflowFormProps) => (values: IOrganizationWorkflowFormValue, actions: FormikActions<IOrganizationWorkflowFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user && props.history.location.state) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payoad 
        const payload: IOrganizationWorkflowPostPayload = {
          hierarchies: []
        };

        values.hierarchies.forEach((item, index) => payload.hierarchies.push({
          hierarchyUid: item.hierarchyUid,
          priority: index + 1 // item.priority
        }));

        promise = new Promise((resolve, reject) => {
          props.organizationWorkflowDispatch.createRequest({
            resolve,
            reject,
            companyUid: props.history.location.state.companyUid,
            menuUid: props.history.location.state.menuUid,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        // fill payload
        const payload: IOrganizationWorkflowPutPayload = {
          hierarchies: []
        };

        values.hierarchies.forEach((item, index) => payload.hierarchies.push({
          workflowUid: item.uid,
          hierarchyUid: item.hierarchyUid,
          priority: index + 1
        }));

        promise = new Promise((resolve, reject) => {
          props.organizationWorkflowDispatch.updateRequest({
            resolve,
            reject,
            companyUid: props.history.location.state.companyUid,
            menuUid: props.history.location.state.menuUid,
            data: payload
          });
        });
      }
    }

    // handling promise 
    promise
      .then((response: IWorkflow) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear from status 
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.workflowSetup.message.createSuccess : organizationMessage.workflowSetup.message.updateSuccess)
        });

        props.history.push(`/organization/workflow`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.workflowSetup.message.createFailure : organizationMessage.workflowSetup.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<WorkflowFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: WorkflowFormProps) {
    const { response : thisResponse } = this.props.organizationWorkflowState.certain;
    const { response: prevResponse } = prevProps.organizationWorkflowState.certain;

    if (thisResponse !== prevResponse ) {
      if ( thisResponse && thisResponse.data.hierarchies) {
        const initialValues: IOrganizationWorkflowFormValue = {
          menu: {
            uid: thisResponse.data.menu && thisResponse.data.menu.uid,
            name: thisResponse.data.menu && thisResponse.data.menu.name
          },
          hierarchies: []
        };

        // fill hierarchies
        thisResponse.data.hierarchies.forEach(item => 
          initialValues.hierarchies.push({
            uid: item.uid,
            hierarchyUid: item.hierarchyUid,
            priority: item.priority
          })
        );

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const OrganizationWorkflowForm = compose<WorkflowFormProps, IOwnOption>(
  setDisplayName('OrganizationWorkflowForm'),
  withUser,
  withRouter,
  withOrganizationWorkflow,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(OrganizationWorkflowFormView);