import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { ProjectOption } from '@project/components/options/project/ProjectOption';
import { IExpenseRequestFormValue } from '../ExpenseRequestForm';

type ExpenseDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IExpenseRequestFormValue>;
  intl: InjectedIntl;
  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
  setProjectFilter: (customerUid: string) => void;
  minDate: Date;
};

const ExpenseDetailPartialForm: React.ComponentType<ExpenseDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(expenseMessage.request.section.title)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="date"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            disableFuture
            minDate={props.minDate}
            helperText={form.touched.date && form.errors.date}
            error={form.touched.date && Boolean(form.errors.date)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('date', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
          />
        )}
      />

      <Field
        name="expenseType"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="expense" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.expenseType && form.errors.expenseType,
                  error: form.touched.expenseType && Boolean(form.errors.expenseType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <LookupCustomerOption filter={props.filterLookupCustomer}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.customerUid && form.errors.customerUid,
                error: form.touched.customerUid && Boolean(form.errors.customerUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.setProjectFilter(selected && selected.value || '');

                if (props.formikBag.values.customerUid !== (selected && selected.value)) {
                  props.formikBag.setFieldValue('projectUid', '');
                }
                
              }}
            />
          </LookupCustomerOption>
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <ProjectOption filter={props.filterProject}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting || props.formikBag.values.customerUid === ''}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.projectUid && form.errors.projectUid,
                error: form.touched.projectUid && Boolean(form.errors.projectUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </ProjectOption>
        )}
      />

      <Field
        name="value"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.value && form.errors.value}
            error={form.touched.value && Boolean(form.errors.value)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // set current field
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, parseFloat('0'));
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />

      <Field
        name="location"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.location && form.errors.location}
            error={form.touched.location && Boolean(form.errors.location)}
          />
        )}
      />

      <Field
        name="address"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.address && form.errors.address}
            error={form.touched.address && Boolean(form.errors.address)}
          />
        )}
      />

      <Field
        name="client.name"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor('name', 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor('name', 'fieldPlaceholder'))}
            helperText={(form.touched.client && form.touched.client.name) && (form.errors.client && form.errors.client.name)}
            error={(form.touched.client && form.touched.client.name) && Boolean(form.errors.client && form.errors.client.name)}
          />
        )}
      />

      <Field
        name="client.title"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor('title', 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor('title', 'fieldPlaceholder'))}
            helperText={(form.touched.client && form.touched.client.title) && (form.errors.client && form.errors.client.title)}
            error={(form.touched.client && form.touched.client.title) && Boolean(form.errors.client && form.errors.client.title)}
          />
        )}
      />

      <Field
        name="notes"
        render={({ field, form }: FieldProps<IExpenseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(expenseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.notes && form.errors.notes}
            error={form.touched.notes && Boolean(form.errors.notes)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default ExpenseDetailPartialForm;