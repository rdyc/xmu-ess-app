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

interface OwnOption {
  interval?: number;
}

interface OwnState {
  index: number;
  module?: ModuleDefinitionType;
  name?: string;
  type?: NotificationType;
  shouldReload: boolean;
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

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setReload: StateHandler<OwnState>;
  setTimer: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnClickReload: () => void;
  handleOnChangeIndex: (e: React.MouseEvent, index: number, module?: string, name?: string, type?: string) => void;
  handleRedirection: (uid: string, module?: ModuleDefinitionType, type?: NotificationType) => void;
}

export type NotificationProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithUser
  & WithMasterPage
  & WithNotification
  & WithStyles<typeof styles>;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  index: 0,
  shouldReload: false
});

const stateUpdaters: StateUpdaters<NotificationProps, OwnState, OwnStateUpdater> = {
  setReload: (prev: OwnState) => (timerId?: number): Partial<OwnState> => ({
    shouldReload: !prev.shouldReload,
    index: !prev.shouldReload ? 0 : prev.index 
  }),
  setTimer: (prev: OwnState) => (timerId?: number): Partial<OwnState> => ({
    timerId
  }),
  setIndex: (prev: OwnState) => (index: number, module?: ModuleDefinitionType, name?: string, type?: NotificationType): Partial<OwnState> => ({
    index,
    module,
    name,
    type
  })
};

const handlerCreators: HandleCreators<NotificationProps, OwnHandler> = {
  handleOnClickReload: (props: NotificationProps) => () => {
    const { user } = props.userState;
    const { isLoading } = props.notificationState;

    if (user && !isLoading) {
      props.notificationDispatch.fetchRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid
      });
    }

    clearInterval(props.timerId);
    
    props.setReload();
  },
  handleOnChangeIndex: (props: NotificationProps) => (e: React.MouseEvent, index: number, module?: ModuleDefinitionType, name?: string, type?: string) => {
    props.setIndex(index, module, name, type);
  },
  handleRedirection: (props: NotificationProps) => (uid: string, module?: ModuleDefinitionType, type?: NotificationType) => {
    props.masterPage.changeDrawerRight();
    
    if (module && type) {
      props.masterPage.changeRouteFrom(module, type, uid);
    }
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NotificationProps, OwnState> = {
  componentDidMount() {
    this.props.setReload();
  },
  componentDidUpdate(prevProps: NotificationProps) {
    if (prevProps.shouldReload !== this.props.shouldReload) {
      if (this.props.shouldReload) {
        this.props.handleOnClickReload();
      } else {
        const timerId = setInterval(() => { 
          this.props.handleOnClickReload(); 
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

export const Notification = compose<NotificationProps, OwnOption>(
  setDisplayName('Notification'),
  withUser,
  withNotification,
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NotificationView);