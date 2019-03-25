import { layoutMessage } from '@layout/locales/messages';
import { IconButton, InputAdornment, InputBase, Menu, MenuItem } from '@material-ui/core';
import { Close, MoreHoriz } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';

import { SearchBoxProps } from './SearchBox';

export const SearchBoxView: React.SFC<SearchBoxProps> = props => (
  <div className={props.classes.search}>
    <div className={props.classes.searchIcon}>
      <SearchIcon color="default" />
    </div>

    <InputBase
      value={props.find || ''}
      placeholder={props.intl.formatMessage(layoutMessage.text.search)}
      classes={{
        root: props.classes.searchRoot,
        input: props.classes.searchInput,
      }}
      endAdornment={
        props.find &&
        props.find.length > 0 &&
        <InputAdornment position="end">
          <IconButton 
            className={props.classes.searchRightIcon}
            id="search.fields"
            color="default"
            onClick={props.handleOnOpen}
          >
            <MoreHoriz fontSize="small" />
          </IconButton>

          <IconButton 
            className={props.classes.searchRightIcon}
            color="default"
            onClick={props.handleOnClear}
          >
            <Close fontSize="small" />
          </IconButton>
        </InputAdornment>
      }
      onChange={props.handleOnChange}
      onKeyUp={props.handleOnKeyUp}
    />

    <Menu
      id="appbar-more-menu" 
      anchorEl={document.getElementById('search.fields')} 
      open={props.isOpen} 
      onClose={props.handleOnClose}
    >
      <MenuItem 
        button
        selected={props.findBy === undefined}
        onClick={() => props.handleOnClickField()} 
      >
        {props.find} in Any
      </MenuItem>  
      {
        props.fields && 
        props.fields
          .map((item, index) =>
            <MenuItem 
              button
              key={index}
              value={item.name}
              selected={item.value === props.findBy}
              onClick={() => props.handleOnClickField(item.value)} 
            >
              {props.find} in {item.name}
            </MenuItem>  
          )
      }
    </Menu>
  </div>
);