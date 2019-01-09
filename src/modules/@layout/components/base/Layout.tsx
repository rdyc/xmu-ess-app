import { TopBar } from '@layout/components';
import { DrawerAction } from '@layout/components/drawer/DrawerAction';
import { DrawerMenu } from '@layout/components/drawer/DrawerMenu';
import SnackbarAlertSFC from '@layout/components/snackbar/SnackbarAlertSFC';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { LayoutTheme } from '@layout/hoc/withRoot';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose } from 'recompose';

import { ErrorBoundary } from './ErrorBoundary';

const envWebName = process.env.REACT_APP_WEBSITE_NAME;

type LayoutProps 
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>;

const layout: React.SFC<LayoutProps> = props => {
  const { classes } = props;
  const { anchor, isModeList } = props.layoutState;

  // set document props
  if (props.layoutState.view) {
    const meta = document.getElementsByTagName('meta'); 
    const desc = meta.namedItem('description');
    
    if (desc) {
      desc.content = props.layoutState.view.subTitle;
    }
    
    document.title = `${props.layoutState.view.title} - ${envWebName}`;
  } else {
    document.title = envWebName || '?';
  }

  // don't render layout when user not completely loaded from oidc
  if (!props.userState.user) {
    return null;
  }

  return (
    <LayoutTheme>
      <div className={classes.root}>
        <TopBar />

        <DrawerMenu />
        
        <DrawerAction />
        
        <main className={classNames(
          classes.content,
          isModeList ? classes.contentWithBottomNav : '',
          anchor === 'right' ? classes.contentShiftRight : classes.contentShiftLeft)}
          >
          <ErrorBoundary>
            {props.children}
          </ErrorBoundary>
        </main>
        
        <SnackbarAlertSFC />
      </div>
    </LayoutTheme>
  );
};

export const Layout = compose<LayoutProps, {}>(
  withUser,
  withStyles(styles),
  withLayout,
)(layout);