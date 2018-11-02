import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { TravelSettlementDetailView } from './TravelSettlementDetailView';

interface Handler {
  handleTravelRefresh: () => void;
  handleTravelModify: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  travelSettlementUid: string;
}

export type SettlementDetailProps
  = WithTravelSettlement
  & WithTravelRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<SettlementDetailProps, OwnState> = (props: SettlementDetailProps): OwnState => ({ 
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
});

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

const handlerCreators: HandleCreators<SettlementDetailProps, Handler> = {
  handleTravelRefresh: (props: SettlementDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadRequest } = props.travelSettlementDispatch;
    const { loadDetailRequest } = props.travelRequestDispatch;
    const { response } = props.travelSettlementState.detail;

    if (user) {
      loadRequest({
        traveSettlementlUid: match.params.travelSettlementUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });

      if (response) {
        // load travel request
        loadDetailRequest ({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          travelUid: response.data.travelUid 
        });
      }
    }

  },
  handleTravelModify: (props: SettlementDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'travel.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'travel.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleDialogOpen: (props: SettlementDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({ 
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
      dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
    });
  },
  handleDialogClose: (props: SettlementDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: SettlementDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const travelSettlementUid = match.params.travelSettlementUid;

    stateReset();

    history.push('/travel/settlement/form/', { uid: travelSettlementUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<SettlementDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleTravelRefresh, handleTravelModify, 
    } = this.props;
    
    const { user } = this.props.userState;
    const { loadRequest } = this.props.travelSettlementDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.TravelSettlementRequest,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: 'travelSettlement.detail.title'}),
      subTitle : intl.formatMessage({id: 'travelSettlement.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TravelUserAction.Refresh:
          handleTravelRefresh();
          break;
        
        case TravelUserAction.Modify:
          handleTravelModify();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadRequest({
        traveSettlementlUid: match.params.travelSettlementUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });

    }    
    
  },

  componentWillReceiveProps(nextProps: SettlementDetailProps) {
    if (nextProps.travelSettlementState.detail.response !== this.props.travelSettlementState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.travelSettlementState.detail;
      const { assignMenus } = nextProps.appBarDispatch;
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.travelRequestDispatch;

      if (user && response) {
            loadDetailRequest ({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              travelUid: response.data.travelUid
            });
          }

      const isStatusTypeEquals = (statusTypes: string[]): boolean => {
        let result = false;

        if (response && response.data) {
          result = statusTypes.indexOf(response.data.statusType) !== -1;
        }

        return result;
      };

      const currentMenus = [
        {
          id: TravelUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: TravelUserAction.Modify,
          name: intl.formatMessage({id: 'global.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress])
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, travelSettlementDispatch, travelRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    travelSettlementDispatch.loadDetailDispose();
    travelRequestDispatch.loadDetailDispose();
    
  }
};

export const TravelSettlementDetail = compose<SettlementDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTravelSettlement,
  withTravelRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<SettlementDetailProps, Handler>(handlerCreators),
  lifecycle<SettlementDetailProps, OwnState>(lifecycles),
)(TravelSettlementDetailView);