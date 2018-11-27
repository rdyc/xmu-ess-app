import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICurrencyDetail } from '@lookup/classes/response/currency';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
// import { currencyMessage } from '@lookup/locales/messages/currency';
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
  const { data, 
    // intl 
  } = props;

  const render = (
    <Card square >
      <CardHeader
        // title={intl.formatMessage(currencyMessage.section.infoTitle)}
        // subheader={intl.formatMessage(currencyMessage.section.infoSubHeader)}
        title={'Currency Information'}
        subheader={'Currency main information'}
      />
      <CardContent >
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(currencyMessage.field.uid)}
          label={'Currency ID'}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(currencyMessage.field.notes)}
          label={'Currency Name'}
          value={data.name || 'N/A'}
          multiline
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label = {intl.formatMessage(currencyMessage.field.symbol)}
          label={'Symbol'}
          value={data.symbol || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(currencyMessage.field.Rate)}
          label={'Rate'}
          value={data.rate || 0}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(currencyMessage.field.isActive)}
          label={'Status'}
          value={data.isActive}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(currencyMessage.field.createdBy)}
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
