import { AccountEmployeeMultipleOption } from '@account/components/options/AccountEmployeeMultipleOption';
import { AssessorType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputYearOption } from '@layout/components/input/year/InputYearOption';
// import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { HrCompetencyMappedOption } from '../../options/HrCompetencyMappedOption';
import { ICompetencyAssessmentFormValue } from './CompetencyAssessmentForm';

type CompetencyAssessmentPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyAssessmentFormValue>;
  intl: InjectedIntl;
  filterCompany?: ILookupCompanyGetListFilter;
};

const CompetencyAssessmentPartial: React.ComponentType<CompetencyAssessmentPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.responden)}
    />
    <CardContent>

      <Field
        name="year"
        render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => (
          <InputYearOption withFuture>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting || props.formMode === FormMode.Edit}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.year),
                required: true,
                helperText: form.touched.year && form.errors.year,
                error: form.touched.year && Boolean(form.errors.year)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </InputYearOption>
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => (
          <LookupCompanyOption filter={props.filterCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting || props.formMode === FormMode.Edit}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.company),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('positionUid', '');
                props.formikBag.setFieldValue('employeeUid', '');
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="positionUid"
        render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => (
          <HrCompetencyMappedOption companyUid={props.formikBag.values.companyUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting || props.formMode === FormMode.Edit}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.position),
                required: true,
                helperText: form.touched.positionUid && form.errors.positionUid,
                error: form.touched.positionUid && Boolean(form.errors.positionUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('employeeUid', '');                
              }}
            />
          </HrCompetencyMappedOption>
        )}
      />

      <Field
        name="employeeUid"
        render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => (
          <AccountEmployeeMultipleOption companyUid={props.formikBag.values.companyUid} positoinUid={props.formikBag.values.positionUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isClearable={field.value !== ''}
              isDisabled={props.formikBag.values.positionUid === '' || props.formikBag.isSubmitting || props.formMode === FormMode.Edit}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.employee),
                placeholder: props.intl.formatMessage(hrMessage.competency.field.employee),
                required: true,
                helperText: form.touched.employeeUid && form.errors.employeeUid,
                error: form.touched.employeeUid && Boolean(form.errors.employeeUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                if (selected) {
                  props.formikBag.setFieldValue(field.name, selected.value || '');
                  props.formikBag.setFieldValue('employeeName', selected.label || '');
                  if (props.formikBag.values.responder.length > 0) {
                    props.formikBag.values.responder.map((item, index) => 
                      item.assessorType === AssessorType.Self &&
                      item.employeeUid !== selected.value &&
                      (
                        props.formikBag.setFieldValue(`responder.${index}.employeeUid`, selected.value),
                        props.formikBag.setFieldValue(`responder.${index}.employeeName`, selected.label)
                      )
                    );
                  }
                }
              }}
            />
          </AccountEmployeeMultipleOption>
        )}
      />
      
    </CardContent>
  </Card>
);

export default CompetencyAssessmentPartial;