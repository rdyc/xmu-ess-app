import { Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { IWorkflowList } from '@organization/classes/response/workflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IWorkflowList[];
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const organizationWorkflowInformation: React.SFC<AllProps> = props => {
  const { data} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(organizationMessage.workflowSetup.section.hierarchyTitle)}
        subheader={props.intl.formatMessage(organizationMessage.workflowSetup.section.hierarchySubHeader)}
      />
      <CardContent>
        <List>
        {
          data &&
          data.map(item =>
            <ListItem
              disableGutters 
              key={item.uid}
            
            >
              <ListItemIcon>
                <Typography variant="h5">
                  {`#${item.priority}`}
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={item.hierarchy && item.hierarchy.name}
              />
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};

export const OrganizationWorkflowInformation = compose<AllProps, OwnProps>(
  injectIntl
)(organizationWorkflowInformation);