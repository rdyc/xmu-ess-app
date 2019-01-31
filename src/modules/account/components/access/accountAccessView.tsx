import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Fingerprint } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as classNames from 'classnames';
import * as React from 'react';

import { AccessSwitcherProps } from './AccountAccess';

export const accountAccessView: React.SFC<AccessSwitcherProps> = props => (
  <div className={props.classes.accessContainer}>
    <div className={props.classes.logoTessa} />

    <Grid container spacing={16} justify="center">
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <div className={classNames(props.classes.marginWideTop, props.classes.marginWideBottom)}>
          {
            props.accountEmployeeMyState.detail.isLoading &&
            <Typography variant="body2" align="center">   
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          }

          {
            !props.accountEmployeeMyState.detail.isLoading &&
            props.accountEmployeeMyState.detail.response &&
            <div className={props.classes.accessContent}>
              <div className={props.classes.paddingThin}>
                <Fingerprint fontSize="large"/>
              </div>             

              <div>
                <Typography variant="body2" color="inherit">   
                  {props.intl.formatMessage(accountMessage.access.message.greeting, { name: props.name })}
                </Typography>
                <Typography variant="body1" color="inherit">   
                  {props.intl.formatMessage(accountMessage.access.message.selection)}
                </Typography>
              </div>
            </div>
          }   
        </div>

        {
          props.access.map((access, index) => 
            <ExpansionPanel key={access.companyUid} disabled={access.isExpired}>
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
                            onClick={() => props.handleSelected(item.uid)}
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
      </Grid>
    </Grid>
  </div>
);