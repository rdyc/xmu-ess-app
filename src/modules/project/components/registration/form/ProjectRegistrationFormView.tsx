import { ProjectType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { SelectField, SelectFieldOption } from '@layout/components/fields/SelectField';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { Button, Card, CardContent, CardHeader, MenuItem, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';

import { IProjectRegistrationFormValue, ProjectRegistrationFormProps } from './ProjectRegistrationForm';

const optionCustomers = [
  { value: '', label: '' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const optionProjects = [
  { value: '', label: '' },
  { value: 'SPT01', label: 'Project' },
  { value: 'SPT02', label: 'Presales' },
  { value: 'SPT03', label: 'Maintenis' }
];

export const ProjectRegistrationFormView: React.SFC<ProjectRegistrationFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: '/project/requests',
      title: props.intl.formatMessage(projectMessage.registration.page.newTitle),
      description: props.intl.formatMessage(projectMessage.registration.page.newSubHeader)
    }}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadApi}
  >
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IProjectRegistrationFormValue>) => (
        <Form style={{display: 'flex', flexDirection: 'column'}}>
          <Card square style={{maxWidth: 300}}>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)}
              // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
            />
            <CardContent>
              <Field
                name="customerUid"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <SelectField
                    isSearchable
                    isClearable={field.value !== ''}
                    escapeClearsValue={true}
                    value={optionCustomers.find(option => option.value === field.value)}
                    options={optionCustomers}
                    textFieldProps={{
                      label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                      required: true,
                      helperText: form.touched.customerUid && form.errors.customerUid,
                      error: form.touched.customerUid && Boolean(form.errors.customerUid)
                    }}
                    onMenuClose={() => formikBag.setFieldTouched(field.name)}
                    onChange={(selected: SelectFieldOption) => {
                      formikBag.setFieldValue('projectType', 'SPT03');
                      formikBag.setFieldValue(field.name, selected && selected.value || '');
                    }}
                  />
                )}
              />

              <Field
                name="projectType"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <SelectField
                    isSearchable
                    isClearable={field.value !== ''}
                    escapeClearsValue={true}
                    value={optionProjects.find(option => option.value === field.value)}
                    options={optionProjects}
                    textFieldProps={{
                      label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                      required: true,
                      helperText: form.touched.projectType && form.errors.projectType,
                      error: form.touched.projectType && Boolean(form.errors.projectType)
                    }}
                    onMenuClose={() => formikBag.setFieldTouched(field.name)}
                    onChange={(selected: SelectFieldOption) => formikBag.setFieldValue(field.name, selected && selected.value || '')}
                  />
                )}
              />

              <Field
                name="contractNumber"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField 
                    {...field}
                    fullWidth
                    required={formikBag.values.projectType && formikBag.values.projectType !== ProjectType.PreSales || false}
                    margin="normal"
                    autoComplete="off"
                    disabled={form.isSubmitting}
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.contractNumber && form.errors.contractNumber}
                    error={form.touched.contractNumber && Boolean(form.errors.contractNumber)}
                  />
                )}
              />

              <Field
                name="name"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    required={true}
                    margin="normal"
                    autoComplete="off"
                    disabled={form.isSubmitting}
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.name && form.errors.name}
                    error={form.touched.name && Boolean(form.errors.name)}
                  />
                )}
              />

              <Field
                name="description"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth={true}
                    disabled={form.isSubmitting}
                    margin="normal"
                    autoComplete="off"
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.description && form.errors.description}
                    error={form.touched.description && Boolean(form.errors.description)}
                  />
                )}
              />

              <Field
                name="start"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <DatePicker
                    {...field}
                    fullWidth
                    required={true}
                    margin="normal"
                    disabled={form.isSubmitting}
                    showTodayButton
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    leftArrowIcon={<ChevronLeft />}
                    rightArrowIcon={<ChevronRight />}
                    format="MMM DD, YYYY"
                    helperText={form.touched.sales && form.errors.sales}
                    error={form.touched.sales && Boolean(form.errors.sales)}
                    onChange={(moment: Moment) => formikBag.setFieldValue('start', moment.toDate())}
                    invalidLabel=""
                  />
                )}
              />

              <Field
                name="end"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <DatePicker
                    {...field}
                    fullWidth
                    required
                    showTodayButton
                    margin="normal"
                    disabled={!formikBag.values.start || form.isSubmitting}
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    leftArrowIcon={<ChevronLeft />}
                    rightArrowIcon={<ChevronRight />}
                    format="MMM DD, YYYY"
                    helperText={form.touched.end && form.errors.end}
                    error={form.touched.end && Boolean(form.errors.end)}
                    onChange={(moment: Moment) => formikBag.setFieldValue(field.name, moment.toDate())}
                    invalidLabel=""
                    minDate={formikBag.values.start}
                  />
                )}
              />

              <Field
                name="currencyType"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    select
                    margin="normal"
                    disabled={form.isSubmitting}
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.currencyType && form.errors.currencyType}
                    error={form.touched.currencyType && Boolean(form.errors.currencyType)}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="SCR01">IDR</MenuItem>
                    <MenuItem value="SCR02">USD</MenuItem>
                    <MenuItem value="SCR03">JPY</MenuItem>
                  </TextField>
                )}
              />

              <Field
                name="rate"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    disabled={(formikBag.values.currencyType && formikBag.values.currencyType === 'SCR01') || form.isSubmitting}
                    margin="normal"
                    autoComplete="off"
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.rate && form.errors.rate}
                    error={form.touched.rate && Boolean(form.errors.rate)}
                    InputProps={{
                      inputComponent: NumberFormatter,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // set current field
                      formikBag.setFieldValue(field.name, e.target.value);

                      // set valueIdr field
                      formikBag.setFieldValue('valueIdr', parseFloat(e.target.value) * (formikBag.values.valueUsd && formikBag.values.valueUsd || 0));
                    }}
                  />
                )}
              />

              <Field
                name="valueUsd"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    disabled={form.isSubmitting}
                    margin="normal"
                    autoComplete="off"
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                    helperText={form.touched.valueUsd && form.errors.valueUsd}
                    error={form.touched.valueUsd && Boolean(form.errors.valueUsd)}
                    InputProps={{
                      inputComponent: NumberFormatter,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        // set current field
                        formikBag.setFieldValue(field.name, e.target.value);
  
                        // set valueIdr field
                        formikBag.setFieldValue('valueIdr', parseFloat(e.target.value) * (formikBag.values.rate && formikBag.values.rate || 0));
                    }}
                  />
                )}
              />

              <Field
                name="valueIdr"
                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled
                    margin="normal"
                    label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                    InputProps={{
                      inputComponent: NumberFormatter
                    }}
                    InputLabelProps={{ 
                      shrink: formikBag.values.valueIdr !== undefined 
                    }} 
                  />
                )}
              />

            </CardContent>
          </Card>

          <Card square style={{maxWidth: 300}}>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.registration.section.documentProjectTitle)}
              // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
            />
            <CardContent>
            </CardContent>
          </Card>

          <Card square style={{maxWidth: 300}}>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)}
              // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
            />
            <CardContent>
            </CardContent>
          </Card>

          <Card square style={{maxWidth: 300}}>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
              // subheader={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
            />
            <CardContent>
            </CardContent>
          </Card>

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