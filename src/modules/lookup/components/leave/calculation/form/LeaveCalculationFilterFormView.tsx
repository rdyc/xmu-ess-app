import { InputYear } from '@layout/components/input/year';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { FilterFormProps } from './LeaveCalculationFilterForm';

export const LeaveCalculationFilterFormView: React.SFC<FilterFormProps> = props => {
  const { companyUidValue, handleChangeCompany, handleChangeYear } = props;
  
  return (
    <form>
      <Grid container spacing={16}>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="companyUid"
            required={true}
            label={props.intl.formatMessage(lookupMessage.calculation.filter.company)}
            placeholder={props.intl.formatMessage(lookupMessage.calculation.filter.companyPlaceHolder)}
            component={SelectLookupCompany}
            onChange={handleChangeCompany}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <Field
            type="text"
            name="year"
            required={true}
            label={props.intl.formatMessage(lookupMessage.calculation.filter.year)}
            placeholder={props.intl.formatMessage(lookupMessage.calculation.filter.yearPlaceHolder)}
            component={InputYear}
            disabled={isNullOrUndefined(companyUidValue)}
            onChange={handleChangeYear}
          />
        </Grid>
      </Grid>
    </form>
  );
};