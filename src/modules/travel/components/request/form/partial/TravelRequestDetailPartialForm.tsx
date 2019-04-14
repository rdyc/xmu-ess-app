import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { IDiem } from '@lookup/classes/response';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { ProjectOption } from '@project/components/options/project/ProjectOption';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ITravelRequestFormValue } from '../TravelRequestForm';

type TravelRequestDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<ITravelRequestFormValue>;
  intl: InjectedIntl;
  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  diem?: IDiem;
  diemData?: IDiem[];
  filterProject?: IProjectRegistrationGetListFilter;
  setProjectFilter: (customerUid: string) => void;
  handleSetDiem: (projectType: string, destinationType: string) => void;
};

const TravelRequestDetailPartialForm: React.ComponentType<TravelRequestDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(travelMessage.request.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="fullName"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      <Field
        name="position"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="destinationType"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="destination" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.destinationType && form.errors.destinationType,
                  error: form.touched.destinationType && Boolean(form.errors.destinationType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => {
                  const destinationType = selected && selected.value || '';

                  props.formikBag.setFieldValue(field.name, destinationType);

                  if (props.formikBag.values.projectType !== '') {
                    props.handleSetDiem(props.formikBag.values.projectType, destinationType);
                    const diems = props.diemData && props.diemData.filter(item => item.destinationType === destinationType && item.projectType === props.formikBag.values.projectType)[0];

                    props.formikBag.values.items.forEach((item, index) => {
                      props.formikBag.setFieldValue(`items.${index}.currencyUid`, diems && diems.currency && diems.currency.name);
                      props.formikBag.setFieldValue(`items.${index}.diemValue`, diems && diems.value);
                      props.formikBag.setFieldValue(`items.${index}.currencyRate`, diems && diems.currency && diems.currency.rate);
                    });
                  }
                }}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.start && form.errors.start}
            error={form.touched.start && Boolean(form.errors.start)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('start', moment.toDate())}
            invalidLabel=""
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={props.formikBag.values.start !== ''}
            showTodayButton
            margin="normal"
            disabled={props.formikBag.values.start === '' || form.isSubmitting}
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue(field.name, moment.toDate())}
            invalidLabel=""
            minDate={props.formikBag.values.start}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <LookupCustomerOption filter={props.filterLookupCustomer}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.customerUid && form.errors.customerUid,
                error: form.touched.customerUid && Boolean(form.errors.customerUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.setProjectFilter(selected && selected.value || '');

                if (props.formikBag.values.customerUid !== (selected && selected.value)) {
                  props.formikBag.setFieldValue('projectUid', '');
                }

              }}
            />
          </LookupCustomerOption>
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <ProjectOption filter={props.filterProject}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting || props.formikBag.values.customerUid === ''}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.projectUid && form.errors.projectUid,
                error: form.touched.projectUid && Boolean(form.errors.projectUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                const projectUid = selected && selected.value || '';

                props.formikBag.setFieldValue(field.name, projectUid);

                let projectType = 'SPT01';
                if (selected && selected.data && selected.data.projectType === 'SPT01') {
                  projectType = 'SPT01';
                } else {
                  projectType = 'SPT04';
                }

                // set projectType 
                props.formikBag.setFieldValue('projectType', projectType);

                if (props.formikBag.values.destinationType !== '') {
                  props.handleSetDiem(projectType, props.formikBag.values.destinationType);
                  const diems = props.diemData && props.diemData.filter(item => item.destinationType === props.formikBag.values.destinationType && item.projectType === projectType)[0];

                  props.formikBag.values.items.forEach((item, index) => {
                    props.formikBag.setFieldValue(`items.${index}.currencyUid`, diems && diems.currency && diems.currency.name);
                    props.formikBag.setFieldValue(`items.${index}.diemValue`, diems && diems.value);
                    props.formikBag.setFieldValue(`items.${index}.currencyRate`, diems && diems.currency && diems.currency.rate);
                  });
                }
              }}
            />
          </ProjectOption>
        )}
      />
      <Field
        name="activityType"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="purpose" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.destinationType && form.errors.destinationType,
                  error: form.touched.destinationType && Boolean(form.errors.destinationType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />
      <Field
        name="objective"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.objective && form.errors.objective}
            error={form.touched.objective && Boolean(form.errors.objective)}
          />
        )}
      />

      <Field
        name="target"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.target && form.errors.target}
            error={form.touched.target && Boolean(form.errors.target)}
          />
        )}
      />

      <Field
        name="comment"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.comment && form.errors.comment}
            error={form.touched.comment && Boolean(form.errors.comment)}
          />
        )}
      />
      <Field
        name="total"
        render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            InputProps={{
              inputComponent: NumberFormatter
            }}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default TravelRequestDetailPartialForm;