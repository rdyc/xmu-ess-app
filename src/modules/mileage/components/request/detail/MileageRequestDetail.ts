import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { MileageUserAction } from '@mileage/classes/types';
import { MileageRequestDetailView } from '@mileage/components/request/detail/MileageRequestDetailView';
import {
  WithMileageRequest,
  withMileageRequest
} from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers
} from 'recompose';

interface Handler {
  handleMileageRefresh: () => void;
  handleDialogOpen: (
    title: string,
    description: string,
    cancelText?: string,
    confirmText?: string,
    fullScreen?: boolean
  ) => void;
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
  mileageUid: string;
}

export type MileageRequestDetailProps = WithMileageRequest &
  WithUser &
  WithLayout &
  WithAppBar &
  RouteComponentProps<OwnRouteParams> &
  InjectedIntlProps &
  OwnState &
  OwnStateUpdaters &
  Handler;

const createProps: mapper<MileageRequestDetailProps, OwnState> = (
  props: MileageRequestDetailProps
): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok'
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

const handlerCreators: HandleCreators<MileageRequestDetailProps, Handler> = {
  handleMileageRefresh: (props: MileageRequestDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.mileageRequestDispatch;

    if (user) {
      loadDetailRequest({
        mileageUid: match.params.mileageUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },

  handleDialogOpen: (props: MileageRequestDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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

  handleDialogConfirmed: (props: MileageRequestDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const mileageUid = match.params.mileageUid;

    stateReset();

    history.push('/mileage/form/', { uid: mileageUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleMileageRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.mileageRequestDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage(mileageMessage.request.page.detailTitle),
      subTitle : intl.formatMessage(mileageMessage.request.page.detailSubHeader)
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case MileageUserAction.Refresh:
          handleMileageRefresh();
          break;
              
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        mileageUid: match.params.mileageUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: MileageRequestDetailProps) {
    if (nextProps.mileageRequestState.detail.response !== this.props.mileageRequestState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: MileageUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, mileageRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    mileageRequestDispatch.loadDetailDispose();
  }
};

export const MileageRequestDetail = compose<MileageRequestDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withMileageRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<MileageRequestDetailProps, Handler>(handlerCreators),
  lifecycle<MileageRequestDetailProps, OwnState>(lifecycles),
)(MileageRequestDetailView);