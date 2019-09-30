import { IHrCornerPageDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import {
  Card,
  CardContent,
  CardHeader,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import * as ReactMarkdown from 'react-markdown';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCornerPageDetail;
}

type AllProps = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

const hrCornerPageContent: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.corner.field.type, {state: 'Content'})}
      />
      <CardContent>
        <ReactMarkdown className={props.classes.globalFont} source={data.content} escapeHtml={false} />
      </CardContent>
    </Card>
  );

  return render;
};

export const HrCornerPageContent = compose<AllProps,  OwnProps>(
  withStyles(styles),
  injectIntl
)(hrCornerPageContent);