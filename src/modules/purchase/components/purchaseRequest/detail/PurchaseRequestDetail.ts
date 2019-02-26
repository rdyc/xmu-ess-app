import { WorkflowStatusType } from '@common/classes/types';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseRequestDetailView } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetailView';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: PurchaseUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setShouldLoad: StateHandler<OwnState>;
  setOptions: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setSettle: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
}

export type PurchaseRequestDetailProps
  = WithUser
  & WithPurchaseRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<PurchaseRequestDetailProps, OwnState> = (props: PurchaseRequestDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  shouldLoad: false,
});

const stateUpdaters: StateUpdaters<PurchaseRequestDetailProps, OwnState, OwnStateUpdaters> = {
  setShouldLoad: (state: OwnState, props: PurchaseRequestDetailProps) => (): Partial<OwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: OwnState, props: PurchaseRequestDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: OwnState, props: PurchaseRequestDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setSettle: (prevState: OwnState, props: PurchaseRequestDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Settle,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    ...prevState,
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<PurchaseRequestDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: PurchaseRequestDetailProps) => () => {
    if (props.userState.user && props.match.params.purchaseUid && !props.purchaseRequestState.detail.isLoading) {
      props.purchaseRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        purchaseUid: props.match.params.purchaseUid
      });
    }
  },  
  handleOnSelectedMenu: (props: PurchaseRequestDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case PurchaseUserAction.Refresh:
        props.setShouldLoad();
        break;
      case PurchaseUserAction.Modify:
        props.setModify();
        break;
      case PurchaseUserAction.Settle:
        props.setSettle();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: PurchaseRequestDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: PurchaseRequestDetailProps) => () => {
    const { response } = props.purchaseRequestState.detail;

    let purchaseUid: string | undefined;

    if (!props.action || !response) {
      return;
    } 

    if (response.data) {
      purchaseUid = response.data.uid;
    }

    const actions = [
      PurchaseUserAction.Modify,
      PurchaseUserAction.Settle,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case PurchaseUserAction.Modify:
          next = '/purchase/requests/form';
          break;

        case PurchaseUserAction.Settle:
          next = '/purchase/settlement/requests/form/';
          break;
          
        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: purchaseUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestDetailProps, OwnState> = {
  componentDidUpdate(prevProps: PurchaseRequestDetailProps) {
    // handle updated route params
    if (this.props.match.params.purchaseUid !== prevProps.match.params.purchaseUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.purchaseRequestState.detail.response !== prevProps.purchaseRequestState.detail.response) {
      const { isLoading, response } = this.props.purchaseRequestState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => {
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: PurchaseUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: PurchaseUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [WorkflowStatusType.Submitted, WorkflowStatusType.InProgress]),
         
        },
        {
          id: PurchaseUserAction.Settle,
          name: this.props.intl.formatMessage(purchaseMessage.action.settle),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [WorkflowStatusType.Approved]),
     
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const PurchaseRequestDetail = compose(
  setDisplayName('PurchaseRequestDetail'),
  withUser,
  withRouter,
  withPurchaseRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PurchaseRequestDetailView);