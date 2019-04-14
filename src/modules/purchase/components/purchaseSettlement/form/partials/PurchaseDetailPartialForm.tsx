import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { GlobalStyle } from '@layout/types/GlobalStyle';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { IPurchaseSettlementFormValue } from '../PurchaseSettlementForm';

type PurchaseDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IPurchaseSettlementFormValue>;
  intl: InjectedIntl;
  isInIDR: boolean;
  classes: {
    colorBlue: string;
    colorRed: string;
  };
};

const PurchaseDetailPartialForm: React.ComponentType<PurchaseDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(purchaseMessage.settlement.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(purchaseMessage.request.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="date"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            disablePast
            helperText={form.touched.date && form.errors.date}
            error={form.touched.date && Boolean(form.errors.date)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('date', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
          />
        )}
      />     
      
      <Field
        name="notes"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.notes && form.errors.notes}
            error={form.touched.notes && Boolean(form.errors.notes)}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            helperText={form.touched.customerUid && form.errors.customerUid}
            error={form.touched.customerUid && Boolean(form.errors.customerUid)}
          />
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            helperText={form.touched.projectUid && form.errors.projectUid}
            error={form.touched.projectUid && Boolean(form.errors.projectUid)}
          />
        )}
      />

      <Field
        name="currencyType"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            helperText={form.touched.currencyType && form.errors.currencyType}
            error={form.touched.currencyType && Boolean(form.errors.currencyType)}
          />
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.rate && form.errors.rate}
            error={form.touched.rate && Boolean(form.errors.rate)}
          />
        )}
      />

      <Field
        name="request"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.request && form.errors.request}
            error={form.touched.request && Boolean(form.errors.request)}
          />
        )}
      />

      <Field
        name="actual"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.actual && form.errors.actual}
            error={form.touched.actual && Boolean(form.errors.actual)}
          />
        )}
      />

      <Field
        name="difference"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin= "dense"
            InputProps= {{
              disableUnderline: true,
              readOnly: true,
              className: props.formikBag.values.request - props.formikBag.values.actual >= 0 ? 
              props.classes.colorBlue : props.classes.colorRed 
            }}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(
              props.formikBag.values.request - props.formikBag.values.actual >= 0 ?
              props.formikBag.values.request - props.formikBag.values.actual :
              (props.formikBag.values.request - props.formikBag.values.actual) * -1
              )}
            helperText={form.touched.difference && form.errors.difference}
            error={form.touched.difference && Boolean(form.errors.difference)}
          />
        )}
      />

      {
        !props.isInIDR &&
        <Field
          name="requestInIDR"
          render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
              value={props.intl.formatNumber(field.value)}
              helperText={form.touched.requestInIDR && form.errors.requestInIDR}
              error={form.touched.requestInIDR && Boolean(form.errors.requestInIDR)}
            />
          )}
        /> 
      }

      {
        !props.isInIDR &&
        <Field
          name="actualInIDR"
          render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
              value={props.intl.formatNumber(props.formikBag.values.actual * props.formikBag.values.rate)}
              helperText={form.touched.actualInIDR && form.errors.actualInIDR}
              error={form.touched.actualInIDR && Boolean(form.errors.actualInIDR)}
            />
          )}
        /> 
      }

      {
        !props.isInIDR &&
        <Field
          name="differenceInIDR"
          render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
            <TextField
              {...field}
              fullWidth
              margin= "dense"
              InputProps= {{
                disableUnderline: true,
                readOnly: true,
                className: props.formikBag.values.requestInIDR - (props.formikBag.values.actual * props.formikBag.values.rate) >= 0 ? 
                props.classes.colorBlue : props.classes.colorRed 
              }}
              label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
              value={props.intl.formatNumber(
                props.formikBag.values.requestInIDR - (props.formikBag.values.actual * props.formikBag.values.rate) >= 0 ?
                props.formikBag.values.requestInIDR - (props.formikBag.values.actual * props.formikBag.values.rate) :
                (props.formikBag.values.requestInIDR - (props.formikBag.values.actual * props.formikBag.values.rate)) * -1
                )}
              helperText={form.touched.differenceInIDR && form.errors.differenceInIDR}
              error={form.touched.differenceInIDR && Boolean(form.errors.differenceInIDR)}
            />
          )}
        /> 
      }

      <Field
        name="advance"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.advance && form.errors.advance}
            error={form.touched.advance && Boolean(form.errors.advance)}
          />
        )}
      />

      <Field
        name="balanceDue"
        render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => (
          <TextField
            {...field}
            fullWidth
              margin= "dense"
              InputProps= {{
                disableUnderline: true,
                readOnly: true,
                className: props.formikBag.values.advance - props.formikBag.values.actual >= 0 ? 
                props.classes.colorBlue : props.classes.colorRed 
              }}
            label={props.intl.formatMessage(purchaseMessage.settlement.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(
              props.formikBag.values.advance - props.formikBag.values.actual >= 0 ?
              props.formikBag.values.advance - props.formikBag.values.actual :
              (props.formikBag.values.advance - props.formikBag.values.actual) * -1
              )}
            helperText={form.touched.balanceDue && form.errors.balanceDue}
            error={form.touched.balanceDue && Boolean(form.errors.balanceDue)}
          />
        )}
      /> 
    </CardContent>
  </Card>
);

export default PurchaseDetailPartialForm;