import { SelectEmployee } from '@account/components/select';
import { Grid } from '@material-ui/core';
import { SelectProjectAssigment } from '@project/components/select/projectAssignment';
import * as React from 'react';
import { Field } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { FilterFormProps } from './FilterForm';

export const FilterFormView: React.SFC<FilterFormProps> = props => {
  const { employeeUidValue, handleChangeEmployee, handleChangeProject } = props;
  const { user } = props.userState;

  const projectFilter: any = {
    employeeUids: employeeUidValue
  };

  return (
    <form>
      <Grid container spacing={16}>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="employeeUid"
            required={true}
            label={props.intl.formatMessage({id: 'summary.filter.field.employeeUid'})}
            placeholder={props.intl.formatMessage({id: 'summary.filter.field.employeeUid.placeholder'})}
            component={SelectEmployee}
            companyUids={[user && user.company.uid]}
            onChange={handleChangeEmployee}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="projectUid"
            required={true}
            label={props.intl.formatMessage({id: 'summary.filter.field.projectUid'})}
            placeholder={props.intl.formatMessage({id: 'summary.filter.field.projectUid.placeholder'})}
            component={SelectProjectAssigment}
            disabled={isNullOrUndefined(employeeUidValue)}
            onChange={handleChangeProject}
            filter= {!isNullOrUndefined(employeeUidValue) ? projectFilter : undefined }
          />
        </Grid>
      </Grid>
    </form>
  );
};