// tslint:disable-next-line:max-line-length
import { Hidden, Drawer, WithStyles, withStyles, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ConnectedReduxProps, AppState } from '../../store';
import HomeIcon from '@material-ui/icons/Home';
import TodoIcon from '@material-ui/icons/FormatListNumbered';
import { MenuDrawerOpen, ThemeAnchors, setMenuDrawer } from '../../store/layout';
import { RouteComponentProps } from 'react-router';
import styles from '../../styles';
import * as React from 'react';
import { Dispatch } from 'redux';
import withRoot from '../../withRoot';
import { connect } from 'react-redux';
import { fetchRequest } from '../../store/user/actions';
import { AppUser } from '../../store/user/types';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: ThemeAnchors;
  menuDrawerOpen: MenuDrawerOpen;
  loading: boolean;
  data: AppUser;
  errors: string;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  fetchRequest: typeof fetchRequest;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class LayoutMenu extends React.Component<AllProps> {
  private handleDrawerToggle = () => {
    this.props.setMenuDrawer(!this.props.menuDrawerOpen);
  };

  public componentDidMount() {
    // this.props.fetchRequest();
  }

  public render() {
    const drawer = (
      <div>
        <div className={this.props.classes.drawerHeader} />
          <Divider />
          <List>
            <ListItem button onClick={() => this.props.history.push('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => this.props.history.push('/todo')}>
              <ListItemIcon>
                <TodoIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItem>
          </List>
      </div>
  );
  
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={this.props.anchor}
            open={this.props.menuDrawerOpen}
            classes={{
                paper: this.props.classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
                paper: this.props.classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, user }: AppState) => ({
  anchor: layout.anchor,
  menuDrawerOpen: layout.menuDrawer,
  userData: user.response,
  userLoading: user.loading,
  userErrors: user.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setMenuDrawer: (open: MenuDrawerOpen) => dispatch(setMenuDrawer(open)),
  fetchRequest: () => dispatch(fetchRequest())
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LayoutMenu))));