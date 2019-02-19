import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import { travelApprovalMessage } from '@travel/locales/messages/travelApprovalMessages';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { TravelRequestApprovalDetailView } from './TravelRequestApprovalDetailView';

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  travelUid: string;
}

interface OwnState {
  shouldLoad: boolean;
  pageOptions?: IAppBarMenu[];
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  setNextLoad: StateHandler<OwnState>;
}

export type TravelRequestApprovalDetailProps
  = WithTravelApproval
  & WithNotification
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdater;

const createProps: mapper<TravelRequestApprovalDetailProps, OwnState> = (props: TravelRequestApprovalDetailProps): OwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(travelMessage.request.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(travelMessage.request.section.approvalSubHeader),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(travelMessage.requestApproval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(travelMessage.requestApproval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdater> = {
  setNextLoad: (state: OwnState, props: TravelRequestApprovalDetailProps) => (): Partial<OwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: OwnState, props: TravelRequestApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  })
};

const handlerCreators: HandleCreators<TravelRequestApprovalDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: TravelRequestApprovalDetailProps) => () => { 
    if (props.userState.user && !props.travelApprovalState.detail.isLoading && props.match.params.travelUid) {
      props.travelApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        travelUid: props.match.params.travelUid
      });
    }
  },
  handleValidate: (props: TravelRequestApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = formData.isApproved !== props.approvalTrueValue
      ? ['isApproved', 'remark']
      : ['isApproved'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: TravelRequestApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.travelApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.travelUid) {
      const message = intl.formatMessage(travelApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IWorkflowApprovalPayload = {
      isApproved,
      remark: formData.remark
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        travelUid: match.params.travelUid, 
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: TravelRequestApprovalDetailProps) => (response: boolean) => {
    const { intl, match } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(travelApprovalMessage.submitSuccess),
    });

    props.setNextload();
    // history.push('/travel/approvals/request');

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinition.Travel,
      detailType: NotificationType.Approval,
      itemUid: match.params.travelUid
    });
  },
  handleSubmitFail: (props: TravelRequestApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(travelApprovalMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelRequestApprovalDetailProps, OwnState> = {
  componentDidUpdate(prevProps: TravelRequestApprovalDetailProps) {
    // handle updated should load
    if (this.props.shoulLoad && this.props.shoulLoad !== prevProps.shoulLoad) {
      // turn of shoul load
      this.props.setNextLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.travelUid !== prevProps.match.params.travelUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.travelApprovalState.detail !== prevProps.travelApprovalState.detail) {
      const options: IAppBarMenu[] = [
        {
          id: TravelUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.travelApprovalState.detail.isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TravelRequestApprovalDetail = compose<TravelRequestApprovalDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withNotification,
  withTravelApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TravelRequestApprovalDetailView);