import { IHrCornerBlogDetail } from '@hr/classes/response';
import { GlobalFormat } from '@layout/types';
import {
  Card,
  CardContent,
  CardHeader,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import * as ReactMarkdown from 'react-markdown';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCornerBlogDetail;
}

type AllProps = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

const hrCornerBlogContent: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={data.title}
        subheader={`${intl.formatDate(data.publishedAt, GlobalFormat.Date)} by ${data.publishedBy}`}
      />
      <CardContent>
        <ReactMarkdown className={props.classes.globalFont} source={data.content} escapeHtml={false} />
      </CardContent>
    </Card>
  );

  return render;
};

export const HrCornerBlogContent = compose<AllProps,  OwnProps>(
  injectIntl,
  withStyles(styles),
)(hrCornerBlogContent);