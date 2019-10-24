import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IContractFormValue } from '../ContractForm';

type ContractDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IContractFormValue>;
  intl: InjectedIntl;
};

const ContractDetailPartialForm: React.ComponentType<ContractDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Contract'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IContractFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="contractUid"
        render={({ field}: FieldProps<IContractFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.contract.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IContractFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.contractNumber && form.errors.contractNumber}
            error={form.touched.contractNumber && Boolean(form.errors.contractNumber)}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IContractFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldPlaceholder'))}
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
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<IContractFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={!props.formikBag.values.start || form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.contract.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('end', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
            minDate={props.formikBag.values.start}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default ContractDetailPartialForm;