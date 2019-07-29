import { IKPITemplateDetail } from '@KPI/classes/response';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IKPITemplateDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const KPITemplateInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(KPIMessage.template.section.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.mileageException.field.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(KPIMessage.template.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(KPIMessage.template.field.company)}
          value={props.data.company && props.data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(KPIMessage.template.field.position)}
          value={props.data.position && props.data.position.name || 'N/A'}
        />
        {
        props.data.changes &&
        <React.Fragment>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.createdBy)}
            value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />

          {
            (props.data.changes.updated && props.data.changes.updatedAt) &&
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
              value={props.data.changes.updated.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
            />
          }
        </React.Fragment>
      }
      </CardContent>
    </Card>
  );

  return render;
};

export const KPITemplateInformation = compose<AllProps, OwnProps>(injectIntl)(KPITemplateInformation);