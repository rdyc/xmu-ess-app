import { AccountLeave } from '@account/components/leave';
import { Submission } from '@layout/components/submission/Submission';
import { LeaveRequestDetailForm } from '@leave/components/request/editor/forms/LeaveRequestDetailForm';
import { RequestFormProps } from '@leave/components/request/editor/forms/LeaveRequestForm';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

export const LeaveRequestContainerFormView: React.SFC<RequestFormProps> = props => {
  
  const { 
    formMode, isAdmin, formIsRegularType, initialValues,
    change, leaveGetEndState
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  // const onChangeRegular = (event: any, newValue: string, oldValue: string) => {
  //   if (newValue === 'LVC02') {
  //     change('information.end', formValue);
  //   }
  // };

  const onChangeEnd = (event: any, newValue: string, oldValue: string) => {
    if (formIsRegularType) {
    change('information.end', newValue);
    }
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <LeaveRequestDetailForm 
      formMode={formMode}
      context={context}
      isRegularType={formIsRegularType}
      isAdmin={isAdmin}
      dataEnd={leaveGetEndState.detail.response && leaveGetEndState.detail.response.data}
      // formRegularType={formRegularType}
      // onChangeRegular={onChangeRegular}
      onChangeEnd={onChangeEnd}
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
         <AccountLeave employeeUid={undefined}/>
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
