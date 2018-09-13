import { Card, CardContent, Typography, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { ConnectedReduxProps } from '../../../generic/types';
import styles from '../../../styles';
import { IEmployeeMy } from '../../account/interfaces/IEmployeeMy';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  employee: IResponseSingle<IEmployeeMy>;
}

type AllProps = PropsFromState & ConnectedReduxProps;

const homePage: React.StatelessComponent<AllProps> = props => (
  <Card square elevation={0}>
    <CardContent>
      <Typography>
        Test bro
      </Typography>
    </CardContent>
  </Card>
);

export default homePage;