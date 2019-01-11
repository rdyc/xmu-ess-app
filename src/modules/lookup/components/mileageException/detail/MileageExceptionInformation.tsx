import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IMileageExceptionDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IMileageExceptionDetail;
}
type AllProps
  = OwnProps
  & InjectedIntlProps;

const mileageExceptionInformation: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(lookupMessage.mileageException.field.infoTitle)}
        // subheader={props.intl.formatMessage(lookupMessage.mileageException.field.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.uid)}
          value={props.data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.company)}
          value={props.data.role.company && props.data.role.company.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.role)}
          value={props.data.role.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.site)}
          value={props.data.type ? props.data.type.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline={true}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.projectName)}
          value={props.data.project ? `${props.data.project.uid} - ${props.data.project.name}` : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.projectSite)}
          value={props.data.site ? props.data.site.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.percentage)}
          value={`${props.intl.formatNumber(props.data.percentage)} %`}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.description)}
          value={props.data.description ? props.data.description : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          rowsMax="4"
          label={props.intl.formatMessage(lookupMessage.mileageException.field.reason)}
          value={props.data.reason ? props.data.reason : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(lookupMessage.mileageException.field.inActiveDate)}
          value={props.data.inactiveDate ? props.intl.formatDate(props.data.inactiveDate, GlobalFormat.Date) : 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const MileageExceptionInformation = compose<AllProps, OwnProps>(injectIntl)(mileageExceptionInformation);