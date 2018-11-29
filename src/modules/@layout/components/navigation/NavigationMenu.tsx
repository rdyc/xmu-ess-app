import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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
  & WithStyles<typeof styles>
  & RouteComponentProps; 

const navigationMenu: React.SFC<InnerProps> = props => {
  const { active, isExpanded, layoutState, layoutDispatch, classes } = props;
  const { user } = props.userState;
 
  const fnFindParent = () => {
    let uid: string | undefined;

    if (layoutState.view) {
      uid = layoutState.view.parentUid;
    }
    
    return uid;
  };

  const parentUid = fnFindParent();

  const viewMenuUid = () => {
    if (layoutState.view) {
      return layoutState.view.uid;
    }

    return undefined;
  };

  const handleClick = (uid: string) => {
    props.handleToggle(uid);

    if (layoutState.isDrawerMenuVisible && !isWidthUp('md', props.width)) {
      layoutDispatch.drawerMenuHide();
    }

    props.history.push(menuLinkMapper(uid));
  };

  return (
    <List 
      disablePadding 
      component="div"
    >
      {
        user &&
        <ListItem>
          <ListItemText
            primary={user.company.name}
            secondary={user.position.name}
            primaryTypographyProps={{
              variant: 'body1'
            }}
          />
        </ListItem>
      }

      <Divider />

      <ListItem 
        button
        onClick={() => props.handleToggle(AppMenu.Home)}
      >
        <ListItemText 
          primary="Home" 
          primaryTypographyProps={{
            variant: 'body1'
          }}
        />
        <ListItemSecondaryAction>
          {isExpanded && parentUid === AppMenu.Home || active === AppMenu.Home ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={isExpanded && parentUid === AppMenu.Home || active === AppMenu.Home }>
        <List component="div" disablePadding>
          <ListItem button onClick={() => handleClick(AppMenu.Dashboard)}>
            <ListItemText
              className={classes.marginFarLeft}
              primary="Dashboard"
              primaryTypographyProps={{
                noWrap: true,
                variant: 'body1',
                color: AppMenu.Dashboard === viewMenuUid() ? 'primary' : 'textPrimary'
              }}
            />
          </ListItem>
        </List>
      </Collapse>

      {
        user &&
        user.menus &&
        user.menus.map(header => (
          <div key={header.uid}>
            <ListItem
              button
              onClick={() => props.handleToggle(header.uid)}
            >
              <ListItemText primary={header.name}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: 'body1'
                }}
              />
              <ListItemSecondaryAction>
                {isExpanded && parentUid === header.uid || active === header.uid ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
              </ListItemSecondaryAction>
            </ListItem>
            
            <Collapse in={isExpanded && parentUid === header.uid || active === header.uid }>
              <MenuList>
                
                {
                  header.childs &&
                  header.childs.map(item =>
                    <MenuItem 
                      key={item.uid} 
                      onClick={() => handleClick(item.uid)}
                      selected={active === item.uid}
                    >
                      <Typography
                        className={classes.marginFarLeft}
                        noWrap={true}
                        variant={'body1'}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  )
                }
              </MenuList>
            </Collapse>
          </div>
        ))
      }

      <Divider />

      <ListItem button>
        <ListItemText primary="Help" />
      </ListItem>
      <Link to={'/reports/winningratio'}>
        <ListItem button>
          <ListItemText primary="Winning Ratio" />
        </ListItem>
      </Link>
    </List>
  );
};

const createProps: mapper<OutterProps, State> = (props: OutterProps) => ({ 
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<OutterProps, State, Updaters> = {
  handleToggle: (state: State) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const NavigationMenu = compose<InnerProps, OutterProps>(
  setDisplayName('NavigationMenu'),
  withStateHandlers<State, Updaters>(createProps, stateUpdaters),
  withUser,
  withLayout,
  withWidth(),
  withStyles(styles),
  withRouter
)(navigationMenu);

export default NavigationMenu;