import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IDiem } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IDiem;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupDiemInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.lookupDiem.section.diemTitle)}
      // subheader={props.intl.formatMessage(lookupMessage.lookupDiem.section.diemSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupDiem.field.company)}
        value={props.data.company ? props.data.company.name : props.data.companyUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupDiem.field.project)}
        value={props.data.project ? props.data.project.value : 'N/A' }
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupDiem.field.destination)}
        value={props.data.destination ? props.data.destination.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupDiem.field.currency)}
        value={props.data.currency ? props.data.currency.name : props.data.currencyUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(lookupMessage.lookupDiem.field.value)}
        value={props.intl.formatNumber(props.data.value)}
      />
    </CardContent>
  </Card>
);

export const LookupDiemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupDiemInformation);