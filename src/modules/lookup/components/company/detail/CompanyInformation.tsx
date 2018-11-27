import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICompanyDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ICompanyDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const companyInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.company.section.infoTitle)}
        subheader={props.intl.formatMessage(lookupMessage.company.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.company.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.company.field.name)}
          value={props.data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.company.field.code)}
          value={props.data.code}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const CompanyInformation = compose<AllProps, OwnProps>(injectIntl)(companyInformation);