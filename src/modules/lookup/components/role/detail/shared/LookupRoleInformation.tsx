import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IRoleDetail } from '@lookup/classes/response/role';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IRoleDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const roleInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.role.section.infoTitle)}
        subheader={props.intl.formatMessage(lookupMessage.role.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.role.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.role.field.companyUid)}
          value={props.data.company ? props.data.company.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.role.field.name)}
          value={props.data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.role.field.gradeType)}
          value={props.data.grade ? props.data.grade.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.role.field.description)}
          value={props.data.description || 'N/A'}
        />
        <FormControlLabel
          control={
            <Checkbox checked={props.data.isActive} />
          }
          label={props.intl.formatMessage(lookupMessage.role.field.isActive)}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const LookupRoleInformation = compose<AllProps, OwnProps>(injectIntl)(roleInformation);