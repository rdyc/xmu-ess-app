import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IMileageRequestDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const mileageInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(mileageMessage.request.field.title)}
      subheader={intl.formatMessage(mileageMessage.request.field.subHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(mileageMessage.request.field.uid)}
        value={data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(mileageMessage.request.field.employeeName)}
        value={data.employee ? data.employee.fullName : ''}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(mileageMessage.request.field.month)}
        value={moment.months(data.month - 1)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(mileageMessage.request.field.year)}
        value={data.year}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(mileageMessage.request.field.amount)}
        value={`${intl.formatMessage(layoutMessage.text.idr)} ${intl.formatNumber(data.amount)}`}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const MileageInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(mileageInformation);