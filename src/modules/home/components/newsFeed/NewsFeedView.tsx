import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { NewsFeedProps } from './NewsFeed';

export const NewsFeedView: React.SFC<NewsFeedProps> = props => (
  <div className={props.classes.marginFarBottom}>
    {
      props.useToolbar &&
      <Toolbar className={props.classes.toolbarCustom}>
        <Typography variant="h6" className={props.classes.flex} color="inherit">
          {props.intl.formatMessage(homeMessage.dashboard.section.newsFeedTitle)}
        </Typography>
      </Toolbar>
    }
    
    {
      props.newsFeedState.all.isLoading &&
      <Typography variant="body2">
        {props.intl.formatMessage(layoutMessage.text.loading)}
      </Typography>
    }
    
    <Grid container spacing={16}>
      {
        props.newsFeedState.all.response &&
        props.newsFeedState.all.response.data.news.map((item, index) => (
          <Grid item key={index} sm={12} md={4} lg={4}>
            <Card square elevation={1}>
              <CardActionArea href={item.url} target="_blank" disableRipple disableTouchRipple>
                <CardMedia
                  component="img"
                  image={item.image}
                  title={item.title}
                  style={{height: 200}}
                />
                <CardContent className={props.classes.marginWideBottom} style={{height: 200, overflow: 'hidden'}}>
                  <Typography variant="caption">
                    {props.intl.formatDate(item.date, GlobalFormat.Date)} | {item.source}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2" title={item.title}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    {item.subHeader}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  </div>
);