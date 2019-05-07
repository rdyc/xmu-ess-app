
import { IEmployeeMy } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeMy;
}

type AllProps = OwnProps & InjectedIntlProps;

const informationKpiDetail: React.SFC<AllProps> = props => {
  const { intl } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(accountMessage.employee.field.kpiTitle)}
      subheader={intl.formatMessage(accountMessage.employee.field.kpiSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.kpi)}
        value={'INI KPI'}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const InformationKpiDetail = compose<AllProps, OwnProps>(
  injectIntl
)(informationKpiDetail);