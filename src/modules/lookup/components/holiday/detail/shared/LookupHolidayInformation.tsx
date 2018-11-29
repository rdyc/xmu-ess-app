import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILookupHolidayDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ILookupHolidayDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupHolidayInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.holiday.field.infoTitle)}
        subheader={props.intl.formatMessage(lookupMessage.holiday.field.infoSubHeader)}
      />
      <CardContent>
      <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.holiday.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.holiday.field.company)}
          value={props.data.company.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.holiday.field.description)}
          value={props.data.description}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.holiday.field.date)}
          value={props.intl.formatDate(props.data.date, GlobalFormat.Date)}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LookupHolidayInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupHolidayInformation);