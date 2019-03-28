import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ISystemLimitFormValue, SystemLimitFormProps } from './LookupSystemLimitForm';

export const SystemLimitFormView: React.SFC<SystemLimitFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupSystemLimit,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/systemlimits',
      title: props.intl.formatMessage(lookupMessage.systemLimit.page.newTitle),
      description: props.intl.formatMessage(lookupMessage.systemLimit.page.newSubHeader)
    }}
    state={props.systemLimitState.detail}
    onLoadApi={props.handleOnLoadApi}
  >
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ISystemLimitFormValue>) => (
        <Form style={{display: 'flex', flexDirection: 'column'}}>
          <Card square style={{maxWidth: 300}}>
            <CardHeader 
              title={props.intl.formatMessage(lookupMessage.systemLimit.section.infoTitle)}
              // subheader={props.intl.formatMessage(lookupMessage.registration.section.infoSubHeader)}
            />
            <CardContent>
              <Field
                name="companyUid"
                render={({ field, form }: FieldProps<ISystemLimitFormValue>) => (
                  <LookupCompanyOption filter={props.filterLookupCompany}>
                    <SelectField
                      isSearchable
                      isClearable={field.value !== ''}
                      escapeClearsValue={true}
                      valueString={field.value}
                      textFieldProps={{
                        label: props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field.name, 'fieldName')),
                        required: true,
                        helperText: form.touched.companyUid && form.errors.companyUid,
                        error: form.touched.companyUid && Boolean(form.errors.companyUid)
                      }}
                      onMenuClose={() => formikBag.setFieldTouched(field.name)}
                      onChange={(selected: ISelectFieldOption) => {
                        // formikBag.setFieldValue('projectType', 'SPT03');
                        formikBag.setFieldValue(field.name, selected && selected.value || '');
                      }}
                    />
                  </LookupCompanyOption>
                )}
              />

              <Field
                name="categoryType"
                render={({ field, form }: FieldProps<ISystemLimitFormValue>) => (
                  <CommonSystemOption category="limiter" filter={props.filterCommonSystem}>
                    <SelectField
                      isSearchable
                      isClearable={field.value !== ''}
                      escapeClearsValue={true}
                      valueString={field.value}
                      textFieldProps={{
                        label: props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field.name, 'fieldName')),
                        required: true,
                        helperText: form.touched.categoryType && form.errors.categoryType,
                        error: form.touched.categoryType && Boolean(form.errors.categoryType)
                      }}
                      onMenuClose={() => formikBag.setFieldTouched(field.name)}
                      onChange={(selected: ISelectFieldOption) => formikBag.setFieldValue(field.name, selected && selected.value || '')}
                    />
                  </CommonSystemOption>
                )}
              />

              <Field
                name="days"
                render={({ field, form }: FieldProps<ISystemLimitFormValue>) => (
                  <TextField 
                    {...field}
                    fullWidth
                    required={true}
                    margin="normal"
                    autoComplete="off"
                    disabled={form.isSubmitting}
                    label={props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.days && form.errors.days}
                    error={form.touched.days && Boolean(form.errors.days)}
                  />
                )}
              />

            </CardContent>
          </Card>

          <pre>{JSON.stringify(formikBag.values, null, 2)}</pre>

          <Button
            type="reset"
            variant="contained"
            color="secondary"
            disabled={!formikBag.dirty}
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formikBag.isSubmitting}
          >
            {formikBag.isSubmitting ? 'Processing' : 'Submit'}
          </Button>
        </Form>
      )}
    />

    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </FormPage>
);