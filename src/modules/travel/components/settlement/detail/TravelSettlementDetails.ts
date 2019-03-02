import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
import { isNullOrUndefined } from 'util';
import { TravelSettlementDetailViews } from './TravelSettlementDetailViews';

interface IOwnRouteParams {
  travelSettlementUid: string;
}

interface IOwnHandler {
  handleGetDataTravel: () => void;
  handleOnLoadApi: () => void;
  handleOnLoadTravel: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  getDataTravel: boolean;
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: TravelUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type TravelSettlementDetailProps
  = WithOidc
  & WithUser
  & WithTravelSettlement
  & WithTravelRequest
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<TravelSettlementDetailProps, IOwnState> = (props: TravelSettlementDetailProps): IOwnState => {
  // checking admin status
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
    getDataTravel: false,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
  };  
};

const stateUpdaters: StateUpdaters<TravelSettlementDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: TravelSettlementDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: TravelSettlementDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: TravelSettlementDetailProps) => (): Partial<IOwnState> => ({
    action: TravelUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<TravelSettlementDetailProps, IOwnHandler> = {
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
  handleOnLoadTravel: (props: TravelSettlementDetailProps) => () => {
    if (props.userState.user && props.travelSettlementState.detail.response && props.travelSettlementState.detail.response.data.travelUid ) {
      props.travelRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        travelUid: props.travelSettlementState.detail.response.data.travelUid
      });
    }
  },
  handleGetDataTravel: (props: TravelSettlementDetailProps) => () => {
    props.stateUpdate({
      getDataTravel: true
    });
  },
  handleOnSelectedMenu: (props: TravelSettlementDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case TravelUserAction.Refresh:
        props.setShouldLoad();
        break;
      case TravelUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
    }
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

const lifecycles: ReactLifeCycleFunctions<TravelSettlementDetailProps, IOwnState> = {
  componentDidMount() {
    if (isNullOrUndefined(this.props.travelSettlementState.detail.response)) {
      this.props.handleOnLoadApi();
    }
  },
  componentWillUpdate(prevProps: TravelSettlementDetailProps) {
    // handle updated route params
    if (this.props.match.params.travelSettlementUid !== prevProps.match.params.travelSettlementUid) {
      this.props.handleOnLoadApi();
      // this.props.handleOnLoadTravel();
    }
  },
  componentDidUpdate(prevProps: TravelSettlementDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

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
      const options: IPopupMenuOption[] = [
        {
          id: TravelUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: TravelUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: isContains(_statusType, [WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.AdjustmentNeeded])
        }
      ];

      this.props.setOptions(options);
    }

    if (!this.props.getDataTravel && !this.props.history.location.state.travelUid) {
      if (this.props.userState.user && this.props.travelSettlementState.detail.response ) {
        if (!this.props.travelRequestState.detail.response) {
          this.props.handleOnLoadTravel();
          this.props.handleGetDataTravel();
        }

        if ( this.props.travelSettlementState.detail.response.data.travelUid !== (this.props.travelRequestState.detail.response && this.props.travelRequestState.detail.response.data.uid) ) {
          this.props.handleOnLoadTravel();
          this.props.handleGetDataTravel();
        }
      }
    }
  },
  // componentWillReceiveProps(nextProps: TravelSettlementDetailProps) {
  //   if (nextProps.travelSettlementState.detail.response !== this.props.travelSettlementState.detail.response) {
  //     const { response } = nextProps.travelSettlementState.detail;
  //     const { user } = this.props.userState;
  //     const { loadDetailRequest } = this.props.travelRequestDispatch;

  //     if (user && response) {
  //       loadDetailRequest({
  //         companyUid: user.company.uid,
  //         positionUid: user.position.uid,
  //         travelUid: response.data.travelUid
  //       });
  //     }
  //   }
  // },
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