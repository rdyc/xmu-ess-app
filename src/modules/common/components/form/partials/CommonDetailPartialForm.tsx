import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { CommonCategory } from '@common/classes/types';
import { categoryTypeTranslator, isWithCompany, isWithParent, parentTypeTranslator } from '@common/helper';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { ICommonFormValue } from '../CommonForm';

type CommonDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICommonFormValue>;
  intl: InjectedIntl;
  category: string;
  handleSetFilterCommonSystem: (companyUid: string) => void;
  filterCommonSystem?: ISystemListFilter;
  filterLookupCompany?: ILookupCompanyGetListFilter;
};

const CommonDetailPartialForm: React.ComponentType<CommonDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(commonMessage.system.section.title)} />
    <CardContent>
      <Field
        name="id"
        render={({ field }: FieldProps<ICommonFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="category"
        render={({ field }: FieldProps<ICommonFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            value={CommonCategory[props.category]}
            margin="normal"
            label={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      {
        isWithCompany(props.category) &&
        <Field
          name="companyUid"
          render={({ field, form }: FieldProps<ICommonFormValue>) => (
            <LookupCompanyOption filter={props.filterLookupCompany}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName')),
                  helperText: form.touched.companyUid && form.errors.companyUid,
                  error: form.touched.companyUid && Boolean(form.errors.companyUid)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                  props.formikBag.setFieldValue('parentCode', '');
                  props.handleSetFilterCommonSystem(selected && selected.value);
                }}
              />
            </LookupCompanyOption>
          )}
        />
      }

      {
        isWithParent(props.category) && 
        <Field
          name="parentCode"
          render={({ field, form }: FieldProps<ICommonFormValue>) => (
            <React.Fragment>
              <CommonSystemOption category={categoryTypeTranslator(parentTypeTranslator(props.category))} filter={props.filterCommonSystem}>
                <SelectField
                  isSearchable
                  menuPlacement="auto"
                  menuPosition="fixed"
                  isDisabled={props.formikBag.isSubmitting || props.formikBag.values.companyUid === ''}
                  isClearable={field.value !== ''}
                  escapeClearsValue={true}
                  valueString={field.value}
                  textFieldProps={{
                    label: props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName')),
                    helperText: form.touched.parentCode && form.errors.parentCode,
                    error: form.touched.parentCode && Boolean(form.errors.parentCode)
                  }}
                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                  onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                />
              </CommonSystemOption>
            </React.Fragment>
          )}
        />
      }

      <Field
        name="name"
        render={({ field, form }: FieldProps<ICommonFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<ICommonFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="isActive"
        render={({ field }: FieldProps<ICommonFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(commonMessage.system.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox 
                {...field} 
                value={field.value}
                checked={props.formikBag.values.isActive}
              />
            }
            style={{width: '100%'}}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default CommonDetailPartialForm;