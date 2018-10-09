import NavigationMenuSFC from '@layout/components/navigation/NavigationMenuSFC';
import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import { Drawer, Hidden } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { compose, setDisplayName, StateHandlerMap, withStateHandlers } from 'recompose';

interface ToggleProps {
  active: string | undefined;
  isExpanded: boolean;
}

interface ToggleHandlerProps extends StateHandlerMap<ToggleProps> {
  handleToggle: (type: string) => ToggleProps;
}

type AllProps 
  = WithLayout 
  & ToggleProps 
  & ToggleHandlerProps;

const DrawerMenuSFC: React.SFC<AllProps> = props => {
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

const enhance = compose(
  setDisplayName('DrawerMenuSFC'),
  withStateHandlers<ToggleProps, ToggleHandlerProps>(
    { 
      active: undefined,
      isExpanded: false
    },
    {
      handleToggle: (state: ToggleProps) => (type: string) => ({
        active: type,
        isExpanded: state.active === type ? !state.isExpanded : true
      })
    }
  )
)(
  withLayout(DrawerMenuSFC)
);

export default enhance;