import { WorkflowStatusType } from '@common/classes/types';
import { InputCustomer } from '@lookup/components/customer/input';
import { Grid } from '@material-ui/core';
import { SelectProject } from '@project/components/select/project';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
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
            label={props.intl.formatMessage(summaryMessage.filter.customerUid)}
            placeholder={props.intl.formatMessage(summaryMessage.filter.customerUidPlaceholder)}
            component={InputCustomer}
            onChange={handleChangeCustomer}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="projectUid"
            required={true}
            label={props.intl.formatMessage(summaryMessage.filter.projectUid)}
            placeholder={props.intl.formatMessage(summaryMessage.filter.projectUidPlaceholder)}
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