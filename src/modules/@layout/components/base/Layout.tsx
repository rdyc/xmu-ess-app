import AppBarSFC from '@layout/components/appBar/AppBarSFC';
import DrawerActionSFC from '@layout/components/drawer/DrawerActionSFC';
import DrawerMenuSFC from '@layout/components/drawer/DrawerMenuSFC';
import NavigationBottomSFC from '@layout/components/navigation/NavigationBottomSFC';
import SnackbarAlertSFC from '@layout/components/snackbar/SnackbarAlertSFC';
import loadUser from '@layout/hoc/loadUser';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';
import withRoot from 'withRoot';

type AllProps 
  = WithLayout
  & WithStyles<typeof styles>;

const layout: React.SFC<AllProps> = props => {
  const { classes } = props;
  const { anchor, isModeList } = props.layoutState;

  return (
    <div className={classes.root}>
      <AppBarSFC/>
      <DrawerMenuSFC/>
      <DrawerActionSFC/>
      <main className={classNames(
        classes.content,
        isModeList ? classes.contentWithBottomNav : '',
        anchor === 'right' ? classes.contentShiftRight : classes.contentShiftLeft)}
      >
        {props.children}
      </main>
      <NavigationBottomSFC/>
      <SnackbarAlertSFC/>
    </div>
  );
};

const Layout = compose<AllProps, {}>(
  setDisplayName('Layout'),
  withRoot,
  withStyles(styles),
  loadUser,
  withLayout,
)(layout);

export default Layout;