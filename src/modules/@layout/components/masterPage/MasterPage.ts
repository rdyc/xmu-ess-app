import AppEvent from '@constants/AppEvent';
import { IPageInfo, IRedirection } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';

import { ChildPageView, MasterPageView } from './MasterPageView';

const webName = process.env.REACT_APP_WEBSITE_NAME;

interface IOwnOption {
  
}

interface IOwnHandler {
  handleOnChangeRoute: (event: CustomEvent) => void;
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
}

export type MasterPageProps
  = IOwnOption
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithUser
  & WithMasterPage
  & RouteComponentProps;

const handlerCreators: HandleCreators<MasterPageProps, IOwnHandler> = {
  handleOnChangeRoute: (props: MasterPageProps) => (event: CustomEvent<IRedirection>) => {
    props.history.push(event.detail.path, event.detail.state);
  },
  handleOnChangePage: (props: MasterPageProps) => (event: CustomEvent<IPageInfo>) => {
    const page = event.detail;

    const meta = document.getElementsByTagName('meta'); 	
    const desc = meta.namedItem('description');	

    if (desc && page.description) {	
      desc.content = page.description;	
    }	

    document.title = `${page.title} - ${webName}`;
  }
};

const lifecycles: ReactLifeCycleFunctions<MasterPageProps, {}> = {
  componentWillMount() {
    addEventListener(AppEvent.onChangeRoute, this.props.handleOnChangeRoute);
    addEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeRoute, this.props.handleOnChangeRoute);
    removeEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  }
};

export const MasterPage = compose<MasterPageProps, IOwnOption>(
  setDisplayName('MasterPage'),
  withRouter,
  withUser,
  withMasterPage,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(MasterPageView);

export type ChildPageProps = WithStyles<typeof styles>;

export const ChildPage = compose<ChildPageProps, IOwnOption>(
  setDisplayName('ChildPage'),
  withStyles(styles)
)(ChildPageView);