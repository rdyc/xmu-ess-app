import { ConnectedReduxProps } from '@generic/types';
import { WithStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
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

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  searchMode: boolean;
  listMode: boolean;
}

type AllProps = PropsFromState & WithWidthProps & ConnectedReduxProps;

export const bottomBar: React.StatelessComponent<AllProps> = props => {
  if (!props.listMode) {
    return <div></div>;
  }

  return (
    <BottomNavigation
      showLabels
      className={props.classes.bottomNavigation}
      value={2}
    >
      <BottomNavigationAction label="Prev" icon={<ChevronLeftIcon />} />
      <BottomNavigationAction label="Order" icon={<FilterListIcon />} />
      {isWidthUp('sm', props.width) && <BottomNavigationAction label="Sort" icon={<SortByAlphaIcon />} />}
      {isWidthUp('sm', props.width) && <BottomNavigationAction label="Size" icon={<LibraryBooksSharpIcon />} />}
      <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
      <BottomNavigationAction label="Sync" icon={<SyncIcon />} disabled={props.searchMode} />
      <BottomNavigationAction label="Next" icon={<ChevronRightIcon />} />
    </BottomNavigation>
  );
};