import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IMenuDetail } from '@lookup/classes/response';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
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
        title={'Menu detail'}
        subheader={''}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={'Menu Id'}
          value={data && data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={'Menu Name'}
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