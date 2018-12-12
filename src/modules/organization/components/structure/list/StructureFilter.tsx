// import { SelectSystem } from '@common/components/select';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { Grid } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  handleFind: (event: any, newValue: string, oldValue: string) => void;
}

const formName = 'StructureFilter';

type AllProps = OwnProps & InjectedIntlProps;

const structureFilter: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Field 
        type="text"
        name="companyUid"
        label={props.intl.formatMessage(organizationMessage.structure.field.companyUid)}
        placeholder={props.intl.formatMessage(organizationMessage.structure.field.companyUidPlaceholder)}
        component={SelectLookupCompany}
        onChange={props.handleFind}
      />
    </Grid>
  </Grid>
);

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(injectIntl)(structureFilter);

export const StructureFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);