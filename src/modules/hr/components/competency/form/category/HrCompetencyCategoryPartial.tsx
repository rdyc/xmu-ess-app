import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { HrCompetencyClusterOption } from '../../options/HrCompetencyClusterOption';
import { ICategoryFormValue } from './HrCompetencyCategoryForm';

type HrCompetencyCategoryPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICategoryFormValue>;
  intl: InjectedIntl;
  filterCluster?: IHrCompetencyClusterGetListFilter;
};

const HrCompetencyCategoryPartial: React.ComponentType<HrCompetencyCategoryPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Category'})}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICategoryFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'), {state: 'Category'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="clusterUid"
        render={({ field, form }: FieldProps<ICategoryFormValue>) => (
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
              }}
            />
          </HrCompetencyClusterOption>
        )}
      />
      
      <Field
        name="name"
        render={({ field, form }: FieldProps<ICategoryFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<ICategoryFormValue>) => (
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

export default HrCompetencyCategoryPartial;