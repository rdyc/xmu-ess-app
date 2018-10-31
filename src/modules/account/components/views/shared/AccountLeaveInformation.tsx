import { IEmployeeLeave } from '@account/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeLeave;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const accountLeaveInformation: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="account.leave.infoTitle"/>}
        subheader={<FormattedMessage id="account.leave.infoSubTitle" />}
      />
      <CardContent>
      <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.uid" />}
          value={data.employeeUid}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="account.leave.field.information.previousRemain" />}
          value={intl.formatNumber(data.previousRemain)}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="account.leave.field.information.quota" />}
          value={intl.formatNumber(data.quota)}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="account.leave.field.information.annualLeave" />}
          value={intl.formatNumber(data.annualLeave || 0)}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="account.leave.field.information.leaveTaken" />}
          value={intl.formatNumber(data.leaveTaken || 0)}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="account.leave.field.information.remain" />}
          value={intl.formatNumber(data.remain)}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const AccountLeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(accountLeaveInformation);