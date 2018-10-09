import AppBarSFC from '@layout/components/appBar/AppBarSFC';
import DrawerActionSFC from '@layout/components/drawer/DrawerActionSFC';
import DrawerMenuSFC from '@layout/components/drawer/DrawerMenuSFC';
import NavigationBottomSFC from '@layout/components/navigation/NavigationBottomSFC';
import SnackbarAlertSFC from '@layout/components/snackbar/SnackbarAlertSFC';
import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import * as classNames from 'classnames';
import * as React from 'react';

const Layout: React.SFC<WithLayout> = props => {
  const { classes } = props;
  const { anchor, isModeList } = props.layoutState;

  return (
    <div className={props.classes.root}>
      <AppBarSFC />
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

export default withLayout(Layout);