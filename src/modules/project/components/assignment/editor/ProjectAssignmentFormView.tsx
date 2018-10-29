import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { ProjectAssignment } from '@project/components/assignment/detail/shared/ProjectAssignment';
import { ProjectAssignmentMember } from '@project/components/assignment/detail/shared/ProjectAssignmentMember';
import { ProjectAssignmentFormProps } from '@project/components/assignment/editor/ProjectAssignmentForm';
import { SelectProject } from '@project/components/select/project';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, FormSection } from 'redux-form';

export const ProjectAssignmentFormView: React.SFC<ProjectAssignmentFormProps> = props => {
  const { formMode, selectedProject, projectFilter, onProjectChange } = props;
  
  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid 
        container
        spacing={16}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >  
        <Grid item sm={12} md={4}>
          <ProjectAssignment formMode={formMode} data={selectedProject}>
            <FormSection name="information">
              <Field
                name="projectUid"
                component={(context: any) => 
                  <SelectProject
                    {...context}
                    label={<FormattedMessage id={'project.assignment.field.information.projectUid'} />}
                    filter={projectFilter}
                    onSelected={onProjectChange}
                  />
                }
              />
            </FormSection>
          </ProjectAssignment>
        </Grid>

        { 
          selectedProject &&
          <Grid item xs={12} md={4}>
            <ProjectAssignmentMember data={undefined}>
              {/* <FieldArray name="items" component="input"/> */}
              Add here
            </ProjectAssignmentMember>
          </Grid>
        }

        { 
          selectedProject &&
          <Grid item xs={12} md={4}>
            <Submission 
              valid={props.valid}
              reset={props.reset}
              submitting={props.submitting}
            />
          </Grid>
        }
      </Grid>
    </form>
  );

  return render;
};