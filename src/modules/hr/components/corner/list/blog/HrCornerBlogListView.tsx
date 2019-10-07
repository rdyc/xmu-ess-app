import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { SearchBox } from '@layout/components/search';
import { GlobalFormat } from '@layout/types';
import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { TopbarCorner } from '../../topbar/TopbarCorner';
import { HrCornerBlogListProps } from './HrCornerBlogList';

export const HrCornerBlogListView: React.SFC<HrCornerBlogListProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        title={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: 'Corner Blog'})}
        parentUrl={'/home/dashboard'}
        appBarSearchComponent={
          <SearchBox
            key="hr.corner.blog"
            default={props.hrCornerBlogState.all.request && props.hrCornerBlogState.all.request.filter && props.hrCornerBlogState.all.request.filter.find}
            fields={props.fields}
            onApply={props.handleOnLoadApiSearch}
          />
        }
      />
      <div
        className={classNames(props.classes.content, props.classes.shiftCorner)}
      >
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <div className={props.classes.titleText}>
              <Typography variant="title">
                {props.intl.formatMessage(hrMessage.corner.field.type, {state: 'Category'})}
              </Typography>
            </div>
          </Grid>
          {
            props.hrCornerBlogState.all.isLoading &&
            <Grid item xs={12}>
              <LoadingCircular />
            </Grid>
          }   
          {
            !props.hrCornerBlogState.all.isLoading &&
            props.hrCornerBlogState.all.response &&
            props.hrCornerBlogState.all.response.data &&
            props.hrCornerBlogState.all.response.data.map(item => 
              <Grid item xs={12} md={6} xl={6} key={item.slug}>
                <Card square className={classNames((props.category === item.slug ? props.classes.buttonActive : ''), props.classes.buttonHover)}>
                  <CardActionArea onClick={() => props.handleCategory(item.slug)}>
                    <CardContent>
                      <Typography gutterBottom variant="title">
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          }
          <Grid item xs={12}>
            <div className={props.classes.titleText}>
              <Typography variant="title">
                {props.intl.formatMessage(hrMessage.corner.field.type, {state: 'Blog'})}
              </Typography>
            </div>
          </Grid>
          {
            (props.hrCornerBlogState.all.isLoading ||
            props.hrCornerBlogState.allByCategory.isLoading) &&
            <Grid item xs={12}>
              <LoadingCircular />
            </Grid>
          }
          {
            !props.category &&
            !props.hrCornerBlogState.all.isLoading &&
            !props.hrCornerBlogState.allByCategory.response &&
            <Grid item xs={12}>
              <Typography variant="h2" style={{textAlign: 'center'}}>
                {props.intl.formatMessage(hrMessage.corner.field.categoryRequired)}                
              </Typography>
            </Grid>
          } 
          {
            !props.hrCornerBlogState.allByCategory.isLoading &&
            props.hrCornerBlogState.allByCategory.response &&
            props.hrCornerBlogState.allByCategory.response.data &&
           ( 
            props.hrCornerBlogState.allByCategory.response.data.length > 0 ?
            props.hrCornerBlogState.allByCategory.response.data.map(item =>
              <Grid item xs={12} md={6} xl={6} key={item.slug}>
                <Card square className={props.classes.buttonHover}>
                  <CardActionArea onClick={() => props.history.push(`/corner/blog/${item.slug}`, {category: props.category})}>
                    <CardHeader
                      title={item.title}
                      subheader={props.intl.formatDate(item.publishedAt, GlobalFormat.Date)}
                    />
                    <CardContent>
                      <Typography>
                        {item.headline}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
            :
            <Grid item xs={12}>
              <Typography variant="h2" style={{textAlign: 'center'}}>
                {props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'blog'})}                
              </Typography>
            </Grid>
            )
          }
        </Grid>
      </div>
    </React.Fragment>
  );

  return render;
};