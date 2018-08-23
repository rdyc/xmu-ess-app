import { AppBar, Toolbar, IconButton, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import withRoot from '../withRoot';
import styles from '../styles';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { RouteComponentProps } from 'react-router';
import { ThemeAnchors, MenuDrawerOpen, setMenuDrawer } from '../store/layout';
import { Dispatch } from 'redux';
import { ConnectedReduxProps } from '../store';

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

class LayoutHeader extends React.Component<AllProps> {
  private handleDrawerToggle = () => {
    this.props.setMenuDrawer(!this.props.menuDrawerOpen);
  };

  public render() {
    return (
      <AppBar className={this.props.classes.appBar}>
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={this.props.classes.navIconHide}
          >
              <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            ESS
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ layout }: AppState) => ({
    anchor: layout.anchor,
    menuDrawerOpen: layout.menuDrawer
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuDrawer: (open: MenuDrawerOpen) => dispatch(setMenuDrawer(open))
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LayoutHeader))));