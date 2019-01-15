import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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

import { MasterPageView } from './MasterPageView';

interface IOwnOption {
  showDrawerRight?: boolean;
}

interface IOwnState {
  isOpenDrawerLeft: boolean;
  isOpenDrawerRight: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setDrawerRight: StateHandler<IOwnState>;
  setDrawerLeft: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleVisibilityDrawerLeft: () => void;
  handleVisibilityDrawerRight: () => void;
}

export type MasterPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithUser;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpenDrawerLeft: true,
  isOpenDrawerRight: props.showDrawerRight || false
});

const stateUpdaters: StateUpdaters<MasterPageProps, IOwnState, IOwnStateUpdater> = {
  setDrawerLeft: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isOpenDrawerLeft: !prevState.isOpenDrawerLeft
  }),
  setDrawerRight: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isOpenDrawerRight: !prevState.isOpenDrawerRight
  })
};

const handlerCreators: HandleCreators<MasterPageProps, IOwnHandler> = {
  handleVisibilityDrawerLeft: (props: MasterPageProps) => () => {
    props.setDrawerLeft();
  },
  handleVisibilityDrawerRight: (props: MasterPageProps) => () => {
    props.setDrawerRight();
  }
};

const lifecycles: ReactLifeCycleFunctions<MasterPageProps, IOwnState> = {
  componentDidUpdate(prevProps: MasterPageProps) {
    if (this.props.layoutState.view !== prevProps.layoutState.view) {
      const envWebName = process.env.REACT_APP_WEBSITE_NAME;
      
      // set document props	
      if (this.props.layoutState.view) {	
        const meta = document.getElementsByTagName('meta'); 	
        const desc = meta.namedItem('description');	

        if (desc) {	
          desc.content = this.props.layoutState.view.subTitle;	
        }	

        document.title = `${this.props.layoutState.view.title} - ${envWebName}`;	
      } else {	
        document.title = envWebName || '?';	
      }
    }
  }
};

export const MasterPage = compose<MasterPageProps, IOwnOption>(
  setDisplayName('MasterPage'),
  withStyles(styles),
  withWidth(),
  withLayout,
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(MasterPageView);