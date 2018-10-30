import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { IPurchaseApprovalPostPayload } from '@purchase/classes/request/purchaseHistories';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
// import { Handler } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { WithPurchaseApproval, withPurchaseApproval } from '@purchase/hoc/purchaseHistories/withPurchaseApproval';
import { purchaseApprovalMessage } from '@purchase/locales/messages/purchaseApprovalMessage';
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
import { PurchaseApprovalDetailView } from './PurchaseApprovalDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap < OwnState > {
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

export type PurchaseApprovalDetailProps
  = WithPurchaseApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<PurchaseApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
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
  handleSubmit: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest } = props.purchaseApprovalDispatch;

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
    const payload: IPurchaseApprovalPostPayload = {
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
  handleSubmitSuccess: (props: PurchaseApprovalDetailProps) => (response: boolean) => {
    const { intl, history, match, isApprove } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (isApprove) {
      message = intl.formatMessage(purchaseApprovalMessage.approveSuccess, { uid: match.params.purchaseUid });
    } else {
      message = intl.formatMessage(purchaseApprovalMessage.rejectSuccess, { uid: match.params.purchaseUid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (match.params.purchaseUid) {
      history.push(`/approval/purchase/list`);
    }
  },
  handleSubmitFail: (props: PurchaseApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(purchaseApprovalMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: PurchaseApprovalDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.purchaseApprovalDispatch;

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

const lifecycles: ReactLifeCycleFunctions<PurchaseApprovalDetailProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, appBarDispatch, handleRefresh, match } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.purchaseApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseApproval,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({ id: 'purchase.form.approval.newTitle' }),
      subTitle: intl.formatMessage({ id: 'purchase.form.approval.newSubTitle' })
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
  componentWillReceiveProps(nextProps: PurchaseApprovalDetailProps) {
    if (nextProps.purchaseApprovalState.detail.response !== this.props.purchaseApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
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

const createProps: mapper<PurchaseApprovalDetailProps, OwnState> = (props: PurchaseApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({ id: 'purchase.approvalTitle' }),
    approvalSubHeader: intl.formatMessage({ id: 'purchase.approvalSubHeader' }),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({ id: 'workflow.approval.action.approve' }) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({ id: 'workflow.approval.action.reject' }) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({ id: 'purchase.dialog.approvalTitle' }),
    approvalDialogContentText: intl.formatMessage({ id: 'purchase.dialog.approvalContent' }),
    approvalDialogCancelText: intl.formatMessage({ id: 'global.action.cancel' }),
    approvalDialogConfirmedText: intl.formatMessage({ id: 'global.action.continue' }),
  };
};

export const PurchaseApprovalDetail = compose<PurchaseApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseApprovalDetailProps, OwnHandler>(handlerCreators),
  lifecycle<PurchaseApprovalDetailProps, OwnState>(lifecycles),
)(PurchaseApprovalDetailView);