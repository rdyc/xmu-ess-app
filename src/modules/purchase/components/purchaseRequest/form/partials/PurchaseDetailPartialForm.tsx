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
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { IPurchaseRequestFormValue } from '../PurchaseRequestForm';

type PurchaseDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IPurchaseRequestFormValue>;
  intl: InjectedIntl;
  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
  setProjectFilter: (customerUid: string) => void;
};

const PurchaseDetailPartialForm: React.ComponentType<PurchaseDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(expenseMessage.request.section.title)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IPurchaseRequestFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <LookupCustomerOption filter={props.filterLookupCustomer}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName')),
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
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <ProjectOption filter={props.filterProject}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting || props.formikBag.values.customerUid === ''}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName')),
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
        name="advance"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.advance && form.errors.advance}
            error={form.touched.advance && Boolean(form.errors.advance)}
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
        name="date"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            disablePast
            helperText={form.touched.date && form.errors.date}
            error={form.touched.date && Boolean(form.errors.date)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('date', moment.toDate())}
            invalidLabel=""
          />
        )}
      />

      <Field
        name="currencyType"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="currency" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName')),
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
                    props.formikBag.setFieldValue('requestInIDR', props.formikBag.values.request && props.formikBag.values.request || 0);
                  }}
                }
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            margin="normal"
            autoComplete="off"
            disabled={(props.formikBag.values.currencyType && props.formikBag.values.currencyType === 'SCR01' || props.formikBag.values.currencyType === '') || form.isSubmitting}
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.request && form.errors.request}
            error={form.touched.request && Boolean(form.errors.request)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);

                // set valueIdr field
                props.formikBag.setFieldValue('requestInIDR', 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);

                // set valueIdr field
                props.formikBag.setFieldValue('requestInIDR', value * (props.formikBag.values.request && props.formikBag.values.request || 0));
              }
            }}
          />
        )}
      />

      {
        props.formikBag.values.currencyType && 
        props.formikBag.values.currencyType !== '' &&
        props.formikBag.values.currencyType !== 'SCR01' &&
        <Field
          name="request"
          render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
              value={props.intl.formatNumber(field.value)}
              helperText={form.touched.request && form.errors.request}
              error={form.touched.request && Boolean(form.errors.request)}
            />
          )}
        />
      }      

      <Field
        name="requestInIDR"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.requestInIDR && form.errors.requestInIDR}
            error={form.touched.requestInIDR && Boolean(form.errors.requestInIDR)}
          />
        )}
      />      
      
      <Field
        name="notes"
        render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.notes && form.errors.notes}
            error={form.touched.notes && Boolean(form.errors.notes)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default PurchaseDetailPartialForm;