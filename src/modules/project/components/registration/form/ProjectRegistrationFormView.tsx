import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { ProjectType } from '@common/classes/types';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, Form, Formik, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { isNullOrUndefined } from 'util';

import { IProjectRegistrationFormValue, ProjectRegistrationFormProps } from './ProjectRegistrationForm';

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
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <Card square className={props.classes.flexContent}>
                <CardHeader 
                  title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)}
                  // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
                />
                <CardContent>
                  <Field
                    name="customerUid"
                    render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                      <LookupCustomerOption filter={props.filterLookupCustomer}>
                        <SelectField
                          isSearchable
                          isClearable={field.value !== ''}
                          escapeClearsValue={true}
                          valueString={field.value}
                          textFieldProps={{
                            label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                            required: true,
                            helperText: form.touched.customerUid && form.errors.customerUid,
                            error: form.touched.customerUid && Boolean(form.errors.customerUid)
                          }}
                          onMenuClose={() => formikBag.setFieldTouched(field.name)}
                          onChange={(selected: ISelectFieldOption) => {
                            formikBag.setFieldValue('projectType', 'SPT03');
                            formikBag.setFieldValue(field.name, selected && selected.value || '');
                          }}
                        />
                      </LookupCustomerOption>
                    )}
                  />

                  <Field
                    name="projectType"
                    render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                      <CommonSystemOption category="project" filter={props.filterCommonSystem}>
                        <SelectField
                          isSearchable
                          isClearable={field.value !== ''}
                          escapeClearsValue={true}
                          valueString={field.value}
                          textFieldProps={{
                            label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                            required: true,
                            helperText: form.touched.projectType && form.errors.projectType,
                            error: form.touched.projectType && Boolean(form.errors.projectType)
                          }}
                          onMenuClose={() => formikBag.setFieldTouched(field.name)}
                          onChange={(selected: ISelectFieldOption) => formikBag.setFieldValue(field.name, selected && selected.value || '')}
                        />
                      </CommonSystemOption>
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
                      <CommonSystemOption category="currency" filter={props.filterCommonSystem}>
                        <SelectField
                          isSearchable
                          isClearable={field.value !== ''}
                          escapeClearsValue={true}
                          valueString={field.value}
                          textFieldProps={{
                            label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                            required: true,
                            helperText: form.touched.projectType && form.errors.projectType,
                            error: form.touched.projectType && Boolean(form.errors.projectType)
                          }}
                          onMenuClose={() => formikBag.setFieldTouched(field.name)}
                          onChange={(selected: ISelectFieldOption) => {
                            const currencyType = selected && selected.value || '';

                            formikBag.setFieldValue(field.name, currencyType);

                            // reset to 1 for IDR
                            if (currencyType === 'SCR01') {
                              formikBag.setFieldValue('rate', 1);

                              // set valueIdr field
                              formikBag.setFieldValue('valueIdr', formikBag.values.valueUsd && formikBag.values.valueUsd || 0);
                            }
                          }}
                        />
                      </CommonSystemOption>
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
                          formikBag.setFieldValue(field.name, parseFloat(e.target.value));

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
                            formikBag.setFieldValue(field.name, parseFloat(e.target.value));
      
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
                          shrink: !isNullOrUndefined(formikBag.values.valueIdr) 
                        }} 
                      />
                    )}
                  />

                </CardContent>
              </Card>
            </div>

            <div className={props.classes.flexColumn}>
              <Card square className={props.classes.flexContent}>
                <CardHeader 
                  title={props.intl.formatMessage(projectMessage.registration.section.documentProjectTitle)}
                  // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
                />
                <CardContent>
                  <FieldArray
                    name="documentProjects"
                    render={(fields: FieldArrayRenderProps) => (
                      <React.Fragment>
                        {
                          formikBag.values.documentProjects &&
                          formikBag.values.documentProjects.map((item, index) =>
                            <Field
                              key={index}
                              name={`documentProjects.${index}.checked`}
                              render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                                <FormControlLabel
                                  label={item.label}
                                  control={
                                    <Checkbox 
                                      {...field} 
                                      value={item.value}
                                      checked={item.checked}
                                    />
                                  }
                                  style={{width: '100%'}}
                                />
                              )}
                            />
                          )
                        }
                      </React.Fragment>
                    )}
                  />
                </CardContent>
              </Card>
            
              <Card square className={props.classes.flexContent}>
                <CardHeader 
                  title={props.intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)}
                  // subheader={props.intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
                />
                <CardContent>
                  <FieldArray
                    name="documentPreSales"
                    render={(fields: FieldArrayRenderProps) => (
                      <React.Fragment>
                        {
                          formikBag.values.documentPreSales &&
                          formikBag.values.documentPreSales.map((item, index) =>
                            <Field
                              key={index}
                              name={`documentPreSales.${index}.checked`}
                              render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                                <FormControlLabel
                                  label={item.label}
                                  control={
                                    <Checkbox 
                                      {...field} 
                                      value={item.value}
                                      checked={item.checked}
                                    />
                                  }
                                  style={{width: '100%'}}
                                />
                              )}
                            />
                          )
                        }
                      </React.Fragment>
                    )}
                  />
                </CardContent>
              </Card>
            
              <Card square className={props.classes.flexContent}>
              <CardHeader 
                title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
                // subheader={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
              />
              <CardContent>
                <FieldArray
                  name="sales"
                  render={(fields: FieldArrayRenderProps) => (
                    <AccountEmployeeOption filter={props.filterAccountEmployee}>
                      <SelectField
                        isMulti
                        isSearchable
                        isClearable={formikBag.values.sales !== undefined}
                        closeMenuOnSelect={false}
                        escapeClearsValue={true}
                        menuPlacement="auto"
                        menuPosition="fixed"
                        defaultValue={formikBag.values.sales}
                        textFieldProps={{
                          label: props.intl.formatMessage(projectMessage.registration.field.sales),
                          placeholder: props.intl.formatMessage(projectMessage.registration.fieldFor(fields.name, 'fieldPlaceholder')),
                          required: true,
                          helperText: formikBag.touched.sales && formikBag.errors.sales,
                          error: formikBag.touched.sales && Boolean(formikBag.errors.sales)
                        }}
                        onMenuClose={() => formikBag.setFieldTouched(fields.name)}
                        onChange={(selected: ISelectFieldOption) => formikBag.setFieldValue(fields.name, selected)}
                      />
                    </AccountEmployeeOption>
                  )}
                />
              </CardContent>
            </Card>
            </div>

            <div className={props.classes.flexColumn}>
              <Card square className={props.classes.flexContent}>
                <CardHeader title="JSON"/>
                <CardContent>
                  <pre>{JSON.stringify(formikBag.values, null, 2)}</pre>
                </CardContent>
              </Card>

              <div className={props.classes.flexContent}>
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
              </div>
            </div>
          </div>
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