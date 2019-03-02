import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { INotificationDetailItem } from '@layout/interfaces';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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
  interval?: number;
}

interface IOwnState {
  index: number;
  module?: ModuleDefinitionType;
  name?: string;
  type?: NotificationType;
  shouldLoad: boolean;
  timerId?: number;

  categories?: [{
    id: string;
    name: string;
  }];
  types?: [{
    name: string;
    total: number;
  }];
  items?: INotificationDetailItem[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setTimer: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnClickReload: (event: React.MouseEvent) => void;
  handleOnChangeIndex: (event: React.MouseEvent, index: number, module?: string, name?: string, type?: string) => void;
  handleRedirection: (uid: string, module?: ModuleDefinitionType, type?: NotificationType) => void;
}

export type NotificationProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithMasterPage
  & WithNotification
  & WithStyles<typeof styles>;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  index: 0,
  shouldLoad: false
});

const stateUpdaters: StateUpdaters<NotificationProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (prev: IOwnState) => (timerId?: number): Partial<IOwnState> => ({
    shouldLoad: !prev.shouldLoad,
    index: !prev.shouldLoad ? 0 : prev.index 
  }),
  setTimer: (prev: IOwnState) => (timerId?: number): Partial<IOwnState> => ({
    timerId
  }),
  setIndex: (prev: IOwnState) => (index: number, module?: ModuleDefinitionType, name?: string, type?: NotificationType): Partial<IOwnState> => ({
    index,
    module,
    name,
    type
  })
};

const handlerCreators: HandleCreators<NotificationProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotificationProps) => () => {
    const { user } = props.userState;
    const { isLoading } = props.notificationState;

    if (user && !isLoading) {
      props.notificationDispatch.fetchRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    clearInterval(props.timerId);
    
    props.setShouldLoad();
  },
  handleOnClickReload: (props: NotificationProps) => (event: React.MouseEvent) => {
    props.handleOnLoadApi();
  },
  handleOnChangeIndex: (props: NotificationProps) => (event: React.MouseEvent, index: number, module?: ModuleDefinitionType, name?: string, type?: string) => {
    props.setIndex(index, module, name, type);
  },
  handleRedirection: (props: NotificationProps) => (uid: string, module?: ModuleDefinitionType, type?: NotificationType) => {
    props.masterPage.changeDrawerRight();
    
    if (module && type) {
      props.masterPage.changeRouteFrom(module, type, uid);
    }
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NotificationProps, IOwnState> = {
  componentDidMount() {
    this.props.setShouldLoad();
  },
  componentDidUpdate(prevProps: NotificationProps) {
    if (prevProps.shouldLoad !== this.props.shouldLoad) {
      if (this.props.shouldLoad) {
        this.props.handleOnLoadApi();
      } else {
        const timerId = setInterval(() => { 
          this.props.handleOnLoadApi(); 
        // tslint:disable-next-line:align
        }, this.props.interval || 300000);
  
        this.props.setTimer(timerId);
      }
    }

    if (prevProps.notificationState.response !== this.props.notificationState.response) {
      const { response } = this.props.notificationState;

      let count: number = 0;
      
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          response.data.forEach(element =>
            element.details.forEach(detail => {
              count = count + detail.total;
            })
          );
        }
      }

      this.props.masterPage.changeNotif(count);
    }
  }
};

export const Notification = compose<NotificationProps, IOwnOption>(
  setDisplayName('Notification'),
  withUser,
  withNotification,
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NotificationView);