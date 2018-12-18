import { WithForm, withForm } from '@layout/hoc/withForm';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { SelectLookupRole } from '@lookup/components/role/select/SelectLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, HandleCreators, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Field, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { isNullOrUndefined } from 'util';

const formName = 'LookupMileageExceptionFilter';

export type MileageExceptionFormData = {
  companyUid: string | null;
  roleUid: string | null;
};

interface FormValueProps {
  companyUidValue: string;
  roleUidValue: string | undefined;
}

interface OwnProps {
  callbackForceReload: () => void;
  handleChangeFilter: (companyUid: string, roleUid: string | undefined) => void;
}

interface OwnHandler {
  handleChangeCompanyUid: (event: any, newValue: string, oldValue: string) => void;
  handleChangeRoleUid: (event: any, newValue: string, oldValue: string) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<{}> {
  stateUpdate: StateHandler<{}>;
}

type AllProps = WithForm 
& OwnProps 
& OwnHandler
& OwnStateUpdaters
& FormValueProps 
& InjectedIntlProps
& InjectedFormProps<MileageExceptionFormData, {}>;

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleChangeCompanyUid: (props: AllProps) => (event: any, newValue: string, oldValue: string) => {
    // to set the filter into nothing / null
    if (!isNullOrUndefined(oldValue)) {
      props.change('roleUid', '');
    }

    props.handleChangeFilter(newValue, undefined);
    props.callbackForceReload();
  },
  handleChangeRoleUid: (props: AllProps) => (event: any, newValue: string, oldValue: string) => {
    props.handleChangeFilter(props.companyUidValue, newValue);
    props.callbackForceReload();
  }
};

const stateUpdaters: StateUpdaters<{}, {}, OwnStateUpdaters> = {
  stateUpdate: (prevState: any) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'companyUid');
  const roleUid = selector(state, 'roleUid');

  return {
    companyUidValue: companyUid,
    roleUidValue: roleUid
  };
};

const lookupMileageExceptionFilter: React.SFC<AllProps> = props => {
  const { intl, companyUidValue, handleChangeCompanyUid, handleChangeRoleUid } = props;

  const Filter: any = {
    companyUid: companyUidValue
  };

  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={6}>
        <Field 
          type="text"
          name="companyUid"
          label={intl.formatMessage(lookupMessage.mileageException.field.filterCompany)}
          placeholder={intl.formatMessage(lookupMessage.mileageException.field.filterCompanyPlaceholder)}
          component={SelectLookupCompany}
          onChange={handleChangeCompanyUid}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field 
          type="text"
          name="roleUid"
          label={intl.formatMessage(lookupMessage.mileageException.field.filterRole)}
          placeholder={intl.formatMessage(lookupMessage.mileageException.field.filterRolePlaceholder)}
          component={SelectLookupRole}
          onChange={handleChangeRoleUid}
          disabled={isNullOrUndefined(companyUidValue)}
          filter={!isNullOrUndefined(companyUidValue) ? Filter : undefined}
        />
      </Grid>
    </Grid>
  );
};

const enhance = compose<AllProps, OwnProps & InjectedFormProps<MileageExceptionFormData, OwnProps>>(
  connect(mapStateToProps),
  withForm,
  injectIntl,
  withStateHandlers<{}, OwnStateUpdaters, {}>({}, stateUpdaters),
  withHandlers<AllProps, OwnHandler>(handlerCreators)
)(lookupMileageExceptionFilter);

export const LookupMileageExceptionFilter = reduxForm<MileageExceptionFormData, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);