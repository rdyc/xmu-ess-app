import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { WorkflowApprovalRemarkFormData } from '@organization/components/workflow/approval/WorkflowApprovalRemarkForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IPurchaseApprovalPostPayload } from '@purchase/classes/request/purchaseApproval';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
import { WithPurchaseApproval, withPurchaseApproval } from '@purchase/hoc/purchaseApproval/withPurchaseApproval';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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

import { PurchaseApprovalDetailView } from './PurchaseApprovalDetailView';

interface IOwnRouteParams {
  purchaseUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleValidate: (payload: WorkflowApprovalRemarkFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalRemarkFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
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

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type PurchaseApprovalDetailProps
  = WithPurchaseApproval
  & WithUser
  & WithLayout
  & WithNotification
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<PurchaseApprovalDetailProps, IOwnState> = (props: PurchaseApprovalDetailProps): IOwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(purchaseMessage.approval.section.approveForm),
  approvalSubHeader: props.intl.formatMessage(purchaseMessage.approval.section.approveContent),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(purchaseMessage.approval.message.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(purchaseMessage.approval.message.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(purchaseMessage.approval.confirm.approveTitle),
  approvalDialogContentText: props.intl.formatMessage(purchaseMessage.approval.confirm.approveDescription),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.discard),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue),

});

const stateUpdaters: StateUpdaters<PurchaseApprovalDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: PurchaseApprovalDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (state: IOwnState, props: PurchaseApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<PurchaseApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: PurchaseApprovalDetailProps) => () => {
    if (props.userState.user && !props.purchaseApprovalState.detail.isLoading && props.match.params.purchaseUid) {
      props.purchaseApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        purchaseUid: props.match.params.purchaseUid
      });
    }
  },
  handleOnSelectedMenu: (props: PurchaseApprovalDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case PurchaseApprovalUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleValidate: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalRemarkFormData) => {
    const errors = {
    };

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
  handleSubmit: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalRemarkFormData) => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.purchaseApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.purchaseUid) {
      const message = intl.formatMessage(purchaseMessage.approval.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IPurchaseApprovalPostPayload = {
      isApproved,
      remark: formData.remark
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve,
        reject,
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload,
      });
    });
  },
  handleSubmitSuccess: (props: PurchaseApprovalDetailProps) => () => {
    let message: string = '';

    message = props.intl.formatMessage(purchaseMessage.approval.message.submitSuccess, { uid: props.match.params.purchaseUid });

    props.layoutDispatch.alertAdd({
      message,
      time: new Date()
    });

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.Purchase,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.purchaseUid
    });
    
    // set next load
    props.setShouldLoad();
  },
  handleSubmitFail: (props: PurchaseApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(purchaseMessage.approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<PurchaseApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: PurchaseApprovalDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of should load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.purchaseUid !== prevProps.match.params.purchaseUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.purchaseApprovalState.detail !== prevProps.purchaseApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.purchaseApprovalState.detail.isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const PurchaseApprovalDetail = compose<PurchaseApprovalDetailProps, {}>(
  setDisplayName('PurchaseApprovalDetail'),
  withUser,
  withLayout,
  withRouter,
  withPurchaseApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PurchaseApprovalDetailView);