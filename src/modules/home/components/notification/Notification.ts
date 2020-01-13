import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { WithLookupVersion, withLookupVersion } from '@lookup/hoc/withLookupVersion';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { envHelper, IFieldEnvHelper } from '@utils/envHelper';
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

import { NotificationView } from './NotificationView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnItem {
  cIndex: number;
  dIndex: number;
  expanded: boolean;
}

interface IOwnState {
  items: IOwnItem[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  handleExpandClick: StateHandler<IOwnState>;
  handleReset: StateHandler<IOwnState>;
}

interface IOwnHandler {
  isExpanded: (cIndex: number, dIndex: number) => boolean;
  handleSyncClick: () => void;
  handleDownloadClick: (e: React.MouseEvent) => void;
  handleNotifClick: (category: ModuleDefinitionType, type: NotificationType, uid?: string) => void;
}

export type NotificationProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithMasterPage
  & WithNotification
  & WithLookupVersion
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<NotificationProps, IOwnState> = (props: NotificationProps): IOwnState => ({
  items: []
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdater> = {
  handleExpandClick: (prevState: IOwnState) => (cIndex: number, dIndex: number): IOwnState => {
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
  handleReset: (prevState: IOwnState) => (index: number): IOwnState => ({
    items: []
  })
};

const handlerCreators: HandleCreators<NotificationProps, IOwnHandler> = {
  isExpanded: (props: NotificationProps) => (cIndex: number, dIndex: number): boolean => {
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
  handleSyncClick: (props: NotificationProps) => () => {
    const { user } = props.userState;
    const { loadAllRequest: fetchRequest } = props.notificationDispatch;

    if (user) {
      props.handleReset();

      fetchRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }
  },
  handleNotifClick: (props: NotificationProps) => (category: ModuleDefinitionType, type: NotificationType, uid?: string) => {
    props.masterPage.changeRouteFrom(category, type, uid);
  },
  handleDownloadClick: (props: NotificationProps) => () => {
    const hostname: string = document && document.location && document.location.hostname || process.env.REACT_APP_HOST_LOCAL || '';

    const cdn = envHelper(IFieldEnvHelper.CdnHost, hostname) || window.location.origin;

    window.open(`${cdn}/download/android/TessaMobile.apk`, '_blank');
  }
};

const lifecycles: ReactLifeCycleFunctions<NotificationProps, IOwnState> = {
  componentDidMount() {
    const hostname: string = document && document.location && document.location.hostname || process.env.REACT_APP_HOST_LOCAL || '';

    const clientId = envHelper(IFieldEnvHelper.AndroidId, hostname) || window.location.origin;

    const { isLoading, response } = this.props.lookupVersionState.detail;
    const { loadDetailRequest } = this.props.lookupVersionDispatch;
    
    if (!isLoading && !response) {
      loadDetailRequest({
        clientId
      });
    }
  }
};

export const Notification = compose<NotificationProps, IOwnOption>(
  setDisplayName('Notification'),
  withUser,
  withRouter,
  withMasterPage,
  withNotification,
  withLookupVersion,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(NotificationView);