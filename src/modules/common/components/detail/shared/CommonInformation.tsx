import { ISystemDetail } from '@common/classes/response';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ISystemDetail;
  withCompany: boolean;
  withParent: boolean;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const commonInformation: React.SFC<AllProps> = props => {
  const { data , withCompany, withParent} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(commonMessage.system.section.title)}
        subheader={props.intl.formatMessage(commonMessage.system.section.subTitle)}
      />
      <CardContent>
        {
          withCompany &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(commonMessage.system.field.companyUid)}
            value={data.company && data.company.name || 'N/A'}
          />
        }
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
        {
          withParent &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(commonMessage.system.field.parentCode)}
            value={data.parent && data.parent.value || 'N/A'}
          />
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const CommonInformation = compose<AllProps, OwnProps>(
  injectIntl
)(commonInformation);