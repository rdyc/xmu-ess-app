import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IHierarchyDetail } from '@organization/classes/response/hierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHierarchyDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const organizationHierarchyInformation: React.SFC<AllProps> = props => {
  const { data} = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(organizationMessage.hierarchy.section.infoTitle)}
        subheader={props.intl.formatMessage(organizationMessage.hierarchy.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.name)}
          value={data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.description)}
          value={data.description || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid)}
          value={data.company && data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(organizationMessage.hierarchy.field.inactiveDate)}
          value={props.data.inactiveDate && props.intl.formatDate(props.data.inactiveDate, GlobalFormat.Date) || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const OrganizationHierarchyInformation = compose<AllProps, OwnProps>(
  injectIntl
)(organizationHierarchyInformation);