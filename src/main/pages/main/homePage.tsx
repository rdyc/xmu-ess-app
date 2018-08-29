import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WithStyles, Typography, Card, CardContent } from '@material-ui/core';
import styles from '../../styles';
import { ConnectedReduxProps } from '../../../sample/store';
import { SingleResponseType } from '../../store/@base/SingleResponseType';
import { AccountEmployeeMyType } from '../../store/account/types/AccountEmployeeMyType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  employee: SingleResponseType<AccountEmployeeMyType>;
}

type AllProps = PropsFromState & ConnectedReduxProps;

const homePage: React.StatelessComponent<AllProps> = props => (
  <Card>
    <CardContent>
      <Typography>
        Test bro
      </Typography>
    </CardContent>
  </Card>
);

export default homePage;