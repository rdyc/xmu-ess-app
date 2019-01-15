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
import { LookupCustomerDialogProps } from './LookupCustomerDialog';

export const LookupCustomerDialogView: React.SFC<LookupCustomerDialogProps> = props => {
  const { isOpen, _search } = props;
  const { intl } = props;
  const { onSelected, onClose, filterCustomers, searchOnChange, searchOnKeyUp } = props;
  const { isLoading, response } = props.lookupCustomerState.list;
  
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
      fullScreen
      hideBackdrop={props.hideBackdrop}
      className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      open={isOpen}
      aria-labelledby="lookup-customer-dialog-title"
      scroll="paper"
      onClose={onClose}
    >
      <AppBar position="fixed" className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => onClose()} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            <FormattedMessage id="lookup.customer.lookupTitle" />
          </Typography>
          <Button color="inherit" onClick={() => onClose()}>
            <FormattedMessage id="global.action.discard" />
          </Button>
        </Toolbar>
      </AppBar>
      
      <DialogContent className={props.classes.paddingDisabled}>
        <div className={props.classes.paddingFar}>
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
        </div>
        
        <List>
          {
            !isLoading &&
            <VirtualizedList
              width={9999}
              height={9999}
              autoWidth
              autoHeight
              rowCount={customers.length}
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