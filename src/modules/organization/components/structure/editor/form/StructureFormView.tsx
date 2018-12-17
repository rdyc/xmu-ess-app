
import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';
import { StructureDetailForm } from './StructureDetailForm';
import { OrganizationStructureItemFormData, StructureFormProps } from './StructureForm';
import { StructureItemForm } from './StructureItemForm';

export const StructureFormView: React.SFC<StructureFormProps> = props => {
  const {
    formMode, companyUidValue
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <StructureDetailForm 
      formMode={formMode}
      context={context}
    />
  );

  const componentStructureItem = (context: WrappedFieldArrayProps<OrganizationStructureItemFormData>) => (
    <StructureItemForm
      context={context}
      companyUidValue={companyUidValue}
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
        <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormSection name="item">
            <FieldArray 
              name="items"
              component={componentStructureItem}
            />
          </FormSection>
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