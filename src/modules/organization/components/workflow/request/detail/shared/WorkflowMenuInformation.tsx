import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IMenuDetail } from '@lookup/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IMenuDetail | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const workflowMenuInformation: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(organizationMessage.workflowSetup.section.menuTitle)}
        subheader={props.intl.formatMessage(organizationMessage.workflowSetup.section.menuSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(organizationMessage.workflowSetup.field.menuUid)}
          value={data && data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(organizationMessage.workflowSetup.field.menuName)}
          value={data && data.name ? data.name : 'N/A'}
        />        
      </CardContent>
    </Card>
  );
  return render;
};

export const WorkflowMenuInformation = compose<AllProps, OwnProps>(
  injectIntl
)(workflowMenuInformation);