import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILookupLeaveDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ILookupLeaveDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const lookupLeaveInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.leave.section.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.leave.section.infoSubHeader)}
      />
      <CardContent>
      <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.company)}
          value={props.data.company && props.data.company.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.name)}
          value={props.data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.description)}
          value={props.data.category && props.data.category.value}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.year)}
          value={props.intl.formatNumber(props.data.year)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.allocation)}
          value={props.intl.formatNumber(props.data.allocation)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.leave.field.isWithinHoliday)}
          value={props.data.isWithinHoliday ? 
            props.intl.formatMessage(lookupMessage.leave.field.isWithinHoliday)
            : props.intl.formatMessage(lookupMessage.leave.field.notWithinHoliday)
          }
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LookupLeaveInformation = compose<AllProps, OwnProps>(
  injectIntl
)(lookupLeaveInformation);