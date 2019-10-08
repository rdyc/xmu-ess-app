import { TopbarCorner } from '@hr/components/corner/topbar/TopbarCorner';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { SearchBox } from '@layout/components/search';
import { GlobalFormat } from '@layout/types';
import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { HrCornerBlogByCategoryListProps } from './HrCornerBlogByCategoryList';
import { HrCornerBlogPagination } from './HrCornerBlogPagination';

export const HrCornerBlogByCategoryListView: React.SFC<HrCornerBlogByCategoryListProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        parentTitle={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: 'Corner Blog'})}
        parentUrl={'/corner/blog'}

        childTitle={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: `${props.match.params.categorySlug.replace(/-/g, ' ')}`})}

        appBarSearchComponent={
          <SearchBox
            key="hr.corner.blog.by.category"
            default={props.hrCornerBlogState.allByCategory.request && props.hrCornerBlogState.allByCategory.request.filter && props.hrCornerBlogState.allByCategory.request.filter.find}
            fields={props.fields}
            onApply={props.handleOnLoadApiSearch}
          />
        }
      />
      <div
        className={classNames(props.classes.content, props.classes.shiftCorner)}
      >
        <Grid container spacing={16}>
          {/* <Grid item xs={12}>
            <div className={props.classes.titleText}>
              <Typography variant="title">
                {props.intl.formatMessage(hrMessage.corner.field.type, {state: 'Blog'})}
              </Typography>
            </div>
          </Grid> */}
          {
            props.hrCornerBlogState.allByCategory.isLoading &&
            <Grid item xs={12}>
              <LoadingCircular />
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
                  <CardActionArea onClick={() => {
                    props.history.push(`/corner/blog/${props.match.params.categorySlug}/${item.slug}`);
                  }}>
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
          {/* {
            props.blogs.length > 0 &&
            props.blogs.map(blog =>
              blog.items.map(item =>
                <Grid item xs={12} md={6} xl={6} key={item.slug}>
                  <Card square className={props.classes.buttonHover}>
                    <CardActionArea onClick={() => {
                      props.history.push(`/corner/blog/${props.match.params.categorySlug}/${item.slug}`);
                    }}>
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
            ) */}
          {/* {
            props.hrCornerBlogState.allByCategory.response &&
            props.hrCornerBlogState.allByCategory.response.metadata.paginate &&
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <IconButton
                color="inherit"
                disabled={!props.hrCornerBlogState.allByCategory.response.metadata.paginate.next}
                onClick={() => props.handleOnLoadApi(
                  props.hrCornerBlogState.allByCategory.response &&
                  props.hrCornerBlogState.allByCategory.response.metadata.paginate && props.hrCornerBlogState.allByCategory.response.metadata.paginate.current + 1)}
              >
                <ExpandMore/>
              </IconButton>
            </Grid>
          } */}
          <Grid item xs={12}>
            {
              props.hrCornerBlogState.allByCategory.response &&
              props.hrCornerBlogState.allByCategory.response.metadata &&
              props.hrCornerBlogState.allByCategory.response.metadata.paginate &&
              <HrCornerBlogPagination 
                page={props.hrCornerBlogState.allByCategory.response.metadata.paginate.current}
                isLoading={props.hrCornerBlogState.allByCategory.isLoading}
                metadata={props.hrCornerBlogState.allByCategory.response.metadata}
                onClickPrevious={() => props.setPagePrevious()}
                onClickNext={() => props.setPageNext()}
              />
            }
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

  return render;
};