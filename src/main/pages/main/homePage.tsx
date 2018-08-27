import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../store';
import { WithStyles, withStyles, Typography, Card, CardContent } from '@material-ui/core';
import styles from '../../styles';
import { ConnectedReduxProps } from '../../../sample/store';
import { SingleResponseType } from '../../store/@base/SingleResponseType';
import { AccountEmployeeMyType } from '../../store/account/types/AccountEmployeeMyType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  employee: SingleResponseType<AccountEmployeeMyType>;
}

type AllProps = PropsFromState &
  ConnectedReduxProps;

class HomePage extends React.Component<AllProps> {

  public render() {
    return (
      <Card>
        <CardContent>
          <Typography>
            Test bro
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ account }: AppState) => ({
  employee: account.employee
});

export default withStyles(styles)<{}>(connect(mapStateToProps)(HomePage));