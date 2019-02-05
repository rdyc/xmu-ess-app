import { LayoutTheme } from '@layout/hoc/withRoot';
import { isWidthUp } from '@material-ui/core/withWidth';
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
            isOpen={props.isOpenDrawerRight}
            anchor={props.layoutState.anchor}
            className={classNames(props.classes.drawerPaper, props.classes.drawerPaperAdditional)}
            onClose={props.handleVisibilityDrawerRight}
          />
          
          <DrawerLeft
            isOpen={props.isOpenDrawerLeft}
            variant={isWidthUp('md', props.width) ? 'permanent' : 'temporary'}
            anchor={props.layoutState.anchor}
            className={props.classes.drawerPaper}
            onClose={props.handleVisibilityDrawerLeft}
          />
          
          <main className={classNames(
            props.classes.content,
            props.layoutState.isModeList ? props.classes.contentWithBottomNav : '',
            props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft)}
          >
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