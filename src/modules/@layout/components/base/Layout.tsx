import AppBarSFC from '@layout/components/appBar/AppBarSFC';
import DrawerActionSFC from '@layout/components/drawer/DrawerActionSFC';
import DrawerMenuSFC from '@layout/components/drawer/DrawerMenuSFC';
import NavigationBottomSFC from '@layout/components/navigation/NavigationBottomSFC';
import SnackbarAlertSFC from '@layout/components/snackbar/SnackbarAlertSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { LayoutTheme } from '@layout/hoc/withRoot';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose } from 'recompose';

import { ErrorBoundary } from './ErrorBoundary';

type LayoutProps 
  = WithLayout
  & WithStyles<typeof styles>;

const layout: React.SFC<LayoutProps> = props => {
  const { classes } = props;
  const { anchor, isModeList } = props.layoutState;

  return (
    <LayoutTheme>
      <div className={classes.root}>
        <AppBarSFC />

        <DrawerMenuSFC />
        
        <DrawerActionSFC />
        
        <main className={classNames(
          classes.content,
          isModeList ? classes.contentWithBottomNav : '',
          anchor === 'right' ? classes.contentShiftRight : classes.contentShiftLeft)}
          >
          <ErrorBoundary>
            {props.children}
          </ErrorBoundary>
        </main>
        
        <NavigationBottomSFC />
        
        <SnackbarAlertSFC />
      </div>
    </LayoutTheme>
  );
};

export const Layout = compose<LayoutProps, {}>(
  withStyles(styles),
  withLayout,
)(layout);