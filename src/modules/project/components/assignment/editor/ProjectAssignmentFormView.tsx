import { SelectEmployee } from '@account/components/select';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputTextArea } from '@layout/components/input/textArea';
import { Submission } from '@layout/components/submission/Submission';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { SelectProject } from '@project/components/select/project';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { Field, FieldArray, WrappedFieldArrayProps } from 'redux-form';

import { ProjectAssignment } from '../detail/shared/ProjectAssignment';
import { ProjectAssignmentFormProps, ProjectAssignmentItemFormData } from './ProjectAssignmentForm';

const isComplete = (statusType?: string | null | undefined): boolean => {
  let result = false;

  if (statusType) {
    const completes = [
      // WorkflowStatusType.Accepted,
      WorkflowStatusType.Rejected,
    ];

    result = completes.indexOf(statusType as WorkflowStatusType) !== -1;
  }
  
  return result;
};

const ProjectAssignmentItemFormView: React.SFC<WrappedFieldArrayProps<ProjectAssignmentItemFormData> & ProjectAssignmentFormProps> = props => (
  <Grid container spacing={16}>
    {
      props.fields.map((field, index) => {
        const item = props.fields.get(index);
        const isItemComplete = isComplete(item.statusType);

        return (
          <Grid key={index} item xs={12} md={6}>
            <Card square>
              <CardHeader 
                title={`#${index + 1} - ${item.uid || 'Draft'}`}
                subheader={`${item.status && item.status.value || 'Draft'} ${item.rejectedReason || ''}`}
                titleTypographyProps={{variant: 'body2'}}
                action={
                  !isItemComplete &&
                  <IconButton onClick={() => props.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    name={`${field}.employeeUid`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.employeeUidPlaceholder)}
                    required={true}
                    companyUids={props.userState.user && props.userState.user.company.uid}
                    disabled={isItemComplete}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.role`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.role)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.rolePlaceholder)}
                    required={true}
                    disabled={isItemComplete}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.jobDescription`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.jobDescPlaceholder)}
                    disabled={isItemComplete}
                    component={InputTextArea}
                  />
                  <Field 
                    type="number"
                    name={`${field}.mandays`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.mandaysPlaceholder)}
                    required={true}
                    disabled={isItemComplete}
                    component={InputNumber}
                    onChange={(event: any, newValue: any) => {
                      if (!isNaN(newValue)) {
                        props.change(`${field}.allocatedHours`, newValue * 8);
                      }
                    }}
                  />
                  <Field 
                    type="number"
                    name={`${field}.allocatedHours`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.allocatedHours)}
                    disabled={true}
                    component={InputNumber}
                  />
                  <Field 
                    type="number"
                    name={`${field}.consumedHours`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.consumedHours)}
                    disabled={true}
                    component={InputNumber}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })
    }

    <Grid item xs={12}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.assignment.section.memberAddTitle)}
              // subheader={props.intl.formatMessage(projectMessage.assignment.section.memberAddSubHeader)}
            />
            <CardActions>
              <Button onClick={() => props.fields.push({
                uid: undefined,
                employeeUid: '',
                role: '',
                jobDescription: '',
                mandays: 0,
                allocatedHours: 0,
                consumedHours: 0
              })}>
                {props.intl.formatMessage(projectMessage.assignment.option.addMember)}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {
          props.fields.length > 0 &&
          <Grid item xs={12} md={6}>
            <Submission 
              valid={props.valid}
              reset={props.reset}
              submitting={props.submitting}
            />
          </Grid>
        }
      </Grid>
    </Grid>
  </Grid>
);

export const ProjectAssignmentFormView: React.SFC<ProjectAssignmentFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <ProjectAssignment 
          formMode={props.formMode} 
          data={props.currentProject}
          showProjectHours={true}
        >
          {
            // just display project select when the form is being in new mode
            props.formMode === FormMode.New &&
            <Field
              name="projectUid"
              component={(context: any) => 
                <SelectProject 
                  {...context}
                  label={props.intl.formatMessage(projectMessage.assignment.field.projectUid)}
                  placeholder={props.intl.formatMessage(projectMessage.assignment.field.projectUidPlaceholder)}
                  filter={props.projectFilter}
                  onSelected={props.handleProjectChange}
                />
              }
            />
          }
        </ProjectAssignment>
      </Grid>

      {
        props.currentProject &&
        <Grid item xs={12} md={8}>
          <FieldArray 
            name="items" 
            props={props} 
            component={ProjectAssignmentItemFormView}
          />
        </Grid> 
      }

      {/* <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Values"
            subheader="form values as object"
          />
          <CardContent>
            <pre>{JSON.stringify(props.formValues, null, 2)}</pre>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  </form>
);