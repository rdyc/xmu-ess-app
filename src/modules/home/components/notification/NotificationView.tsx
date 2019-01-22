import { homeMessage } from '@home/locales/messages';
import { ModuleIcon } from '@layout/components/moduleIcon/ModuleIcon';
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
  Toolbar,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyncIcon from '@material-ui/icons/Sync';
import * as moment from 'moment';
import * as React from 'react';

import { NotificationProps } from './Notification';

export const NotificationView: React.SFC<NotificationProps> = props => (
  <div className={props.classes.marginFarBottom}>
    {
      props.useToolbar &&
      <Toolbar className={props.classes.toolbarCustom}>
        <React.Fragment>
          <Typography variant="h6" className={props.classes.flex} color="inherit">
            {props.intl.formatMessage(homeMessage.dashboard.section.notificationTitle)}
          </Typography>
          <IconButton color="inherit" onClick={() => props.handleSyncClick()}>
            <SyncIcon />
          </IconButton>
        </React.Fragment>
      </Toolbar>
    }

    {
      props.notificationState.isLoading &&
      <Typography variant="body2" className={props.classes.flex} color="inherit">
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
);