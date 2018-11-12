import {
  AppBar,
  Badge,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import AppsIcon from '@material-ui/icons/Apps';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SearchIcon from '@material-ui/icons/Search';
import * as classNames from 'classnames';
import * as React from 'react';

import { TopBarProps } from './TopBar';

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={isWidthUp('md', props.width) ? 2 : 1}
    position="fixed"
    color={props.mode === 'search' ? 'inherit' : props.layoutState.theme.palette.type === 'dark' ? 'default' : 'primary'}
    className={classNames(props.getClassNames())}
  >
    {
      props.mode !== 'search' ?
      <Toolbar>
        {
          /* menu */
          !props.layoutState.isNavBackVisible &&
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.layoutDispatch.drawerMenuShow()}
            className={classNames(props.classes.navIconHide, props.layoutState.isDrawerMenuVisible && props.classes.hide)}>
            <MenuIcon />
          </IconButton>
        }
    
        {
          /* back */
          props.layoutState.isNavBackVisible && 
          <IconButton
            color="inherit"
            onClick={() => props.layoutDispatch.navBackShow() && props.history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
        }
    
        {/* title */}
        <Typography 
          noWrap 
          variant="title" 
          color="inherit" 
          className={props.classes.flex}
        >
          {props.layoutState.view && props.layoutState.view.title}
        </Typography>
    
        {/* search */}
        {
          props.layoutState.isSearchVisible &&
          <IconButton
            color="inherit"
            aria-label="Search"
            onClick={props.handleOnClickSearch}
          >
            <SearchIcon />
          </IconButton>
        }
        
        {
          /* notifications */
          props.getCountNotif() > 0 &&
          <IconButton
            color="inherit"
            aria-label="Notifications"
            onClick={() => props.layoutDispatch.drawerActionShow()}
          >
            <Badge badgeContent={props.getCountNotif()} color="error">
              <NotificationImportant />
            </Badge>
          </IconButton>
        }

        {
          /* action */
          props.layoutState.isActionCentreVisible &&
          <IconButton
            color="inherit"
            aria-label="Action"
            onClick={() => props.layoutDispatch.drawerActionShow()}
          >
            <AppsIcon />
          </IconButton>
        }
    
        {
          /* more */
          props.layoutState.isMoreVisible &&
          <IconButton
            id="appbar.btn.more"
            color="inherit"
            aria-label="More"
            onClick={props.setMenuVisibility}
          >
            <MoreVertIcon />
          </IconButton>
        }
      </Toolbar>
      :
      <Slide 
        mountOnEnter 
        unmountOnExit
        direction="down" 
        in={props.mode === 'search'} 
        timeout={300}
      >
        <div>
          <Toolbar >
            <IconButton
              aria-label="close search"
              onClick={() => props.handleOnDiscardSearch()}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <Input 
              fullWidth
              autoFocus
              disableUnderline
              placeholder="Type something"
              value={props.search}
              onChange={props.handleOnChangeSearch}
              onKeyUp={props.handleOnKeyUpSearch}
              startAdornment={
                <InputAdornment 
                  position="start" 
                  onClick={() => props.setFieldVisibility()}>
                  <Typography 
                    variant="body1" 
                    color="inherit"
                    noWrap
                  >
                    {props.field ? props.field.name : ''}
                  </Typography>
                </InputAdornment>
              }
              endAdornment={
                props.search.length > 0 &&
                <InputAdornment position="end">
                  <IconButton onClick={() => props.handleOnClearSearch()}>
                    <ClearIcon/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </Toolbar>
          
          {
            props.isShowFields &&
            props.appBarState.fields &&
            <div className={props.search.length < 3 ? props.classes.hide : ''}>
              <Divider />
              <List 
                component="div" 
                disablePadding
                className={props.theme.palette.background.default}
              >
                <ListItem
                  button 
                  component="div"
                  onClick={() => props.handleOnClickField()}
                >
                  <ListItemText 
                    primary={`${props.search} in Any`}
                    primaryTypographyProps={{
                      variant: 'body1'
                    }}
                  />
                  <ListItemSecondaryAction>
                    <CallMadeIcon color="action" />
                  </ListItemSecondaryAction>
                </ListItem>
                {
                  props.appBarState.fields.map((field, index) =>
                    <ListItem 
                      key={index} 
                      button 
                      component="div"
                      onClick={() => props.handleOnClickField(field)}
                    >
                      <ListItemText 
                        primary={`${props.search} in ${field.name}`}
                        primaryTypographyProps={{
                          variant: 'body1'
                        }}
                      />
                      <ListItemSecondaryAction>
                        <CallMadeIcon color="action" />
                      </ListItemSecondaryAction>
                    </ListItem>   
                  )
                }
              </List>
            </div>
          }
          
        </div>
      </Slide>
    }

    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById('appbar.btn.more')} 
      open={props.isOpenMenu} 
      onClose={props.setMenuVisibility}
    >
      {
        props.appBarState.menus && 
        props.appBarState.menus
          .filter(item => item.visible)
          .map(item =>
            <MenuItem 
              button
              key={item.id}
              value={item.id}
              disabled={!item.enabled}
              onClick={() => props.handleOnClickMenu(item)} 
            >
              {item.name}
            </MenuItem>  
          )
      }
    </Menu>
  </AppBar>
);