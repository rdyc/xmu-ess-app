import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { IMileageApprovalPostItem } from '@mileage/classes/request';
import { MileageApprovalUserAction, MileageUserAction } from '@mileage/classes/types';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { IWorkflowApprovalFormValue } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { FormikActions } from 'formik';
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

import { MileageApprovalDetailView } from './MileageApprovalDetailView';

interface IOwnRouteParam {
  mileageUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: MileageApprovalUserAction;
  shouldDataReload: boolean;
  mileageItemUids: string[];
  itemsNeedApprove: number;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalStatusTypes: RadioGroupChoice[];
  approvalTrueValues: string[];
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateApprovalItem: StateHandler<IOwnState>;
  stateCheckbox: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}
interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleCheckbox: (mileageItemUid: string) => void;
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

export type MileageApprovalDetailProps 
  = WithMileageApproval 
  & WithUser 
  & WithLayout 
  & WithMasterPage
  & WithNotification
  & RouteComponentProps<IOwnRouteParam> 
  & InjectedIntlProps 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater;

const createProps: mapper<MileageApprovalDetailProps, IOwnState> = (props: MileageApprovalDetailProps): IOwnState => {
  const { intl } = props;

  return {
    shouldLoad: false,
    mileageItemUids: [],
    itemsNeedApprove: 0,
    shouldDataReload: false,
    approvalTitle: intl.formatMessage(mileageMessage.approval.submission.title),
    approvalSubHeader: intl.formatMessage(mileageMessage.approval.submission.subHeader),
    approvalStatusTypes: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValues: [WorkflowStatusType.Approved],
    approvalDialogTitle: intl.formatMessage(mileageMessage.approval.submission.dialogTitle),
    approvalDialogContentText: intl.formatMessage(mileageMessage.approval.submission.dialogContent),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue)
  };
};

const stateUpdaters: StateUpdaters<MileageApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  stateCheckbox: (prevState: IOwnState) => (mileageItemUids: string[]) => ({
    mileageItemUids
  }),
  setOptions: (prevState: IOwnState, props: MileageApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: MileageApprovalDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  stateApprovalItem: (prevState: IOwnState) => () => ({
    itemsNeedApprove: prevState.itemsNeedApprove + 1
  })
};

const handlerCreators: HandleCreators<MileageApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MileageApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.mileageUid && !props.mileageApprovalState.detail.isLoading) {
      props.mileageApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        mileageUid: props.match.params.mileageUid
      });
    }
  },
  handleOnSelectedMenu: (props: MileageApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case MileageUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
  handleCheckbox: (props: MileageApprovalDetailProps) => (mileageItemUid: string) => {
    const { mileageItemUids, stateCheckbox } = props;
    const _mileageItemUid = new Set(mileageItemUids);

    _mileageItemUid.has(mileageItemUid)
      ? _mileageItemUid.delete(mileageItemUid)
      : _mileageItemUid.add(mileageItemUid);

    stateCheckbox(Array.from(_mileageItemUid));
  },
  handleOnSubmit: (props: MileageApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have mileageUid
      if (props.match.params.mileageUid) {
        // generate mileage items
        const mileageItems: IMileageApprovalPostItem[] = [];

        props.mileageItemUids.forEach(item =>
          mileageItems.push({mileageItemUid: item})
        );

        // compare approval status string
        const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.mileageApprovalDispatch.createRequest({
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            mileageUid: props.match.params.mileageUid,
            data: {
              isApproved,
              items: mileageItems,
              remark: !isApproved ? values.remark : undefined
            }, 
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: boolean) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();
        
        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(mileageMessage.approval.message.updateSuccess, { uid: props.match.params.mileageUid })
        });
       
        // notification: mark as complete
        if (props.mileageItemUids.length === props.itemsNeedApprove) {
          props.notificationDispatch.markAsComplete({
            moduleUid: ModuleDefinitionType.Mileage,
            detailType: NotificationType.Approval,
            itemUid: props.match.params.mileageUid
          });
        }

        // redirect to approval list
        props.history.push('/mileage/approvals');
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => {
            // in case to handle incorrect field on other fields
            let field = item.field;

            if (item.field === 'projectUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(mileageMessage.approval.message.updateFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MileageApprovalDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.mileageUid !== prevProps.match.params.mileageUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.mileageApprovalState.detail.response !== prevProps.mileageApprovalState.detail.response) {
      const { isLoading } = this.props.mileageApprovalState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: MileageUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
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
  withMasterPage,
  withRouter,
  withMileageApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(MileageApprovalDetailView);