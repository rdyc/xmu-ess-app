// import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { ExpenseInformation } from '@expense/components/request/detail/shared/ExpenseInformation';
import { Grid } from '@material-ui/core';
import * as React from 'react';

// import { OwnerDetailForm } from './OwnerDetailForm';
import { ApprovalFormProps } from './ApprovalForm';

export const ApprovalFormView: React.SFC<ApprovalFormProps> = props => {
  const { /*formMode, initialValues,*/ detailData, intl } = props;
  // const fields = Object.getOwnPropertyNames(initialValues.information);

  // const componentInformation = (context: BaseFieldsProps) => (
  //   <OwnerDetailForm 
  //     formMode={formMode}
  //     context={context}
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
        {/* <Grid item sm={12} md={4}>
          <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid> */}

        <Grid item xs={12} md={4}>
          {
            <ExpenseInformation
              data={detailData}
              intl={intl}
            />
          }
        </Grid>
      </Grid>
    </form>
  );

  return render;
};