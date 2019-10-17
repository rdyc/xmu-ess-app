import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { Card, Divider, Grid, IconButton, List, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbCorner } from '../../breadcrumb/BreadcrumbCorner';
import { TopbarCorner } from '../../topbar/TopbarCorner';
import { HrCornerBlogContent } from './HrCornerBlogContent';
import { HrCornerBlogDetailProps } from './HrCornerBlogDetail';
import { HrCornerBlogLatest } from './HrCornerBlogLatest';

export const HrCornerBlogDetailView: React.SFC<HrCornerBlogDetailProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        backUrl={`/corner/blog/${props.match.params.categorySlug}`}
        title={props.intl.formatMessage(
          hrMessage.shared.page.listTitle, 
          {state: `${props.match.params.pageSlug.replace(/-/g, ' ')}`}
        )}

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

          {/* Bread crumb */}
          <Grid item xs={12}
            className={classNames(props.classes.textElipsis)}          
          >
            <BreadcrumbCorner 
              child={() => ([
                <Link to={`/corner/blog/${props.match.params.categorySlug}`} className={props.classes.breadcrumbLink}>
                  <Typography 
                    noWrap
                    className={classNames(props.classes.breadcrumb, props.classes.breadcrumbChild)}
                  >
                    / {props.match.params.categorySlug.replace(/-/g, ' ')} 
                  </Typography>
                </Link>,
                <Typography 
                  noWrap
                  className={classNames(props.classes.breadcrumb, props.classes.breadcrumbChild)}
                >
                  / {props.match.params.pageSlug.replace(/-/g, ' ')}
                </Typography>
              ])}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Detail */}
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
                  props.hrCornerBlogState.latestByCategory.isLoading &&
                  <LoadingCircular />
                }
                {
                  !props.hrCornerBlogState.latestByCategory.isLoading &&
                  props.hrCornerBlogState.latestByCategory.response &&
                  props.hrCornerBlogState.latestByCategory.response.data &&
                  <HrCornerBlogLatest 
                    data={props.hrCornerBlogState.latestByCategory.response.data}
                    categorySlug={props.match.params.categorySlug}
                  />
                  // props.hrCornerBlogState.latestByCategory.response.data.map((item, index) =>
                  //   index < 5 &&
                  //   <React.Fragment key={index}>
                  //     {
                  //       index !== 0 &&
                  //       <Divider />
                  //     }
                  //     <ListItem 
                  //       button
                  //       selected={props.match.params.pageSlug === item.slug}
                  //       className={props.classes.buttonHover}
                  //       onClick={() => props.history.push(`/corner/blog/${props.match.params.categorySlug}/${item.slug}`)}
                  //     >
                  //       <ListItemText 
                  //         primary={
                  //           <React.Fragment>
                  //             <Typography variant="title" className={props.classes.textElipsis2ndLine}>
                  //               {item.title}
                  //             </Typography>
                  //             <Typography variant="caption">
                  //               {props.intl.formatDate(item.publishedAt, GlobalFormat.Date)} by {item.publishedBy}
                  //             </Typography>
                  //           </React.Fragment>
                  //         }
                  //         secondary={
                  //           <Typography className={props.classes.textElipsis2ndLine}>
                  //             {item.headline}
                  //           </Typography>
                  //         }
                  //       />
                  //     </ListItem>
                  //   </React.Fragment>
                  // )
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