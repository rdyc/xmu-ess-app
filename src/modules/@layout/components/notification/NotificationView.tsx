import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SyncIcon from '@material-ui/icons/Sync';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';
import { isArray } from 'util';

import { NotificationProps } from './Notification';

export const NotificationView: React.SFC<NotificationProps> = props => {
  // const { active, isExpanded } = props;
  const { isLoading, response } = props.notificationState;

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="body2" className={props.classes.flex}>
          <FormattedMessage id="global.notification.title"/>
        </Typography>
        <IconButton 
          disabled={props.notificationState.isLoading}
          onClick={() => props.handleOnClickReload()}
        >
          <SyncIcon/>
        </IconButton>
      </Toolbar>
    
      <SwipeableViews 
        index={props.index}
        enableMouseEvents
        onChangeIndex={props.handleChange}
      >
        <List disablePadding >
          {
            isLoading && 
            <ListItem>
              <ListItemText 
                primary={<FormattedMessage id="global.loading"/>}
                primaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            </ListItem>
          }
          
          {
            !isLoading && !response &&
            <ListItem>
              <ListItemText 
                primary={
                  <FormattedMessage id="global.notification.emptySubTitle"/>
                }
                primaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            </ListItem>  
          }

          {
            !isLoading && response && isArray(response.data) && 
            response.data
              .sort((a , b) => (a.name > b.name) ? 1 : 0)
              .map(category => 
                <React.Fragment key={category.name}>
                  <Divider/>
                  <ListItem
                    button
                    id={category.name}
                    onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 1, category.name)}
                  >
                    <ListItemText primary={category.name}/>
                    <ListItemSecondaryAction>
                      <ChevronRightIcon color="action" />
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              )
          }
        </List>

        <List disablePadding>
          <ListSubheader disableGutters>
            <Divider/>
            <ListItem button onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 0, props.category)}>
              <ListItemIcon>
                <ArrowBackIcon/>
              </ListItemIcon>
              <ListItemText primary={props.category}/>
            </ListItem>
          </ListSubheader>

          {
            response && response.data && response.data
              .filter(item => item.name === props.category)
              .map(category => category.details.map(detail => 
                <React.Fragment key={`${props.category}${detail.type}`}>
                  <Divider/>
                  <ListItem 
                    button 
                    onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 2, props.category, detail.type)}
                  >
                    <ListItemText primary={detail.type} secondary={detail.total}/>
                    <ListItemSecondaryAction>
                      <ChevronRightIcon color="action" />
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))
          }
            
        </List>

        <List disablePadding>
          <ListSubheader disableGutters>
            <Divider/>
            <ListItem button onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 1, props.category)}>
              <ListItemIcon>
                <ArrowBackIcon/>
              </ListItemIcon>
              <ListItemText primary={props.type} secondary={props.category} />
            </ListItem>
          </ListSubheader>

          {
            response && response.data && response.data
              .filter(item => item.name === props.category)
              .map(category => category.details.filter(item => item.type === props.type).map(detail => detail.items.map(item =>  
                <React.Fragment key={`${props.category}${detail.type}${item.uid}`} >
                  <Divider/>
                  <ListItem 
                    button 
                    // onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 2, props.category, detail.type)}
                  >
                    <ListItemText primary={item.name} secondary={`${item.uid} - ${moment(item.date).fromNow()}`} />
                  </ListItem>
                </React.Fragment>
              )))
          }

        </List>
      </SwipeableViews>
    </React.Fragment>
  );
};

{/* {!loading && result && isArray(result.data) && result.data
        // order by name asc
        .sort((a , b) => (a.name > b.name) ? 1 : 0)
        .map(category => category.details
          .map(detail =>
            <div key={detail.type}>
              <ListItem
                id={`${category.name}_${detail.type}`}
                key={category.name}
                button
                onClick={props.handleOnClickCategory}
              >
                <ListItemText
                  key={category.name}
                  primary={`${category.name} (${detail.total})`}
                  primaryTypographyProps={{
                    variant: 'body2'
                  }}
                />
                <ListItemSecondaryAction key={category.name}>
                  {active === `${category.name}_${detail.type}` && isExpanded ?
                  <ExpandLess color="action" /> : <ExpandMore color="action" />}
                </ListItemSecondaryAction>
              </ListItem>

              <Divider/>

              <Collapse
                key={detail.type}
                in={active === `${category.name}_${detail.type}` && isExpanded}
                timeout="auto"
                unmountOnExit
              >
                <List key={detail.type} dense>
                  {detail.items
                    // order by date desc
                    .sort((a , b) => (a.date < b.date) ? 1 : 0)
                    .map(item =>
                    <ListItem
                      key={item.uid}
                      button
                    >
                      <ListItemText
                        key={item.uid}
                        primary={`${item.uid} - ${item.name}`}
                        secondary={`${detail.type} ${moment(item.date).fromNow()}`}
                        primaryTypographyProps={{
                          variant: 'body2'
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </div>
          )
        )
      } */}