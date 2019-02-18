import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { IWorkflowApprovalItemPayload } from '@organization/classes/request/workflow/approval';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
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

import { MileageApprovalDetailView } from './MileageApprovalDetailView';
import { WorkflowApprovalMileageFormData } from './WorkflowMileageApproval';

interface IOwnHandler {
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
  shouldDataReload: boolean;
  mileageItemUids: string[];
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
  stateCheckbox: StateHandler<IOwnState>;
  setDataload: StateHandler<IOwnState>;
}

export type MileageApprovalDetailProps 
  = WithMileageApproval 
  & WithUser 
  & WithLayout 
  & WithAppBar 
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdaters;

const createProps: mapper<MileageApprovalDetailProps, IOwnState> = (
  props: MileageApprovalDetailProps
): IOwnState => {
  const { intl } = props;

  return {
    mileageItemUids: [],
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

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateCheckbox: (prevState: IOwnState) => (mileageItemUids: string[]) => ({
    mileageItemUids
  }),
  setDataload: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

const handlerCreators: HandleCreators<
  MileageApprovalDetailProps,
  IOwnHandler
> = {
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
    const { match, intl, history /*mileageItemUids*/ } = props;
    const { alertAdd } = props.layoutDispatch;
    const { detail } = props.mileageApprovalState;
    // let counter: number = 0;

    alertAdd({
      time: new Date(),
      message: intl.formatMessage(mileageMessage.approval.message.updateSuccess, {
        uid: detail.response && detail.response.data.uid
      })
    });

    // if (detail.response && detail.response.data && detail.response.data.items) {
    //   detail.response.data.items.map(item => {
    //     return item.status && item.status.type === WorkflowStatusType.Submitted
    //       ? (counter += 1)
    //       : (counter += 0);
    //   });
    // }

    // props.setDataload();
    // mileageItemUids.splice(0, mileageItemUids.length);

    // if (mileageItemUids.length === counter) {
    //   props.setDataload();
    // } else {
    //   loadData(props);
    //   mileageItemUids.splice(0, mileageItemUids.length);
    // }

    // back to approval list
    history.push('/mileage/approvals');

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinition.Mileage,
      detailType: NotificationType.Approval,
      itemUid: match.params.mileageUid
    });
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

// const loadData = (props: MileageApprovalDetailProps): void => {
//   const { match } = props;
//   const { user } = props.userState;
//   const { loadDetailRequest } = props.mileageApprovalDispatch;

//   if (user) {
//     loadDetailRequest({
//       mileageUid: match.params.mileageUid,
//       companyUid: user.company.uid,
//       positionUid: user.position.uid
//     });
//   }
// };

export const MileageApprovalDetail = compose<MileageApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withMileageApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  setDisplayName('MileageApprovalDetail')
)(MileageApprovalDetailView);