import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { compose } from 'recompose';

interface IOwnProps {
  title: string;
  label: string;
  values: string[];
}

type AllProps
  = IOwnProps;

const notifSettingMail: React.SFC<AllProps> = props => {
  const render = (
    <Card square>
      <CardHeader
        title={props.title}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          rowsMax={5}
          label={props.label}
          value={props.values.join(', ') || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const NotifSettingMail = compose<AllProps, IOwnProps>()(notifSettingMail);