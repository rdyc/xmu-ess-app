import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState } from '@layout/interfaces';
import { layoutChangeView, layoutDrawerMenuHide, layoutDrawerMenuShow } from '@layout/store/actions';
import { Drawer, Hidden, WithStyles } from '@material-ui/core';
import { WithWidthProps } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { menuItemDrawer as MenuItemDrawer } from './menuItemDrawer';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    drawerMenuShow: typeof layoutDrawerMenuShow;
    drawerMenuHide: typeof layoutDrawerMenuHide;
    changeView: typeof layoutChangeView;
  };
}

type AllProps = PropsFromState & PropsFromDispatch & WithWidthProps & ConnectedReduxProps;

export const menuDrawer: React.StatelessComponent<AllProps> = props => {
  const { layoutState, layoutDispatch, classes } = props;

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={layoutState.anchor}
          open={layoutState.isDrawerMenuVisible}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={() => layoutDispatch.drawerMenuHide()}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MenuItemDrawer {...props}/>
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          anchor={layoutState.anchor}
          open={layoutState.isDrawerMenuVisible}
          classes={{
            paper: classNames(classes.drawerPaper, layoutState.isDrawerMenuVisible && classes.drawerPaperClose),
          }}
        >
          <MenuItemDrawer {...props}/>
        </Drawer>
      </Hidden>
    </div>
  );
};