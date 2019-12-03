import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputYearOption } from '@layout/components/input/year/InputYearOption';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IOrganizationStructureSubOrdinateListFilter } from '@organization/classes/filters/structure';
import { OrganizationStructureSubOrdinateOption } from '@organization/components/structure/option/OrganizationStructureSubOrdinateOption';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIEmployeeFormValue } from '../KPIEmployeeForm';

type KPIEmployeeDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPIEmployeeFormValue>;
  intl: InjectedIntl;
  
  handleLoadLatest: (employeeUid: string, year: string) => void;
  handleSetLoadLatest: () => void;
  latestData: IKPIEmployeeFormValue;
  filterSubOrdinateEmployee: IOrganizationStructureSubOrdinateListFilter;
  loadLatest: boolean;
};

const KPIEmployeeDetailPartialForm: React.ComponentType<KPIEmployeeDetailPartialFormProps> = props => {
  const setLatestValue = () => {
    props.formikBag.setValues({
      kpiUid: props.formikBag.values.kpiUid,
      kpiAssignUid: props.latestData.kpiAssignUid,
      employeeUid: props.formikBag.values.employeeUid,
      employeeName: props.formikBag.values.employeeName,
      statusType: props.formikBag.values.statusType,
      year: props.formikBag.values.year,
      period: props.latestData.period,
      revision: props.formikBag.values.revision,
      totalScore: props.latestData.totalScore,
      notes: props.formikBag.values.notes,
      items: props.latestData.items,
    });

    props.handleSetLoadLatest();
  };
  
  return (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.employee.section.infoTitle)}
      />
      <CardContent>
        <Field 
          name="kpiUid"
          render={({ field}: FieldProps<IKPIEmployeeFormValue>) => (
            <TextField 
              {...field}
              {...GlobalStyle.TextField.ReadOnly}
              disabled={props.formikBag.isSubmitting}
              label={props.intl.formatMessage(kpiMessage.employee.field.uid)}
              helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
            />
          )}
        />
        
        {
          props.formMode === FormMode.New && 
          <Field
            name="employeeUid"
            render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
              <OrganizationStructureSubOrdinateOption filter={props.filterSubOrdinateEmployee}>
                <SelectField
                  isSearchable
                  isDisabled={props.formikBag.isSubmitting}
                  isClearable={field.value !== ''}
                  escapeClearsValue={true}
                  valueString={field.value}
                  textFieldProps={{
                    label: props.intl.formatMessage(kpiMessage.employee.field.employeeUid),
                    required: true,
                    helperText: form.touched.employeeUid && form.errors.employeeUid,
                    error: form.touched.employeeUid && Boolean(form.errors.employeeUid)
                  }}
                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                  onChange={(selected: ISelectFieldOption) => {
                    props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                    props.formikBag.setFieldValue('employeeName', selected && selected.data && selected.data.fullName || '');

                    if ((selected && selected.value !== '') && (props.formikBag.values.year !== '' && props.formikBag.values.year !== '0')) {
                      props.handleLoadLatest(selected && selected.value, props.formikBag.values.year);
                    }
                  }}
                />
              </OrganizationStructureSubOrdinateOption>
            )}
          /> 
          ||
          <Field 
            name="employeeName"
            render={({ field}: FieldProps<IKPIEmployeeFormValue>) => (
              <TextField 
                {...field}
                {...GlobalStyle.TextField.ReadOnly}
                disabled={props.formikBag.isSubmitting}
                label={props.intl.formatMessage(kpiMessage.employee.field.employeeUid)}
              />
            )}
          />
        }
        
        {
          props.formMode === FormMode.New && 
          <Field
            name="year"
            render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
              <InputYearOption withPast>
                <SelectField
                  isSearchable
                  isDisabled={props.formikBag.isSubmitting}
                  isClearable={field.value !== ''}
                  escapeClearsValue={true}
                  valueString={field.value}
                  textFieldProps={{
                    label: props.intl.formatMessage(kpiMessage.employee.field.year),
                    required: true,
                    helperText: form.touched.year && form.errors.year,
                    error: form.touched.year && Boolean(form.errors.year)
                  }}
                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                  onChange={(selected: ISelectFieldOption) => {
                    props.formikBag.setFieldValue(field.name, selected && selected.value || '');

                    if (props.formikBag.values.employeeUid !== '' && ((selected && selected.value !== '') && (selected && selected.value !== '0'))) {
                      props.handleLoadLatest(props.formikBag.values.employeeUid, selected && selected.value);
                    }
                  }}
                />
              </InputYearOption>
            )}
          />
          ||
          <Field 
            name="year"
            render={({ field}: FieldProps<IKPIEmployeeFormValue>) => (
              <TextField 
                {...field}
                {...GlobalStyle.TextField.ReadOnly}
                disabled={props.formikBag.isSubmitting}
                label={props.intl.formatMessage(kpiMessage.employee.field.year)}
              />
            )}
          />
        }

        <Field
          name="period"
          render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              disabled={props.formikBag.isSubmitting}
              label={props.intl.formatMessage(kpiMessage.employee.field.period)}
              value={props.formikBag.values.period !== '' &&
                (parseInt(props.formikBag.values.period, 10) === 1 && 
                  props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || 
                  props.intl.formatMessage(kpiMessage.employee.field.periodFullYear)) ||
                ''}
              helperText={form.touched.period && form.errors.period}
              error={form.touched.period && Boolean(form.errors.period)}
            />
          )}
        />

        {
          props.formikBag.values.statusType === WorkflowStatusType.Accepted &&
          <Field
            name="revision"
            render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
              <TextField
                {...field}
                fullWidth
                required={true}
                margin="normal"
                autoComplete="off"
                disabled={form.isSubmitting}
                label={props.intl.formatMessage(kpiMessage.employee.field.revision)}
                placeholder={props.intl.formatMessage(kpiMessage.employee.field.revision)}
                helperText={(form.touched.revision) && (form.errors.revision)}
                error={(form.touched.revision) && Boolean(form.errors.revision)}
              />
            )}
          />
        }

        <Field
          name="totalScore"
          render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              disabled={props.formikBag.isSubmitting}
              label={props.intl.formatMessage(kpiMessage.employee.field.totalScore)}
              value={props.intl.formatNumber(field.value)}
              helperText={form.touched.totalScore && form.errors.totalScore}
              error={form.touched.totalScore && Boolean(form.errors.totalScore)}
            />
          )}
        />

        <Field
          name="notes"
          render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
            <TextField
              {...field}
              fullWidth
              multiline
              margin="normal"
              autoComplete="off"
              disabled={form.isSubmitting}
              label={props.intl.formatMessage(kpiMessage.employee.field.kpiNotes)}
              placeholder={props.intl.formatMessage(kpiMessage.employee.field.kpiNotes)}
              helperText={(form.touched.notes) && (form.errors.notes)}
              error={(form.touched.notes) && Boolean(form.errors.notes)}
            />
          )}
        />
      </CardContent>
      {
        props.loadLatest &&
        setLatestValue()
      }
    </Card>
  );
};

export default KPIEmployeeDetailPartialForm;