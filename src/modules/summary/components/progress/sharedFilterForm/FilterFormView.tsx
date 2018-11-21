import { WorkflowStatusType } from '@common/classes/types';
import { InputCustomer } from '@lookup/components/customer/input';
import { Grid } from '@material-ui/core';
import { SelectProject } from '@project/components/select/project';
import * as React from 'react';
import { Field } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { FilterFormProps } from './FilterForm';

export const FilterFormView: React.SFC<FilterFormProps> = props => {
  const { customerUidValue, handleChangeCustomer, handleChangeProject } = props;

  const projectFilter: any = {
    customerUids: [customerUidValue],
    statusTypes: [WorkflowStatusType.Approved],
  
  };

  return (
    <form>
      <Grid container spacing={16}>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="customerUid"
            required={true}
            label={props.intl.formatMessage({id: 'summary.filter.field.customerUid'})}
            placeholder={props.intl.formatMessage({id: 'summary.filter.field.customerUid.placeholder'})}
            component={InputCustomer}
            onChange={handleChangeCustomer}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="projectUid"
            required={true}
            label={props.intl.formatMessage({id: 'summary.filter.field.projectUid'})}
            placeholder={props.intl.formatMessage({id: 'summary.filter.field.projectUid.placeholder'})}
            component={SelectProject}
            disabled={isNullOrUndefined(customerUidValue)}
            onChange={handleChangeProject}
            filter= {!isNullOrUndefined(customerUidValue) ? projectFilter : undefined }
          />
        </Grid>
      </Grid>
    </form>
  );
};