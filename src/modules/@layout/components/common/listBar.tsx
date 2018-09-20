import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { WithStyles, BottomNavigation, BottomNavigationAction, Menu, MenuItem } from '@material-ui/core';
import { WithWidthProps, isWidthUp } from '@material-ui/core/withWidth';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterListIcon from '@material-ui/icons/FilterList';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { setAlertSnackbar, listBarMenuShow, listBarMenuHide, listBarOrderSet, listBarDirectionSet, listBarSizeSet } from '@layout/store/actionCreators';
import { IBaseMetadata } from '@generic/interfaces';
import { IListBarCallback, IListBarMenuItem } from '@layout/interfaces';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  searchMode: boolean;
  listMode: boolean;
  
  listBarReloading: boolean;
  listBarMetadata: IBaseMetadata | undefined;
  listBarCallbacks: IListBarCallback;
  listBarMenuIsOpen: boolean;
  listBarMenuAnchorEl: string | undefined;
  listBarMenuItems: IListBarMenuItem[] | undefined;
  listBarPage: number | undefined;
  listBarSize: number | undefined;
  listBarOrderBy: string | undefined;
  listBarDirection: SortDirection | undefined;
}

interface PropsFromDispatch {
  listBarMenuShow: typeof listBarMenuShow;
  listBarMenuHide: typeof listBarMenuHide;
  listBarOrderSet: typeof listBarOrderSet;
  listBarDirectionSet: typeof listBarDirectionSet;
  listBarSizeSet: typeof listBarSizeSet;

  setAlertSnackbar: typeof setAlertSnackbar;
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
    props.listBarMenuShow(e.currentTarget.id);
  };

  const handleClose = (item: IListBarMenuItem | undefined) => { 
    if (item) {
      if (props.listBarMenuAnchorEl) {
        const control = props.listBarMenuAnchorEl;

        switch (control) {
          case 'bottom-navigation-button-sort':
            props.listBarDirectionSet(SortDirection[item.id]);
            props.listBarCallbacks.onDirectionCallback(SortDirection[item.id]);
            break;

          case 'bottom-navigation-button-size':
            props.listBarSizeSet(Number(item.id));
            props.listBarCallbacks.onSizeCallback(Number(item.id));
            break;
        
          default:
            props.listBarOrderSet(item.name);
            props.listBarCallbacks.onOrderCallback(item);
            break;
        }
      }
    }

    props.listBarMenuHide();
  };

  const populateItems = () => {
    if (props.listBarMenuAnchorEl) {
      let items: any;

      const control = props.listBarMenuAnchorEl;

      switch (control) {
        case 'bottom-navigation-button-sort':
          items = sorts;
          break;

        case 'bottom-navigation-button-size':
          items = sizes;
          break;
        
        default:
          if (props.listBarMenuItems) {
            items = props.listBarMenuItems;
          }
          break;
      }

      return renderMenuItems(items);
    }

    return null;
  };

  const isCurrent = (name: string) => {
    let match: boolean = false;

    if (props.listBarMenuAnchorEl) {
      const control = props.listBarMenuAnchorEl;

      switch (control) {
        case 'bottom-navigation-button-sort':
          match = props.listBarDirection === name;
          break;

        case 'bottom-navigation-button-size':
          match = props.listBarSize === Number(name);
          break;
      
        default:
          match = props.listBarOrderBy === name;
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
      anchorEl={findElement(props.listBarMenuAnchorEl || '')} 
      open={props.listBarMenuIsOpen} 
      onClose={() => handleClose(undefined)}
    >
      {
        props.listBarMenuItems && 
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
          props.listBarMetadata && 
          props.listBarMetadata.paginate.previous && 
          <BottomNavigationAction 
            label="Prev" 
            icon={<ChevronLeftIcon />}
            onClick={() => props.listBarCallbacks.onPrevCallback()}
          />
        } 
        
        <BottomNavigationAction 
          id="bottom-navigation-button-order"
          aria-owns={props.listBarMenuAnchorEl ? 'bottom-navigation-menu' : ''}
          label={props.listBarOrderBy ? props.listBarOrderBy : 'Order'} 
          icon={<FilterListIcon />}
          onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
        />
        
        {
          isWidthUp('sm', props.width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-sort"
            aria-owns={props.listBarMenuAnchorEl ? 'bottom-navigation-menu' : ''}  
            label={props.listBarDirection ? props.listBarDirection : 'Sort'}
            icon={<SortByAlphaIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
          />
        }
        
        {
          isWidthUp('sm', props.width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-size"
            aria-owns={props.listBarMenuAnchorEl ? 'bottom-navigation-menu' : ''}
            label={props.listBarSize ? props.listBarSize : 'Size'}
            icon={<LibraryBooksSharpIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
          />
        }
        
        <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
        
        <BottomNavigationAction 
          label="Sync" 
          icon={<SyncIcon />} 
          onClick={() => props.listBarCallbacks.onSyncCallback()}
        />

        {
          props.listBarMetadata && 
          props.listBarMetadata.paginate.next && 
          <BottomNavigationAction 
            icon={<ChevronRightIcon />} 
            label="Next"
            onClick={() => props.listBarCallbacks.onNextCallback()}
          />
        }
      </BottomNavigation>
    </div>
  );
};