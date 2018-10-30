import { ILeaveRequestDetail } from '@leave/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

interface OwnProps {
  data: ILeaveRequestDetail;
  intl: InjectedIntl;
}

export const LeaveInformation: React.SFC<OwnProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leave.infoTitle"/>}
        subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.uid" />}
          value={data.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={data.leave ? data.leave.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leave.field.information.regularType" />}
          value={data.regular ? data.regular.leave ? data.regular.leave.name : 'N/A' : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.start" />}
          value={intl.formatDate(data.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.end" />}
          value={intl.formatDate(data.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.address" />}
          value={data.address}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.contactNumber" />}
          value={data.contactNumber}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.reason" />}
          value={data.reason}
        />
      </CardContent>
    </Card>
  );

  return render;
};