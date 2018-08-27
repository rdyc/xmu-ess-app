import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../store';
import { AppUserResponse } from '../../store/user/types';
import { WithStyles, withStyles, Typography, Card, CardContent } from '@material-ui/core';
import styles from '../../styles';
import { ConnectedReduxProps } from '../../../sample/store';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: AppUserResponse;
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

const mapStateToProps = ({ user }: AppState) => ({
  user: user.user
});

export default withStyles(styles)<{}>(connect(mapStateToProps)(HomePage));