import { RequestDetailForm } from '@expense/components/request/editor/forms/RequestDetailForm';
import { RequestFormProps } from '@expense/components/request/editor/forms/RequestForm';
import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { isNullOrUndefined } from 'util';

export const RequestFormView: React.SFC<RequestFormProps> = props => {
  const {
    formMode, customerUidValue, change, minDate,
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const onChangeCustomer = (event: any, newValue: string, oldValue: string) => {
    if (!isNullOrUndefined(oldValue)) {
      change('information.projectUid', '');
    }
  };
  
  const componentInformation = (context: BaseFieldsProps) => (
    <RequestDetailForm 
      formMode={formMode}
      context={context}
      customerUidValue={customerUidValue}
      onChangeCustomer={onChangeCustomer}
      minDate={minDate}
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