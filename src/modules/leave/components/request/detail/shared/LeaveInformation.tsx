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
          label={<FormattedMessage id="leave.field.uid" />}
          value={data.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.type" />}
          value={data.leave ? data.leave.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leave.field.regular" />}
          value={data.regular ? data.regular.leave ? data.regular.leave.name : 'N/A' : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.start" />}
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
          label={<FormattedMessage id="leave.field.end" />}
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
          label={<FormattedMessage id="leave.field.name" />}
          value={data.address}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.contactNumber" />}
          value={data.contactNumber}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.reason" />}
          value={data.reason}
        />
      </CardContent>
    </Card>
  );

  return render;
};