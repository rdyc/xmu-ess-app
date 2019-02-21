import AppEvent from '@constants/AppEvent';
import { IRedirection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';

import { MasterPageView } from './MasterPageView';

interface IOwnOption {
  
}

interface IOwnHandler {
  handleOnEventRedirection: (event: CustomEvent) => void;
}

export type MasterPageProps
  = IOwnOption
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithUser
  & RouteComponentProps;

const handlerCreators: HandleCreators<MasterPageProps, IOwnHandler> = {
  handleOnEventRedirection: (props: MasterPageProps) => (event: CustomEvent) => {
    const redirect: IRedirection = event.detail;

    setTimeout(() => props.history.push(redirect.path, redirect.state), 100);
  }
};

const lifecycles: ReactLifeCycleFunctions<MasterPageProps, {}> = {
  componentDidMount() {
    addEventListener(AppEvent.Redirection, this.props.handleOnEventRedirection);
  },
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
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.Redirection, this.props.handleOnEventRedirection);
  }
};

export const MasterPage = compose<MasterPageProps, IOwnOption>(
  setDisplayName('MasterPage'),
  withRouter,
  withLayout,
  withUser,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  withWidth(),
)(MasterPageView);