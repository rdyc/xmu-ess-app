import { IEmployeeCommandData } from '@account/classes';
import { FieldInputText } from '@layout/components/formFields';
import { Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface TestFormComponentProps {
  title: string;
}

type InjectedProps = InjectedFormProps<IEmployeeCommandData, TestFormComponentProps>;

type AllProps = TestFormComponentProps & InjectedProps;

const profileFormComponent: React.SFC<AllProps> = ({ handleSubmit, valid, submitting }) => {  
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Field
            disabled
            type="text"
            name="uid"
            label={<FormattedMessage id="account.profile.uid" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="employmentNumber"
            label={<FormattedMessage id="account.profile.employmentNumber" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="email"
            label={<FormattedMessage id="account.profile.email" />}
            required={true}
            disabled={true}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="fullName"
            label={<FormattedMessage id="account.profile.fullName" />}
            required={true}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="birthPlace"
            label={<FormattedMessage id="account.profile.birthPlace" />}
            required={true}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="dateOfBirth"
            label={<FormattedMessage id="account.profile.dateOfBirth" />}
            required={true}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="address"
            label={<FormattedMessage id="account.profile.address" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="addressAdditional"
            label={<FormattedMessage id="account.profile.addressAdditional" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="phone"
            label={<FormattedMessage id="account.profile.phone" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="mobilePhone"
            label={<FormattedMessage id="account.profile.mobilePhone" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="address"
            label={<FormattedMessage id="account.profile.address" />}
            component={FieldInputText}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Field
            type="text"
            name="emailPersonal"
            label={<FormattedMessage id="account.profile.emailPersonal" />}
            component={FieldInputText}
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

const ProfileForm = reduxForm<IEmployeeCommandData, TestFormComponentProps>({
  
})(profileFormComponent);

export default ProfileForm;