import { MeasurementType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPICategoryOption } from '@kpi/components/category/options/KPICategoryOption';
import { KPIMeasurementOption } from '@kpi/components/measurement/options/KPIMeasurementOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, WithStyles } from '@material-ui/core';
import { Field, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIAssignFormValue } from '../KPIAssignForm';

interface KPIAssignSingleItemPartialFormProps {
  formMode: FormMode; 
  formikBag: FormikProps<IKPIAssignFormValue>;
  intl: InjectedIntl;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  itemDialogIndex: number;
  isDialogFullScreen: boolean;
}

type AllProps
 = KPIAssignSingleItemPartialFormProps
 & WithStyles;

const KPIAssignSingleItemPartialForm: React.ComponentType<AllProps> = props => (
  <Dialog
    open={props.formikBag.values.items[props.itemDialogIndex].isOpen}
    onClose={() => props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.isOpen`, false)}
    key={props.itemDialogIndex}
    fullScreen={props.isDialogFullScreen}
    maxWidth="md"
    fullWidth
  >
    <DialogTitle>
      {props.intl.formatMessage(kpiMessage.employee.section.itemTitle)}
    </DialogTitle>
    <DialogContent>
      <Field
        name={`items.${props.itemDialogIndex}.categoryUid`}
        render={({ form }: FieldProps<IKPIAssignFormValue>) => {
          const error = getIn(form.errors, `items.${props.itemDialogIndex}.categoryUid`);
          const touch = getIn(form.touched, `items.${props.itemDialogIndex}.categoryUid`);

          return (
            <KPICategoryOption filter={props.filterKPICategory}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.isSubmitting}
                isClearable={props.formikBag.values.items[props.itemDialogIndex].categoryUid !== ''}
                escapeClearsValue={true}
                valueString={props.formikBag.values.items[props.itemDialogIndex].categoryUid}
                textFieldProps={{
                  label: props.intl.formatMessage(kpiMessage.employee.field.categoryUid),
                  margin: 'normal',
                  required: true,
                  helperText: touch && error,
                  error: touch && Boolean(error)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(`items.${props.itemDialogIndex}.categoryUid`)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.categoryUid`, selected && selected.value || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.categoryName`, selected && selected.label || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.categoryValue`, selected && selected.label || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.categoryGroup`, selected && selected.data && selected.data.group || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.measurementUid`, '');
                  
                  if (selected && selected.data && selected.data.data && selected.data.group === 'Personal') {
                    props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.amount`, 1);
                  }
                }}
              />
            </KPICategoryOption>
          );
        }}
      />
    
      <Field
        name={`items.${props.itemDialogIndex}.categoryName`}
        render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
          const error = getIn(form.errors, `items.${props.itemDialogIndex}.categoryName`);
          const touch = getIn(form.touched, `items.${props.itemDialogIndex}.categoryName`);

          return (
            <TextField
              {...field}
              fullWidth
              required
              disabled={form.isSubmitting}
              margin="normal"
              autoComplete="off"
              label={props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
              placeholder={props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
              helperText={touch && error}
              error={touch && Boolean(error)}
            />
          );
        }}
      />
    
      <Field
        name={`items.${props.itemDialogIndex}.measurementUid`}
        render={({ form }: FieldProps<IKPIAssignFormValue>) => {
          const error = getIn(form.errors, `items.${props.itemDialogIndex}.measurementUid`);
          const touch = getIn(form.touched, `items.${props.itemDialogIndex}.measurementUid`);

          return (
            <KPIMeasurementOption filter={props.filterKPIMeasurement} categoryUid={props.formikBag.values.items[props.itemDialogIndex].categoryUid}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.isSubmitting || props.formikBag.values.items[props.itemDialogIndex].categoryUid === ''}
                isClearable={props.formikBag.values.items[props.itemDialogIndex].measurementUid !== ''}
                escapeClearsValue={true}
                valueString={props.formikBag.values.items[props.itemDialogIndex].measurementUid}
                textFieldProps={{
                  label: props.intl.formatMessage(kpiMessage.employee.field.measurementUid),
                  margin: 'normal',
                  required: true,
                  helperText: touch && error,
                  error: touch && Boolean(error)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(`items.${props.itemDialogIndex}.measurementUid`)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.measurementUid`, selected && selected.value || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.weight`, selected && selected.data && selected.data.weight || 0);
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.measurementValue`, selected && selected.label || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.measurementDescription`, selected && selected.label || '');
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.measurementType`, selected && selected.data && selected.data.measurementType || '');

                  if (selected && selected.data && selected.data.measurementType === MeasurementType.Mutlak) {
                    props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.amount`, 1);
                  }

                  let totalValue = selected && selected.data && selected.data.weight || 0;
                  props.formikBag.values.items.forEach((requestItem, indexItem) => {
                    if (props.itemDialogIndex !== indexItem) {
                      totalValue = totalValue + requestItem.weight;
                    }                              
                  });

                  // set weight
                  props.formikBag.setFieldValue('totalWeight', totalValue);
                }}
              />
            </KPIMeasurementOption>
          );
        }}
      />

      <Field
        name={`items.${props.itemDialogIndex}.measurementDescription`}
        render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
          const error = getIn(form.errors, `items.${props.itemDialogIndex}.measurementDescription`);
          const touch = getIn(form.touched, `items.${props.itemDialogIndex}.measurementDescription`);

          return (
            <TextField
              {...field}
              fullWidth
              multiline
              required
              disabled={form.isSubmitting}
              margin="normal"
              autoComplete="off"
              label={props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
              placeholder={props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
              helperText={touch && error}
              error={touch && Boolean(error)}
            />
          );
        }}
      />
    
      <Field
        name={`items.${props.itemDialogIndex}.target`}
        render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
          const error = getIn(form.errors, `items.${props.itemDialogIndex}.target`);
          const touch = getIn(form.touched, `items.${props.itemDialogIndex}.target`);

          return (
            <TextField
              {...field}
              fullWidth
              multiline
              required
              disabled={form.isSubmitting}
              margin="normal"
              autoComplete="off"
              label={props.intl.formatMessage(kpiMessage.employee.field.target)}
              placeholder={props.intl.formatMessage(kpiMessage.employee.field.targetPlaceholder)}
              helperText={touch && error}
              error={touch && Boolean(error)}
            />
          );
        }}
      />
    
      {
        props.formikBag.values.items[props.itemDialogIndex].categoryGroup === 'kpi' &&
        <Field
          name={`items.${props.itemDialogIndex}.weight`}
          render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
            const error = getIn(form.errors, `items.${props.itemDialogIndex}.weight`);
            const touch = getIn(form.touched, `items.${props.itemDialogIndex}.weight`);

            return (
              <TextField
                {...field}
                fullWidth
                required
                disabled={form.isSubmitting}
                margin="normal"
                autoComplete="off"
                label={props.intl.formatMessage(kpiMessage.employee.field.weightPercent)}
                placeholder={props.intl.formatMessage(kpiMessage.employee.field.weightPlaceholder)}
                helperText={touch && error}
                error={touch && Boolean(error)}
                InputProps={{
                  inputComponent: NumberFormatter,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let totalValue = 0;
                  let value = 0;

                  if (e.target.value === '') {
                    // set current field to 0
                    props.formikBag.setFieldValue(field.name, 0);
                    value = 0;
                  } else {
                    value = parseFloat(e.target.value);
                    // set current field
                    props.formikBag.setFieldValue(field.name, value);
                  }
                  
                  // set actual field
                  props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.weight`, value);

                  // calculate total requested
                  totalValue = value;
                  props.formikBag.values.items.forEach((requestItem, indexItem) => {
                    if (props.itemDialogIndex !== indexItem) {
                      totalValue = totalValue + requestItem.weight;
                    }                              
                  });

                  // set weight
                  props.formikBag.setFieldValue('totalWeight', totalValue);
                }}
              />
            );
          }}
        />
      }
    
      {
        props.formikBag.values.items[props.itemDialogIndex].categoryGroup === 'kpi' &&
        props.formikBag.values.items[props.itemDialogIndex].measurementType === MeasurementType.Minimum &&
        <Field
          name={`items.${props.itemDialogIndex}.threshold`}
          render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
            const error = getIn(form.errors, `items.${props.itemDialogIndex}.threshold`);
            const touch = getIn(form.touched, `items.${props.itemDialogIndex}.threshold`);

            return (
              <TextField
                {...field}
                fullWidth
                disabled={form.isSubmitting}
                margin="normal"
                autoComplete="off"
                label={props.intl.formatMessage(kpiMessage.employee.field.threshold)}
                placeholder={props.intl.formatMessage(kpiMessage.employee.field.thresholdPlaceholder)}
                helperText={touch && error}
                error={touch && Boolean(error)}
                InputProps={{
                  inputComponent: NumberFormatter,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = 0;

                  if (e.target.value === '') {
                    // set current field to 0
                    props.formikBag.setFieldValue(field.name, 0);
                    value = 0;
                  } else {
                    value = parseFloat(e.target.value);
                    // set current field
                    props.formikBag.setFieldValue(field.name, value);
                  }
                  
                  // set value field
                  // props.formikBag.setFieldValue(`items.${index}.weight`, value);
                }}
              />
            );
          }}
        />
      }
    
      {
        props.formikBag.values.items[props.itemDialogIndex].categoryGroup === 'kpi' &&
        (props.formikBag.values.items[props.itemDialogIndex].measurementType === MeasurementType.Minimum || 
        props.formikBag.values.items[props.itemDialogIndex].measurementType === MeasurementType.Proporsional) &&
        <Field
          name={`items.${props.itemDialogIndex}.amount`}
          render={({ field, form }: FieldProps<IKPIAssignFormValue>) => {
            const error = getIn(form.errors, `items.${props.itemDialogIndex}.amount`);
            const touch = getIn(form.touched, `items.${props.itemDialogIndex}.amount`);

            return (
              <TextField
                {...field}
                fullWidth
                required
                disabled={form.isSubmitting}
                margin="normal"
                autoComplete="off"
                label={props.intl.formatMessage(kpiMessage.employee.field.amount)}
                placeholder={props.intl.formatMessage(kpiMessage.employee.field.amountPlaceholder)}
                helperText={touch && error}
                error={touch && Boolean(error)}
                InputProps={{
                  inputComponent: NumberFormatter,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = 0;

                  if (e.target.value === '') {
                    // set current field to 0
                    props.formikBag.setFieldValue(field.name, 0);
                    value = 0;
                  } else {
                    value = parseFloat(e.target.value);
                    // set current field
                    props.formikBag.setFieldValue(field.name, value);
                  }
                  
                  // set value field
                  // props.formikBag.setFieldValue(`items.${index}.weight`, value);
                }}
              />
            );
          }}
        />
        }
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.formikBag.setFieldValue(`items.${props.itemDialogIndex}.isOpen`, false)} color="primary">
        {props.intl.formatMessage(layoutMessage.action.close)}
      </Button>
    </DialogActions>
  </Dialog>
);

export default KPIAssignSingleItemPartialForm;