import { AppBar, Toolbar, IconButton, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import withRoot from '../../withRoot';
import styles from '../../styles';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { ThemeAnchors, MenuDrawerOpen, setMenuDrawer, Title } from '../../store/layout';
import { Dispatch } from 'redux';
import { ConnectedReduxProps } from '../../store';
import { fetchRequest } from '../../store/user/actions';
import * as classNames from 'classnames';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: ThemeAnchors;
  menuDrawerOpen: MenuDrawerOpen;
  title: Title;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  fetchRequest: typeof fetchRequest;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class LayoutHeader extends React.Component<AllProps> {
  private handleDrawerToggle = () => {
    this.props.setMenuDrawer(!this.props.menuDrawerOpen);
  };

  public render() {
    const { menuDrawerOpen } = this.props;

    return (
      <AppBar 
        position="fixed"
        color="primary"
        className={classNames(this.props.classes.appBar, menuDrawerOpen && this.props.classes.appBarShift)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
            className={classNames(this.props.classes.navIconHide, menuDrawerOpen && this.props.classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={this.props.classes.flex} noWrap>
            {this.props.title}
          </Typography>  
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ layout, user }: AppState) => ({
    anchor: layout.anchor,
    menuDrawerOpen: layout.menuDrawer,
    title: layout.title
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuDrawer: (open: MenuDrawerOpen) => dispatch(setMenuDrawer(open)),
  fetchRequest: () => dispatch(fetchRequest())
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LayoutHeader))));