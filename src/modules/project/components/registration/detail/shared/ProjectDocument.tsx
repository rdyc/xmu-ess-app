import { Card, CardContent, CardHeader, List, ListItem, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import { IProjectDocument } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  title: string;
  subHeader: string;
  data: IProjectDocument[] | null | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const projectDocument: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.title}
      // subheader={props.subHeader}
    />
    <CardContent>
      <List>
        { 
          props.data &&
          props.data.length === 0 && 
          <ListItem>
            <ListItemText
              primary={props.intl.formatMessage(projectMessage.registration.message.emptyDocument)} 
              primaryTypographyProps={{
                align: 'center'
              }}
            />
          </ListItem>
        }

        {
          props.data &&
          props.data.map(item => 
            item.document &&
            <ListItem
              disableGutters 
              key={item.uid}
            >
              <ListItemText 
                className={!item.isAvailable ? props.classes.textStrikethrough : ''} 
                primary={item.document.value}
              />
            </ListItem>
          )
        }
      </List>
    </CardContent>
  </Card>
);

export const ProjectDocument = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(projectDocument);