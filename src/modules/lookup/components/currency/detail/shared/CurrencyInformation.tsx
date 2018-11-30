import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICurrencyDetail } from '@lookup/classes/response/currency';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICurrencyDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const currencyInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square >
      <CardHeader
        title={intl.formatMessage(lookupMessage.currency.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.currency.section.infoSubHeader)}
        // title={'Currency Information'}
        // subheader={'Currency main information'}
      />
      <CardContent >
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.currency.field.uid)}
          // label={'Currency ID'}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.currency.field.name)}
          // label={'Currency Name'}
          value={data.name || 'N/A'}
          multiline
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.currency.field.symbol)}
          // label={'Symbol'}
          value={data.symbol || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.currency.field.rate)}
          // label={'Rate'}
          value={props.intl.formatNumber(data.rate || 0)}
        />
        <FormControlLabel
          control={<Checkbox checked={props.data.isActive} />}
          label={props.data.isActive ? 
            props.intl.formatMessage(lookupMessage.currency.field.isActive) :
            props.intl.formatMessage(lookupMessage.currency.field.isNotActive) }
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(lookupMessage.currency.field.createdBy)}
          label={'Created By'}
          value={data.changes && data.changes.created ? data.changes.created.fullName : 'N/A'}
          multiline
        />
      </CardContent>
    </Card>
  );
  return render;
};

export const CurrencyInformation = compose<AllProps, OwnProps>(
  injectIntl
)(currencyInformation);
