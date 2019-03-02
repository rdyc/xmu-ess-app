import { LayoutTheme } from '@layout/hoc/withRoot';
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
        </React.Fragment>
      }
    </div>
  </LayoutTheme>
);