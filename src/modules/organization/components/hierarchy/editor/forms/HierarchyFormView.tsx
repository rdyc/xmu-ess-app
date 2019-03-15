
import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection } from 'redux-form';
import { HierarchyDetailForm } from './HierarchyDetailForm';
import { HierarchyFormProps } from './HierarchyForm';
// import { HierarchyItemForm } from './HierarchyItemForm';
import { HierarchyItemFormView } from './HierarchyItemFormView';
// import { HierarchyItemForm } from './HierarchyItemForm';

export const HierarchyFormView: React.SFC<HierarchyFormProps> = props => {
  const {
    formMode
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <HierarchyDetailForm 
      formMode={formMode}
      context={context}
    />
  );

  // const componentHierarchyItem = (itemProps: HierarchyFormProps) => (
  //   <HierarchyItemForm
  //     itemProps={itemProps}
  //     companyUidValue={companyUidValue}
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
              component={HierarchyItemFormView}
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