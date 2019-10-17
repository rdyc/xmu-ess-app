import { IHrCornerBlogCategory } from '@hr/classes/response';
import { GlobalFormat } from '@layout/types';
import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

interface IOwnParams {
  // categorySlug: string;
}

interface OwnProps {
  categorySlug: string;
  data: IHrCornerBlogCategory[];
}

type AllProps 
  = OwnProps
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>;

const hrCornerBlogLatest: React.SFC<AllProps> = props => {
  const { data, categorySlug } = props;

  const render = (
    <React.Fragment>
      {
        data.map((item, index) =>
          index < 5 &&
          <React.Fragment key={index}>
            {
              index !== 0 &&
              <Divider />
            }
            <ListItem 
              button
              style={{padding: '8px'}}
              className={props.classes.buttonHover}
              onClick={() => props.history.push(`/corner/blog/${categorySlug}/${item.slug}`)}
            >
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Typography variant="title" className={props.classes.textElipsis2ndLine}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption">
                      {props.intl.formatDate(item.publishedAt, GlobalFormat.Date)} by {item.publishedBy}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <Typography className={props.classes.textElipsis2ndLine} style={{marginTop: '8px'}}>
                    {item.headline}
                  </Typography>
                }
              />
            </ListItem>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );

  return render;
};

export const HrCornerBlogLatest = compose<AllProps, OwnProps>(
  injectIntl,
  withRouter,
  withStyles(styles),
)(hrCornerBlogLatest);