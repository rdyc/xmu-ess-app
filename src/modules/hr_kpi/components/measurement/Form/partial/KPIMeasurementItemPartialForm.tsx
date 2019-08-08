import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, CardActions, Grid, TextField, Typography } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIMeasurementFormValue } from '../KPIMeasurementForm';

type KPIcategoryDetailPartialFormProps = {
  formikBag: FormikProps<IKPIMeasurementFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
  isEditing: boolean;
  index: number;
  handleSetEditMode(index: number): void;
};

const KPIMeasurementItemPartialForm: React.ComponentType<KPIcategoryDetailPartialFormProps> = props => (
  <Grid container spacing={0}>
    <Grid item xs={12} onClick={() => !props.isEditing && props.handleSetEditMode(props.index)}>
      <Typography noWrap variant= "body2" >
        {props.formikBag.values.uid}
      </Typography>
    </Grid>
    <Grid item xs={12} onClick={() => !props.isEditing && props.handleSetEditMode(props.index)}>
      <Field
        name="description"
        render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            multiline
            margin= "dense"
            InputProps= {{
              disableUnderline: !props.isEditing,
              readOnly: !props.isEditing
            }}
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.measurement.field.description)}
            placeholder={props.intl.formatMessage(kpiMessage.measurement.field.description)}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} onClick={() => !props.isEditing && props.handleSetEditMode(props.index)}>
      <Grid container spacing={8} >
        <Grid item xs={10}>
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
                      isDisabled={props.formikBag.isSubmitting}
                      isClearable={field.value !== ''}
                      escapeClearsValue={true}
                      valueString={field.value}
                      textFieldProps={{
                        label: props.intl.formatMessage(kpiMessage.measurement.field.measurementType),
                        required: true,
                        helperText: form.touched.measurementType && form.errors.measurementType,
                        error: form.touched.measurementType && Boolean(form.errors.measurementType)
                      }}
                      onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                      onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                    />
                  </CommonSystemOption>
                </React.Fragment>
              )}
            />
            ||
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(kpiMessage.measurement.field.measurementType)}
              value={props.formikBag.values.measurementName}
              multiline
            />
          }
        </Grid>
        <Grid item xs={2}>
          <Field
            name="weight"
            render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
              <TextField
                {...field}
                fullWidth
                margin= "dense"
                autoComplete="off"
                disabled={form.isSubmitting}
                label={props.intl.formatMessage(kpiMessage.measurement.field.weight)}
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
        </Grid>
      </Grid> 
    </Grid>
    {
      props.isEditing &&
      <Grid item xs={12}>
        <CardActions>
          <Button 
            fullWidth
            type="reset"
            color="primary"
            disabled={props.formikBag.isSubmitting}
            onClick={() => {
              if (props.isEditing) {
                props.handleSetEditMode(props.index);
              }                              
              props.formikBag.resetForm();
            }}
          >
            {props.intl.formatMessage(layoutMessage.action.cancel)}
          </Button>

          <Button 
            fullWidth
            type="button"
            color="secondary"
            disabled={props.formikBag.isSubmitting}
            onClick={() => props.formikBag.submitForm()}
          >
            {props.formikBag.isSubmitting ? props.intl.formatMessage(layoutMessage.text.processing) : props.intl.formatMessage(layoutMessage.action.save)}
          </Button>
        </CardActions>
      </Grid>
    }
  </Grid>
);

export default KPIMeasurementItemPartialForm;