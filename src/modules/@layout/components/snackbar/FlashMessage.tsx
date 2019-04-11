import AppEvent from '@constants/AppEvent';
import { NotificationProps } from '@home/components/notification';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { IFlashMessage } from '@layout/interfaces';
import { Snackbar } from '@material-ui/core';
import * as React from 'react';
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

interface IOwnOption {
  
}

interface IOwnState {
  isOpen: boolean;
  queue: IFlashMessage[];
  messageInfo?: IFlashMessage;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setQueue: StateHandler<IOwnState>;
  setMessage: StateHandler<IOwnState>;
  setVisibility: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnReceiveMessage: (event: CustomEvent<IFlashMessage>) => void;
  handleOnClose: (event: React.SyntheticEvent, reason: string) => void;
  handleProcessQueue: () => void;
}

export type FlashMessageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithMasterPage;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpen: false,
  queue: []
});

const stateUpdaters: StateUpdaters<NotificationProps, IOwnState, IOwnStateUpdater> = {
  setQueue: (state: IOwnState) => (values: IFlashMessage[]): Partial<IOwnState> => ({
    queue: values
  }),
  setMessage: (state: IOwnState) => (values: IFlashMessage): Partial<IOwnState> => ({
    messageInfo: values,
    isOpen: true
  }),
  setVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !state.isOpen
  })
};

const handlerCreators: HandleCreators<FlashMessageProps, IOwnHandler> = {
  handleOnReceiveMessage: (props: FlashMessageProps) => (event: CustomEvent<IFlashMessage>) => {
    const flashMessages = props.queue;

    flashMessages.push(event.detail);
    
    props.setQueue(flashMessages);

    if (props.isOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      props.setVisibility();
    } else {
      if (props.queue.length > 0) {
        props.setMessage(props.queue.shift());
      }
    }
  },
  handleOnClose: (props: FlashMessageProps) => (event: React.SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    
    props.setVisibility();
  },
  handleProcessQueue: (props: FlashMessageProps) => () => {
    if (props.queue.length > 0) {
      props.setMessage(props.queue.shift());
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<FlashMessageProps, {}> = {
  componentWillMount() {
    addEventListener(AppEvent.onFlashMessage, this.props.handleOnReceiveMessage);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onFlashMessage, this.props.handleOnReceiveMessage);
  }
};

const FlashMessageView: React.SFC<FlashMessageProps> = props => (
  <React.Fragment>
    {
      props.messageInfo &&
      <Snackbar
        anchorOrigin={props.messageInfo.origin || {
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.isOpen}
        autoHideDuration={props.messageInfo.duration || 6000}
        onClose={props.handleOnClose}
        onExited={() => props.handleProcessQueue}
        message={props.messageInfo.message}
      />
    }
  </React.Fragment>
);

export const FlashMessage = compose<FlashMessageProps, IOwnOption>(
  setDisplayName('FlashMessage'),
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(FlashMessageView);