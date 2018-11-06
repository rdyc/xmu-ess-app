import { ILeaveRequestDetail } from '@leave/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ILeaveRequestDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const leaveInformation: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="leave.infoTitle"/>}
        subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.uid" />}
          value={data.uid}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={data.leave ? data.leave.value : 'N/A'}
        />
        <TextField
          {...styled}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leave.field.information.regularType" />}
          value={data.regular ? data.regular.leave ? data.regular.leave.name : 'N/A' : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.start" />}
          value={intl.formatDate(data.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.end" />}
          value={intl.formatDate(data.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.address" />}
          value={data.address}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.contactNumber" />}
          value={data.contactNumber}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.reason" />}
          value={data.reason}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(leaveInformation);