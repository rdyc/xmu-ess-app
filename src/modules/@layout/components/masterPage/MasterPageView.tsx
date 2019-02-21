import { LayoutTheme } from '@layout/hoc/withRoot';
import * as classNames from 'classnames';
import * as React from 'react';

import { ErrorBoundary } from '../base/ErrorBoundary';
import { DrawerLeft } from '../drawer/DrawerLeft';
import { DrawerRight } from '../drawer/DrawerRight';
import { SnackbarAlert } from '../snackbar/SnackbarAlert';
import { TopBar } from '../topBar/TopBar';
import { MasterPageProps } from './MasterPage';

export const MasterPageView: React.SFC<MasterPageProps> = props => (
  <LayoutTheme>
    <div className={props.classes.root}>
      { 
        props.userState.user &&
        <React.Fragment>
          <TopBar
            isOpenMenu={props.isOpenDrawerLeft}
            onClickMenu={props.handleVisibilityDrawerLeft}
            onClickNotif={props.handleVisibilityDrawerRight}
          />

          <DrawerRight 
            anchor={props.layoutState.anchor}
          />
          
          <DrawerLeft 
            anchor={props.layoutState.anchor}
          />
          
          <main className={classNames(props.classes.content, props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft)}>
            <ErrorBoundary>
              {props.children}
            </ErrorBoundary>
          </main>

          <SnackbarAlert/>
        </React.Fragment>
      }
    </div>
  </LayoutTheme>
);