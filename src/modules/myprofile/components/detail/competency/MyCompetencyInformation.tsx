import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IUserLevel } from '@layout/interfaces/IUserLevel';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IEmployeeFinalDetail } from '@profile/classes/response';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeFinalDetail;
  level: IUserLevel | undefined;
}

type AllProps = OwnProps & InjectedIntlProps;

const myCompetencyInformation: React.SFC<AllProps> = props => {
  const { data, intl, level } = props;

  const render = (
    <Card square>
    <CardHeader
      title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Current'})}
      // subheader={intl.formatMessage(hrMessage.competency.field.subHeader)}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(hrMessage.competency.field.company)}
        value={data.position && data.position.company.name || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(hrMessage.competency.field.position)}
        value={data.position && data.position.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(hrMessage.competency.field.level)}
        value={level && level.value || 'N/A'}
      />
    </CardContent>
  </Card>
  );

  return render;
};

export const MyCompetencyInformation = compose<AllProps, OwnProps>(
  injectIntl
)(myCompetencyInformation);