import { IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ILeaveByIdRequest } from '@lookup/classes/queries';
import { ILeaveDetail } from '@lookup/classes/response';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void> {
  leaveState: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

export const LeaveDetailComponent: React.SFC<AllProps> = props => { 
  const { response } = props.leaveState;

  const renderDetail = (leave: ILeaveDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leave.infoTitle"/>}
        subheader={<FormattedMessage id="leave.infoSubTitle" />}
        // action={
        //   <IconButton>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.uid" />}
          value={leave.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.name" />}
          value={leave.name ? leave.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.company" />}
          value={leave.company ? leave.company.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.year" />}
          value={leave.year}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.category" />}
          value={leave.category ? leave.category.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leave.field.allocation" />}
          value={leave.allocation}
        />
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        {
          response &&
          response.data &&
          renderDetail(response.data)
        }
      </Grid>
    </Grid>
  );
};