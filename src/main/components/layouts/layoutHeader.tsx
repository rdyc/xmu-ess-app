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
import { AppUserResponse } from '../../store/user/types';
import { fetchRequest } from '../../store/user/actions';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: ThemeAnchors;
  menuDrawerOpen: MenuDrawerOpen;
  title: Title;
  user: { 
    response?: AppUserResponse,
    errors?: string,
    loading: boolean
  };
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  fetchRequest: typeof fetchRequest;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class LayoutHeader extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  private handleDrawerToggle = () => {
    this.props.setMenuDrawer(!this.props.menuDrawerOpen);
  };

  public render() {
    const { user } = this.props;

    return (
      <AppBar className={this.props.classes.appBarShift}>
        {user.response && (
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
            {user.response.data.fullName}
          </Typography>  
          </Toolbar>
        )}
      </AppBar>
    );
  }
}

const mapStateToProps = ({ layout, user }: AppState) => ({
    anchor: layout.anchor,
    menuDrawerOpen: layout.menuDrawer,
    title: layout.title,

    user: { 
      response: user.response,
      errors: user.errors,
      loading: user.loading
    }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuDrawer: (open: MenuDrawerOpen) => dispatch(setMenuDrawer(open)),
  fetchRequest: () => dispatch(fetchRequest())
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LayoutHeader))));