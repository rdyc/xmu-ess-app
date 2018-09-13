import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setActive, setMenuDrawer } from '@layout/store/actionCreators';
import { Anchor } from '@layout/types';
import { ILookupRoleMenuList } from '@lookup/interfaces/ILookupRoleMenuList';
import { Drawer, Hidden, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { menuItemDrawer as MenuItemDrawer } from './menuItemDrawer';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  menuItems: ILookupRoleMenuList[];
  user: IAppUser;
  active: ICurrentPage;
}

interface PropsFromDispatch {
  setMenuDrawer: typeof setMenuDrawer;
  setActive: typeof setActive;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

export const menuDrawer: React.StatelessComponent<AllProps> = props => (
  <div>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        anchor={props.anchor}
        open={props.menuDrawer}
        classes={{
          paper: props.classes.drawerPaper,
        }}
        onClose={() => props.setMenuDrawer(!props.menuDrawer)}
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
        anchor={props.anchor}
        open={props.menuDrawer}
        classes={{
          paper: classNames(props.classes.drawerPaper, 
                            props.menuDrawer && props.classes.drawerPaperClose),
        }}
      >
        <MenuItemDrawer {...props}/>
      </Drawer>
    </Hidden>
  </div>
);