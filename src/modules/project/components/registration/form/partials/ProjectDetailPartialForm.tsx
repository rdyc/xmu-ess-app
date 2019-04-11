import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { isNullOrUndefined } from 'util';

import { IProjectRegistrationFormValue } from '../ProjectRegistrationForm';

type ProjectDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectRegistrationFormValue>;
  intl: InjectedIntl;
  isRequestor: boolean;
  isAdmin: boolean;
  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  allowedProjectTypes?: string[];
};

const ProjectDetailPartialForm: React.ComponentType<ProjectDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="ownerEmployeeUid"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <LookupCustomerOption filter={props.filterLookupCustomer}>
            <SelectField
              isSearchable
              isDisabled={!(props.isRequestor || props.isAdmin) || props.formikBag.isSubmitting}
              isClearable={(props.isRequestor || props.isAdmin) && field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.customerUid && form.errors.customerUid,
                error: form.touched.customerUid && Boolean(form.errors.customerUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </LookupCustomerOption>
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="project" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formMode === FormMode.Edit || props.formikBag.isSubmitting}
                isClearable={props.formMode === FormMode.New && field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                filterOption={option => {
                  // filter options from allowed project types
                  if (props.allowedProjectTypes) {
                    return props.allowedProjectTypes.findIndex(item => item === option.value) !== -1;
                  } 

                  return true;
                }}
                textFieldProps={{
                  label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.projectType && form.errors.projectType,
                  error: form.touched.projectType && Boolean(form.errors.projectType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            required={props.formikBag.values.projectType && props.formikBag.values.projectType !== ProjectType.PreSales || false}
            margin="normal"
            autoComplete="off"
            disabled={!(props.isRequestor || props.isAdmin) || form.isSubmitting}
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
            onChange={(moment: Moment) => props.formikBag.setFieldValue('start', moment.format('YYYY-MM-DD'))}
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
            required={props.formikBag.values.start !== ''}
            showTodayButton
            margin="normal"
            disabled={props.formikBag.values.start === '' || form.isSubmitting}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue(field.name, moment.format('YYYY-MM-DD'))}
            invalidLabel=""
            minDate={props.formikBag.values.start}
          />
        )}
      />

      <Field
        name="currencyType"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <CommonSystemOption category="currency" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={!(props.isRequestor || props.isAdmin) || props.formikBag.isSubmitting}
              isClearable={(props.isRequestor || props.isAdmin) && field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.currencyType && form.errors.currencyType,
                error: form.touched.currencyType && Boolean(form.errors.currencyType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                const currencyType = selected && selected.value || '';

                props.formikBag.setFieldValue(field.name, currencyType);

                // reset to 1 for IDR
                if (currencyType === 'SCR01') {
                  props.formikBag.setFieldValue('rate', 1);

                  // set valueIdr field
                  props.formikBag.setFieldValue('valueIdr', props.formikBag.values.valueUsd && props.formikBag.values.valueUsd || 0);
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
            disabled={(props.formikBag.values.currencyType && props.formikBag.values.currencyType === 'SCR01') || !(props.isRequestor || props.isAdmin) || form.isSubmitting}
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
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);

                // set valueIdr field
                props.formikBag.setFieldValue('valueIdr', 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);

                // set valueIdr field
                props.formikBag.setFieldValue('valueIdr', value * (props.formikBag.values.valueUsd && props.formikBag.values.valueUsd || 0));
              }
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
            disabled={!(props.isRequestor || props.isAdmin) || form.isSubmitting}
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
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);

                // set valueIdr field
                props.formikBag.setFieldValue('valueIdr', 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);

                // set valueIdr field
                props.formikBag.setFieldValue('valueIdr', value * (props.formikBag.values.rate && props.formikBag.values.rate || 0));
              }
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
              shrink: !isNullOrUndefined(props.formikBag.values.valueIdr) 
            }} 
          />
        )}
      />

      <Field
        name="maxHours"
        render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default ProjectDetailPartialForm;