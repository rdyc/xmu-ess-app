import { hrMessage } from '@hr/locales/messages/hrMessage';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {

}

type AllProps = IOwnProps & InjectedIntlProps;

const hrInputInformation: React.SFC<AllProps> = props => {
  const { intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.competency.field.note)}
      />
      <CardContent>
        <Typography variant="body1" >
          {intl.formatMessage(hrMessage.competency.field.noteContent)}
        </Typography>
        <ul style={{paddingLeft: '16px'}} >
          <li>
          <Typography variant="body1" >
            {intl.formatMessage(hrMessage.competency.field.noteContentOne)}
          </Typography>
          </li>
          <li>
          <Typography variant="body1" >
            {intl.formatMessage(hrMessage.competency.field.noteContentTwo)}
          </Typography>
          </li>
        </ul>
      </CardContent>
    </Card>
  );

  return render;
};

export const HrInputInformation = compose<AllProps, IOwnProps>(
  injectIntl
)(hrInputInformation);