import { SelectLookupCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  handleFind: (event: any, newValue: string, oldValue: string) => void;
}

const formName = 'LookupRoleFilter';

type AllProps = OwnProps & InjectedIntlProps;

const lookupRoleFilter: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Field
        type="text"
        name="companyUid"
        label={props.intl.formatMessage(lookupMessage.systemLimit.field.filterCompany)}
        placeholder={props.intl.formatMessage(lookupMessage.systemLimit.field.filterCompanyPlaceholder)}
        component={SelectLookupCompany}
        onChange={props.handleFind}
      />
    </Grid>
  </Grid>
);

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(injectIntl)(lookupRoleFilter);

export const LookupRoleFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);