import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import { IMileageRequestDetail } from '@mileage/classes/response';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IMileageRequestDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const mileageInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square>
    <CardHeader
      title={<FormattedMessage id="mileage.request.infoTitle" />}
      subheader={<FormattedMessage id="mileage.request.infoSubTitle" />}
    />
    <CardContent>
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="mileage.request.field.uid" />}
        value={data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="mileage.request.field.employeeName" />}
        value={data.employee ? data.employee.fullName : ''}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="mileage.request.field.month" />}
        value={moment.months(data.month - 1)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="mileage.request.field.year" />}
        value={data.year}
      />
      <TextField
        {...styled}
        margin="dense"
        label={<FormattedMessage id="mileage.request.field.total" />}
        value={intl.formatNumber(data.amount)}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const MileageInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(mileageInformation);