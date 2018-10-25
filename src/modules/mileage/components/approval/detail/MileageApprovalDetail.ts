import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { MileageApprovalUserAction } from '@mileage/classes/types';
import { MileageApprovalDetailView } from '@mileage/components/approval/detail/MileageApprovalDetailView';
import {
  WithMileageApproval,
  withMileageApproval
} from '@mileage/hoc/withMileageApproval';
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

export type MileageApprovalDetailProps = WithMileageApproval &
  WithUser &
  WithLayout &
  WithAppBar &
  RouteComponentProps<OwnRouteParams> &
  InjectedIntlProps &
  OwnState &
  OwnStateUpdaters &
  Handler;

const createProps: mapper<MileageApprovalDetailProps, OwnState> = (
  props: MileageApprovalDetailProps
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

const handlerCreators: HandleCreators<MileageApprovalDetailProps, Handler> = {
  handleMileageRefresh: (props: MileageApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.mileageApprovalDispatch;

    if (user) {
      loadDetailRequest({
        mileageUid: match.params.mileageUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },

  handleDialogOpen: (props: MileageApprovalDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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

  handleDialogConfirmed: (props: MileageApprovalDetailProps) => () => { 
    const { match, history, stateReset } = props;
    const mileageUid = match.params.mileageUid;

    stateReset();

    history.push('/mileage/approval/form/', { uid: mileageUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<MileageApprovalDetailProps, OwnState> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleMileageRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.mileageApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.MileageApproval,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({id: 'mileage.approval.detail.title'}),
      subTitle : intl.formatMessage({id: 'mileage.approval.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case MileageApprovalUserAction.Refresh:
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
  componentWillReceiveProps(nextProps: MileageApprovalDetailProps) {
    if (nextProps.mileageApprovalState.detail.response !== this.props.mileageApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: MileageApprovalUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, mileageApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    mileageApprovalDispatch.loadDetailDispose();
  }
};

export const MileageApprovalDetail = compose<MileageApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withMileageApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<MileageApprovalDetailProps, Handler>(handlerCreators),
  lifecycle<MileageApprovalDetailProps, OwnState>(lifecycles),
)(MileageApprovalDetailView);