import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import withUser, { WithUser } from '@layout/hoc/withUser';
import { ILookupRoleMenuChildList } from '@lookup/classes';
import { Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, mapper, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { menuLinkMapper } from 'utils';

interface OutterProps {
  
}

interface State {
  active: string | undefined;
  isExpanded: boolean;
}

interface Updaters extends StateHandlerMap<State> {
  handleToggle: StateHandler<State>;
}

type InnerProps 
  = OutterProps
  & State 
  & Updaters
  & WithUser 
  & WithLayout 
  & WithWidth
  & RouteComponentProps; 

const component: React.SFC<InnerProps> = props => {
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

const createProps: mapper<OutterProps, State> = (props: OutterProps) => ({ 
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<OutterProps, State, Updaters> = {
  handleToggle: (state: State) => (menuUid: string) => ({
    active: menuUid,
    isExpanded: state.active === menuUid ? !state.isExpanded : true
  })
};

const NavigationMenuSFC = compose<InnerProps, OutterProps>(
  setDisplayName('NavigationMenuSFC'),
  withStateHandlers<State, Updaters>(createProps, stateUpdaters),
  withUser,
  withLayout,
  withWidth(),
  withRouter
)(component);

export default NavigationMenuSFC;