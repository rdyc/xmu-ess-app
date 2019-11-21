import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IconButton, TableCell, TableRow, TextField, WithStyles } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';
import * as classNames from 'classnames';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIMeasurementFormValue } from '../KPIMeasurementForm';

interface KPIcategoryDetailPartialFormProps {
  formikBag: FormikProps<IKPIMeasurementFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
  isEditing: boolean;
  isItemEditing: boolean;
  index: number;
  parentFormMode: FormMode;
  handleSetEditMode(index: number): void;
  handleRemoveFormValueList(): void;
  handleSetIsItemEditing(): void;
}

type AllProps
 = KPIcategoryDetailPartialFormProps
 & WithStyles;

const KPIMeasurementItemPartialForm: React.ComponentType<AllProps> = props => (
  <TableRow>
    <TableCell className={classNames(props.classes.cellWidthXXXL)}>
      <Field
        name="description"
        render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            multiline
            InputProps= {{
              disableUnderline: !props.isEditing,
              readOnly: !props.isEditing
            }}
            autoComplete="off"
            disabled={form.isSubmitting && props.parentFormMode === FormMode.Edit}
            placeholder={props.intl.formatMessage(kpiMessage.measurement.field.description)}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
    </TableCell>
    <TableCell className={classNames(props.classes.cellWidthLg)}>
      {
        props.isEditing &&
        <Field
          name="measurementType"
          render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
            <React.Fragment>
              <CommonSystemOption category="measurement" filter={props.filterCommonSystem}>
                <SelectField
                  isSearchable
                  menuPlacement="auto"
                  menuPosition="fixed"
                  isDisabled={props.formikBag.isSubmitting && props.parentFormMode === FormMode.Edit}
                  isClearable={field.value !== ''}
                  escapeClearsValue={true}
                  valueString={field.value}
                  textFieldProps={{
                    required: true,
                    placeholder: props.intl.formatMessage(kpiMessage.measurement.field.measurementType),
                    helperText: form.touched.measurementType && form.errors.measurementType,
                    error: form.touched.measurementType && Boolean(form.errors.measurementType)
                  }}
                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                  onChange={(selected: ISelectFieldOption) => { 
                    props.formikBag.setFieldValue(field.name, selected && selected.value || ''); 
                    props.formikBag.setFieldValue('measurementName', selected && selected.label || ''); 
                  }}
                />
              </CommonSystemOption>
            </React.Fragment>
          )}
        />
        ||
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          value={props.formikBag.values.measurementName}
          multiline
        />
      }
    </TableCell>
    <TableCell className={classNames(props.classes.cellWidthMdV2)}>
      <Field
        name="weight"
        render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            autoComplete="off"
            disabled={form.isSubmitting && props.parentFormMode === FormMode.Edit}
            placeholder={props.intl.formatMessage(kpiMessage.measurement.field.weightPlaceholder)}
            helperText={form.touched.weight && form.errors.weight}
            error={form.touched.weight && Boolean(form.errors.weight)}
            InputProps={{
              inputComponent: NumberFormatter,
              disableUnderline: !props.isEditing,
              readOnly: !props.isEditing
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
    </TableCell>
    <TableCell className={classNames(props.classes.cellWidthMdV2)}>
    {
        !props.isEditing && 
        !props.isItemEditing &&
        <IconButton 
          type="button"
          color="secondary"
          disabled={props.formikBag.isSubmitting}
          onClick={() => {
            if (!props.isEditing) {
              props.handleSetEditMode(props.index);
              props.handleSetIsItemEditing();
            }                             
          }}
        >
          <Edit />
        </IconButton>
      }
      {
        props.isEditing && 
        <IconButton 
          type="button"
          color="secondary"
          disabled={props.formikBag.isSubmitting}
          onClick={() => props.formikBag.submitForm()}
        >
          <Save />
        </IconButton>
      }
      {
        props.isEditing &&
        <IconButton 
          type="reset"
          color="primary"
          disabled={props.formikBag.isSubmitting}
          onClick={() => {
            if (props.isEditing) {
              props.handleSetEditMode(props.index);
              props.handleSetIsItemEditing();
            }                              
            
            props.formikBag.resetForm();

            if (props.formikBag.values.description === '' &&
            props.formikBag.values.measurementType === '' &&
            props.formikBag.values.weight === 0) {
              props.handleRemoveFormValueList();
            }
          }}
        >
          <Cancel />
        </IconButton>
      }
    </TableCell>
  </TableRow>
);

export default KPIMeasurementItemPartialForm;