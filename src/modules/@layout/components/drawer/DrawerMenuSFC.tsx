import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { Drawer, Hidden, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';
import { NavigationMenu } from '../navigation/NavigationMenu';

type AllProps 
  = WithLayout 
  & WithStyles<typeof styles>;

const component: React.SFC<AllProps> = props => {
  const { layoutState, layoutDispatch, classes } = props;

  return (
    <div>
      <Hidden smUp>
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
          <NavigationMenu/>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          anchor={layoutState.anchor}
          open={layoutState.isDrawerMenuVisible}
          classes={{
            paper: classNames(classes.drawerPaper, classes.drawerPaperBackground, layoutState.isDrawerMenuVisible && classes.drawerPaperClose),
          }}
        >
          <div className={props.classes.drawerPaperBackgroundImage} />
          <NavigationMenu/>
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