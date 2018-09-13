import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setAdditionalDrawer, setMenuDrawer } from '@layout/store/actionCreators';
import { AppBar, Badge, IconButton, Toolbar, Typography, WithStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  menuDrawer: boolean;
  additionalDrawer: boolean;
  active: ICurrentPage;
  user: IAppUser;
  notification: number;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  // setNotification: typeof setNotification;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const topAppBar: React.StatelessComponent<AllProps> = props => (
  <AppBar 
    position="fixed"
    color="primary"
    className={classNames(props.classes.appBar, props.menuDrawer && props.classes.appBarShift)}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => props.setMenuDrawer(!props.menuDrawer)}
        className={classNames(props.classes.navIconHide, props.menuDrawer && props.classes.hide)}>
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" className={props.classes.flex} noWrap>
        {props.active.title}
      </Typography>
      {props.notification > 0 &&
        <IconButton
          color="inherit"
          aria-label="Notifications"
          onClick={() => props.setAdditionalDrawer(!props.additionalDrawer)}
        >
          <Badge badgeContent={props.notification} color="error">
            <NotificationImportant />
          </Badge>
        </IconButton>
      }
      <IconButton
        color="inherit"
        aria-label="More"
        onClick={() => props.setAdditionalDrawer(!props.additionalDrawer)}
      >
        <MoreVertIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);