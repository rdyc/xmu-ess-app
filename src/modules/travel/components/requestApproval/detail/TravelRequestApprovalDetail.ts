import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalRemarkFormData } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
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
  setDisplayName,
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

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleValidate: (payload: WorkflowApprovalRemarkFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalRemarkFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  travelUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type TravelRequestApprovalDetailProps
  = WithTravelApproval
  & WithNotification
  & WithUser
  & WithLayout
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<TravelRequestApprovalDetailProps, IOwnState> = (props: TravelRequestApprovalDetailProps): IOwnState => ({
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

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: TravelRequestApprovalDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState, props: TravelRequestApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<TravelRequestApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: TravelRequestApprovalDetailProps) => () => { 
    if (props.userState.user && !props.travelApprovalState.detail.isLoading && props.match.params.travelUid) {
      props.travelApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        travelUid: props.match.params.travelUid
      });
    }
  },
  handleOnSelectedMenu: (props: TravelRequestApprovalDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case TravelUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleValidate: (props: TravelRequestApprovalDetailProps) => (formData: WorkflowApprovalRemarkFormData) => { 
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
  handleSubmit: (props: TravelRequestApprovalDetailProps) => (formData: WorkflowApprovalRemarkFormData) => { 
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

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.Travel,
      detailType: NotificationType.Approval,
      itemUid: match.params.travelUid
    });

    // set next load
    props.setShouldLoad();

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

const lifecycles: ReactLifeCycleFunctions<TravelRequestApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: TravelRequestApprovalDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.travelUid !== prevProps.match.params.travelUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.travelApprovalState.detail !== prevProps.travelApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: TravelUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.travelApprovalState.detail.isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TravelRequestApprovalDetail = compose<TravelRequestApprovalDetailProps, {}>(
  setDisplayName('TravelApprovalDetail'),
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