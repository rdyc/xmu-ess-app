import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { MileageExceptionAction } from '@lookup/classes/types';
import { LookupMileageExceptionDetailView } from '@lookup/components/mileageException/detail/LookupMileageExceptionDetailView';
import {
  WithLookupMileageException,
  withLookupMileageException
} from '@lookup/hoc/withLookupMileageException';
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
  handleLookupMileageExceptionRefresh: () => void;
  handleLookupMileageExceptionModify: () => void;
  handleDialogOpen: (
    title: string,
    description: string,
    cancelText?: string,
    confirmText?: string,
    fullScreen?: boolean
  ) => void;
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
  mileageExceptionUid: string;
}

export type LookupMileageExceptionDetailProps = WithLookupMileageException &
  WithUser &
  WithLayout &
  WithAppBar &
  RouteComponentProps<OwnRouteParams> &
  InjectedIntlProps &
  OwnState &
  OwnStateUpdaters &
  Handler;

const createProps: mapper<LookupMileageExceptionDetailProps, OwnState> = (
  props: LookupMileageExceptionDetailProps
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
    dialogConfirmedText: 'global.action.ok'
  })
};

const handlerCreators: HandleCreators<
  LookupMileageExceptionDetailProps,
  Handler
> = {
  handleLookupMileageExceptionRefresh: (
    props: LookupMileageExceptionDetailProps
  ) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.lookupMileageExceptionDispatch;

    if (user) {
      loadDetailRequest({
        mileageExceptionUid: match.params.mileageExceptionUid
      });
    }
  },
  handleLookupMileageExceptionModify: (
    props: LookupMileageExceptionDetailProps
  ) => () => {
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({
        id: 'lookup.mileageexception.dialog.modifyTitle'
      }),
      dialogDescription: intl.formatMessage({
        id: 'lookup.mileageexception.dialog.modifyDescription'
      }),
      dialogCancelText: intl.formatMessage({ id: 'global.action.disaggree' }),
      dialogConfirmedText: intl.formatMessage({ id: 'global.action.aggree' })
    });
  },
  handleDialogOpen: (props: LookupMileageExceptionDetailProps) => (
    title: string,
    description: string,
    cancelText?: string,
    confirmText?: string,
    fullScreen?: boolean
  ) => {
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText:
        cancelText || intl.formatMessage({ id: dialogCancelText }),
      dialogConfirmedText:
        confirmText || intl.formatMessage({ id: dialogConfirmedText })
    });
  },
  handleDialogClose: (props: LookupMileageExceptionDetailProps) => () => {
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: LookupMileageExceptionDetailProps) => () => {
    const { match, history, stateReset } = props;
    const mileageExceptionUid = match.params.mileageExceptionUid;

    stateReset();

    history.push('/lookup/mileageexception/form/', {
      uid: mileageExceptionUid
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<
  LookupMileageExceptionDetailProps,
  OwnState
> = {
  componentDidMount() {
    const {
      match,
      layoutDispatch,
      appBarDispatch,
      intl,
      handleLookupMileageExceptionRefresh,
      handleLookupMileageExceptionModify
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.lookupMileageExceptionDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage({ id: 'lookup.mileageException.detail.title' }),
      subTitle: intl.formatMessage({
        id: 'lookup.mileageException.detail.subTitle'
      })
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case MileageExceptionAction.Refresh:
          handleLookupMileageExceptionRefresh();
          break;

        case MileageExceptionAction.Modify:
          handleLookupMileageExceptionModify();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        mileageExceptionUid: match.params.mileageExceptionUid,
      });
    }
  },
  componentWillReceiveProps(nextProps: LookupMileageExceptionDetailProps) {
    if (
      nextProps.lookupMileageExceptionState.detail.response !==
      this.props.lookupMileageExceptionState.detail.response
    ) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: MileageExceptionAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
          enabled: true,
          visible: true
        },
        {
          id: MileageExceptionAction.Modify,
          name: intl.formatMessage({ id: 'lookup.mileageException.action.modify' }),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const {
      layoutDispatch,
      appBarDispatch,
      lookupMileageExceptionDispatch
    } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    lookupMileageExceptionDispatch.loadDetailDispose();
  }
};

export const LookupMileageExceptionDetail = compose<LookupMileageExceptionDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupMileageException,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<LookupMileageExceptionDetailProps, Handler>(handlerCreators),
  lifecycle<LookupMileageExceptionDetailProps, OwnState>(lifecycles),
)(LookupMileageExceptionDetailView);