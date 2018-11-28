import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILookupLeaveDetail } from '@lookup/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ILookupLeaveDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupLeaveInformation: React.SFC<AllProps> = props => {
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
          value={data.company ? data.company.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={data.category ? data.category.description : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={props.intl.formatNumber(props.data.year)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={<FormattedMessage id="leave.field.information.leaveType" />}
          value={props.intl.formatNumber(props.data.allocation)}
        />
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LookupLeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupLeaveInformation);