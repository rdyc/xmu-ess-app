import { ConnectedReduxProps } from '@generic/types';
import { setSearchMode } from '@layout/store/actionCreators';
import { AppBar, WithStyles, Toolbar, TextField, IconButton } from '@material-ui/core';
import styles from '@styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Anchor } from '@layout/types';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  topSearchBar: boolean;
  menuDrawer: boolean;
}

interface PropsFromDispatch {
  setTopSearchBar: typeof setSearchMode;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

const findClasses = (props: AllProps) => {
  const shift = props.anchor === 'right' ? props.classes.appBarShiftRight : props.classes.appBarShiftLeft;
  
  return props.menuDrawer ? classNames(props.classes.appBar) : classNames(props.classes.appBar, shift);
};

export const topSearchBar: React.StatelessComponent<AllProps> = props => (
  <AppBar 
    hidden={!props.topSearchBar}
    position="fixed"
    color="default"
    className={classNames(props.classes.appBar, props.menuDrawer && props.anchor === 'right' ? props.classes.appBarShiftRight : props.classes.appBarShiftLeft)}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        className={findClasses(props)}>
        <ArrowBackIcon />
      </IconButton>

      <TextField fullWidth placeholder="search here"></TextField>
    </Toolbar>
  </AppBar>
);