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

import { CustomerSelectProps } from './LookupCustomerSelect';

export const LookupCustomerSelectView: React.SFC<CustomerSelectProps> = props => {
  const { isOpen, _search } = props;
  const { width, intl } = props;
  const { onSelected, onClose, filterCustomers, searchOnChange, searchOnKeyUp } = props;
  const { response } = props.lookupCustomerState.list;
  
  const isMobile = isWidthDown('sm', width);
  const customers = filterCustomers(response);

  const rowRenderer = (row: ListRowProps) => {
    if (customers.length > 0) {
      const customer = customers[row.index];

      if (!customer) {
        return;
      }

      return (
        <ListItem 
          button 
          key={row.index}
          style={{...row.style}}
          onClick={() => onSelected(customer)}
        >
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            color="primary"
            primary={customer.name}
            secondary={customer.address}
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
      aria-labelledby="lookup-customer-dialog-title" 
      onClose={onClose}
    >
      <DialogTitle 
        id="lookup-customer-dialog-title"
        disableTypography
      >
        <Typography variant="title" color="primary">
          <FormattedMessage id="lookup.customer.lookupTitle" />
        </Typography>

        <Typography variant="subheading">
          <FormattedMessage id="lookup.customer.lookupDescription" />
        </Typography>
        
        <TextField
          id="lookup-customer-selector-text"
          fullWidth
          margin="normal"
          value={_search}
          disabled={!response}
          label={<FormattedMessage id="global.search" />}
          placeholder={intl.formatMessage({ id: 'lookup.placeholder.customerSearch' })}
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
            rowCount={customers.length}
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