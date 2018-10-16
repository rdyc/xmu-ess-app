import NavigationMenuSFC from '@layout/components/navigation/NavigationMenuSFC';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { Drawer, Hidden, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

type AllProps 
  = WithLayout 
  & WithStyles<typeof styles>;

const component: React.SFC<AllProps> = props => {
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
          <NavigationMenuSFC/>
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
          <NavigationMenuSFC/>
        </Drawer>
      </Hidden>
    </div>
  );
};

const DrawerMenuSFC = compose(
  setDisplayName('DrawerMenuSFC'),
  withLayout,
  withStyles(styles)
)(component);

export default DrawerMenuSFC;