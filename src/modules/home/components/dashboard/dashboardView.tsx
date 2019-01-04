import { homeMessage } from '@home/locales/messages';
import { Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import SyncIcon from '@material-ui/icons/Sync';
import * as classnames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';

import { DashboardProps } from './Dashboard';

const stepperSources = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bird',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
];

export const dashboardView: React.SFC<DashboardProps> = props => (
  <React.Fragment>
    <Stepper source={stepperSources} />
    
    <div>
      <div className={props.classes.forceRight}>
        <IconButton onClick={() => props.handleSyncClick()}>
          <SyncIcon />
        </IconButton>
      </div>

      <div className={props.classes.marginWideBottom}>
        <Typography variant="h6">
          {props.intl.formatMessage(homeMessage.dashboard.section.notificationTitle)}
        </Typography>
        {/* <Typography variant="body2">
          {props.intl.formatMessage(homeMessage.dashboard.section.notificationSubHeader)}
        </Typography> */}
      </div>

      {
        props.notificationState.loading &&
        <Typography variant="body1">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }

      {
        !props.notificationState.loading &&
        props.notificationState.result && 
        props.notificationState.result.data && 
        <Grid container spacing={16}>
          {
            props.notificationState.result.data
            .sort((a , b) => (a.name > b.name) ? 1 : 0)
            .map((category, c) => category.details
              .map((detail, d) =>
                <Grid key={`${c}${d}`} item xs={12} sm={6} md={3}>
                  <Card square>
                    <CardHeader
                      avatar={
                        <Avatar>
                          <NotificationImportant />
                        </Avatar>
                      }
                      action={
                        <IconButton
                          className={classnames(props.classes.expand, {
                            [props.classes.expandOpen]: props.isExpanded(c, d),
                          })}
                          onClick={() => props.handleExpandClick(c, d)}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      }
                      title={category.name}
                      subheader={`${detail.total} ${detail.type}`}
                      titleTypographyProps={{
                        noWrap: true
                      }}
                      subheaderTypographyProps={{
                        noWrap: true
                      }}
                    />

                    <Collapse 
                      style={{
                        backgroundColor: props.theme.palette.background.default,
                        maxHeight: 300, 
                        overflowY: 'scroll'
                      }} 
                      in={props.isExpanded(c, d)} 
                      timeout="auto" 
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {
                          detail.items.length > 1 &&
                          <ListItem
                            button
                            onClick={() => props.handleNotifClick(category.name, detail.type)}
                          >
                            <ListItemText
                              primary={props.intl.formatMessage(homeMessage.dashboard.text.showAll)}
                              secondary={props.intl.formatMessage(homeMessage.dashboard.text.showAllDesc)}
                              primaryTypographyProps={{
                                noWrap: true,
                                variant: 'body2'
                              }}
                              secondaryTypographyProps={{
                                variant: 'caption'
                              }}
                            />
                          </ListItem>
                        }

                        {
                          detail.items.map(item =>
                            <div key={item.uid}>
                              <Divider/>
                              <ListItem
                                button
                                onClick={() => props.handleNotifClick(category.name, detail.type, item.uid)}
                              >
                                <ListItemText
                                  primary={`${item.type && item.type.value} - ${item.name}`}
                                  secondary={`${item.uid} ${moment(item.date).fromNow()}`}
                                  primaryTypographyProps={{
                                    noWrap: true,
                                    variant: 'body2'
                                  }}
                                  secondaryTypographyProps={{
                                    variant: 'caption'
                                  }}
                                />
                              </ListItem>
                            </div>
                          )
                        }
                      </List>
                    </Collapse>
                  </Card>  
                </Grid>  
              )
            )
          }
        </Grid>
      }    
    </div>

  </React.Fragment>
);