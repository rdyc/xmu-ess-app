import { LayoutTheme } from '@layout/hoc/withRoot';
import { Button, Snackbar } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';

import { ErrorBoundary } from '../base/ErrorBoundary';
import { DrawerLeft } from '../drawer/DrawerLeft';
import { DrawerRight } from '../drawer/DrawerRight';
import { SnackbarAlert } from '../snackbar/SnackbarAlert';
import { TopBar } from '../topBar/TopBar';
import { ChildPage, ChildPageProps, MasterPageProps } from './MasterPage';

export const ChildPageView: React.SFC<ChildPageProps> = props => (
  <main className={classNames(props.classes.content, props.classes.shift)}>
    <ErrorBoundary>
      {props.children}
    </ErrorBoundary>
  </main>
);

export const MasterPageView: React.SFC<MasterPageProps> = props => (
  <LayoutTheme>
    <div className={props.classes.root}>
      { 
        props.userState.user &&
        <React.Fragment>
          <TopBar/>

          <DrawerRight/>
          
          <DrawerLeft/>
          
          <ChildPage>
            {props.children}
          </ChildPage>

          <SnackbarAlert/>

          <Snackbar 
            open={props.isUpdateAvailable} 
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top'
            }}
            message="A new updated version is available!"
            action={<Button title="Reload" onClick={props.handleOnClickReload} />}
          />
        </React.Fragment>
      }
    </div>
  </LayoutTheme>
);