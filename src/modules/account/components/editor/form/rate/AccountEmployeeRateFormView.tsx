
import { FormMode } from '@generic/types';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeRateDetailForm } from './AccountEmployeeRateDetailForm';
import { AccountEmployeeRateFormProps } from './AccountEmployeeRateForm';

export const AccountEmployeeRateFormView: React.SFC<AccountEmployeeRateFormProps> = props => {
  const {
    formMode,
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeRateDetailForm 
      formMode={formMode}
      context={context}
    />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <DialogContent>
        <FormSection name="information">
          <Fields 
            names={fields}
            component={componentInformation}
          />
        </FormSection>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => props.handleDialogClose()} 
          disabled={props.submitting}
          color="secondary"
        >
          {props.buttonDiscard}
        </Button>

        {
          formMode !== FormMode.Delete &&
          <Button 
            type="button" 
            color="secondary" 
            disabled={props.submitting}
            onClick={() => props.reset()} 
          >
            {props.buttonReset}
          </Button>
        }

        <Button 
          type="submit" 
          color="secondary"
          disabled={props.submitting || !props.valid}
        >
          {props.submitting ? props.buttonProcess : props.buttonSubmit}
        </Button>
      </DialogActions>
    </form>
  );

  return render;
};