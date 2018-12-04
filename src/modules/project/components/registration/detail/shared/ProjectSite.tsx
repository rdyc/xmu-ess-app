import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IProjectSite } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectSite[] | null | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const projectSite: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.siteTitle)}
      subheader={props.intl.formatMessage(projectMessage.registration.section.siteSubHeader)}
    />
    <CardContent>
      <List>
        { 
          props.data && 
          props.data.length === 0 &&
          <ListItem>
            <ListItemText
              primary={props.intl.formatMessage(projectMessage.registration.message.emptySite)} 
              primaryTypographyProps={{
                align: 'center'
              }}
            />
          </ListItem>
        }

        {
          props.data &&
          props.data.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name} 
                    secondary={item.type ? item.type.value : 'N/A'}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="h4" 
                    align="right"
                  >
                    <FormattedNumber 
                      value={item.value} 
                    />
                  </Typography>
                </Grid>
              </Grid>
              
            </ListItem>
          )
        }
      </List>
    </CardContent>
  </Card>
);

export const ProjectSite = compose<AllProps, OwnProps>(
  injectIntl
)(projectSite);