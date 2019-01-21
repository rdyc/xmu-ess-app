import { IEmployeeLeave } from '@account/classes/response';
import { GlobalStyle } from '@layout/types/GlobalStyle';
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
  const { data } = props;

  // const styled = {
  //   fullWidth: true,
  //   InputProps: {
  //     disableUnderline: true,
  //     readOnly: true
  //   }
  // };
  
  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="account.leave.infoTitle"/>}
        // subheader={<FormattedMessage id="account.leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="account.leave.field.information.previousRemain" />}
          value={props.intl.formatNumber(data.previousRemain)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="account.leave.field.information.quota" />}
          value={props.intl.formatNumber(data.quota)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="account.leave.field.information.annualLeave" />}
          value={props.intl.formatNumber(data.annualLeave || 0)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="account.leave.field.information.leaveTaken" />}
          value={props.intl.formatNumber(data.leaveTaken || 0)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="account.leave.field.information.remain" />}
          value={props.intl.formatNumber(data.remain)}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const AccountLeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(accountLeaveInformation);