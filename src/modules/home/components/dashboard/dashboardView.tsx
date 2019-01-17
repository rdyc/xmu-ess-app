import { homeMessage } from '@home/locales/messages';
import { ModuleIcon } from '@layout/components/moduleIcon/ModuleIcon';
import { Stepper } from '@layout/components/stepper/Stepper';
import { layoutMessage } from '@layout/locales/messages';
import {
  Avatar,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyncIcon from '@material-ui/icons/Sync';
import * as moment from 'moment';
import * as React from 'react';

import { Chart } from './Chart';
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
    <div className={props.classes.marginFarBottom}>
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
        props.notificationState.isLoading &&
        <Typography variant="body1">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }

      {
        !props.notificationState.isLoading &&
        props.notificationState.response && 
        props.notificationState.response.data && 
        <Grid container spacing={16}>
          {
            props.notificationState.response.data
            .sort((a , b) => (a.name > b.name) ? 1 : 0)
            .map((category, c) => category.details
              .map((detail, d) =>
                <Grid key={`${c}${d}`} item xs={12} sm={12} md={4} lg={3} xl={2}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <div>
                        <Avatar className={props.classes.backgroundColorSecondary}>
                          <ModuleIcon module={category.moduleUid} />
                        </Avatar>
                      </div>
                      
                      <div className={props.classes.marginFarLeft}>
                        <Typography variant="body2" noWrap>
                          {category.name}
                        </Typography>
                        <Typography variant="caption" noWrap>
                          {`${detail.total} ${detail.type}`}
                        </Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails 
                      style={{
                        padding: 0,
                        maxHeight: 300, 
                        backgroundColor: props.theme.palette.background.default,
                        overflowY: 'scroll'
                      }}
                    >
                      <List disablePadding style={{ width: '100%' }}>
                        {
                          detail.items.length > 1 &&
                          <ListItem
                            button
                            onClick={() => props.handleNotifClick(category.moduleUid, detail.type)}
                          >
                            <ListItemText
                              primary={props.intl.formatMessage(homeMessage.dashboard.text.showAll)}
                              secondary={props.intl.formatMessage(homeMessage.dashboard.text.showAllDesc)}
                              primaryTypographyProps={{
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
                            <React.Fragment key={item.uid}>
                              <Divider/>
                              <ListItem
                                button
                                onClick={() => props.handleNotifClick(category.moduleUid, detail.type, item.uid)}
                              >
                                <ListItemText
                                  primary={item.name}
                                  secondary={`${item.uid} | ${moment(item.date).fromNow()}`}
                                  primaryTypographyProps={{
                                    variant: 'body2'
                                  }}
                                  secondaryTypographyProps={{
                                    variant: 'caption'
                                  }}
                                />
                              </ListItem>
                            </React.Fragment>
                          )
                        }
                      </List>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>  
              )
            )
          }
        </Grid>
      }    
    </div>

    <Chart />
    
    <Stepper source={stepperSources} />
  </React.Fragment>
);