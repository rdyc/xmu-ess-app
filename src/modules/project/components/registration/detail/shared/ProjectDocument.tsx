import { Card, CardContent, CardHeader, List, ListItem, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import { IProjectDocument } from '@project/classes/response';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface OwnProps extends WithStyles<typeof styles> {
  title: string;
  subHeader: string;
  data: IProjectDocument[] | null | undefined;
}

const projectDocument: React.SFC<OwnProps> = props => {
  const { title, subHeader, data, classes } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        <List>
          { 
            data &&
            data.length === 0 && 
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="project.field.document.empty" />} 
                primaryTypographyProps={{align: 'center'}}
              />
            </ListItem>
          }
          {
            data &&
            data.map(item => 
              item.document &&
              <ListItem
                disableGutters 
                key={item.uid}
              >
                <ListItemText 
                  className={!item.isAvailable ? classes.textStrikethrough : ''} 
                  primary={item.document.value}
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

export const ProjectDocument = withStyles(styles)(projectDocument);