import { WorkflowStatusType } from '@common/classes/types';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
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
import { TravelSettlementDetailViews } from './TravelSettlementDetailViews';

interface OwnRouteParams {
  travelSettlementUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: TravelUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type TravelSettlementDetailProps
  = WithOidc
  & WithUser
  & WithTravelSettlement
  & WithTravelRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<TravelSettlementDetailProps, OwnState> = (props: TravelSettlementDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<TravelSettlementDetailProps, OwnState, OwnStateUpdaters> = {
  setOptions: (prevState: OwnState, props: TravelSettlementDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: OwnState, props: TravelSettlementDetailProps) => (): Partial<OwnState> => ({
    action: TravelUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<TravelSettlementDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: TravelSettlementDetailProps) => () => {
    if (props.userState.user && props.match.params.travelSettlementUid && !props.travelSettlementState.detail.isLoading) {
      props.travelSettlementDispatch.loadRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        travelSettlementUid: props.match.params.travelSettlementUid
      });
      if (props.history.location.state) {
        props.travelRequestDispatch.loadDetailRequest({
          companyUid: props.userState.user.company.uid,
          positionUid: props.userState.user.position.uid,
          travelUid: props.history.location.state.travelUid
        });        
      }      
    }
  },
  handleOnModify: (props: TravelSettlementDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: TravelSettlementDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: TravelSettlementDetailProps) => () => {
    const { response } = props.travelSettlementState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let travelSettlementUid: string | undefined;

    // get project uid
    if (response.data) {
      travelSettlementUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      TravelUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case TravelUserAction.Modify:
          next = '/travel/settlement/requests/form';
          break;

        default:
          break;
      }

      props.setDefault();
      props.history.push(next, {
        uid: travelSettlementUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementDetailProps, OwnState> = {
  componentDidUpdate(prevProps: TravelSettlementDetailProps) {
    // handle updated route params
    if (this.props.match.params.travelSettlementUid !== prevProps.match.params.travelSettlementUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.travelSettlementState.detail.response !== prevProps.travelSettlementState.detail.response) {
      const { isLoading, response } = this.props.travelSettlementState.detail;

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
      const options: IAppBarMenu[] = [
        {
          id: TravelUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: TravelUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: isContains(_statusType, [WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.AdjustmentNeeded]),
          onClick: this.props.handleOnModify
        }
      ];

      this.props.setOptions(options);
    }
  },
  componentWillReceiveProps(nextProps: TravelSettlementDetailProps) {
    if (nextProps.travelSettlementState.detail.response !== this.props.travelSettlementState.detail.response) {
      const { response } = nextProps.travelSettlementState.detail;
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.travelRequestDispatch;

      if (user && response) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: response.data.travelUid
        });
      }
    }
  },
  componentWillUnmount() {
    const { travelSettlementDispatch, travelRequestDispatch } = this.props;

    travelSettlementDispatch.loadDetailDispose();
    travelRequestDispatch.loadDetailDispose();

  }
};

export const TravelSettlementDetails = compose(
  withRouter,
  withOidc,
  withUser,
  withTravelSettlement,
  withTravelRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('TravelSettlementDetail')
)(TravelSettlementDetailViews);