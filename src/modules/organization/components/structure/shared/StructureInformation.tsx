import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { IStructureDetail } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IStructureDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const structureInformation: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(organizationMessage.structure.section.infoTitle)}
        subheader={props.intl.formatMessage(organizationMessage.structure.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.structure.field.companyUid)}
          value={data.company && data.company.name || ''}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.structure.field.positionUid)}
          value={data.position && data.position.name || ''}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.structure.field.companyUid)}
          value={data.company && data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.structure.field.description)}
          value={data.description || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.structure.field.inactiveDate)}
          value={props.data.inactiveDate && props.intl.formatDate(props.data.inactiveDate, GlobalFormat.Date) || 'N/A'}
        />
        <FormControlLabel
          control={<Checkbox checked={!props.data.isExpired} />}
          label={!props.data.isExpired ?
            props.intl.formatMessage(organizationMessage.structure.field.isExpired) :
            props.intl.formatMessage(organizationMessage.structure.field.isNotExpired)}
        />
        {
          data.changes &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(layoutMessage.field.createdBy)}
            value={data.changes.created && data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
        {
          data.changes &&
          data.changes.updated &&
          data.changes.updatedAt &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const StructureInformation = compose<AllProps, OwnProps>(
  injectIntl
)(structureInformation);