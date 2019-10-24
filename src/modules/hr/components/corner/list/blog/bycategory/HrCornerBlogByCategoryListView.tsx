import { BreadcrumbCorner } from '@hr/components/corner/breadcrumb/BreadcrumbCorner';
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
        backUrl={'/corner/blog'}
        title={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: `${props.match.params.categorySlug.replace(/-/g, ' ')}`})}

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
          {/* Bread crumb */}
          <Grid item xs={12}
            className={classNames(props.classes.textElipsis, props.classes.breadcrumb)}          
          >
            <BreadcrumbCorner 
              child={() => ([
                <Typography 
                  noWrap
                  className={classNames(props.classes.breadcrumbChild)}
                >
                  / {props.match.params.categorySlug.replace(/-/g, ' ')} 
                </Typography>
              ])}
            />
          </Grid>

          {/* List */}
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
                <Card square className={props.classes.buttonHover} style={{height: '168px'}}>
                  <CardActionArea onClick={() => {
                    props.history.push(`/corner/blog/${props.match.params.categorySlug}/${item.slug}`);
                  }}>
                    <CardHeader
                      title={
                        <Typography variant="title" className={props.classes.textElipsis2ndLine}>
                          {item.title}
                        </Typography>
                      }
                      subheader={`${props.intl.formatDate(item.publishedAt, GlobalFormat.Date)} by ${item.publishedBy}`}
                    />
                    <CardContent style={{height: '168px'}}>
                      <Typography className={props.classes.textElipsis2ndLine}>
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