import { DialogConfirmation } from '@layout/components/dialogs';
import { BeforeDialogConfirmation } from '@layout/components/dialogs/BeforeDialogConfirmation';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { IWorkflowApprovalFormValue, WorkflowApprovalFormProps } from './WorkflowApprovalForm';

export const WorkflowApprovalFormView: React.SFC<WorkflowApprovalFormProps> = props => (
  <Formik
    enableReinitialize
    initialValues={props.initialValues}
    validationSchema={props.validationSchema}
    onSubmit={props.onSubmit}
    render={(formikBag: FormikProps<IWorkflowApprovalFormValue>) => (
      <Form>
        <Card square>
          <CardHeader title={props.title} />
          <CardContent>
            <Field
              name="statusType"
              render={({ field, form }: FieldProps<IWorkflowApprovalFormValue>) => (
                <FormControl component="fieldset">
                  <FormLabel 
                    required 
                    filled
                    error={form.touched.statusType && Boolean(form.errors.statusType)}
                  >
                    {props.intl.formatMessage(organizationMessage.workflow.field.statusType)}
                  </FormLabel>
                  <RadioGroup>
                    {
                      props.statusTypes &&
                      props.statusTypes.map(item => 
                        <FormControlLabel
                          key={item.value}
                          value={item.value} 
                          label={item.label}
                          control={
                            <Radio 
                              disabled={form.isSubmitting}
                              value={item.value}
                              checked={field.value === item.value} 
                              onChange={(event: React.ChangeEvent, checked: boolean) => {
                                if (checked) {
                                  formikBag.setFieldValue('statusType', item.value);
                                }
                              }}
                            /> 
                          } 
                        />
                      )
                    }
                  </RadioGroup>
                  <FormHelperText 
                    error={form.touched.statusType && Boolean(form.errors.statusType)}
                  >
                    {form.touched.statusType && form.errors.statusType}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {
              formikBag.values.statusType !== '' &&
              props.trueTypes.indexOf(formikBag.values.statusType) === -1 && 
              <Field
                name="remark"
                render={({ field, form }: FieldProps<IWorkflowApprovalFormValue>) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    required={true}
                    margin="normal"
                    autoComplete="off"
                    disabled={form.isSubmitting}
                    label={props.remarkFieldProps && props.remarkFieldProps.label || props.intl.formatMessage(organizationMessage.workflow.field.remark)}
                    placeholder={props.remarkFieldProps && props.remarkFieldProps.placeholder || props.intl.formatMessage(organizationMessage.workflow.field.remarkPlaceholder)}
                    helperText={form.touched.remark && form.errors.remark}
                    error={form.touched.remark && Boolean(form.errors.remark)}
                  />
                )}
              />
            }

            {
              !formikBag.isSubmitting &&
              formikBag.status &&
              <React.Fragment>
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  label="Date"
                  value={formikBag.status.date || 'N/A'}
                />

                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  label="Correlation ID"
                  value={formikBag.status.id || 'N/A'}
                />

                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  multiline
                  label="Status"
                  value={props.intl.formatMessage({id: formikBag.status.message})}
                />
              </React.Fragment>
            }
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              type="reset"
              color="secondary"
              disabled={props.disabled || !formikBag.dirty || formikBag.isSubmitting}
            >
              {props.intl.formatMessage(layoutMessage.action.reset)}
            </Button>

            <Button
              fullWidth
              type="button"
              color="primary"
              disabled={props.disabled || formikBag.isSubmitting}
              onClick={() => {
                props.confirmationBeforeDialogProps ?
                props.setOpenBeforeDialog()
                : props.setOpen();
              }}
            >
              {props.intl.formatMessage(formikBag.isSubmitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
            </Button>
          </CardActions>
        </Card>

        {
          props.confirmationBeforeDialogProps && 
          <BeforeDialogConfirmation 
          title={props.confirmationBeforeDialogProps.title}
          content={props.confirmationBeforeDialogProps.message}
          labelCancel={props.confirmationBeforeDialogProps.labelCancel}
          labelConfirm={props.confirmationBeforeDialogProps.labelConfirm}
          isOpen={props.isOpenBeforeDialog}
          fullScreen={props.confirmationBeforeDialogProps.fullScreen}
          onClickCancel={() => props.setOpenBeforeDialog()}
          onClickConfirm={() => {
            props.setOpenBeforeDialog();
            props.setOpen();
          }}
        />
        }

        <DialogConfirmation
          title={props.confirmationDialogProps.title}
          content={props.confirmationDialogProps.message}
          labelCancel={props.confirmationDialogProps.labelCancel}
          labelConfirm={props.confirmationDialogProps.labelConfirm}
          isOpen={props.isOpenDialog}
          fullScreen={props.confirmationDialogProps.fullScreen}
          onClickCancel={() => props.setOpen()}
          onClickConfirm={() => {
            props.setOpen();

            if (Object.keys(formikBag.errors).length) {
              props.masterPage.flashMessage({
                message: props.intl.formatMessage(layoutMessage.text.invalidFormFields)
              });
            }
        
            formikBag.submitForm();
          }}
        />

        <FormikJsonValues formikBag={formikBag} />
      </Form>
    )}
  />
);