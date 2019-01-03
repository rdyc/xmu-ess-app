import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILeaveDetail } from '@leave/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ILeaveDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const leaveInformation: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="leave.infoTitle"/>}
        // subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.uid" />}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={data.leave ? data.leave.value : 'N/A'}
        />
        {data.regular && data.regular.leave && data.regular.leave.name ?
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
          hidden 
          margin="normal"
          label={<FormattedMessage id="leave.field.information.regularType" />}
          value={data.regular ? data.regular.leave ? data.regular.leave.name : 'N/A' : 'N/A'}
        /> : null}

        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.start" />}
          value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
        />
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.end" />}
          value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
        />
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.address" />}
          value={data.address}
        />
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.contactNumber" />}
          value={data.contactNumber}
        />
        <TextField
        {...GlobalStyle.TextField.ReadOnly}
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