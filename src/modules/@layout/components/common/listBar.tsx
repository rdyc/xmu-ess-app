import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { IListBarMenuItem, IListBarState } from '@layout/interfaces';
import {
  listBarDirectionSet,
  listBarMenuHide,
  listBarMenuShow,
  listBarOrderSet,
  listBarSizeSet,
  setAlertSnackbar,
} from '@layout/store/actionCreators';
import { BottomNavigation, BottomNavigationAction, Menu, MenuItem, WithStyles } from '@material-ui/core';
import { isWidthUp, WithWidthProps } from '@material-ui/core/withWidth';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterListIcon from '@material-ui/icons/FilterList';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  searchMode: boolean;
  listMode: boolean;
  listBarState: IListBarState;
}

interface PropsFromDispatch {
  setAlertSnackbar: typeof setAlertSnackbar;

  listBarDispatch: {
    menuShow: typeof listBarMenuShow;
    menuHide: typeof listBarMenuHide;
    orderSet: typeof listBarOrderSet;
    directionSet: typeof listBarDirectionSet;
    sizeSet: typeof listBarSizeSet;
  };
}

type AllProps = PropsFromState & PropsFromDispatch & WithWidthProps & ConnectedReduxProps;

export const listBar: React.StatelessComponent<AllProps> = props => {
  if (!props.listMode) {
    return null;
  }

  const sizes = [
    { id: 5, name: '5' },
    { id: 10, name: '10' },
    { id: 15, name: '15' },
    { id: 20, name: '20' },
    { id: 25, name: '25' }
  ];

  const sorts = [
    { id: 'asc', name: 'Ascending' },
    { id: 'desc', name: 'Descending' }
  ];

  const findElement = (id: string): HTMLElement | null => {
    return document.getElementById(id);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    props.listBarDispatch.menuShow(e.currentTarget.id);
  };

  const handleClose = (item: IListBarMenuItem | undefined) => { 
    if (item) {
      if (props.listBarState.menuAnchorEl) {
        const control = props.listBarState.menuAnchorEl;

        switch (control) {
          case 'bottom-navigation-button-sort':
            props.listBarDispatch.directionSet(SortDirection[item.id]);
            props.listBarState.callbacks.onDirectionCallback(SortDirection[item.id]);
            break;

          case 'bottom-navigation-button-size':
            props.listBarDispatch.sizeSet(Number(item.id));
            props.listBarState.callbacks.onSizeCallback(Number(item.id));
            break;
        
          default:
            props.listBarDispatch.orderSet(item.name);
            props.listBarState.callbacks.onOrderCallback(item);
            break;
        }
      }
    }

    props.listBarDispatch.menuHide();
  };

  const populateItems = () => {
    if (props.listBarState.menuAnchorEl) {
      let items: any;

      const control = props.listBarState.menuAnchorEl;

      switch (control) {
        case 'bottom-navigation-button-sort':
          items = sorts;
          break;

        case 'bottom-navigation-button-size':
          items = sizes;
          break;
        
        default:
          if (props.listBarState.menuItems) {
            items = props.listBarState.menuItems;
          }
          break;
      }

      return renderMenuItems(items);
    }

    return null;
  };

  const isCurrent = (name: string) => {
    let match: boolean = false;

    if (props.listBarState.menuAnchorEl) {
      const control = props.listBarState.menuAnchorEl;

      switch (control) {
        case 'bottom-navigation-button-sort':
          match = props.listBarState.direction === name;
          break;

        case 'bottom-navigation-button-size':
          match = props.listBarState.size === Number(name);
          break;
      
        default:
          match = props.listBarState.orderBy === name;
          break;
      }
    }

    return match;
  };

  const renderMenuItems = (items: IListBarMenuItem[]) => (
    items.map(item =>
      <MenuItem 
        key={item.id}
        value={item.id}
        selected={isCurrent(item.name)}
        onClick={() => handleClose(item)} 
      >
        {item.name}
      </MenuItem>  
    )
  );

  const renderMenu = (
    <Menu 
      id="bottom-navigation-menu" 
      // PaperProps={{
      //   style: {
      //     maxHeight: 500,
      //     width: 300
      //   },
      // }}
      anchorEl={findElement(props.listBarState.menuAnchorEl || '')} 
      open={props.listBarState.menuIsOpen} 
      onClose={() => handleClose(undefined)}
    >
      {
        props.listBarState.menuItems && 
        populateItems()
      }
    </Menu>
  );

  return (
    <div>
      {renderMenu}
      <BottomNavigation
        showLabels
        className={props.classes.bottomNavigation}
        value={-1}
      >
        {
          props.listBarState.metadata && 
          props.listBarState.metadata.paginate.previous && 
          <BottomNavigationAction 
            label="Prev" 
            icon={<ChevronLeftIcon />}
            onClick={() => props.listBarState.callbacks.onPrevCallback()}
          />
        } 
        
        <BottomNavigationAction 
          id="bottom-navigation-button-order"
          aria-owns={props.listBarState.menuAnchorEl ? 'bottom-navigation-menu' : ''}
          label={props.listBarState.orderBy ? props.listBarState.orderBy : 'Order'} 
          icon={<FilterListIcon />}
          onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
        />
        
        {
          isWidthUp('sm', props.width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-sort"
            aria-owns={props.listBarState.menuAnchorEl ? 'bottom-navigation-menu' : ''}  
            label={props.listBarState.direction ? props.listBarState.direction : 'Sort'}
            icon={<SortByAlphaIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
          />
        }
        
        {
          isWidthUp('sm', props.width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-size"
            aria-owns={props.listBarState.menuAnchorEl ? 'bottom-navigation-menu' : ''}
            label={props.listBarState.size ? props.listBarState.size : 'Size'}
            icon={<LibraryBooksSharpIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
          />
        }
        
        <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
        
        <BottomNavigationAction 
          label="Sync" 
          icon={<SyncIcon />} 
          onClick={() => props.listBarState.callbacks.onSyncCallback()}
        />

        {
          props.listBarState.metadata && 
          props.listBarState.metadata.paginate.next && 
          <BottomNavigationAction 
            icon={<ChevronRightIcon />} 
            label="Next"
            onClick={() => props.listBarState.callbacks.onNextCallback()}
          />
        }
      </BottomNavigation>
    </div>
  );
};