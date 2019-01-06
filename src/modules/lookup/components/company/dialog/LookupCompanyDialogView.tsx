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
import { LookupCompanyDialogProps } from './LookupCompanyDialog';

export const LookupCompanyDialogView: React.SFC<LookupCompanyDialogProps> = props => {
  const { isOpen, _search } = props;
  const { intl } = props;
  const { onSelected, onClose, filterCompanies, searchOnChange, searchOnKeyUp } = props;
  const { response } = props.lookupCompanyState.list;
  
  const companies = filterCompanies(response);

  const rowRenderer = (row: ListRowProps) => {
    if (companies.length > 0) {
      const company = companies[row.index];

      if (!company) {
        return;
      }

      return (
        <ListItem 
          button 
          key={row.index}
          style={{...row.style}}
          onClick={() => onSelected(company)}
        >
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            color="primary"
            primary={company.name}
            primaryTypographyProps={{
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
      aria-labelledby="lookup-company-dialog-title"
      onClose={onClose}
    >
      <AppBar className={props.classes.appBarDialog}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => onClose()} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            <FormattedMessage id="lookup.company.lookupTitle" />
          </Typography>
          <Button color="inherit" onClick={() => onClose()}>
            <FormattedMessage id="global.action.discard" />
          </Button>
        </Toolbar>
      </AppBar>
      
      <DialogContent>
        <TextField
          id="lookup-company-selector-text"
          fullWidth
          margin="normal"
          value={_search}
          disabled={!response}
          label={<FormattedMessage id="global.search" />}
          placeholder={intl.formatMessage({ id: 'lookup.placeholder.companySearch' })}
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
          <VirtualizedList
            width={9999}
            height={9999}
            autoWidth
            autoHeight
            rowCount={companies.length}
            rowHeight={70}
            rowRenderer={rowRenderer}
          />
        </List>
      </DialogContent>
    </Dialog>
  );

  return render;
};