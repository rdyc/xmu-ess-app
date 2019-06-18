import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { RequestFormProps } from '@travel/components/request/editor/forms/RequestForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection } from 'redux-form';
import { RequestDetailForm } from './RequestDetailForm';
import { RequestItemFormView } from './RequestItemFormView';

export const RequestFormView: React.SFC<RequestFormProps> = props => {
  const {
    formMode, customerUidValue, projectUidValue, 
    destinationtypeValue, isProjectSelected,
    TotalCost
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <RequestDetailForm 
      formMode={formMode}
      context={context}
      customerUidValue={customerUidValue}
      projectUidValue={projectUidValue}
      destinationTypeValue= {destinationtypeValue}
      isProjectSelected= {isProjectSelected}
      totalCostValue= {TotalCost}
      handleProjectChange={props.handleProjectChange}
      startDate={props.startDate}
      isGeneralPurpose={props.isGeneralPurpose}

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

        <Grid item xs={12} md={8}>
          {/* <FormSection name="item"> */}
            <FieldArray 
              name="items" 
              props={props}
              component={RequestItemFormView}
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