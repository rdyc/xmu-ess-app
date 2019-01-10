import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List as VirtualizedList, ListRowProps } from 'react-virtualized';

import { layoutMessage } from '@layout/locales/messages';
import { OrganizationHierarchyDialogProps } from './OrganizationHierarchyDialog';

export const OrganizationHierarchyDialogView: React.SFC<OrganizationHierarchyDialogProps> = props => {
  const { isOpen, _search } = props;
  const { intl } = props;
  const { onSelected, onClose, filterHierarchies: filterCompany, searchOnChange, searchOnKeyUp } = props;
  const { response, isLoading } = props.organizationHierarchyState.list;
  
  const hierarchies = filterCompany(response);

  const rowRenderer = (row: ListRowProps) => {
    if (hierarchies.length > 0) {
      const hierarchy = hierarchies[row.index];

      if (!hierarchy) {
        return;
      }

      return (
        <ListItem 
          button 
          key={row.index}
          style={{...row.style}}
          onClick={() => onSelected(hierarchy)}
        >
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            color="primary"
            primary={hierarchy.name}
            secondary={hierarchy.uid}
            primaryTypographyProps={{
              noWrap: true
            }}
            secondaryTypographyProps={{
              noWrap: true
            }}
          />
        </ListItem>
      );
    }

    return null;
  };

  const render = (
    <Dialog 
      // fullScreen
      hideBackdrop={props.hideBackdrop}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      open={isOpen}
      aria-labelledby="project-registration-dialog-title"
      onClose={onClose}
    >
      <AppBar className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => onClose()} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            <FormattedMessage id="project.registration.lookupTitle" />
          </Typography>
          <Button color="inherit" onClick={() => onClose()}>
            <FormattedMessage id="global.action.discard" />
          </Button>
        </Toolbar>
      </AppBar>
      
      <DialogContent>
        <TextField
          id="project-registration-selector-text"
          fullWidth
          margin="normal"
          value={_search}
          disabled={!response}
          label={<FormattedMessage id="global.search" />}
          placeholder={intl.formatMessage({ id: 'project.registration.projectSearch' })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={searchOnChange}
          onKeyUp={searchOnKeyUp}
        />
        
        <List>
          {
            !isLoading &&
            <VirtualizedList
              width={9999}
              height={9999}
              autoWidth
              autoHeight
              rowCount={hierarchies.length}
              rowHeight={70}
              rowRenderer={rowRenderer}
            /> ||
            <Typography>
              {intl.formatMessage(layoutMessage.text.loading)}
            </Typography>
          }
        </List>
      </DialogContent>
    </Dialog>
  );

  return render;
};