import * as React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { EmployeeFormType } from '../../../store/account/types/EmployeeFormType';
import { Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import textField from '../../../components/fields/textField';

interface TestFormComponentProps {
  title: string;
}

type InjectedProps = InjectedFormProps<EmployeeFormType, TestFormComponentProps>;

type AllProps = TestFormComponentProps & InjectedProps;

const profileFormComponent: React.StatelessComponent<AllProps> = ({ handleSubmit, valid, submitting }) => {  
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Field
            disabled
            type="text"
            name="uid"
            label={<FormattedMessage id="account.profile.uid" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="employmentNumber"
            label={<FormattedMessage id="account.profile.employmentNumber" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="email"
            label={<FormattedMessage id="account.profile.email" />}
            required={true}
            disabled={true}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="fullName"
            label={<FormattedMessage id="account.profile.fullName" />}
            required={true}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="birthPlace"
            label={<FormattedMessage id="account.profile.birthPlace" />}
            required={true}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="dateOfBirth"
            label={<FormattedMessage id="account.profile.dateOfBirth" />}
            required={true}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="address"
            label={<FormattedMessage id="account.profile.address" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="addressAdditional"
            label={<FormattedMessage id="account.profile.addressAdditional" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="phone"
            label={<FormattedMessage id="account.profile.phone" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="mobilePhone"
            label={<FormattedMessage id="account.profile.mobilePhone" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="address"
            label={<FormattedMessage id="account.profile.address" />}
            component={textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="emailPersonal"
            label={<FormattedMessage id="account.profile.emailPersonal" />}
            component={textField}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button type="submit" disabled={!valid || submitting}>
          {submitting ? 'Processing' : 'Submit' }
        </Button>
      </Grid>
    </form>
  );
};

const ProfileForm = reduxForm<EmployeeFormType, TestFormComponentProps>({
  
})(profileFormComponent);

export default ProfileForm;