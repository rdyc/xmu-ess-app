import { accountMessage } from '@account/locales/messages/accountMessage';
import { PreloaderWithError } from '@layout/components/preloader';
import { LayoutTheme } from '@layout/hoc/withRoot';
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
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { Fingerprint, Sync } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { AccessSwitcherProps } from './AccountAccess';

export const accountAccessView: React.SFC<AccessSwitcherProps> = props => (
  <LayoutTheme>
    <div className={props.classes.root}>
      <div className={props.classes.accessContainer}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <PreloaderWithError
              state={props.accountEmployeeMyState.detail}
              waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
              waitingTextProps={{
                color: 'default'
              }}
              onRetry={props.handleOnRetry}
            >
              <Paper square elevation={1} className={props.classes.accessContent}>
                <List>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar className={props.classes.accessAvatar}>
                        <Fingerprint/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={props.intl.formatMessage(accountMessage.access.message.greeting, { name: props.name })}
                      secondary={props.intl.formatMessage(accountMessage.access.message.selection)}
                      primaryTypographyProps={{
                        color: 'inherit'
                      }}
                      secondaryTypographyProps={{
                        color: 'inherit'
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton color="inherit" onClick={props.handleOnRetry}>
                        <Sync />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>

              {
                props.access.map((access, index) => 
                  <ExpansionPanel key={index} disabled={access.isExpired}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" color="textSecondary">
                        {access.company && access.company.name}
                      </Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails className={props.classes.accessItem}>
                      <List disablePadding style={{width: '100%'}}>
                        {
                          props.accountEmployeeMyState.detail.response &&
                          props.accountEmployeeMyState.detail.response.data &&
                          props.accountEmployeeMyState.detail.response.data.access &&
                          props.accountEmployeeMyState.detail.response.data.access
                            .filter(item => item.companyUid === access.companyUid)
                            .map(item =>
                              <div key={item.uid} >
                                <Divider/>
                                <ListItem
                                  button
                                  onClick={() => props.handleOnSelected(item.uid)}
                                >
                                  <ListItemText
                                    primary={item.position && item.position.name}
                                    primaryTypographyProps={{
                                      noWrap: true,
                                      variant: 'body2',
                                      color: 'inherit'
                                    }}
                                  />
                                </ListItem> 
                              </div>
                          )
                        }
                      </List>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              }
            </PreloaderWithError>
          </Grid>
        </Grid>
      </div>
    </div>
  </LayoutTheme>
);