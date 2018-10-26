import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IProjectSite } from '@project/classes/response';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

interface OwnProps {
  data: IProjectSite[] | null | undefined;
}

export const ProjectSite: React.SFC<OwnProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
          { 
            data && 
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="project.field.site.empty" />} 
                primaryTypographyProps={{align: 'center'}}
              />
            </ListItem>
          }
          {
            data &&
            data.map(item => 
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
                      variant="display1" 
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

  return render;
};