import { FormMode } from '@generic/types';
import { Grid, TextField, Typography } from '@material-ui/core';
import { ProjectAssignment } from '@project/components/assignment/detail/shared/ProjectAssignment';
import { ProjectAssignmentItem } from '@project/components/assignment/detail/shared/ProjectAssignmentItem';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectAcceptanceDetailProps } from './ProjectAcceptanceDetail';

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

export const ProjectAcceptanceDetailView: React.SFC<ProjectAcceptanceDetailProps> = props => {
  const { isLoading, response } = props.projectAssignmentState.detail;

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        !isLoading &&
        response && 
        response.data &&
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <ProjectAssignment 
              formMode={FormMode.View} 
              data={response.data}
            >
              {
                props.newMandays !== 0 &&
                <div>
                  <TextField
                    {...styled}
                    margin="dense"
                    label={props.intl.formatMessage(projectMessage.assignment.field.newMandays)}
                    value={props.intl.formatNumber(props.newMandays)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={props.intl.formatMessage(projectMessage.assignment.field.newHours)}
                    value={props.intl.formatNumber(props.newMandays * 8)}
                  />
                </div>
              }
            </ProjectAssignment>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={16}>
              {
                response.data.items &&
                response.data.items
                  .filter(item => item.employeeUid === (props.userState.user ? props.userState.user.uid : undefined))
                  .map((item, index) => 
                  <Grid key={index} item xs={12} md={4}>
                    <ProjectAssignmentItem 
                      data={item} 
                      title={`Assignment #${index + 1}`} 
                      subHeader={item.status && item.status.value || 'N/A'}
                      onClickItem={() => props.handleOnClickItem(item.uid)}
                    />
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );

  return render;
};