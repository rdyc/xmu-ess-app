import { Preloader } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReorderIcon from '@material-ui/icons/Reorder';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SyncIcon from '@material-ui/icons/Sync';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { DataContainerProps } from './DataContainer';

export const DataContainerView: React.SFC<DataContainerProps> = props => (
  <React.Fragment>
    <Paper square>
      <Toolbar>
        <Typography
          noWrap
          variant="body2"
          className={props.className}
        >
          {
            props.isLoading &&
            <FormattedMessage {...layoutMessage.text.loading} />
          }

          {
            !props.isLoading &&
            props.metadata &&
            <FormattedMessage {...layoutMessage.text.dataInfo} values={{
              total: props.metadata.total
            }} />
          }
        </Typography>

        {
          props.additionalControls &&
          props.additionalControls.map((item, index) =>
            <Tooltip
              key={index}
              placement="bottom"
              title={item.title}
            >
              <IconButton
                id={item.id}
                disabled={props.isLoading}
                onClick={item.onClick} 
              >
                <Badge
                  invisible={!item.showBadgeWhen()}
                  badgeContent={<CheckCircleIcon color="secondary" />}
                >
                  <item.icon/>
                </Badge>
              </IconButton>
            </Tooltip>
          )
        }
        
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.orderBy)}
        >
          <IconButton
            id="option-field"
            disabled={props.isLoading}
            onClick={props.handleOnClickMenu} 
          >
            <ReorderIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.sortDirection)}
        >
          <IconButton 
            id="option-order"
            disabled={props.isLoading}
            onClick={props.handleOnClickMenu}
          >
            <SortByAlphaIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.rowsPerPage)}
        >
          <IconButton 
            id="option-size"
            disabled={props.isLoading}
            onClick={props.handleOnClickMenu}
          >
            <ListAltIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
        >
          <IconButton 
            id="option-sync"
            disabled={props.isLoading}
            onClick={props.onClickSync}
          >
            <SyncIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Paper>

    <Preloader 
      show={props.isLoading} 
      label={props.intl.formatMessage(layoutMessage.text.waiting)}
    >
      {props.children}
        
      {
        !props.isLoading &&
        props.metadata &&
        props.metadata.paginate &&
        <Toolbar>
          <Tooltip
            placement="right"
            title={props.intl.formatMessage(layoutMessage.tooltip.prevPage)}
          >
            <div>
              <IconButton
                disabled={props.isLoading || !props.metadata.paginate.previous}
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
            className={props.className}
          >
            {
              props.isLoading &&
              <FormattedMessage {...layoutMessage.text.loading} />
            }

            {
              !props.isLoading &&
              <FormattedMessage 
              {...layoutMessage.text.pagingInfo} 
              values={{
                current: props.metadata.paginate.current,
                total: props.metadata.paginate.total
              }}
              />
            }
          </Typography>

          <Tooltip
            placement="left"
            title={props.intl.formatMessage(layoutMessage.tooltip.nextPage)}
          >
            <div>
              <IconButton 
                disabled={props.isLoading || !props.metadata.paginate.next}
                onClick={props.onClickNext}
                >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      }
    </Preloader>

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