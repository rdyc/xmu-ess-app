import { ISystemDetail } from '@common/classes/response';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ISystemDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const commonInformation: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(commonMessage.system.section.title)}
        subheader={props.intl.formatMessage(commonMessage.system.section.subTitle)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(commonMessage.system.field.type)}
          value={data.type}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(commonMessage.system.field.name)}
          value={data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(commonMessage.system.field.description)}
          value={data.description || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const CommonInformation = compose<AllProps, OwnProps>(
  injectIntl
)(commonInformation);