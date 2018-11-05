import { FinanceStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { IFinanceApprovalBulkPostPayload, IFinanceApprovalItem } from '@finance/classes/request/approval';
import { IFinance } from '@finance/classes/response';
import { FinanceApprovalUserAction } from '@finance/classes/types';
import { ApprovalPaymentView } from '@finance/components/approval/payment/ApprovalPaymentView';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeApprovalMessage } from '@finance/locales/messages/financeApprovalMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
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

interface OwnHandler {
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  financeUids: string[];
  finances: IFinance[] | null | undefined;
  action?: FinanceApprovalUserAction | undefined;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  financeUids: string;
}

export type ApprovalPaymentProps
  = WithFinanceApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<ApprovalPaymentProps, OwnState> = (props: ApprovalPaymentProps): OwnState => { 
  const { intl } = props;
  return {
    finances: [],
    financeUids: props.match.params.financeUids.split(','),
    approvalTitle: intl.formatMessage({id: 'finance.approvalTitle'}),
    approvalSubHeader: intl.formatMessage({id: 'finance.approvalSubHeader'}),
    approvalChoices: [
      { value: FinanceStatusType.Paid, label: intl.formatMessage({id: 'finance.approval.action.paid'}) },
      { value: FinanceStatusType.Hold, label: intl.formatMessage({id: 'finance.approval.action.hold'}) },
      { value: FinanceStatusType.NotPaid, label: intl.formatMessage({id: 'finance.approval.action.notPaid'}) }
    ],
    approvalTrueValue: FinanceStatusType.Paid,
    approvalDialogTitle: intl.formatMessage({id: 'finance.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'finance.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};
  
const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
    stateUpdate: (prevState: OwnState) => (newState: any) => ({
      ...prevState,
      ...newState
    }),
    stateReset: (prevState: OwnState) => () => ({
      ...prevState,
      dialogFullScreen: false,
      dialogOpen: false,
      dialogTitle: undefined,
      dialogDescription: undefined,
      dialogCancelText: 'global.action.cancel',
      dialogConfirmedText: 'global.action.ok',
    })
  };
  
const handlerCreators: HandleCreators<ApprovalPaymentProps, OwnHandler> = {
  handleValidate: (props: ApprovalPaymentProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({id: `workflow.approval.field.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ApprovalPaymentProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl, financeUids } = props;
    const { user } = props.userState;
    const { bulkCreateRequest } = props.financeApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.financeUids) {
      const message = intl.formatMessage(financeApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    const _financeUids = financeUids.map((financeUid: string) => {
      const uids: IFinanceApprovalItem = ({
        uid: financeUid
      });
      return uids;
    });

    // generate payload
    const payload: IFinanceApprovalBulkPostPayload = {
      financeUids: _financeUids,
      statusType: !isNullOrUndefined(formData.isApproved) ? formData.isApproved : FinanceStatusType.Approved,
      notes: !isNullOrUndefined(formData.remark) ? formData.remark : ''
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      bulkCreateRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: ApprovalPaymentProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(financeApprovalMessage.createSuccess),
    });

    history.push('/approval/finance/list');
  },
  handleSubmitFail: (props: ApprovalPaymentProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(financeApprovalMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },  
};
  
const lifecycles: ReactLifeCycleFunctions<ApprovalPaymentProps, OwnState> = {
    componentDidMount() {
      const { 
        layoutDispatch, appBarDispatch, intl, 
        handleRefresh, history
      } = this.props;
      const { response } = this.props.financeApprovalState.all;
  
      layoutDispatch.changeView({
        uid: AppMenu.FinanceApproval,
        parentUid: AppMenu.Finance,
        title: intl.formatMessage({id: 'finance.detail.title'}),
        subTitle : intl.formatMessage({id: 'finance.detail.subTitle'})
      });
  
      layoutDispatch.navBackShow();
      
      const handleMenuClick = (menu: IAppBarMenu): void => {
        switch (menu.id) {
          case FinanceApprovalUserAction.Refresh:
            handleRefresh();
            break;
        
          default:
            break;
        }
      };
  
      appBarDispatch.assignCallback(handleMenuClick);
      
      if ( response && response.data ) {
        loadDetail(this.props);
      } else {
        history.goBack();
      }
    },
    componentWillReceiveProps(nextProps: ApprovalPaymentProps) {
      if (nextProps.financeApprovalState.all.response !== this.props.financeApprovalState.all.response) {
        const { intl } = nextProps;
        const { assignMenus } = nextProps.appBarDispatch;
          
        const currentMenus = [
          {
            id: FinanceApprovalUserAction.Refresh,
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

const loadDetail = (props: ApprovalPaymentProps): void => {
  const { financeUids, stateUpdate } = props;
  const { response } = props.financeApprovalState.all;

  const _finances = response && response.data && response.data.filter(finance => 
    financeUids.some(financeUid => 
      financeUid === finance.uid
  ));

  stateUpdate({
    finances: _finances
  });
};
  
export const ApprovalPayment = compose<ApprovalPaymentProps, {}>(
    withUser,
    withLayout,
    withAppBar,
    withRouter,
    withFinanceApproval,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
    withHandlers<ApprovalPaymentProps, OwnHandler>(handlerCreators),
    lifecycle<ApprovalPaymentProps, OwnState>(lifecycles),
  )(ApprovalPaymentView);