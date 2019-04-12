import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { ITravelSettlementFormValue } from '../TravelSettlementForm';

type TravelDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ITravelSettlementFormValue>;
  intl: InjectedIntl;
};

const TravelDetailPartialForm: React.ComponentType<TravelDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(travelMessage.settlement.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="travelUid"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="fullName"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="position"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="destinationType"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
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
            onChange={(moment: Moment) => props.formikBag.setFieldValue('start', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
          />
        )}
      />     

      <Field
        name="end"
        render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
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
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('end', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
          />
        )}
      />   
      
      <Field
        name="customerUid"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="projectUid"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="siteUid"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="activityType"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="objective"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="target"
        render={({ field }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />
      
      <Field
        name="comment"
        render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(travelMessage.request.field.comment)}
            placeholder={props.intl.formatMessage(travelMessage.request.field.comment)}
            helperText={form.touched.comment && form.errors.comment}
            error={form.touched.comment && Boolean(form.errors.comment)}
          />
        )}
      />

      <Field
        name="total"
        render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(travelMessage.request.field.total)}
            value={props.intl.formatNumber(props.formikBag.values.total)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default TravelDetailPartialForm;