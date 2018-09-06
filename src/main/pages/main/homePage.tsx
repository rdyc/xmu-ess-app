import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WithStyles, Typography, Card, CardContent } from '@material-ui/core';
import styles from '../../styles';
import { ConnectedReduxProps } from '../../../sample/store';
import { SingleResponseType } from '../../store/@base/SingleResponseType';
import { EmployeeMyType } from '../../store/account/types/EmployeeMyType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  employee: SingleResponseType<EmployeeMyType>;
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