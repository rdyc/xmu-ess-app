import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { FieldArray, FormSection, WrappedFieldArrayProps } from 'redux-form';
import { OrganizationWorkflowFormProps } from './OrganizationWorkflowForm';
import { OrganizationWorkflowHierarchyForm } from './OrganizationWorkflowHierarchyForm';

export const OrganizationWorkflowFormView: React.SFC<OrganizationWorkflowFormProps> = props => {

  const hierarchyFilter: any = {
    companyUid: props.companyUid,
    orderBy: undefined,
    direction: undefined
  };

  const componentHierarchy = (context: WrappedFieldArrayProps<any>) => (
    <OrganizationWorkflowHierarchyForm
      context={context}
      filter={hierarchyFilter}
      menuDetail={props.menu}
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
        {/* <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid> */}

        <Grid item xs={12} md={5}>
          <Grid item md={12}>
            <FormSection name="hierarchy">
              <FieldArray
                name="hierarchies"
                component={componentHierarchy}
              />
            </FormSection>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Submission
            valid={props.valid}
            reset={props.reset}
            submitting={props.submitting}
          />
        </Grid>
      </Grid>

    </form>
  );
  return render;
};