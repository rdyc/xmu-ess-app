import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IPurchaseApprovalPostPayload } from '@purchase/classes/request/purchaseApproval';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { IAppBarMenu } from '@layout/interfaces';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
import { PurchaseApprovalDetailView } from './PurchaseApprovalDetailView';

interface OwnHandler {
  handleOnLoadApi: () => void;
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
  pageOptions?: IAppBarMenu[];
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

const stateUpdaters: StateUpdaters<PurchaseApprovalDetailProps, OwnState, OwnStateUpdaters> = {
  setNextLoad: (state: OwnState, props: PurchaseApprovalDetailProps) => (): Partial<OwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: OwnState, props: PurchaseApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  })
};

export type PurchaseApprovalDetailProps
  = WithPurchaseApproval
  & WithNotification
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<PurchaseApprovalDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: PurchaseApprovalDetailProps) => () => {
    if (props.userState.user && !props.purchaseApprovalState.detail.isLoading && props.match.params.purchaseUid) {
      props.purchaseApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        purchaseUid: props.match.params.purchaseUid
      });
    }
  },
  handleValidate: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
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
  handleSubmit: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
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
      moduleUid: ModuleDefinition.Purchase,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.purchaseUid
    });

    // set next load
    props.setNextLoad();
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

const createProps: mapper<PurchaseApprovalDetailProps, OwnState> = (props: PurchaseApprovalDetailProps): OwnState => ({
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

const lifecycles: ReactLifeCycleFunctions<PurchaseApprovalDetailProps, OwnState> = {
  componentDidUpdate(prevProps: PurchaseApprovalDetailProps) {
    // handle updated should load
    if (this.props.shoulLoad && this.props.shoulLoad !== prevProps.shoulLoad) {
      // turn of shoul load
      this.props.setNextLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.purchaseUid !== prevProps.match.params.purchaseUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.purchaseApprovalState.detail !== prevProps.purchaseApprovalState.detail) {
      const options: IAppBarMenu[] = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.purchaseApprovalState.detail.isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const PurchaseApprovalDetail = compose<PurchaseApprovalDetailProps, {}>(
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