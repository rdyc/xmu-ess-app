import { Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { IHierarchyItem } from '@organization/classes/response/hierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHierarchyItem[];
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const organizationHierarchyItem: React.SFC<AllProps> = props => {
  const { data} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(organizationMessage.hierarchy.section.historyTitle)}
        subheader={props.intl.formatMessage(organizationMessage.hierarchy.section.historySubHeader)}
      />
      <CardContent>
        <List>
        {
          data.map(item =>
            <ListItem>
              <ListItemIcon>
                <Typography variant="h5">
                  {`#${item.level}`}
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={item.position && item.position.name}
                secondary={item.relationType && (item.relation && item.relation.value) || props.intl.formatMessage(organizationMessage.hierarchy.text.submitter)}
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

export const OrganizationHierarchyItem = compose<AllProps, OwnProps>(
  injectIntl
)(organizationHierarchyItem);