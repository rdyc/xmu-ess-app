import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IOrganizationStructureFormValue } from '../OrganizationStructureForm';

type PurchaseDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IOrganizationStructureFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterLookupPosition: IPositionGetListFilter;
  setPositionFilter: (positionUid: string) => void;
};

const HierarchyDetailPartialForm: React.ComponentType<PurchaseDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(organizationMessage.structure.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IOrganizationStructureFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.setPositionFilter(selected && selected.value || '');

                if (props.formikBag.values.companyUid !== (selected && selected.value)) {
                  props.formikBag.values.items.forEach((item, index) =>
                    props.formikBag.setFieldValue(`items.${index}.positionUid`, '')
                  );
                }
                
              }}
            />
          </LookupCompanyOption>
        )}
      />
      
      <Field
        name="positionUid"
        render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => (
          <LookupPositionOption filter={props.filterLookupPosition}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(organizationMessage.hierarchy.field.positionUid),
                required: true,
                helperText: form.touched.positionUid && form.errors.positionUid,
                error: form.touched.positionUid && Boolean(form.errors.positionUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupPositionOption>
        )}
      />
      
      <Field
        name="description"
        render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="inactiveDate"
        render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            margin="normal"
            clearable
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldPlaceholder'))}
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
    </CardContent>
  </Card>
);

export default HierarchyDetailPartialForm;