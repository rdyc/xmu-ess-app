import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List as VirtualizedList, ListRowProps } from 'react-virtualized';

import { LookupLeaveDialogProps } from './LookupLeaveDialog';

export const LookupLeaveDialogView: React.SFC<LookupLeaveDialogProps> = props => {
  const { isOpen, _search } = props;
  const { width, intl } = props;
  const { onSelected, onClose, filterLeaves, searchOnChange, searchOnKeyUp } = props;
  const { response } = props.lookupLeaveState.list;
  
  const isMobile = isWidthDown('sm', width);
  const leaves = filterLeaves(response);

  const rowRenderer = (row: ListRowProps) => {
    if (leaves.length > 0) {
      const leave = leaves[row.index];

      if (!leave) {
        return;
      }

      return (
        <ListItem 
          button 
          key={row.index}
          style={{...row.style}}
          onClick={() => onSelected(leave)}
        >
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            color="primary"
            primary={leave.name}
            secondary={leave.allocation}
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
      fullScreen={isMobile}
      open={isOpen}
      aria-labelledby="lookup-leave-dialog-title" 
      onClose={onClose}
    >
      <DialogTitle 
        id="lookup-leave-dialog-title"
        disableTypography
      >
        <Typography variant="title" color="primary">
          <FormattedMessage id="lookup.leave.title" />
        </Typography>

        <Typography variant="subheading">
          <FormattedMessage id="lookup.leave.subTitle" />
        </Typography>
        
        <TextField
          id="lookup-leave-selector-text"
          fullWidth
          margin="normal"
          value={_search}
          disabled={!response}
          label={<FormattedMessage id="global.search" />}
          placeholder={intl.formatMessage({ id: 'lookup.placeholder.leaveSearch' })}
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
      </DialogTitle>
      <DialogContent 
        style={{ 
          padding: 0 
        }}
      >
        <List>
          <VirtualizedList
            width={600}
            height={550}
            // autoWidth
            // autoHeight
            rowCount={leaves.length}
            rowHeight={60}
            rowRenderer={rowRenderer}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          <FormattedMessage id="global.action.discard" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  return render;
};