import { ICollectionValue } from '@layout/classes/core';
import { IAppBarMenu } from '@layout/interfaces';
import {
  AppBar,
  Badge,
  Button,
  Divider,
  Hidden,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  PropTypes,
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
import { FormattedMessage } from 'react-intl';

import { TopBarProps } from './TopBar';

interface MoreControlOptions {
  color: PropTypes.Color;
  isOpen: boolean;
  items: IAppBarMenu[] | undefined;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickItem: (item: IAppBarMenu) => void;
  onClose: () => void;
}

const MoreControl: React.SFC<MoreControlOptions> = props => (
  <React.Fragment>
    <IconButton
      id="appbar.btn.more"
      color={props.color}
      aria-label="More"
      onClick={props.onClick}
    >
      <MoreVertIcon />
    </IconButton>

    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById('appbar.btn.more')} 
      open={props.isOpen} 
      onClose={props.onClose}
    >
      {
        props.items && 
        props.items
          .filter(item => item.visible)
          .map(item =>
            <MenuItem 
              button
              key={item.id}
              value={item.id}
              disabled={!item.enabled}
              onClick={() => props.onClickItem(item)} 
            >
              {item.name}
            </MenuItem>  
          )
      }
    </Menu>
  </React.Fragment>
);

interface ToolbarControlOptions {
  color: PropTypes.Color;
  menuclassName: string;
  OnClickMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: string | undefined;
  titleClassName: string;
  showBack: boolean;
  OnClickBack: (event: React.MouseEvent<HTMLDivElement>) => void;
  showSearch: boolean;
  OnClickSearch: (event: React.MouseEvent<HTMLDivElement>) => void;
  showNotif: boolean;
  notifCount: number;
  OnClickNotif: (event: React.MouseEvent<HTMLDivElement>) => void;
  showAction: boolean;
  OnClickAction: (event: React.MouseEvent<HTMLDivElement>) => void;
  showMore: boolean;
  isOpenMore: boolean;
  moreItems: IAppBarMenu[] | undefined;
  onClickMore: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickMoreItem: (item: IAppBarMenu) => void;
  onCloseMore: () => void;
}

const ToolbarControl: React.SFC<ToolbarControlOptions> = props => (
  <React.Fragment>
    {
      /* menu */
      !props.showBack &&
      <IconButton
      color={props.color}
        aria-label="open drawer"
        onClick={props.OnClickMenu}
        className={props.menuclassName}
      >
        <MenuIcon />
      </IconButton>
    }

    {
      /* back */
      props.showBack &&
      <IconButton
        color={props.color}
        onClick={props.OnClickBack}
      >
        <ArrowBackIcon />
      </IconButton>
    }

    {/* title */}
    <Typography 
      noWrap 
      variant="h6" 
      color={props.color}
      className={props.titleClassName}
    >
      {props.title || ''}
    </Typography>

    {/* search */}
    {
      props.showSearch &&
      <IconButton
        color={props.color}
        aria-label="Search"
        onClick={props.OnClickSearch}
      >
        <SearchIcon />
      </IconButton>
    }
    
    <Hidden xsDown>
      {
        /* notifications */
        props.showNotif &&
        props.notifCount > 0 &&
        <IconButton
          color={props.color}
          aria-label="Notifications"
          onClick={props.OnClickNotif}
        >
          <Badge badgeContent={props.notifCount} color="error">
            <NotificationImportant />
          </Badge>
        </IconButton>
      }

      {
        /* action */
        props.showAction &&
        <IconButton
          color={props.color}
          aria-label="Action"
          onClick={props.OnClickAction}
        >
          <AppsIcon />
        </IconButton>
      }
    </Hidden>

    {
      props.showMore &&
      <MoreControl 
        color={props.color}
        items={props.moreItems}
        isOpen={props.isOpenMore}
        onClick={props.onClickMore}
        onClickItem={props.onClickMoreItem}
        onClose={props.onCloseMore}
      />
    }
  </React.Fragment>
);

interface SearchControlOptions {
  find: string;
  field: ICollectionValue | undefined;
  OnClickBack: (event: React.MouseEvent) => void;
  OnClickClear: (event: React.MouseEvent) => void;
  OnClickField: (event: React.MouseEvent) => void;
  OnChangeFind: (event: React.ChangeEvent) => void;
  OnKeyUpFind: (event: React.KeyboardEvent) => void;
}

const SearchControl: React.SFC<SearchControlOptions> = props => (
  <React.Fragment>
    <IconButton
      aria-label="close search"
      onClick={props.OnClickBack}
    >
      <ArrowBackIcon />
    </IconButton>
    
    <Input 
      fullWidth
      autoFocus
      disableUnderline
      placeholder="Type something"
      value={props.find}
      onChange={props.OnChangeFind}
      onKeyUp={props.OnKeyUpFind}
      startAdornment={
        <InputAdornment 
          position="start" 
          onClick={props.OnClickField}>
          <Typography 
            variant="body2" 
            color="inherit"
            noWrap
          >
            {props.field ? props.field.name : ''}
          </Typography>
        </InputAdornment>
      }
      endAdornment={
        props.find.length > 0 &&
        <InputAdornment position="end">
          <IconButton onClick={props.OnClickClear}>
            <ClearIcon/>
          </IconButton>
        </InputAdornment>
      }
    />
  </React.Fragment>
);

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={0}
    position={isWidthUp('md', props.width) ? 'static' : 'fixed'}
    color={isWidthUp('md', props.width) ? props.getClassColor() : 'primary'}
    className={classNames(props.getClassNames())}
  >
    <Toolbar>
      {
        props.mode === 'normal' &&
        props.appBarState.selection.length === 0 &&
        <ToolbarControl
          color={isWidthUp('md', props.width) ? 'default' : 'inherit'}
          menuclassName={classNames(props.classes.navIconHide, props.layoutState.isDrawerMenuVisible && props.classes.hide)}
          OnClickMenu={props.handleOnClickMenu}
          title={props.layoutState.view && props.layoutState.view.title}
          titleClassName={props.classes.flex}
          showBack={props.layoutState.isNavBackVisible}
          OnClickBack={props.handleOnClickBack}
          showSearch={props.layoutState.isSearchVisible}
          OnClickSearch={props.handleOnClickSearch}
          showNotif={true}
          notifCount={props.getCountNotif()}
          OnClickNotif={props.handleOnClickNotif}
          showAction={props.layoutState.isActionCentreVisible}
          OnClickAction={props.handleOnClickAction}
          showMore={props.layoutState.isMoreVisible}
          moreItems={props.appBarState.menus}
          isOpenMore={props.isOpenMenu}
          onClickMore={props.handleOnClickMore}
          onClickMoreItem={props.handleOnClickMoreItem}
          onCloseMore={props.handleOnCloseMore}
        />
      }

      {
        props.mode === 'normal' &&
        props.appBarState.selection.length > 0 &&
        <React.Fragment>
          <IconButton
              aria-label="close selection"
              onClick={() => props.handleOnDiscardSelection()}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography 
              noWrap 
              variant="body2" 
              color="inherit" 
              className={props.classes.flex}
            >
              <FormattedMessage id="layout.label.selection" values={{count: props.appBarState.selection.length}} />
            </Typography>

            <Button 
              size="small" 
              color="primary"
              onClick={() => props.handleOnClickProcess()}
            >
              <FormattedMessage id="layout.action.process" />
            </Button>
          </React.Fragment>
      }

      {
        props.mode === 'search' &&
        <SearchControl
          find={props.search}
          field={props.field}
          OnClickBack={props.handleOnDiscardSearch}
          OnClickClear={props.handleOnClearSearch}
          OnKeyUpFind={props.handleOnKeyUpSearch}
          OnClickField={props.setFieldVisibility}
          OnChangeFind={props.handleOnChangeSearch}
        />
      }
    </Toolbar>

    {
      props.isShowFields &&
      props.appBarState.fields &&
      <div className={props.search.length < 3 ? props.classes.hide : ''}>
        <Divider />
        <List 
          component="div" 
          disablePadding
        >
          <ListItem
            button 
            component="div"
            onClick={() => props.handleOnClickField()}
          >
            <ListItemText 
              primary={`${props.search} in Any`}
              primaryTypographyProps={{
                variant: 'body2'
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
                    variant: 'body2'
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

  </AppBar>
);