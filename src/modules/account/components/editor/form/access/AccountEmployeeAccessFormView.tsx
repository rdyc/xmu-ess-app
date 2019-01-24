
import { FormMode } from '@generic/types';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeAccessDetailForm } from './AccountEmployeeAccessDetailForm';
import { AccountEmployeeAccessFormProps } from './AccountEmployeeAccessForm';

export const AccountEmployeeAccessFormView: React.SFC<AccountEmployeeAccessFormProps> = props => {
  const {
    formMode, companyUidValue, unitTypeValue
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeAccessDetailForm 
      formMode={formMode}
      context={context}
      companyUidValue={companyUidValue}
      unitTypeValue={unitTypeValue}
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