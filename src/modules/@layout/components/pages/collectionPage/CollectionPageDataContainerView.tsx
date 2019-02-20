import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReorderIcon from '@material-ui/icons/Reorder';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import * as React from 'react';

import { CollectionPageDataContainerProps } from './CollectionPageDataContainer';

export const CollectionPageDataContainerView: React.SFC<CollectionPageDataContainerProps> = props => (
  <React.Fragment>
    <Paper square>
      <Toolbar>
        <Typography
          noWrap
          variant="body2"
          className={props.classes.flex}
        >
          {
            props.state.isLoading &&
            props.intl.formatMessage(layoutMessage.text.loading)
          }

          {
            !props.state.isLoading &&
            !props.state.isError &&
            props.intl.formatMessage(layoutMessage.text.dataInfo, { total: props.metadata && props.metadata.total || 0 })
          }
        </Typography>

        {props.dataComponent}
                
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.orderBy)}
        >
          <div>
            <IconButton
              id="option-field"
              disabled={props.state.isLoading || props.state.isError}
              onClick={props.handleOnClickMenu} 
            >
              <ReorderIcon />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.sortDirection)}
        >
          <div>
            <IconButton 
              id="option-order"
              disabled={props.state.isLoading || props.state.isError}
              onClick={props.handleOnClickMenu}
            >
              <SortByAlphaIcon />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.rowsPerPage)}
        >
          <div>
            <IconButton 
              id="option-size"
              disabled={props.state.isLoading || props.state.isError}
              onClick={props.handleOnClickMenu}
            >
              <ListAltIcon />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
        >
          <div>
            <IconButton 
              id="option-sync"
              disabled={props.state.isLoading || props.state.isError}
              onClick={props.onClickSync}
            >
              <SyncIcon />
            </IconButton>
          </div>
        </Tooltip>
      </Toolbar>
    </Paper>

    <PreloaderWithError 
      state={props.state}
      waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
      onRetry={props.onClickRetry}
    >
      {
        // loaded success
        !props.state.isLoading &&
        !props.state.isError &&
        props.children
      }

      {
        // loaded success (pagination)
        !props.state.isLoading &&
        !props.state.isError &&
        props.metadata &&
        props.metadata.paginate &&
        <Toolbar>
          <Tooltip
            placement="right"
            title={props.intl.formatMessage(layoutMessage.tooltip.prevPage)}
          >
            <div>
              <IconButton
                disabled={props.state.isLoading || !props.metadata.paginate.previous}
                onClick={props.onClickPrevious}
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Typography
            noWrap
            variant="body2"
            align="center"
            className={props.classes.flex}
          >
            {props.intl.formatMessage(layoutMessage.text.pagingInfo, { 
              current: props.metadata.paginate.current,
              total: props.metadata.paginate.total}
            )}
          </Typography>

          <Tooltip
            placement="left"
            title={props.intl.formatMessage(layoutMessage.tooltip.nextPage)}
          >
            <div>
              <IconButton 
                disabled={props.state.isLoading || !props.metadata.paginate.next}
                onClick={props.onClickNext}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      }
    </PreloaderWithError>

    <Menu
      id="data-container-menu" 
      open={props.menuAnchor ? (['option-field', 'option-order', 'option-size']).indexOf(props.menuAnchor) !== -1 : false} 
      anchorEl={props.menuAnchor ? document.getElementById(props.menuAnchor) : null} 
      onClose={() => props.setMenuClear()}
    >
      {
        props.menuItems &&
        props.menuItems.map((item, index) => 
          <MenuItem
            key={index}
            value={item.value}
            selected={props.menuItemActive === item.value}
            onClick={() => props.handleOnClickMenuItem(item)} 
          >
            {item.name}
          </MenuItem>  
        )
      }
    </Menu>
  </React.Fragment>  
);