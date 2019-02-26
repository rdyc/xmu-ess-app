import { WithUser, withUser } from '@layout/hoc/withUser';
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

import { FinanceStatusType, ModuleType, WorkflowStatusType } from '@common/classes/types';
import { IFinanceApprovalPostPayload } from '@finance/classes/request/approval';
import { FinanceUserAction } from '@finance/classes/types';
import { DocumentPath } from '@finance/classes/types/DocumentPath';
import { withFinanceApproval, WithFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { FinanceApprovalDetailView } from './FinanceApprovalDetailView';

interface OwnRouteParams {
  financeUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleToDocument: (moduleUid: string, documentUid: string) => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  menuOptions?: IPopupMenuOption[];
  action?: FinanceUserAction;
  shouldReload: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
  approvalRemarkLabel: string;
  approvalRemarkPlaceholder: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
  setShouldLoad: StateHandler<OwnState>;
}

export type FinanceApprovalDetailProps 
  = WithUser
  & WithFinanceApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<FinanceApprovalDetailProps, OwnState> = (props: FinanceApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    shouldReload: false,
    approvalTitle: intl.formatMessage(financeMessage.approval.section.approvalTitle),
    approvalSubHeader: intl.formatMessage(financeMessage.approval.section.approvalSubTitle),
    approvalChoices: [
      { value: FinanceStatusType.Paid, label: intl.formatMessage(financeMessage.approval.action.paid) },
      { value: FinanceStatusType.Hold, label: intl.formatMessage(financeMessage.approval.action.hold) },
      { value: FinanceStatusType.NotPaid, label: intl.formatMessage(financeMessage.approval.action.notPaid) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(financeMessage.approval.dialog.approvalTitle),
    approvalDialogContentText: intl.formatMessage(financeMessage.approval.dialog.approvalSubTitle),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
    approvalRemarkLabel: intl.formatMessage(financeMessage.approval.field.notes),
    approvalRemarkPlaceholder: intl.formatMessage(financeMessage.approval.field.notesPlaceholder)
  };
};

const stateUpdaters: StateUpdaters<FinanceApprovalDetailProps, OwnState, OwnStateUpdaters> = {
  setOptions: () => (options?: IPopupMenuOption[]): Partial<OwnState> => ({
    menuOptions: options
  }),
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setShouldLoad: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldReload: !prevState.shouldReload
  })
};

const handlerCreators: HandleCreators<FinanceApprovalDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: FinanceApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.financeUid && !props.financeApprovalState.detail.isLoading) {
      props.financeApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        financeUid: props.match.params.financeUid
      });
    }
  },
  handleOnSelectedMenu: (props: FinanceApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case FinanceUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleValidate: (props: FinanceApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];    
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: FinanceApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest } = props.financeApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.financeUid) {
      const message = intl.formatMessage(financeMessage.approval.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    stateUpdate({
      isApprove: isApproved,
    });
    
    // generate payload
    const payload: IFinanceApprovalPostPayload = {
      statusType: !isNullOrUndefined(formData.isApproved) ? formData.isApproved : FinanceStatusType.Approved,
      notes: !isNullOrUndefined(formData.remark) ? formData.remark : ''
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        financeUid: match.params.financeUid, 
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: FinanceApprovalDetailProps) => () => {
    const { intl, } = props;
    const { alertAdd } = props.layoutDispatch;
    let message: string = '';
    message = intl.formatMessage(financeMessage.approval.message.createSuccess);
    alertAdd({
      message,
      time: new Date()
    });

    props.setShouldLoad();
  },
  handleSubmitFail: (props: FinanceApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(financeMessage.approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleToDocument: (props: FinanceApprovalDetailProps) => (moduleUid: string, documentUid: string) => {
    const { history } = props;
    let path: string = '';
    
    switch (moduleUid) {
      case ModuleType.Expense:
      path = DocumentPath.Expense;
      break;

      case ModuleType.Purchase:
      path = DocumentPath.Purchase;
      break;

      case ModuleType.PurchaseSettlement:
      path = DocumentPath.PurchaseSettlement;
      break;

      case ModuleType.Mileage:
      path = DocumentPath.Mileage;
      break;

      case ModuleType.Travel:
      path = DocumentPath.Travel;
      break;

      case ModuleType.TravelSettlement:
      path = DocumentPath.TravelSettlement;
      break;

      default:

    }

    history.push(`/${path}/${documentUid}`, {financeUid: props.match.params.financeUid});
  }
};

const lifecycles: ReactLifeCycleFunctions<FinanceApprovalDetailProps, OwnState> = {
  componentDidUpdate(prevProps: FinanceApprovalDetailProps) {
    if (this.props.shouldReload && this.props.shouldReload !== prevProps.shouldReload) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.financeUid !== prevProps.match.params.financeUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.financeApprovalState.detail.response !== prevProps.financeApprovalState.detail.response) {
      const options: IPopupMenuOption[] = [
        {
          id: FinanceUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.financeApprovalState.detail.isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  },
};

export const FinanceApprovalDetail = compose(
  setDisplayName('FinanceApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withFinanceApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(FinanceApprovalDetailView);