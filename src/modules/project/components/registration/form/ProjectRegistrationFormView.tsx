import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { ProjectType } from '@common/classes/types';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import AppMenu from '@constants/AppMenu';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, DeleteForever, GroupAdd } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, Form, Formik, FormikProps, getIn } from 'formik';
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
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
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
                            // formikBag.setFieldValue('projectType', 'SPT03');
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
                        format="MMMM DD, YYYY"
                        helperText={form.touched.start && form.errors.start}
                        error={form.touched.start && Boolean(form.errors.start)}
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
                        required={formikBag.values.start !== ''}
                        showTodayButton
                        margin="normal"
                        disabled={!formikBag.values.end || form.isSubmitting}
                        label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
                        placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
                        leftArrowIcon={<ChevronLeft />}
                        rightArrowIcon={<ChevronRight />}
                        format="MMMM DD, YYYY"
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
                                      disabled={formikBag.values.projectType === '' || formikBag.values.projectType === ProjectType.PreSales} 
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
                                      disabled={formikBag.values.projectType === '' || formikBag.values.projectType !== ProjectType.PreSales} 
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
            </div>

            <div className={props.classes.flexColumn}>
              <Card square className={props.classes.flexContent}>
                <CardHeader 
                  title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
                  subheader={
                    formikBag.submitCount > 0 &&
                    typeof formikBag.errors.sales === 'string' &&
                    formikBag.errors.sales
                  }
                  subheaderTypographyProps={{
                    color: 'error',
                    variant: 'body1'
                  }}
                />
                  <FieldArray
                    name="sales"
                    render={(fields: FieldArrayRenderProps) => (
                      <React.Fragment>
                        <CardContent>
                          <List disablePadding>
                          {
                            formikBag.values.sales.length > 0 &&
                            formikBag.values.sales.map((item, index) => 
                              <Field
                                key={index}
                                name={`sales.${index}.employeeUid`}
                                render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => {
                                  const error = getIn(form.errors, `sales.${index}.employeeUid`);
                                  const touch = getIn(form.touched, `sales.${index}.employeeUid`);
                                  
                                  return (
                                    <React.Fragment>
                                      <ListItem disableGutters>
                                        <ListItemText>
                                          <AccountEmployeeOption filter={props.filterAccountEmployee}>
                                            <SelectField
                                              isSearchable
                                              isClearable={field.value !== ''}
                                              escapeClearsValue={true}
                                              menuPlacement="auto"
                                              menuPosition="fixed"
                                              valueString={item.employeeUid}
                                              textFieldProps={{
                                                label: props.intl.formatMessage(projectMessage.registration.field.salesEmployeeUid),
                                                placeholder: props.intl.formatMessage(projectMessage.registration.fieldFor('salesEmployeeUid', 'fieldPlaceholder')),
                                                required: true,
                                                helperText: touch && error,
                                                error: touch && Boolean(error)
                                              }}
                                              onMenuClose={() => formikBag.setFieldTouched(field.name)}
                                              onChange={(selected: ISelectFieldOption) => {
                                                const value = selected && selected.value || '';

                                                // prevent duplicate
                                                if (value !== '') {
                                                  const isExist = formikBag.values.sales.findIndex(sales => sales.employeeUid === value);

                                                  if (isExist === -1) {
                                                    formikBag.setFieldValue(field.name, value);
                                                  }
                                                } else {
                                                  formikBag.setFieldValue(field.name, value);
                                                }
                                              }}
                                            />
                                          </AccountEmployeeOption>
                                        </ListItemText>

                                        <ListItemSecondaryAction className={props.classes.marginWideTop}>
                                          <IconButton onClick={() => fields.remove(index)}>
                                            <DeleteForever color="action" />
                                          </IconButton>
                                        </ListItemSecondaryAction>
                                      </ListItem>
                                    </React.Fragment>
                                  );
                                }}
                              />
                            )
                          }
                          </List>
                        </CardContent>
                        <CardActions>
                          <Button
                            fullWidth
                            color="primary" 
                            disabled={formikBag.isSubmitting}
                            onClick={() => fields.push({ employeeUid: '' })}
                          >
                            <GroupAdd className={props.classes.marginFarRight}/>

                            {props.intl.formatMessage(layoutMessage.action.add)}
                          </Button>
                        </CardActions>
                      </React.Fragment>
                    )}
                  />
              </Card>
              
              <SubmissionForm 
                title={props.intl.formatMessage(projectMessage.registration.submission.form)}
                className={props.classes.flexContent}
                formikProps={formikBag}
                buttonLabelProps={{
                  reset: props.intl.formatMessage(layoutMessage.action.reset),
                  submit: props.intl.formatMessage(layoutMessage.action.submit),
                  processing: props.intl.formatMessage(layoutMessage.text.processing)
                }}
                confirmationDialogProps={{
                  title: props.intl.formatMessage(projectMessage.registration.confirm.newTitle),
                  message: props.intl.formatMessage(projectMessage.registration.confirm.newDescription),
                  labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                  labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                }} 
              />
              
              <Card square className={props.classes.flexContent}>
                <CardHeader title="JSON"/>
                <CardContent>
                  <pre>{JSON.stringify(formikBag.values, null, 2)}</pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </Form>
      )}
    />
  </FormPage>
);