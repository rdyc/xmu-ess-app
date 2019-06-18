import { WorkflowStatusType } from '@common/classes/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import { IProjectAssignmentDetail, IProjectAssignmentDetailItem } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const parseAcceptance = (items?: IProjectAssignmentDetailItem[], user?: IAppUser): string => {
  if (user && items) {
    // find any items with submitted status for current user uid
    const pending = items.filter(item =>
      item.employeeUid === user.uid &&
      item.statusType === WorkflowStatusType.Submitted
    );

    return pending.length > 0 ? `Pending` : 'Complete';
  } 
    
  return '';
};

const acceptedMandays = (items?: IProjectAssignmentDetailItem[], user?: IAppUser): number => {
  if (user && items) {
    // find any items with submitted status for current user uid
    const accepted = items.filter(item =>
      item.employeeUid === user.uid &&
      item.statusType === WorkflowStatusType.Accepted
    );

    let mandays = 0;

    if (accepted) {
      accepted.forEach(i => {
        mandays += i.mandays;
      }); 
    }

    return mandays;
  } 
    
  return 0;
};

interface OwnProps {
  data: IProjectAssignmentDetail;
}

type AllProps
  = OwnProps
  & WithUser
  & InjectedIntlProps;

const summaryView: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.uid)}
        value={props.data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.uid)}
        value={props.data.projectUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.statusType)}
        value={parseAcceptance(props.data.items, props.userState.user)}
        // value={props.data.status ? props.data.status.description : props.data.statusType}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.ownerEmployeeUid)}
        value={props.data.owner ? props.data.owner.fullName : 'N/A'}
      />
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.customerUid)}
        value={props.data.customer ? props.data.customer.name : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.projectType)}
        value={props.data.project ? props.data.project.value : 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.name)}
        value={props.data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline={true}
        label={props.intl.formatMessage(projectMessage.registration.field.description)}
        value={props.data.description || 'N/A'}
      />
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.contractNumber)}
        value={props.data.contractNumber || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.registration.field.end)}
        value={props.intl.formatDate(props.data.end, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
        value={props.intl.formatNumber(acceptedMandays(props.data.items, props.userState.user))}
      />
    </Grid>
    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const ProjectAcceptanceSummary = compose<AllProps, OwnProps>(
  withUser,
  injectIntl
)(summaryView);