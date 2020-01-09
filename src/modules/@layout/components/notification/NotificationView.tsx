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
import { ModuleIcon } from '../moduleIcon/ModuleIcon';
import { NotificationProps } from './Notification';

export const NotificationView: React.SFC<NotificationProps> = props => {
  const { isLoading, response } = props.notificationState;

  return (
    <React.Fragment>
      <Toolbar className={props.classes.toolbar}>
        <Typography 
          color="inherit" 
          variant="h6" 
          className={props.classes.flex}
        >
          <FormattedMessage id="layout.notification.title"/>
        </Typography>

        <IconButton
          color="inherit"
          disabled={props.notificationState.isLoading}
          onClick={props.handleOnClickReload}
        >
          <SyncIcon/>
        </IconButton>
      </Toolbar>

      <Divider/>
    
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
                  // variant: 'body2'
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
                  // variant: 'body2'
                }}
              />
            </ListItem>  
          }

          {
            !isLoading && response && Array.isArray(response.data) && 
            response.data
              .sort((a , b) => (a.name > b.name) ? 1 : 0)
              .map(category => 
                <React.Fragment key={category.name}>
                  <ListItem
                    button
                    id={category.name}
                    onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 1, category.moduleUid, category.name)}
                  >
                    <ListItemIcon>
                      <ModuleIcon module={category.moduleUid} />
                    </ListItemIcon>
                    <ListItemText
                      primary={category.name}
                      primaryTypographyProps={{
                        // variant: 'body2',
                        noWrap: true
                      }}
                    />
                    <ListItemSecondaryAction>
                      <ChevronRightIcon color="action" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              )
          }
        </List>

        <List disablePadding>
          <ListSubheader disableGutters>
            <ListItem button onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 0, props.module, props.name)}>
              <ListItemIcon>
                <ArrowBackIcon/>
              </ListItemIcon>
              <ListItemText primary={props.name}/>
            </ListItem>
            <Divider/>
          </ListSubheader>

          {
            response && response.data && response.data
              .filter(item => item.moduleUid === props.module)
              .map(category => category.details.map(detail => 
                <React.Fragment key={`${props.module}${detail.type}`}>
                  <ListItem 
                    button 
                    onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 2, props.module, props.name, detail.type)}
                  >
                    <ListItemText 
                      primary={`${detail.total} ${detail.type}`}
                      primaryTypographyProps={{
                        // variant: 'body2'
                      }}
                    />
                    <ListItemSecondaryAction>
                      <ChevronRightIcon color="action" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              ))
          }
            
        </List>

        <List disablePadding>
          <ListSubheader disableGutters>
            <ListItem button onClick={(e: React.MouseEvent) => props.handleOnChangeIndex(e, 1, props.module, props.name)}>
              <ListItemIcon>
                <ArrowBackIcon/>
              </ListItemIcon>
              <ListItemText
                inset={true}
                primary={props.type} 
                primaryTypographyProps={{
                  // variant: 'body2',
                  noWrap: true
                }}  
              />
            </ListItem>
            <Divider/>
          </ListSubheader>

          {
            response && response.data && response.data
              .filter(item => item.moduleUid === props.module)
              .map(category => category.details.filter(item => item.type === props.type).map(detail => detail.items.map(item =>  
                <React.Fragment key={`${props.module}${detail.type}${item.uid}`} >
                  <ListItem 
                    button 
                    onClick={() => props.handleRedirection(item.uid, props.module, props.type)}
                  >
                    <ListItemText 
                      primary={item.name}
                      secondary={`${item.uid} - ${moment(item.date).fromNow()}`} 
                      primaryTypographyProps={{
                        // variant: 'body2'
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption'
                      }}
                    />
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              )))
          }

        </List>
      </SwipeableViews>
    </React.Fragment>
  );
};