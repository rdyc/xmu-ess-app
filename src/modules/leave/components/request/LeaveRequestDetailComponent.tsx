import { IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ILeaveRequestGetByIdRequest } from '@leave/classes/queries';
import { ILeaveRequestDetail } from '@leave/classes/response';
import {
  // Avatar,
  Card,
  CardContent,
  CardHeader,
  // Checkbox,
  // FormControlLabel,
  Grid,
  // List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  TextField,
  // Typography,
  WithStyles,
} from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
import { WorkflowStep } from '@organization/components';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void> {
  leaveRequestState: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

export const LeaveRequestDetailComponent: React.StatelessComponent<AllProps> = props => { 
  const { intl } = props;
  const { response } = props.leaveRequestState;

  const renderDetail = (leaveRequest: ILeaveRequestDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leaveRequest.infoTitle"/>}
        subheader={<FormattedMessage id="leaveRequest.infoSubTitle" />}
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
          label={<FormattedMessage id="leaveRequest.field.uid" />}
          value={leaveRequest.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.type" />}
          value={leaveRequest.leave ? leaveRequest.leave.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.status" />}
          value={leaveRequest.status ? leaveRequest.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.address" />}
          value={leaveRequest.address || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.contactNumber" />}
          value={leaveRequest.contactNumber || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.start" />}
          value={intl.formatDate(leaveRequest.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="leaveRequest.field.end" />}
          value={intl.formatDate(leaveRequest.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
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
      <Grid item xs={12} sm={12} md={8} xl={3}>
        {
          response &&
          response.data &&
          response.data.workflow &&
          response.data.workflow.steps &&
          <WorkflowStep steps={response.data.workflow.steps} />
        }
      </Grid>
    </Grid>
  );
};
