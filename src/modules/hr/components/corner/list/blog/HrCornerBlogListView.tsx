import { TopbarCorner } from '@hr/components/corner/topbar/TopbarCorner';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { SearchBox } from '@layout/components/search';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { HrCornerBlogListProps } from './HrCornerBlogList';

export const HrCornerBlogListView: React.SFC<HrCornerBlogListProps> = props => {

  const render = (
    <React.Fragment>
      <TopbarCorner 
        parentTitle={props.intl.formatMessage(hrMessage.shared.page.listTitle, {state: 'Corner Blog'})}
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
                <Card square className={props.classes.buttonHover}>
                  <CardActionArea onClick={() => 
                      props.history.push(`/corner/blog/${item.slug}`) 
                    }
                  >
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
        </Grid>
      </div>
    </React.Fragment>
  );

  return render;
};