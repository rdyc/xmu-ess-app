import { TopbarCorner } from '@hr/components/corner/topbar/TopbarCorner';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { SearchBox } from '@layout/components/search';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { HrCornerBlogPagination } from './bycategory/HrCornerBlogPagination';
import { HrCornerBlogListProps } from './HrCornerBlogList';

export const HrCornerBlogListView: React.SFC<HrCornerBlogListProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        title={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: 'HR Corner'})}
        // parentUrl={'/home/dashboard'}
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
              (
              props.hrCornerBlogState.all.response.data.length > 0 ?
              (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      {props.intl.formatMessage(hrMessage.corner.field.select, {state: 'category'})}                
                    </Typography>
                  </Grid>
                  {
                    props.hrCornerBlogState.all.response.data.map(item => 
                    <Grid item xs={12} md={6} xl={6} key={item.slug}>
                      <Card square className={props.classes.buttonHover} style={{height: '103px'}}>
                        <CardActionArea onClick={() => 
                            props.history.push(`/corner/blog/${item.slug}`) 
                          }
                        >
                          <CardContent style={{height: '103px'}}>
                            <Typography gutterBottom variant="title">
                              {item.name}
                            </Typography>
                            <Typography className={props.classes.textElipsis2ndLine}>
                              {item.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    )
                  }
                </React.Fragment>
              )
              :
              <Grid item xs={12}>
                <Typography variant="h2" style={{textAlign: 'center'}}>
                  {props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'category'})}                
                </Typography>
              </Grid>
              )
            }
            <Grid item xs={12}>
              {
                props.hrCornerBlogState.all.response &&
                props.hrCornerBlogState.all.response.metadata &&
                props.hrCornerBlogState.all.response.metadata.paginate &&
                <HrCornerBlogPagination 
                  page={props.hrCornerBlogState.all.response.metadata.paginate.current}
                  isLoading={props.hrCornerBlogState.all.isLoading}
                  metadata={props.hrCornerBlogState.all.response.metadata}
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