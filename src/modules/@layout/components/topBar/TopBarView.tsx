import { ICollectionValue } from '@layout/classes/core';
import { IAppBarControl, IAppBarMenu } from '@layout/interfaces';
import {
  AppBar,
  Badge,
  Button,
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
  PropTypes,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
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
  showMore: boolean;
  isOpenMore: boolean;
  customControls?: IAppBarControl[];
  moreItems?: IAppBarMenu[];
  onClickMore: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickMoreItem: (item: IAppBarMenu) => void;
  onCloseMore: () => void;
}

const ToolbarControl: React.SFC<ToolbarControlOptions> = props => (
  <Toolbar>
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
      props.customControls &&
      props.customControls.map((control, index) =>
        <IconButton 
          key={index}
          color={props.color}
          disabled={control.disabled === true}
          onClick={control.onClick}
        >
          <control.icon/>
        </IconButton>
      )
    }

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
  </Toolbar>
);

interface SearchControlOptions {
  find?: string;
  field?: ICollectionValue;
  className: string;
  OnClickBack: (event: React.MouseEvent) => void;
  OnClickClear: (event: React.MouseEvent) => void;
  OnClickField: (event: React.MouseEvent) => void;
  OnChangeFind: (event: React.ChangeEvent) => void;
  OnKeyUpFind: (event: React.KeyboardEvent) => void;
}

const SearchControl: React.SFC<SearchControlOptions> = props => (
  <Toolbar className={props.className}>
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
        props.find &&
        props.find.length > 0 &&
        <InputAdornment position="end">
          <IconButton onClick={props.OnClickClear}>
            <ClearIcon/>
          </IconButton>
        </InputAdornment>
      }
    />
  </Toolbar>
);

export const TopBarView: React.SFC<TopBarProps> = props => (
  <AppBar 
    elevation={props.mode === 'search' ? 1 : 0}
    position={isWidthUp('md', props.width) ? 'static' : 'fixed'}
    className={classNames(props.getClassNames())}
  >
      {
        props.mode === 'normal' &&
        <ToolbarControl
          color={isWidthUp('md', props.width) ? 'default' : 'inherit'}
          menuclassName={classNames(props.classes.navIconHide, props.isOpenMenu && props.classes.hide)}
          OnClickMenu={props.onClickMenu}
          title={props.layoutState.view && props.layoutState.view.title}
          titleClassName={props.classes.flex}
          showBack={props.layoutState.isNavBackVisible}
          OnClickBack={props.handleOnClickBack}
          showSearch={props.layoutState.isSearchVisible}
          OnClickSearch={props.handleOnClickSearch}
          showNotif={true}
          notifCount={props.getCountNotif()}
          OnClickNotif={props.onClickNotif}
          showMore={props.layoutState.isMoreVisible}
          customControls={props.appBarState.controls}
          moreItems={props.appBarState.menus}
          isOpenMore={props.isShowMenu}
          onClickMore={props.handleOnClickMore}
          onClickMoreItem={props.handleOnClickMoreItem}
          onCloseMore={props.handleOnCloseMore}
        />
      }

      {
        props.mode === 'selection' &&
        props.appBarState.selections &&
        <Toolbar>
          <IconButton
              aria-label="close selection"
              onClick={() => props.handleOnDiscardSelection()}
            >
              <ArrowBackIcon color="action" />
            </IconButton>

          <Typography 
            noWrap 
            variant="body2"
            className={props.classes.flex}
          >
            <FormattedMessage id="layout.label.selection" values={{count: props.appBarState.selections.length}} />
          </Typography>

          <Button 
            size="small"
            onClick={() => props.handleOnClickProcess()}
          >
            <FormattedMessage id="layout.action.process" />
          </Button>
        </Toolbar>
      }

      {
        props.mode === 'search' &&
        <SearchControl
          find={props.search}
          field={props.field}
          className={props.classes.appBarSearch}
          OnClickBack={props.handleOnDiscardSearch}
          OnClickClear={props.handleOnClearSearch}
          OnKeyUpFind={props.handleOnKeyUpSearch}
          OnClickField={props.setFieldVisibility}
          OnChangeFind={props.handleOnChangeSearch}
        />
      }

    {
      props.isShowFields &&
      props.appBarState.fields &&
      <div className={props.search && props.search.length < 3 ? props.classes.hide : props.classes.appBarSearchField}>
        <Divider />
        <List disablePadding>
          <ListItem
            button 
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