import { IHrCompetencyClusterList } from '@hr/classes/response';
import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';
import { FilterClusterProps } from './FilterCluster';

export const FilterClusterView: React.SFC<FilterClusterProps> = props => {
  const { response } = props.hrCompetencyClusterState.list;

  const renderItem = (item: IHrCompetencyClusterList) => {
    return (
      <React.Fragment key={item.uid}>
        <ListItem button onClick={() => props.onSelected(item)}>
          <Radio color="secondary" checked={props.value && props.value === item.uid || false} />
          <ListItemText primary={item.name} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  };

  return (
    <Dialog
      fullScreen
      disableBackdropClick
      className={props.classes.shift}
      open={props.isOpen}
      onClose={props.onClose}
    >
      
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Divider/>

      <List>
        <ListItem button onClick={() => props.onSelected()}>
          <Radio color="secondary" checked={!props.value} />
          <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)}/>
        </ListItem>
        <Divider />

        {
          response &&
          response.data &&
          response.data.map(item =>
            renderItem(item)
          )
        }
      </List>
    </Dialog>
  );
};