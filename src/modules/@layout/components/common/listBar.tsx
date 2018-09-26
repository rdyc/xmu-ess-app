import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { IListBarField, IListBarState, ILayoutState } from '@layout/interfaces';
import {
  listBarChangeDirection,
  listBarMenuHide,
  listBarMenuShow,
  listBarChangeOrder,
  listBarChangeSize,
  layoutAlertAdd,
} from '@layout/store/actions';
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

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  listBarState: IListBarState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    alertAdd: typeof layoutAlertAdd;
  };

  listBarDispatch: {
    changeOrder: typeof listBarChangeOrder;
    changeDirection: typeof listBarChangeDirection;
    changeSize: typeof listBarChangeSize;
    menuShow: typeof listBarMenuShow;
    menuHide: typeof listBarMenuHide;
  };
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                WithWidthProps & 
                WithStyles<typeof styles>;

export const listBar: React.StatelessComponent<AllProps> = props => {
  const { layoutState, listBarState, listBarDispatch, classes, width } = props;

  if (!layoutState.isModeList) {
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
    listBarDispatch.menuShow(e.currentTarget.id);
  };

  const handleClose = (item: IListBarField | undefined) => { 
    if (item) {
      if (listBarState.menuAnchorId) {
        const control = listBarState.menuAnchorId;

        switch (control) {
          case 'bottom-navigation-button-sort':
            listBarDispatch.changeDirection(SortDirection[item.id]);
            listBarState.callbacks.onDirectionCallback(SortDirection[item.id]);
            break;

          case 'bottom-navigation-button-size':
            listBarDispatch.changeSize(Number(item.id));
            listBarState.callbacks.onSizeCallback(Number(item.id));
            break;
        
          default:
            listBarDispatch.changeOrder(item.name);
            listBarState.callbacks.onOrderCallback(item);
            break;
        }
      }
    }

    listBarDispatch.menuHide();
  };

  const populateItems = () => {
    if (listBarState.menuAnchorId) {
      let items: any;

      const control = listBarState.menuAnchorId;

      switch (control) {
        case 'bottom-navigation-button-sort':
          items = sorts;
          break;

        case 'bottom-navigation-button-size':
          items = sizes;
          break;
        
        default:
          if (listBarState.fields) {
            items = listBarState.fields;
          }
          break;
      }

      return renderMenuItems(items);
    }

    return null;
  };

  const isCurrent = (name: string) => {
    let match: boolean = false;

    if (listBarState.menuAnchorId) {
      const control = listBarState.menuAnchorId;

      switch (control) {
        case 'bottom-navigation-button-sort':
          match = listBarState.direction === name;
          break;

        case 'bottom-navigation-button-size':
          match = listBarState.size === Number(name);
          break;
      
        default:
          match = listBarState.orderBy === name;
          break;
      }
    }

    return match;
  };

  const renderMenuItems = (items: IListBarField[]) => (
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
      anchorEl={findElement(listBarState.menuAnchorId || '')} 
      open={listBarState.menuIsOpen} 
      onClose={() => handleClose(undefined)}
    >
      {
        listBarState.fields && 
        populateItems()
      }
    </Menu>
  );

  return (
    <div>
      {renderMenu}
      <BottomNavigation
        showLabels
        className={classes.bottomNavigation}
        value={-1}
      >
        {
          listBarState.metadata && 
          listBarState.metadata.paginate.previous && 
          <BottomNavigationAction 
            label="Prev" 
            icon={<ChevronLeftIcon />}
            onClick={() => listBarState.callbacks.onPrevCallback()}
          />
        } 
        
        <BottomNavigationAction 
          id="bottom-navigation-button-order"
          aria-owns={listBarState.menuAnchorId ? 'bottom-navigation-menu' : ''}
          label={listBarState.orderBy ? listBarState.orderBy : 'Order'} 
          icon={<FilterListIcon />}
          onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
        />
        
        {
          isWidthUp('sm', width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-sort"
            aria-owns={listBarState.menuAnchorId ? 'bottom-navigation-menu' : ''}  
            label={listBarState.direction ? listBarState.direction : 'Sort'}
            icon={<SortByAlphaIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
          />
        }
        
        {
          isWidthUp('sm', width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-size"
            aria-owns={listBarState.menuAnchorId ? 'bottom-navigation-menu' : ''}
            label={listBarState.size ? listBarState.size : 'Size'}
            icon={<LibraryBooksSharpIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
          />
        }
        
        <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
        
        <BottomNavigationAction 
          label="Sync" 
          icon={<SyncIcon />} 
          onClick={() => listBarState.callbacks.onSyncCallback()}
        />

        {
          listBarState.metadata && 
          listBarState.metadata.paginate.next && 
          <BottomNavigationAction 
            icon={<ChevronRightIcon />} 
            label="Next"
            onClick={() => listBarState.callbacks.onNextCallback()}
          />
        }
      </BottomNavigation>
    </div>
  );
};