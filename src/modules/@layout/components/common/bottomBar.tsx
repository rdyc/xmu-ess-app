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
import { setReload, setAlertSnackbar } from '@layout/store/actionCreators';
import { IBaseMetadata } from '@generic/interfaces';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  searchMode: boolean;
  listMode: boolean;
  
  listBarReloading: boolean;
  listBarMetadata: IBaseMetadata | undefined;
}
interface PropsFromDispatch {
  setReload: typeof setReload;
  setAlertSnackbar: typeof setAlertSnackbar;
}

type AllProps = PropsFromState & PropsFromDispatch & WithWidthProps & ConnectedReduxProps;

const handleReload = (props: AllProps) => {
  if (!props.listBarReloading) {
    props.setReload(true);
  } else {
    props.setAlertSnackbar({
      open: true,
      message: 'loading in progress...'
    });
  }  
};

const handleNextPage = (props: AllProps) => {
  if (!props.listBarReloading) {
    props.setReload(true);
  } else {
    props.setAlertSnackbar({
      open: true,
      message: 'loading in progress...'
    });
  }  
};

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
      {props.listBarMetadata && props.listBarMetadata.paginate.previous && <BottomNavigationAction label="Prev" icon={<ChevronLeftIcon />} />} 
      <BottomNavigationAction label="Order" icon={<FilterListIcon />} />
      {isWidthUp('sm', props.width) && <BottomNavigationAction label="Sort" icon={<SortByAlphaIcon />} />}
      {isWidthUp('sm', props.width) && <BottomNavigationAction label="Size" icon={<LibraryBooksSharpIcon />} />}
      <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
      <BottomNavigationAction 
        label="Sync" 
        icon={<SyncIcon />} 
        onClick={() => handleReload(props)}
      />
      {props.listBarMetadata && props.listBarMetadata.paginate.next && 
        <BottomNavigationAction 
          icon={<ChevronRightIcon />} 
          label={`Next ${props.listBarMetadata.paginate.current + 1} of ${props.listBarMetadata.paginate.total}`}
          onClick={() => handleNextPage(props)}
        />
      }
    </BottomNavigation>
  );
};