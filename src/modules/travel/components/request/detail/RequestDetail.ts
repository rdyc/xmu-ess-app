import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { TravelUserAction } from '@travel/classes/types';
import { RequestDetailView } from '@travel/components/request/detail/RequestDetailView';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { isNullOrUndefined } from 'util';

interface Handler {
  handleTravelRefresh: () => void;
  handleTravelModify: () => void;
  handleAddSettlement: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  action?: TravelUserAction | undefined;
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
  travelUid: string;
}

export type RequestDetailProps
  = WithTravelRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<RequestDetailProps, OwnState> = (props: RequestDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<RequestDetailProps, Handler> = {
  handleTravelRefresh: (props: RequestDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.travelRequestDispatch;

    if (user) {
      loadDetailRequest({
        travelUid: match.params.travelUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  handleTravelModify: (props: RequestDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: TravelUserAction.Modify,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'travel.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'travel.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleAddSettlement: (props: RequestDetailProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      action: TravelUserAction.AddSettlement,
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'travel.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'travel.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleDialogOpen: (props: RequestDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
  handleDialogClose: (props: RequestDetailProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: RequestDetailProps) => () => { 
    const { match, history, stateReset, action } = props;
    const { response } = props.travelRequestState.detail;
    const travelUid = match.params.travelUid;

    // skipp untracked action or empty response
    if (!action || !response) {
      return;
    } 

    const actions = [
      TravelUserAction.Modify,
      TravelUserAction.AddSettlement
    ];

    if (actions.indexOf(action) !== -1) {
      let next: string = '404';

      switch (action) {
        case TravelUserAction.Modify:
          next = '/travel/form/';
          break;

        case TravelUserAction.AddSettlement:
          next = '/travel/settlement/form/';
          break;

        default:
          break;
      }
      stateReset();
      history.push(next, { uid: travelUid });
    }      
  },
};

const lifecycles: ReactLifeCycleFunctions<RequestDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleTravelRefresh, handleTravelModify, handleAddSettlement, 
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.travelRequestDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: 'travel.detail.title'}),
      subTitle : intl.formatMessage({id: 'travel.detail.subTitle'})
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

        case TravelUserAction.AddSettlement:
          handleAddSettlement();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        travelUid: match.params.travelUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: RequestDetailProps) {
    if (nextProps.travelRequestState.detail.response !== this.props.travelRequestState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.travelRequestState.detail;
      const { assignMenus } = nextProps.appBarDispatch;
      
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
        },
        {
          id: TravelUserAction.AddSettlement,
          name: intl.formatMessage({id: 'travel.action.addsettlement'}),
          enabled: response !== undefined,
          visible: isNullOrUndefined(response && response.data.settlement) 
                      && isStatusTypeEquals([WorkflowStatusType.Approved])
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, travelRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    travelRequestDispatch.loadDetailDispose();
  }
};

export const RequestDetail = compose<RequestDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTravelRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<RequestDetailProps, Handler>(handlerCreators),
  lifecycle<RequestDetailProps, OwnState>(lifecycles),
)(RequestDetailView);