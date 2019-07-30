import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPIMeasurementOption } from '@kpi/components/measurement/options/KPIMeasurementOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IKPITemplateFormValue } from '../KPITemplateForm';

type KPITemplateItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPITemplateFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
  filterMeasurement: IKPIMeasurementGetListFilter;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const KPITemplateItemPartialForm: React.ComponentType<KPITemplateItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - Items`}
                  action={
                    props.formikBag.values.items.length > 1 &&
                    <IconButton 
                      onClick={() => {
                        // remove current
                        fields.remove(index);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>

                  {
                    props.formMode === FormMode.Edit &&
                    <Field
                      name={`items.${index}.uid`}
                      render={({ field }: FieldProps<IKPITemplateFormValue>) => {
                        return (
                          <TextField
                            {...field}
                            {...GlobalStyle.TextField.ReadOnly}
                            fullWidth
                            disabled
                            margin="normal"
                            label={props.intl.formatMessage(kpiMessage.template.field.itemUid)}
                            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
                          />
                        );
                      }}
                    />
                  }

                  <Field
                    name="categoryType"
                    render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.categoryType`);
                      const touch = getIn(form.touched, `items.${index}.categoryType`);

                      return (
                        <CommonSystemOption category="kPI" filter={props.filterCommonSystem}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].categoryType !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].categoryType}
                            textFieldProps={{
                              label: props.intl.formatMessage(kpiMessage.template.field.category),
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.categoryType`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.categoryType`, selected && selected.value || '');
                            }}
                          />
                        </CommonSystemOption>
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.measurementUid`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.measurementUid`);
                      const touch = getIn(form.touched, `items.${index}.measurementUid`);

                      return (
                        <KPIMeasurementOption filter={props.filterMeasurement} categoryUid={''}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].measurementUid !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].measurementUid}
                            textFieldProps={{
                              label: props.intl.formatMessage(kpiMessage.template.field.measurementUid),
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.measurementUid`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.measurementUid`, selected && selected.value || '');
                            }}
                          />
                        </KPIMeasurementOption>
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.target`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.target`);
                      const touch = getIn(form.touched, `items.${index}.target`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.target)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.target)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.weight`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.weight`);
                      const touch = getIn(form.touched, `items.${index}.weight`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.weight)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.weight)}
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
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(kpiMessage.template.section.itemTitle)}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.items === 'string' &&
                props.formikBag.errors.items
              }
              subheaderTypographyProps={{
                color: 'error',
                variant: 'body1'
              }}
            />
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  uid: '',
                  measurementUid: '',
                  categoryType: '',
                  target: '',
                  weight: 0
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default KPITemplateItemPartialForm;