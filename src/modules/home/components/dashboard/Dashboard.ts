import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
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
  withStateHandlers,
} from 'recompose';

import { dashboardView } from './dashboardView';

interface OwnItem {
  cIndex: number;
  dIndex: number;
  expanded: boolean;
}

interface OwnState {
  items: OwnItem[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  handleExpandClick: StateHandler<OwnState>;
  handleReset: StateHandler<OwnState>;
}

interface OwnHandlers {
  isExpanded: (cIndex: number, dIndex: number) => boolean;
  handleSyncClick: () => void;
  handleNotifClick: (category: string, type: string, uid?: string) => void;
}

export type DashboardProps
  = WithUser
  & WithNotification
  & WithLayout
  & WithAppBar
  & WithTheme
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers;

const createProps: mapper<DashboardProps, OwnState> = (props: DashboardProps): OwnState => ({
  items: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  handleExpandClick: (prevState: OwnState) => (cIndex: number, dIndex: number): OwnState => {
    const prevItems = prevState.items;
    const prevItemIndex = prevState.items.findIndex(item =>
      item.cIndex === cIndex &&
      item.dIndex === dIndex
    );

    if (prevItemIndex !== -1) {
      prevItems[prevItemIndex].expanded = !prevItems[prevItemIndex].expanded;
    } else {
      prevItems.push({
        cIndex,
        dIndex,
        expanded: true
      });
    }

    return {
      items: prevItems
    };
  },
  handleReset: (prevState: OwnState) => (index: number): OwnState => ({
    items: []
  })
};

const handlerCreators: HandleCreators<DashboardProps, OwnHandlers> = {
  isExpanded: (props: DashboardProps) => (cIndex: number, dIndex: number): boolean => {
    let isExpanded = false;

    const existItem = props.items.find(item =>
      item.cIndex === cIndex &&
      item.dIndex === dIndex
    );

    if (existItem) {
      isExpanded = existItem.expanded;
    }

    return isExpanded;
  },
  handleSyncClick: (props: DashboardProps) => () => {
    const { user } = props.userState;
    const { fetchRequest } = props.notificationDispatch;

    if (user) {
      props.handleReset();

      fetchRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }
  },
  handleNotifClick: (props: DashboardProps) => (category: string, type: string, uid?: string) => {
    const { history } = props;

    let path: string = '/';

    let state: any = { 
      status: type === 'Notify' ? undefined : 'pending', 
      isNotify: type === 'Notify' ? true : false 
    };

    switch (category) {
      case 'Project Registration': 
        path = '/project';
      
        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');

          if (type === 'Approval') {
            state = {
              status: 'pending',
            };
          }

          if (type === 'Notify') {
            state = {
              status: 'complete',
              isNotify: true,
            };
          }
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');

          if (type === 'New Owner') {
            state = {
              status: 'complete',
              isNewOwner: true,
            };
          }
        }
        break;

      case 'Project Assignment':
        path = '/project';
        
        if (type === 'New Assignment') {
          path = path.concat('/acceptances', uid && `/${uid}` || '');
        } else {
          path = path.concat('/assignments', uid && `/${uid}` || '');
        }
        break;

      case 'Leave':
        path = '/leave';
        
        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');

          if (type === 'Approval') {
            state = {
              status: 'pending',
            };
          }

          if (type === 'Notify') {
            state = {
              status: 'complete',
              isNotify: true,
            };
          }
        }
        break;

      case 'Expense':
        path = '/expense';

        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');
        }
        break;

      case 'Timesheet':
        path = '/timesheet';

        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');
        }
        break;
        
      case 'Travel':
        path = '/travel';

        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');
        }
        break;

      case 'Travel Settlement':
        path = '/travel';

        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/settlement/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/settlements', uid && `/${uid}` || '');
        }
        break;        
    
      case 'Purchase':
        path = '/purchase';
        
        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');
        }
        break;
    
      case 'Purchase Settlement':
        path = '/purchase/settlement';

        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');
        }
        break;
    
      case 'Mileage':
        path = '/mileage';
        
        if (type === 'Approval' || type === 'Notify') {
          path = path.concat('/approvals', uid && `/${uid}` || '');
        } else {
          path = path.concat('/requests', uid && `/${uid}` || '');       
        }
        break;

      default:
        break;
    }

    // redirecting to defined path
    history.push(path, state);
  }
};

const lifecycles: ReactLifeCycleFunctions<DashboardProps, {}> = {
  componentDidMount() {
    const { intl, layoutDispatch } = this.props;
    const { loading, result } = this.props.notificationState;

    layoutDispatch.changeView({
      uid: AppMenu.Dashboard,
      parentUid: AppMenu.Home,
      title: intl.formatMessage(homeMessage.dashboard.page.title),
      subTitle: intl.formatMessage(homeMessage.dashboard.page.subHeader)
    });

    if (!loading && !result) {
      this.props.handleSyncClick();
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export const Dashboard = compose<DashboardProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withNotification,
  withTheme(),
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(dashboardView);