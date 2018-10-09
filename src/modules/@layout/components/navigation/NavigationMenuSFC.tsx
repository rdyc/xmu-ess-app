import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import withUser, { WithUser } from '@layout/hoc/withUser';
import { ILookupRoleMenuChildList } from '@lookup/classes';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { setDisplayName, StateHandlerMap, withStateHandlers } from 'recompose';
import { compose } from 'redux';
import { menuLinkMapper } from 'utils';

interface StateProps {
  active: string | undefined;
  isExpanded: boolean;
}

interface StateHandlerProps extends StateHandlerMap<StateProps> {
  handleToggle: (type: string) => StateProps;
}

type AllProps = WithUser &
  WithLayout &
  WithWidth &
  StateProps &
  StateHandlerProps;

const NavigationMenuSFC: React.SFC<AllProps> = props => {
  const { active, isExpanded, layoutState, layoutDispatch, history } = props;
  const { user } = props.userState;

  const fnCurrentView = (): string | undefined => {
    if (layoutState.view) {
      return layoutState.view.menuUid;
    }

    return undefined;
  };

  const view = fnCurrentView();

  const handleClick = (item: ILookupRoleMenuChildList) => {
    props.handleToggle(item.uid);

    if (layoutState.isDrawerMenuVisible && !isWidthUp('md', props.width)) {
      layoutDispatch.drawerMenuHide();
    }

    history.push(menuLinkMapper(item.uid));
  };

  return (
    <div>
      {user && (
        <div>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary={user.company.name}
                secondary={user.position.name}
              />
            </ListItem>
          </List>
        </div>
      )}

      <Divider />

      <List
        disablePadding
        component="nav"
        subheader={
          <ListSubheader component="div" color="inherit">
            Home
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      {
        user &&
        user.menus &&
        user.menus.map(header => (
          <div key={header.uid}>
            <List disablePadding component="nav" key={header.uid}>
              <ListItem
                key={header.name}
                button
                onClick={() => props.handleToggle(`${header.name}`)}
              >
                <ListItemText key={header.name} primary={`${header.name}`} />
                <ListItemSecondaryAction key={header.name}>
                  {active === `${header.name}` && isExpanded ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse
                key={header.uid}
                in={active === `${header.name}` && isExpanded}
                timeout="auto"
                // unmountOnExit
              >
                <List>
                  {header.childs &&
                    header.childs.map(item => (
                      <ListItem
                        button
                        key={item.uid}
                        onClick={() => handleClick(item)}
                      >
                        <ListItemText
                          key={item.uid}
                          primary={item.name}
                          primaryTypographyProps={{
                            color:
                              item.uid === active || item.uid === view
                                ? 'secondary'
                                : 'textPrimary'
                          }}
                        />
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </List>
          </div>
        ))
      }
      <Divider />
      <List disablePadding component="nav">
        <ListItem button>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  );
};

const enhance = compose(
  setDisplayName('NavigationMenuSFC'),
  withStateHandlers<StateProps, StateHandlerProps>(
    {
      active: undefined,
      isExpanded: false
    },
    {
      handleToggle: (state: StateProps) => (menuUid: string) => ({
        active: menuUid,
        isExpanded: state.active === menuUid ? !state.isExpanded : true
      })
    }
  )
)(
  withUser(
    withLayout(
      withWidth()(
        NavigationMenuSFC
      )
    )
  )
);

export default enhance;