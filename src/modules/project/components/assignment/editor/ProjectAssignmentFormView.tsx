import { SelectEmployee } from '@account/components/select';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { Submission } from '@layout/components/submission/Submission';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IProjectAssignmentItem } from '@project/classes/request/assignment';
import { ProjectAssignment } from '@project/components/assignment/detail/shared/ProjectAssignment';
import { ProjectAssignmentFormProps } from '@project/components/assignment/editor/ProjectAssignmentForm';
import { SelectProject } from '@project/components/select/project';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const ProjectAssignmentFormView: React.SFC<ProjectAssignmentFormProps> = props => {
  const { formMode, projectActive, projectFilter, handleProjectChange, change } = props;

  const componentMember = (context: WrappedFieldArrayProps<IProjectAssignmentItem>) => (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) => 
          <Grid key={index} item xs={12} md={6}>
            <Card square>
              <CardHeader 
                action={
                  <IconButton onClick={() => context.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`#${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    name={`${field}.employeeUid`}
                    label="employee"
                    required={true}
                    companyUids={['CP002']}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.role`}
                    label="role"
                    required={true}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.jobDescription`}
                    label="job Desc"
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.mandays`}
                    label="mandays"
                    required={true}
                    component={InputNumber}
                    onChange={(event: any, newValue: any) => {
                      if (!isNaN(newValue)) {
                        const hours = newValue * 8;

                        change(`${field}.hours`, hours);
                      }
                    }}
                  />
                  <Field 
                    type="number"
                    name={`${field}.hours`}
                    label="hours"
                    disabled={true}
                    component={InputNumber}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
      }

      <Grid item xs={12} md={6}>
        <Button onClick={() => context.fields.push({
            uid: null,
            employeeUid: '',
            jobDescription: '',
            role: '',
            mandays: 0,
          })}>
          <FormattedMessage id="project.assignment.section.member.action.add" />
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Submission 
          valid={props.valid}
          reset={props.reset}
          submitting={props.submitting}
        />
      </Grid>
    </Grid>
  );
  
  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>  
        <Grid item xs={12} md={4}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="title">
                <FormattedMessage id="project.infoTitle"/>
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <ProjectAssignment formMode={formMode} data={projectActive}>
                <FormSection name="information">
                  <Field
                    name="projectUid"
                    component={(context: any) => 
                      <SelectProject
                        {...context}
                        label={<FormattedMessage id={'project.assignment.field.information.projectUid'} />}
                        filter={projectFilter}
                        onSelected={handleProjectChange}
                      />
                    }
                  />
                </FormSection>
              </ProjectAssignment>
            </Grid>
          </Grid>
        </Grid>

        {
          projectActive &&
          <Grid item xs={12} md={8}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Typography variant="title">
                  <FormattedMessage id="project.assignment.section.member.title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FieldArray name="items" component={componentMember} />
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    </form>
  );

  return render;
};