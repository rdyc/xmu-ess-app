import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { GlobalFormat } from '@layout/types';
import { Card, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import { TopbarCorner } from '../../topbar/TopbarCorner';
import { HrCornerBlogContent } from './HrCornerBlogContent';
import { HrCornerBlogDetailProps } from './HrCornerBlogDetail';

export const HrCornerBlogDetailView: React.SFC<HrCornerBlogDetailProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        title={props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Corner Blog'})}
        parentUrl={'/corner/blog'}
        appBarCustomComponent={
          <IconButton
            color="inherit"
            onClick={() => props.handleOnReload()}
          >
            <Refresh/>
          </IconButton>
        }
      />
      <div
        className={classNames(props.classes.content, props.classes.shiftCorner)}
      >
        <Grid container spacing={16}>
          <Grid item xs={12} md={8} lg={8}>
            {
              props.hrCornerBlogState.detail.isLoading &&
              <LoadingCircular />
            }
            {
              !props.hrCornerBlogState.detail.isLoading &&
              props.hrCornerBlogState.detail.response &&
              props.hrCornerBlogState.detail.response.data &&
                <HrCornerBlogContent 
                data={props.hrCornerBlogState.detail.response.data}
              />
            }
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <List>
                {
                  !props.hrCornerBlogState.allByCategory.isLoading &&
                  props.hrCornerBlogState.allByCategory.response &&
                  props.hrCornerBlogState.allByCategory.response.data &&
                  props.hrCornerBlogState.allByCategory.response.data.map((item, index) =>
                    <React.Fragment>
                      {
                        index !== 0 &&
                        <Divider />
                      }
                      <ListItem 
                        button
                        selected={props.match.params.pageSlug === item.slug}
                        className={props.classes.buttonHover}
                        onClick={() => props.history.push(`/corner/blog/${item.slug}`, {category: props.location.state && props.location.state.category})}
                      >
                        <ListItemText 
                          primary={
                            <React.Fragment>
                              <Typography variant="title">
                                {item.title}
                              </Typography>
                              <Typography variant="caption">
                                {props.intl.formatDate(item.publishedAt, GlobalFormat.Date)}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={item.headline}
                        />
                      </ListItem>
                    </React.Fragment>
                  )
                }
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

  return render;
};