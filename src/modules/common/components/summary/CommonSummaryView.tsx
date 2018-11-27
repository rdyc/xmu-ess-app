import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { CommonListProps } from './CommonSummary';

export const CommonSummaryView: React.SFC<CommonListProps> = props => {
  const { editableTypes, intl } = props;

  const RenderTypes = () => (
    editableTypes.map(editableType => 
      <Grid item xs={12} sm={6} md={3}>
        <Card square>
          <CardHeader
            title={editableType}
            titleTypographyProps={{
              noWrap: true
            }}
          />
          <CardContent>
            <Typography>Active: 9</Typography>
            <Typography>Inactive: 3</Typography>
          </CardContent>
          <CardActions>
            <Button>
              {intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  );

  const render = (
    <React.Fragment>
      <Grid container spacing={16}>
        {RenderTypes()}
      </Grid>
    </React.Fragment>
  );
  
  return render;
};