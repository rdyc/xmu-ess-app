import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { TravelUserAction } from '@travel/classes/types';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import { WithTravelSettlementApproval, withTravelSettlementApproval } from '@travel/hoc/withTravelSettlementApproval';
import { travelApprovalMessage } from '@travel/locales/messages/travelApprovalMessages';
import { TravelSettlementApprovalDetailView } from './TravelSettlementApprovalDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  travelSettlementUid: string;
}

interface OwnState {
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

export type TravelSettlementApprovalDetailProps
  = WithTravelSettlementApproval
  & WithTravelApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const handlerCreators: HandleCreators<TravelSettlementApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: TravelSettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({id: `workflow.approval.field.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: TravelSettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.travelSettlementApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.travelSettlementUid) {
      const message = intl.formatMessage(travelApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IWorkflowApprovalPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : null
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        travelSettlementUid: match.params.travelSettlementUid, 
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: TravelSettlementApprovalDetailProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(travelApprovalMessage.updateSuccess),
    });

    history.push('/travel/approvals/settlement');
    
  },
  handleSubmitFail: (props: TravelSettlementApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(travelApprovalMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: TravelSettlementApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.travelSettlementApprovalDispatch;
    const { response } = props.travelSettlementApprovalState.detail;
    const loadRequest = props.travelApprovalDispatch.loadDetailRequest;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        travelSettlementUid: match.params.travelSettlementUid
      });

      // load travel request
      if (response) {
        loadRequest ({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: response.data.travelUid
        });
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementApprovalDetailProps, {}> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.travelSettlementApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.TravelSettlementApproval,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: 'travelSettlement.detail.title'}),
      subTitle : intl.formatMessage({id: 'travelSettlement.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TravelUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        travelSettlementUid: match.params.travelSettlementUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: TravelSettlementApprovalDetailProps) {
    if (nextProps.travelSettlementApprovalState.detail.response !== this.props.travelSettlementApprovalState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.travelSettlementApprovalState.detail;
      const { assignMenus } = nextProps.appBarDispatch;
      const { user } = this.props.userState;
      const loadRequest = this.props.travelApprovalDispatch.loadDetailRequest;

      if (user && response) {
        loadRequest ({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: response.data.travelUid
        });
      }

      const currentMenus = [
        {
          id: TravelUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
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

const createProps: mapper<TravelSettlementApprovalDetailProps, OwnState> = (props: TravelSettlementApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({id: 'travel.approvalTitle'}),
    approvalSubHeader: intl.formatMessage({id: 'travel.approvalSubHeader'}),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({id: 'workflow.approval.action.approve'}) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({id: 'workflow.approval.action.reject'}) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({id: 'travel.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'travel.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

export const TravelSettlementApprovalDetail = compose<TravelSettlementApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTravelSettlementApproval,
  withTravelApproval,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<TravelSettlementApprovalDetailProps, OwnHandler>(handlerCreators),
  lifecycle<TravelSettlementApprovalDetailProps, {}>(lifecycles),
)(TravelSettlementApprovalDetailView);