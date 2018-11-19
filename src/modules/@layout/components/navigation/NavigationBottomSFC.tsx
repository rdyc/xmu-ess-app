import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { BottomNavigation, BottomNavigationAction, Menu, MenuItem, WithStyles, withStyles } from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterListIcon from '@material-ui/icons/FilterList';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import styles from '@styles';
import * as React from 'react';
import { compose, setDisplayName } from 'recompose';

type AllProps
  = WithNavBottom
  & WithLayout
  & WithWidth
  & WithStyles<typeof styles>;

const component: React.SFC<AllProps> = props => {
  const { layoutState, navBottomState, navBottomDispatch, classes, width } = props;

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
    navBottomDispatch.menuShow(e.currentTarget.id);
  };

  const handleClose = (item: ICollectionValue | undefined) => { 
    if (item) {
      if (navBottomState.menuAnchorId) {
        const control = navBottomState.menuAnchorId;

        switch (control) {
          case 'bottom-navigation-button-sort':
            navBottomDispatch.changeDirection(SortDirection[item.value as string]);
            navBottomState.callbacks.onDirectionCallback(SortDirection[item.value as string]);
            break;

          case 'bottom-navigation-button-size':
            navBottomDispatch.changeSize(Number(item.value));
            navBottomState.callbacks.onSizeCallback(Number(item.value));
            break;
        
          default:
            navBottomDispatch.changeOrder(item.name);
            navBottomState.callbacks.onOrderCallback(item);
            break;
        }
      }
    }

    navBottomDispatch.menuHide();
  };

  const populateItems = () => {
    if (navBottomState.menuAnchorId) {
      let items: any;

      const control = navBottomState.menuAnchorId;

      switch (control) {
        case 'bottom-navigation-button-sort':
          items = sorts;
          break;

        case 'bottom-navigation-button-size':
          items = sizes;
          break;
        
        default:
          if (navBottomState.fields) {
            items = navBottomState.fields;
          }
          break;
      }

      return renderMenuItems(items);
    }

    return null;
  };

  const isCurrent = (name: string) => {
    let match: boolean = false;

    if (navBottomState.menuAnchorId) {
      const control = navBottomState.menuAnchorId;

      switch (control) {
        case 'bottom-navigation-button-sort':
          match = navBottomState.direction === name;
          break;

        case 'bottom-navigation-button-size':
          match = navBottomState.size === Number(name);
          break;
      
        default:
          match = navBottomState.orderBy === name;
          break;
      }
    }

    return match;
  };

  const renderMenuItems = (items: ICollectionValue[]) => (
    items.map(item =>
      <MenuItem 
        key={item.value}
        value={item.value}
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
      anchorEl={findElement(navBottomState.menuAnchorId || '')} 
      open={navBottomState.menuIsOpen} 
      onClose={() => handleClose(undefined)}
    >
      {
        navBottomState.fields && 
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
          navBottomState.metadata && 
          navBottomState.metadata.paginate &&
          navBottomState.metadata.paginate.previous && 
          <BottomNavigationAction 
            label="Prev" 
            icon={<ChevronLeftIcon />}
            onClick={() => navBottomState.callbacks.onPrevCallback()}
          />
        } 
        
        <BottomNavigationAction 
          id="bottom-navigation-button-order"
          aria-owns={navBottomState.menuAnchorId ? 'bottom-navigation-menu' : ''}
          label={navBottomState.orderBy ? navBottomState.orderBy : 'Order'} 
          icon={<FilterListIcon />}
          onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
        />
        
        {
          isWidthUp('sm', width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-sort"
            aria-owns={navBottomState.menuAnchorId ? 'bottom-navigation-menu' : ''}  
            label={navBottomState.direction ? navBottomState.direction : 'Sort'}
            icon={<SortByAlphaIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)} 
          />
        }
        
        {
          isWidthUp('sm', width) && 
          <BottomNavigationAction 
            id="bottom-navigation-button-size"
            aria-owns={navBottomState.menuAnchorId ? 'bottom-navigation-menu' : ''}
            label={navBottomState.size ? navBottomState.size : 'Size'}
            icon={<LibraryBooksSharpIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
          />
        }
        
        {
          !navBottomState.addDisabled &&
          <BottomNavigationAction 
            label="Add" 
            icon={<AddCircleOutlineIcon />} 
            onClick={(e: React.MouseEvent<HTMLElement>) => navBottomState.callbacks.onAddCallback()}
          />
        }
        
        <BottomNavigationAction 
          label="Sync" 
          icon={<SyncIcon />} 
          onClick={() => navBottomState.callbacks.onSyncCallback()}
        />

        {
          navBottomState.metadata &&
          navBottomState.metadata.paginate &&
          navBottomState.metadata.paginate.next && 
          <BottomNavigationAction 
            icon={<ChevronRightIcon />} 
            label="Next"
            onClick={() => navBottomState.callbacks.onNextCallback()}
          />
        }
      </BottomNavigation>
    </div>
  );
};

const NavigationBottomSFC = compose<AllProps, {}>(
  setDisplayName('NavigationBottomSFC'),
  withNavBottom,
  withLayout,
  withWidth(),
  withStyles(styles)
)(component);

export default NavigationBottomSFC;