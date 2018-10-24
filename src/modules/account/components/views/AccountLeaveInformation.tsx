import { IEmployeeLeave } from '@account/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

interface OwnProps {
  data: IEmployeeLeave;
  intl: InjectedIntl;
}

export const AccountLeaveInformation: React.SFC<OwnProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="account.leave.infoTitle"/>}
        subheader={<FormattedMessage id="account.leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="account.leave.information.employeeUid" />}
          value={intl.formatNumber(data.annualLeave || 0) ? (data.annualLeave || 0) : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.information.ownerEmployeeUid" />}
          value={intl.formatNumber(data.remain || 0) ? (data.remain || 0) : 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};