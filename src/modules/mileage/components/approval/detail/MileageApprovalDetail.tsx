import AppMenu from '@constants/AppMenu';
import {
  SingleConfig,
  SingleHandler,
  SinglePage,
} from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageUserAction } from '@mileage/classes/types';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';

import { WorkflowStatusType } from '@common/classes/types';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
import { MileageApprovalItem } from '@mileage/components/approval/detail/MileageApprovalItem';
import {
  withMileageApproval,
  WithMileageApproval
} from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { IWorkflowApprovalItemPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { WorkflowApprovalMileageFormData, WorkflowMileageApproval } from './WorkflowMileageApproval';

interface OwnState {
  ItemUids: string[];
}

interface OwnHandler {
  handleCheckbox: (ItemUid: string) => void;
  handleValidate: (payload: WorkflowApprovalMileageFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalMileageFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (
    errors: FormErrors | undefined,
    dispatch: Dispatch<any>,
    submitError: any
  ) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateCheckBox: StateHandler<OwnState>;
}

const createProps: mapper<AllProps, OwnState> = ( props: AllProps ): OwnState => {
  return {
    ItemUids: []
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateCheckBox: (prev: OwnState) => (ItemUids: string[]) => ({
    ItemUids
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleCheckbox: (props: AllProps) => ( ItemUid: string ) => {
    const { ItemUids, stateCheckBox } = props;
    const _ItemUid = new Set(ItemUids);

    _ItemUid.has(ItemUid) ? _ItemUid.delete(ItemUid) : _ItemUid.add(ItemUid);

    stateCheckBox(Array.from(_ItemUid));
  },
  handleValidate: (props: AllProps) => (
    formData: WorkflowApprovalMileageFormData
  ) => {
    const errors = {};
    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({
          id: `workflow.approval.field.${field}.required`
        });
      }
    });

    return errors;
  },

  handleSubmit: (props: AllProps) => (
    formData: WorkflowApprovalMileageFormData
  ) => {
    const { match, intl, ItemUids } = props;
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

    ItemUids.map(item =>
      mileageItemUid.push({
        mileageItemUid: item
      })
    );

    // generate payload
    const payload: IWorkflowApprovalItemPayload = {
      isApproved,
      items: mileageItemUid,
      remark: !isApproved ? formData.remark : null
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

  handleSubmitSuccess: (props: AllProps) => (
    response: IMileageRequestDetail
  ) => {
    const { intl, history, ItemUids } = props;
    const { alertAdd } = props.layoutDispatch;
    const { detail } = props.mileageApprovalState;
    let counter: number = 0;

    alertAdd({
      time: new Date(),
      message: intl.formatMessage(mileageMessage.approval.message.updateSuccess, {
        uid: detail.response && detail.response.data.uid
      })
    });

    if (detail.response && detail.response.data && detail.response.data.items) {
      detail.response.data.items.map(item => {
        return item.status && item.status.type === WorkflowStatusType.Submitted
          ? (counter += 1)
          : (counter += 0);
      });
    }

    if (ItemUids.length === counter) {
      history.push('/mileage/approvals');
    } else {
      loadData(props);
      ItemUids.splice(0, ItemUids.length);
    }
  },

  handleSubmitFail: (props: AllProps) => (
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

const loadData = (props: AllProps): void => {
  const { match } = props;
  const { user } = props.userState;
  const { loadDetailRequest } = props.mileageApprovalDispatch;

  if (user) {
    loadDetailRequest({
      mileageUid: match.params.mileageUid,
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });
  }
};

const config: SingleConfig<IMileageRequestDetail, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.MileageApproval,
    parentUid: AppMenu.Mileage,
    title: props.intl.formatMessage(mileageMessage.request.page.detailTitle),
    description: props.intl.formatMessage(
      mileageMessage.request.page.detailSubHeader
    )
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: SingleHandler): IAppBarMenu[] => [
    {
      id: MileageUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ],

  // events
  onDataLoad: (
    props: AllProps,
    callback: SingleHandler,
    forceReload?: boolean | false
  ) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.mileageApprovalState.detail;
    const { loadDetailRequest } = props.mileageApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.mileageUid) {
      // when projectUid was changed or response are empty or force to reload
      if (
        (request && request.mileageUid !== props.match.params.mileageUid) ||
        !response ||
        forceReload
      ) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          mileageUid: props.match.params.mileageUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: SingleHandler) => {
    const { isLoading, response } = states.mileageApprovalState.detail;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IMileageRequestDetail, props: AllProps) => (
    <MileageInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IMileageRequestDetail, props: AllProps) => [
    data.workflow && data.workflow.isApproval ? (
      <MileageApprovalItem 
        data={data.items}
        ItemUids={props.ItemUids}
        handleCheckbox={props.handleCheckbox}
      />     
    ) : (
      <MileageItem items={data.items} />      
    ),
    data.workflow && data.workflow.isApproval &&
      <WorkflowMileageApproval 
          itemTrue={props.ItemUids.length < 1 ? true : false}
          approvalTitle={props.intl.formatMessage(mileageMessage.approval.submission.title)}
          approvalSubHeader={props.intl.formatMessage(mileageMessage.approval.submission.subHeader)}
          approvalChoices={[
            { value: WorkflowStatusType.Approved, 
              label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
            { value: WorkflowStatusType.Rejected, 
              label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
          ]}
          approvalTrueValue={WorkflowStatusType.Approved}
          approvalDialogTitle={props.intl.formatMessage(mileageMessage.approval.submission.dialogTitle)}
          approvalDialogContentText={props.intl.formatMessage(mileageMessage.approval.submission.dialogContent)}
          approvalDialogCancelText={props.intl.formatMessage(layoutMessage.action.cancel)}
          approvalDialogConfirmedText={props.intl.formatMessage(layoutMessage.action.continue)}
          validate={props.handleValidate}
          onSubmit={props.handleSubmit}
          onSubmitSuccess={props.handleSubmitSuccess}
          onSubmitFail={props.handleSubmitFail}
        />,
    <WorkflowHistory data={data.workflow} />
  ]
};

interface OwnRouteParams {
  mileageUid: string;
}

type AllProps = WithUser &
  OwnState &
  OwnHandler &
  OwnStateUpdaters &
  WithLayout &
  WithMileageApproval &
  RouteComponentProps<OwnRouteParams> &
  InjectedIntlProps;

const mileageRequestDetail: React.SFC<AllProps> = props => (
  <SinglePage config={config} connectedProps={props} />
);

export const MileageApprovalDetail = compose<AllProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withMileageApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AllProps, OwnHandler>(handlerCreators),
)(mileageRequestDetail);
