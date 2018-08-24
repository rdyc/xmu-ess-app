import { withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../../withRoot';
import styles from '../../styles';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { ThemeAnchors, MenuDrawerOpen, setMenuDrawer } from '../../store/layout';
import { ConnectedReduxProps } from '../../store';
import LayoutHeader from './layoutHeader';
import LayoutMenu from './layoutMenu';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: ThemeAnchors;
  menuDrawerOpen: MenuDrawerOpen;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class LayoutContainer extends React.Component<AllProps> {
  public render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>    
          <LayoutHeader />
          <LayoutMenu />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }: AppState) => ({
    anchor: layout.anchor,
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps)(LayoutContainer))));