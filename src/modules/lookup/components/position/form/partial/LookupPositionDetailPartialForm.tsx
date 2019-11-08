import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IPositionFormValue } from '../LookupPositionForm';

type LookupPositionDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IPositionFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
};

const LookupPositionDetailPartialForm: React.ComponentType<LookupPositionDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.position.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IPositionFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IPositionFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formMode === FormMode.Edit || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IPositionFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            required={true}
            label={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IPositionFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
      
      <Field
        name="inactiveDate"
        render={({ field, form }: FieldProps<IPositionFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            margin="normal"
            clearable
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            disablePast
            helperText={form.touched.inactiveDate && form.errors.inactiveDate}
            error={form.touched.inactiveDate && Boolean(form.errors.inactiveDate)}
            onChange={(moment: Moment) => 
              moment ? props.formikBag.setFieldValue('inactiveDate', moment.format('YYYY-MM-DD'))
              : props.formikBag.setFieldValue('inactiveDate', '')}
            invalidLabel=""
          />
        )}
      />      

      <Field
        name="isAllowMultiple"
        render={({ field, form }: FieldProps<IPositionFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(lookupMessage.position.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox 
                {...field} 
                value={field.name}
                disabled={props.formikBag.isSubmitting} 
                checked={props.formikBag.values.isAllowMultiple}
              />
            }
            style={{width: '100%'}}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default LookupPositionDetailPartialForm;