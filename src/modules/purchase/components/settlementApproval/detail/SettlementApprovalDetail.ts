import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ISettlementApprovalPostPayload } from '@purchase/classes/request/settlementApproval';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
import { WithSettlementApproval, withSettlementApproval } from '@purchase/hoc/settlementApproval/withSettlementApproval';
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

import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { SettlementApprovalDetailView } from './SettlementApprovalDetailView';

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  setNextLoad: StateHandler<OwnState>;
}

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnState {
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

export type SettlementApprovalDetailProps
  = WithSettlementApproval
  & WithNotification
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<SettlementApprovalDetailProps, OwnState> = (props: SettlementApprovalDetailProps): OwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(purchaseMessage.s_approval.section.approveForm),
  approvalSubHeader: props.intl.formatMessage(purchaseMessage.s_approval.section.approveContent),
  // approvalSubHeader: ` `,
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(purchaseMessage.s_approval.message.approve) },
    { value: WorkflowStatusType.AdjustmentNeeded, label: props.intl.formatMessage(purchaseMessage.s_approval.message.adjustmentNeeded) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(purchaseMessage.s_approval.confirm.approveTitle),
  approvalDialogContentText: props.intl.formatMessage(purchaseMessage.s_approval.confirm.approveDescription),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.discard),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue),

});

const stateUpdaters: StateUpdaters<SettlementApprovalDetailProps, OwnState, OwnStateUpdaters> = {
  setNextLoad: (state: OwnState, props: SettlementApprovalDetailProps) => (): Partial<OwnState> => ({
    shouldLoad: !state.shouldLoad
  }), 
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (state: OwnState, props: SettlementApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<SettlementApprovalDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: SettlementApprovalDetailProps) => () => {
    if (props.userState.user && !props.settlementApprovalState.detail.isLoading && props.match.params.purchaseUid) {
      props.settlementApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        purchaseUid: props.match.params.purchaseUid
      });
    }
  },
  handleOnSelectedMenu: (props: SettlementApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case PurchaseApprovalUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
  handleValidate: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {
    };

    const requiredFields = formData.isApproved !== props.approvalTrueValue
      ? ['isApproved', 'remark']
      : ['isApproved'];
      
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.settlementApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.purchaseUid) {
      const message = intl.formatMessage(purchaseMessage.s_approval.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: ISettlementApprovalPostPayload = {
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
  handleSubmitSuccess: (props: SettlementApprovalDetailProps) => () => {
    let message: string = '';

    message = props.intl.formatMessage(purchaseMessage.s_approval.message.submitSuccess, { uid: props.match.params.purchaseUid });

    props.layoutDispatch.alertAdd({
      message,
      time: new Date()
    });

    props.setNextLoad();

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.PurchaseSettlement,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.purchaseUid
    });
  },
  handleSubmitFail: (props: SettlementApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(purchaseMessage.s_approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SettlementApprovalDetailProps, OwnState> = {
  componentDidUpdate(prevProps: SettlementApprovalDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of should load
      this.props.setNextLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.purchaseUid !== prevProps.match.params.purchaseUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.settlementApprovalState.detail !== prevProps.settlementApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.settlementApprovalState.detail.isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const SettlementApprovalDetail = compose<SettlementApprovalDetailProps, {}>(
  setDisplayName('SettlementApprovalDetail'),
  withUser,
  withLayout,
  withRouter,
  withSettlementApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(SettlementApprovalDetailView);