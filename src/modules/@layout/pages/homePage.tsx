import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WithStyles, Typography, Card, CardContent } from '@material-ui/core';
import styles from '../../../styles';
import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { IEmployeeMy } from '../../account/interfaces/IEmployeeMy';
import { ConnectedReduxProps } from '../../../generic/types';

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