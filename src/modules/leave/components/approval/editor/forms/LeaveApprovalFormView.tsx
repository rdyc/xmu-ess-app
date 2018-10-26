import { LeaveInformation } from '@leave/components/request/detail/shared/LeaveInformation';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { Approval } from '@layout/components/approval/Approval';
import { WorkflowStep } from '@organization/components';
import { LeaveApprovalFormProps } from './LeaveApprovalForm';

export const LeaveApprovalFormView: React.SFC<LeaveApprovalFormProps> = props => {
  const { formMode, initialValues, detailData, intl, formIsApproved, change } = props;
  const fields = Object.getOwnPropertyNames(initialValues.information);

  const onChangeApprovalOption = (event: any, newValue: string, oldValue: string) => {
    if (newValue === ApprovalOptions.approve) {
      change('information.isApproved', true);
    }
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <Approval 
      formMode={formMode}
      context={context}
      valid={props.valid}
      submitting={props.submitting}
      isApprove={formIsApproved}
      onChangeApprovalOption={onChangeApprovalOption}
    />
  );
  
  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid 
        container
        spacing={16}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >  
        <Grid item xs={12} md={4}>
          {
            <LeaveInformation
              data={detailData}
              intl={intl}
            />
          }
        </Grid>
        
        <Grid item xs={12} md={4}>
          {
            detailData &&
            detailData.workflow &&
            detailData.workflow.steps &&
            <WorkflowStep steps={detailData.workflow.steps} />
          }
        </Grid>

        <Grid item sm={12} md={4}>          
        {
          detailData &&
          detailData.workflow &&
          detailData.workflow.isApproval &&
            <FormSection name="information">
              <Fields 
                names={fields}
                component={componentInformation}
              />
            </FormSection>
        }
        </Grid>
      </Grid>
    </form>
  );

  return render;
};