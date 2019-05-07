// import { IEmployeeMy } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { IAppUser } from '@layout/interfaces';
// import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IAppUser | undefined;
}

type AllProps = OwnProps & InjectedIntlProps;

const informationPositionDetail: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(accountMessage.employee.field.positionTitle)}
      subheader={intl.formatMessage(accountMessage.employee.field.positionSubHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(accountMessage.employee.field.positionCurrent)}
        value={data && data.position.name}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const InformationPositionDetail = compose<AllProps, OwnProps>(
  injectIntl
)(informationPositionDetail);