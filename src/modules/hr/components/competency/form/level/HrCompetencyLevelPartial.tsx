import { FormMode } from '@generic/types';
import { IHrCompetencyCategoryGetListFilter, IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { HrCompetencyCategoryOption } from '../../options/HrCompetencyCategoryOption';
import { HrCompetencyClusterOption } from '../../options/HrCompetencyClusterOption';
import { ILevelFormValue } from './HrCompetencyLevelForm';

type HrCompetencyLevelPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ILevelFormValue>;
  intl: InjectedIntl;
  filterCluster?: IHrCompetencyClusterGetListFilter;
  filterCategory?: IHrCompetencyCategoryGetListFilter;
};

const HrCompetencyLevelPartial: React.ComponentType<HrCompetencyLevelPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Level'})}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ILevelFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'), {state: 'Level'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="clusterUid"
        render={({ field, form }: FieldProps<ILevelFormValue>) => (
          <HrCompetencyClusterOption filter={props.filterCluster}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}),
                required: true,
                helperText: form.touched.clusterUid && form.errors.clusterUid,
                error: form.touched.clusterUid && Boolean(form.errors.clusterUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('categoryUid', '');                
              }}
            />
          </HrCompetencyClusterOption>
        )}
      />

      <Field
        name="categoryUid"
        render={({ field, form }: FieldProps<ILevelFormValue>) => (
          <HrCompetencyCategoryOption filter={props.filterCategory} clusterUid={props.formikBag.values.clusterUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting || props.formikBag.values.clusterUid === ''}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'}),
                required: true,
                helperText: form.touched.categoryUid && form.errors.categoryUid,
                error: form.touched.categoryUid && Boolean(form.errors.categoryUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </HrCompetencyCategoryOption>
        )}
      />
      
      <Field
        name="level"
        render={({ field, form }: FieldProps<ILevelFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.level && form.errors.level}
            error={form.touched.level && Boolean(form.errors.level)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<ILevelFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default HrCompetencyLevelPartial;