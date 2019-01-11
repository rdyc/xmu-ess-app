import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ISystemLimitDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ISystemLimitDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const systemLimitInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.systemLimit.field.infoTitle)}
        subheader={props.intl.formatMessage(lookupMessage.systemLimit.field.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.systemLimit.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.systemLimit.field.company)}
          value={props.data.company && props.data.company.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.systemLimit.field.category)}
          value={props.data.category ? props.data.category.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.systemLimit.field.days)}
          value={props.data.days}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LookupSystemLimitInformation = compose<AllProps, OwnProps>(injectIntl)(systemLimitInformation);