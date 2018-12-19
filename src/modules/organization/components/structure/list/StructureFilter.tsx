// import { SelectSystem } from '@common/components/select';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { Grid } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  handleFind: (companyUid: string) => void;
  callbackForceReload: () => void;
}

interface OwnHandlers {
  handleChangeFilter: (event: any, newValue: string, oldValue: string) => void;
}

const handlerCreators: HandleCreators<AllProps, OwnHandlers> = {
  handleChangeFilter: (props: AllProps) => (event: any, newValue: string, oldValue: string) => {
    props.handleFind(newValue);
    props.callbackForceReload();
  },
};

const formName = 'OrganizationStructureFilter';

type AllProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const structureFilter: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Field 
        type="text"
        name="companyUid"
        label={props.intl.formatMessage(organizationMessage.structure.field.companyUid)}
        placeholder={props.intl.formatMessage(organizationMessage.structure.field.companyUidPlaceholder)}
        component={SelectLookupCompany}
        onChange={props.handleChangeFilter}
      />
    </Grid>
  </Grid>
);

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(
  injectIntl,
  withHandlers<AllProps, OwnHandlers>(handlerCreators),
)(structureFilter);

export const StructureFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);