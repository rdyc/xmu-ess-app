import { IEmployeeMy } from '@account/classes';
import { IResponseSingle } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { Card, CardContent, Typography, WithStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  employee: IResponseSingle<IEmployeeMy>;
}

type AllProps = PropsFromState & ConnectedReduxProps;

export const HomePage: React.StatelessComponent<AllProps> = props => (
  <Card square elevation={0}>
    <CardContent>
      <Typography>
        Test bro
      </Typography>
    </CardContent>
  </Card>
);