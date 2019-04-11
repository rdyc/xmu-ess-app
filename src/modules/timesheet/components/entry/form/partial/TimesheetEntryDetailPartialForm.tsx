import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { LookupCustomerOption } from '@lookup/components/customer/options/LookupCustomerOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { ProjectAssignmentOption } from '@project/components/options/projectAssignment/ProjectAssignmentOption';
import { ProjectSiteOption } from '@project/components/options/projectSite/ProjectSiteOption';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ITimesheetEntryFormValue } from '../TimesheetEntryForm';

type TimesheetEntryDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ITimesheetEntryFormValue>;
  intl: InjectedIntl;
  companyUid: string;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectAssignmentGetListFilter;
  filterLookupCustomer?: ILookupCustomerGetListFilter;
  handleSetProjectFilter: (customerUid: string, values: ITimesheetEntryFormValue) => void;
};

const TimesheetEntryDetailPartialForm: React.ComponentType<TimesheetEntryDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(timesheetMessage.entry.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="activityType"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="activity" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.activityType && form.errors.activityType,
                  error: form.touched.activityType && Boolean(form.errors.activityType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                }}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <LookupCustomerOption filter={props.filterLookupCustomer}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.customerUid && form.errors.customerUid,
                error: form.touched.customerUid && Boolean(form.errors.customerUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('projectUid', '');
                props.formikBag.setFieldValue('siteUid', '');
                props.handleSetProjectFilter(selected && selected.value || '', props.formikBag.values);
              }}
            />
          </LookupCustomerOption>
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <React.Fragment>
            <ProjectAssignmentOption filter={props.filterProject}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.values.customerUid === '' || props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.projectUid && form.errors.projectUid,
                  error: form.touched.projectUid && Boolean(form.errors.projectUid)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                  props.formikBag.setFieldValue('siteUid', '');
                }}
              />
            </ProjectAssignmentOption>
          </React.Fragment>
        )}
      />

      <Field
        name="siteUid"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <React.Fragment>
            <ProjectSiteOption companyUid={props.companyUid} projectUid={props.formikBag.values.projectUid}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.values.projectUid === '' || props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.siteUid && form.errors.siteUid,
                  error: form.touched.siteUid && Boolean(form.errors.siteUid)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </ProjectSiteOption>
          </React.Fragment>
        )}
      />

      <Field
        name="date"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.date && form.errors.date}
            error={form.touched.date && Boolean(form.errors.date)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue('date', moment.format('YYYY-MM-DD'));
              if (props.formikBag.values.start !== '') {
                props.formikBag.setFieldValue('start', `${moment.format('YYYY-MM-DD')} ${(props.formikBag.values.start).substring(11)}`);
              }
              if (props.formikBag.values.end !== '') {
                props.formikBag.setFieldValue('end', `${moment.format('YYYY-MM-DD')} ${(props.formikBag.values.end).substring(11)}`);
              }
            }}
            disableFuture
            invalidLabel=""
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <TimePicker
            {...field}
            fullWidth
            required={true}
            ampm={false}
            margin="normal"
            disabled={props.formikBag.values.date === '' || form.isSubmitting}
            label={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldPlaceholder'))}
            // format="HH:mm"
            helperText={form.touched.start && form.errors.start}
            error={form.touched.start && Boolean(form.errors.start)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue('start', `${props.formikBag.values.date} ${moment.format('HH:mm')}`);
            }}
            invalidLabel=""
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <TimePicker
            {...field}
            fullWidth
            required={true}
            ampm={false}
            margin="normal"
            disabled={props.formikBag.values.date === '' || form.isSubmitting}
            label={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldPlaceholder'))}
            // format="HH:mm"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue(field.name, `${props.formikBag.values.date} ${moment.format('HH:mm')}`);
            }}
            invalidLabel=""
            minDate={props.formikBag.values.start}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<ITimesheetEntryFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            required={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(timesheetMessage.entry.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default TimesheetEntryDetailPartialForm;