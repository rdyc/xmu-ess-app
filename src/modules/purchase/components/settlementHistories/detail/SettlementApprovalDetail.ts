import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { ISettlementApprovalPostPayload } from '@purchase/classes/request/settlementHistories';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
// import { Handler } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { WithSettlementApproval, withSettlementApproval } from '@purchase/hoc/settlementHistories/withSettlementApproval';
import { purchaseApprovalMessage } from '@purchase/locales/messages/purchaseApprovalMessage';
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
import { SettlementApprovalDetailView } from './SettlementApprovalDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnState {
  isApprove?: boolean | undefined;
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
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<SettlementApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors.information[field] = props.intl.formatMessage({ id: `global.form.approval.field.${field}.required` });
      }
    });

    return errors;
  },
  handleSubmit: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest } = props.settlementApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.purchaseUid) {
      const message = intl.formatMessage(purchaseApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    stateUpdate({
      isApprove: isApproved,
    });

    // generate payload
    const payload: ISettlementApprovalPostPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : null
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
  handleSubmitSuccess: (props: SettlementApprovalDetailProps) => (response: boolean) => {
    const { intl, history, match, isApprove } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (isApprove) {
      message = intl.formatMessage(purchaseMessage.s_approval.message.approveSuccess, { uid: match.params.purchaseUid });
    } else {
      message = intl.formatMessage(purchaseMessage.s_approval.message.rejectSuccess, { uid: match.params.purchaseUid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    // if (match.params.purchaseUid) {
    history.push(`/purchase/settlementapprovals/list`);
    // }
  },
  handleSubmitFail: (props: SettlementApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(purchaseMessage.s_approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: SettlementApprovalDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.settlementApprovalDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        purchaseUid: match.params.purchaseUid
      });
    }
  }
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<SettlementApprovalDetailProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, appBarDispatch, handleRefresh, match } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.settlementApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseApproval,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage(purchaseMessage.s_approval.pages.detailTitle),
      subTitle: intl.formatMessage(purchaseMessage.s_approval.pages.detailSubHeader)
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case PurchaseApprovalUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        purchaseUid: match.params.purchaseUid
      });
    }
  },
  componentWillReceiveProps(nextProps: SettlementApprovalDetailProps) {
    if (nextProps.settlementApprovalState.detail.response !== this.props.settlementApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: intl.formatMessage(layoutMessage.action.refresh),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

const createProps: mapper<SettlementApprovalDetailProps, OwnState> = (props: SettlementApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage(purchaseMessage.s_approval.section.approveForm),
    approvalSubHeader: intl.formatMessage(purchaseMessage.s_approval.section.approveContent),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(purchaseMessage.s_approval.confirm.approveTitle),
    approvalDialogContentText: intl.formatMessage(purchaseMessage.s_approval.confirm.approveTitle),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.discard),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

export const SettlementApprovalDetail = compose<SettlementApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withSettlementApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SettlementApprovalDetailProps, OwnHandler>(handlerCreators),
  lifecycle<SettlementApprovalDetailProps, OwnState>(lifecycles),
)(SettlementApprovalDetailView);