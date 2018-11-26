import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ICompanyDetail } from '@lookup/classes/response';
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
        title={'Company'} // props.intl.formatMessage()
        subheader={'lorem ipsum bla bla bla'}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={'Company ID'}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={'Company Name'}
          value={props.data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={'Code'}
          value={props.data.code}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const CompanyInformation = compose<AllProps, OwnProps>(injectIntl)(companyInformation);