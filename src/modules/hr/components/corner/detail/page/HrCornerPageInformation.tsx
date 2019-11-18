import { IHrCornerPageDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCornerPageDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const hrCornerPageInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Corner Page'})}
      />
      <CardContent>
        {/* <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.uid, {state: 'Page'})}
          value={data.uid}
        /> */}
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.category)}
          value={data.category.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.title)}
          value={data.title}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.slug)}
          value={data.slug}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.headline)}
          value={data.headline}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.start)}
          value={intl.formatDate(data.start, GlobalFormat.Date)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(hrMessage.corner.field.end)}
          value={data.end && intl.formatDate(data.end, GlobalFormat.Date) || 'N/A'}
        />
        {
          props.data.changes &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
            />

            {
              (props.data.changes.updated && props.data.changes.updatedAt) &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                value={props.data.changes.updated.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
              />
          }
        </React.Fragment>
      }
      </CardContent>
    </Card>
  );

  return render;
};

export const HrCornerPageInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(hrCornerPageInformation);