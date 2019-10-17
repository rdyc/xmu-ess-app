import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { HrCompetencyCategoryOption } from '../../options/HrCompetencyCategoryOption';
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
        name="clusterUid"
        render={({ field, form }: FieldProps<ICategoryFormValue>) => (
          <HrCompetencyClusterOption filter={props.filterCluster}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.cluster),
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
        name="categoryUid"
        render={({ field, form }: FieldProps<ICategoryFormValue>) => (
          <HrCompetencyCategoryOption competencyUid={props.formikBag.values.clusterUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.category),
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
    </CardContent>
  </Card>
);

export default HrCompetencyCategoryPartial;