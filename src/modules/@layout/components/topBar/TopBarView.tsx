import {
  AppBar,
  Badge,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
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
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SearchIcon from '@material-ui/icons/Search';
import * as classNames from 'classnames';
import * as React from 'react';

import { TopBarProps } from './TopBar';

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={isWidthUp('md', props.width) ? 3 : 1}
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
            onClick={() => props.setMode('search')}
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
          <Toolbar>
            <IconButton
              aria-label="close search"
              onClick={() => props.handleOnDiscardSearch()}
            >
              <ArrowBackIcon />
            </IconButton>

            {
              props.isSearching &&
              <div onClick={props.handleOnClickDivSearch}>
                <span>  
                  <Typography variant="body1" >
                    {props.search}
                  </Typography>

                  {
                    props.field &&
                    <Typography variant="body2">
                      {props.field.name}
                    </Typography>
                  }
                </span>
              </div>
            }

            {
              !props.isSearching &&
              <Input 
                fullWidth
                autoFocus
                disableUnderline
                placeholder="Search"
                value={props.search}
                onChange={props.handleOnChangeSearch}
                onKeyUp={props.handleOnKeyUpSearch}
              />
            }
          </Toolbar>
          
          {
            !props.isSearching &&
            props.appBarState.fields &&
            <div className={props.search.length < 3 ? props.classes.hide : ''}>
              <Divider />
              <List component="div" disablePadding>
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