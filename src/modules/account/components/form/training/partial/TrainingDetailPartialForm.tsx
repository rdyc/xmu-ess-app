import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ITrainingFormValue } from '../TrainingForm';

type TrainingDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ITrainingFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
};

const TrainingDetailPartialForm: React.ComponentType<TrainingDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Training'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<ITrainingFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="uid"
        render={({ field}: FieldProps<ITrainingFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="trainingType"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <CommonSystemOption category="training" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.trainingType && form.errors.trainingType,
                error: form.touched.trainingType && Boolean(form.errors.trainingType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="certificationType"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <CommonSystemOption category="certification" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.certificationType && form.errors.certificationType,
                error: form.touched.certificationType && Boolean(form.errors.certificationType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="organizer"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.organizer && form.errors.organizer}
            error={form.touched.organizer && Boolean(form.errors.organizer)}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.start && form.errors.start}
            error={form.touched.start && Boolean(form.errors.start)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue('start', moment.format('YYYY-MM-DD'));
              props.formikBag.setFieldValue('end', '');
            }}
            invalidLabel=""
            disableFuture
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<ITrainingFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={!props.formikBag.values.start || form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.training.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('end', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
            disableFuture
            minDate={props.formikBag.values.start}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default TrainingDetailPartialForm;