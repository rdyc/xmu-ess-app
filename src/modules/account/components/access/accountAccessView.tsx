import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as classNames from 'classnames';
import * as React from 'react';

import { AccessSwitcherProps } from './AccountAccess';

export const accountAccessView: React.SFC<AccessSwitcherProps> = props => (
  <Grid container spacing={16} justify="center">
    <Grid item xs={12} md={4}>
      <div className={classNames(props.classes.marginWideTop, props.classes.marginWideBottom)}>
        <Typography variant="body2" align="center">   
          {
            props.accountEmployeeMyState.detail.isLoading &&
            <span>Please wait...</span>
          }

          {
            !props.accountEmployeeMyState.detail.isLoading &&
            props.accountEmployeeMyState.detail.response &&
            <span>Hi {props.name || 'unknown'}, Please select your access</span>
          }   
        </Typography>
      </div>
      
      {
        props.access.map((access, index) => 
          <ExpansionPanel key={access.companyUid} disabled={access.isExpired}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">
                {access.company && access.company.name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: 0}}>
              <List component="div" disablePadding style={{width: '100%'}}>
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
                          component="div"
                          onClick={() => props.handleSelected(item.uid)}
                        >
                          <ListItemText
                            primary={item.position && item.position.name}
                            secondary={item.role && item.role.name}
                            primaryTypographyProps={{
                              noWrap: true,
                              variant: 'body2'
                            }}
                            secondaryTypographyProps={{
                              noWrap: true,
                              variant: 'caption',
                            }}
                          />
                          <ListItemSecondaryAction>
                            <ListItemText
                              primary={item.department && item.department.value}
                              secondary={item.unit && item.unit.value}
                              primaryTypographyProps={{
                                noWrap: true,
                                variant: 'body2',
                              }}
                              secondaryTypographyProps={{
                                noWrap: true,
                                variant: 'caption',
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem> 
                      </div>
                  )
                }
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }
    </Grid>
  </Grid>
);