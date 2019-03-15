
import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection } from 'redux-form';
import { StructureDetailForm } from './StructureDetailForm';
import { StructureFormProps } from './StructureForm';
import { StructureItemFormView } from './StructureItemFormView';

export const StructureFormView: React.SFC<StructureFormProps> = props => {
  const {
    formMode, companyUidValue
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <StructureDetailForm 
      formMode={formMode}
      formCompany={companyUidValue}
      context={context}
    />
  );

  // const componentStructureItem = (context: WrappedFieldArrayProps<OrganizationStructureItemFormData>) => (
  //   <StructureItemForm
  //     context={context}
  //     companyUidValue={companyUidValue}
  //     inactiveDateValue={inactiveDateValue}
  //   />
  // );

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
          {/* <FormSection name="item"> */}
            <FieldArray 
              name="items"
              props={props}
              component={StructureItemFormView}
            />
          {/* </FormSection> */}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Submission 
            valid={props.valid}
            reset={props.reset}
            submitting={props.submitting}
            withSubmitDialog={true}
            formName={props.formName}
            submitDialogTitle={props.submitDialogTitle}
            submitDialogContentText={props.submitDialogContentText}
            submitDialogCancelText={props.submitDialogCancelText}
            submitDialogConfirmedText={props.submitDialogConfirmedText}
          />
        </Grid>
      </Grid>
    </form>
  );

  return render;
};