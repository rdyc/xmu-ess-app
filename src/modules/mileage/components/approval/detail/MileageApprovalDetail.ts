import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageApprovalUserAction, MileageUserAction } from '@mileage/classes/types';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { IWorkflowApprovalItemPayload } from '@organization/classes/request/workflow/approval';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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
import { WorkflowApprovalMileageFormData } from './WorkflowMileageApproval';

import { MileageApprovalDetailView } from './MileageApprovalDetailView';

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleCheckbox: (mileageItemUid: string) => void;
  handleValidate: (payload: WorkflowApprovalMileageFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalMileageFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => void;
}

interface IOwnRouteParams {
  mileageUid: string;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: MileageApprovalUserAction;
  shouldDataReload: boolean;
  mileageItemUids: string[];
  itemsNeedApprove: number;
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
  stateApprovalItem: StateHandler<IOwnState>;
  stateCheckbox: StateHandler<IOwnState>;
  setDataload: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

export type MileageApprovalDetailProps 
  = WithMileageApproval 
  & WithUser 
  & WithLayout 
  & WithNotification
  & WithOidc
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdaters;

const createProps: mapper<MileageApprovalDetailProps, IOwnState> = (
  props: MileageApprovalDetailProps
): IOwnState => {
  const { intl } = props;
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  
  return {
    isAdmin,
    mileageItemUids: [],
    itemsNeedApprove: 0,
    shouldDataReload: false,
    approvalTitle: intl.formatMessage(mileageMessage.approval.submission.title),
    approvalSubHeader: intl.formatMessage(mileageMessage.approval.submission.subHeader),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(mileageMessage.approval.submission.dialogTitle),
    approvalDialogContentText: intl.formatMessage(mileageMessage.approval.submission.dialogContent),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue)
  };
};

const stateUpdaters: StateUpdaters<MileageApprovalDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateCheckbox: (prevState: IOwnState) => (mileageItemUids: string[]) => ({
    mileageItemUids
  }),
  setDataload: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  }),
  setOptions: (prevState: IOwnState, props: MileageApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
  stateApprovalItem: (prevState: IOwnState) => () => ({
    itemsNeedApprove: prevState.itemsNeedApprove + 1
  })
};

const handlerCreators: HandleCreators<
  MileageApprovalDetailProps,
  IOwnHandler
> = {
  handleOnLoadApi: (props: MileageApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.mileageUid && !props.mileageApprovalState.detail.isLoading) {
      props.mileageApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        mileageUid: props.match.params.mileageUid
      });
    }
  },
  handleCheckbox: (props: MileageApprovalDetailProps) => (
    mileageItemUid: string
  ) => {
    const { mileageItemUids, stateCheckbox } = props;
    const _mileageItemUid = new Set(mileageItemUids);

    _mileageItemUid.has(mileageItemUid)
      ? _mileageItemUid.delete(mileageItemUid)
      : _mileageItemUid.add(mileageItemUid);

    stateCheckbox(Array.from(_mileageItemUid));
  },
  handleValidate: (props: MileageApprovalDetailProps) => (
    formData: WorkflowApprovalMileageFormData
  ) => {
    const errors = {};
    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },

  handleSubmit: (props: MileageApprovalDetailProps) => (
    formData: WorkflowApprovalMileageFormData
  ) => {
    const { match, intl, mileageItemUids } = props;
    const { user } = props.userState;
    const { createRequest } = props.mileageApprovalDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.mileageUid) {
      const message = intl.formatMessage(mileageMessage.request.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    const mileageItemUid: IMileageApprovalPostItem[] = [];

    mileageItemUids.map(item =>
      mileageItemUid.push({
        mileageItemUid: item
      })
    );

    // generate payload
    const payload: IWorkflowApprovalItemPayload = {
      isApproved,
      items: mileageItemUid,
      remark: !isApproved ? formData.remark : undefined
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve,
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        mileageUid: match.params.mileageUid,
        data: payload
      });
    });
  },

  handleSubmitSuccess: (props: MileageApprovalDetailProps) => (
    response: IMileageRequestDetail
  ) => {
    const { match, intl, history, mileageItemUids, itemsNeedApprove } = props;
    const { alertAdd } = props.layoutDispatch;
    const { detail } = props.mileageApprovalState;

    alertAdd({
      time: new Date(),
      message: intl.formatMessage(mileageMessage.approval.message.updateSuccess, {
        uid: detail.response && detail.response.data.uid
      })
    });
    // props.setDataload();
    // mileageItemUids.splice(0, mileageItemUids.length);

    // back to approval list
    if (mileageItemUids.length === itemsNeedApprove) {
      history.push('/mileage/approvals', {isReload: true});

      // notification: mark as complete
      props.notificationDispatch.markAsComplete({
        moduleUid: ModuleDefinition.Mileage,
        detailType: NotificationType.Approval,
        itemUid: match.params.mileageUid
      });
    } else {
      history.push('/mileage/approvals');
    }
  },

  handleSubmitFail: (props: MileageApprovalDetailProps) => (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => {
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
        message: intl.formatMessage(mileageMessage.approval.message.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MileageApprovalDetailProps) {
    // handle updated route params
    if (this.props.match.params.mileageUid !== prevProps.match.params.mileageUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.mileageApprovalState.detail.response !== prevProps.mileageApprovalState.detail.response) {
      const { isLoading } = this.props.mileageApprovalState.detail;

      const options: IAppBarMenu[] = [
        {
          id: MileageUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        }
      ];

      this.props.setOptions(options);
      if (this.props.mileageApprovalState.detail.response && 
        this.props.mileageApprovalState.detail.response.data &&
        this.props.mileageApprovalState.detail.response.data.items &&
        this.props.itemsNeedApprove === 0
        ) {
        this.props.mileageApprovalState.detail.response.data.items.map(item => {
            if (item.statusType === WorkflowStatusType.Submitted) {
              this.props.stateApprovalItem();
            }
          }  
        );
      }
    }
  }
};

export const MileageApprovalDetail = compose<MileageApprovalDetailProps, {}>(
  setDisplayName('MileageApprovalDetail'),
  withUser,
  withLayout,
  withOidc,
  withRouter,
  withMileageApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(MileageApprovalDetailView);