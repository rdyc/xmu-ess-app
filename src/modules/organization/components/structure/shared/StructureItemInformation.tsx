import { Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { IStructureItem } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IStructureItem[];
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const structureItemInformation: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(organizationMessage.structure.section.itemTitle)}
        subheader={props.intl.formatMessage(organizationMessage.structure.section.itemSubHeader)}
      />
      <CardContent>
        <List>
          {
            data.map(item =>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="h5">
                    {`#${item.positionUid}`}
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={item.position && item.position.name}
                  secondary={item.start}
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

export const StructureItemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(structureItemInformation);