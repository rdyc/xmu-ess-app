import AppMenu from '@constants/AppMenu';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { WorkflowStatusType } from '@common/classes/types';
import { IKPIAssignFormValue } from '@kpi/components/assign/form/edit/KPIAssignForm';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { IKPIApprovalFormValue, KPIApprovalDetailProps } from './KPIApprovalDetail';
import { KPIApprovalInformation } from './partial/KPIApprovalInformation';
import KPIApprovalItemPartialForm from './partial/KPIApprovalItemPartialForm';

export const KPIApprovalDetailView: React.SFC<KPIApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRKPIInput,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/approvals`,
      title: props.intl.formatMessage(kpiMessage.employee.page.approvalDetailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.kpiApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={() => ([])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.kpiApprovalState.detail.isLoading &&
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IKPIApprovalFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                {
                  props.kpiApprovalState.detail.response &&
                  props.kpiApprovalState.detail.response.data &&
                  <KPIApprovalInformation 
                    data={props.kpiApprovalState.detail.response.data} 
                    formikBag={formikBag}
                  />
                }
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  {
                    !props.initialValues.isFinal &&
                    <div>
                      <SubmissionForm
                        title={props.intl.formatMessage(kpiMessage.employee.submission.approvalForm)}
                        className={props.classes.flexContent}
                        formikProps={formikBag}
                        handleSubmitAction={
                          props.kpiApprovalState.detail.response && 
                          props.kpiApprovalState.detail.response.data.statusType === WorkflowStatusType.Accepted &&
                          props.handleSetDialogOpen ||
                          undefined
                        }
                        buttonLabelProps={{
                          reset: props.intl.formatMessage(layoutMessage.action.reset),
                          submit: props.kpiApprovalState.detail.response && props.kpiApprovalState.detail.response.data && 
                            props.kpiApprovalState.detail.response.data.statusType === WorkflowStatusType.Submitted &&
                            props.intl.formatMessage(layoutMessage.action.accept) ||
                            props.intl.formatMessage(layoutMessage.action.submit),
                          processing: props.intl.formatMessage(layoutMessage.text.processing)
                        }}
                        confirmationDialogProps={
                          props.kpiApprovalState.detail.response && 
                          props.kpiApprovalState.detail.response.data.statusType === WorkflowStatusType.Submitted &&
                          {
                          title: props.intl.formatMessage(kpiMessage.employee.dialog.approvalTitle),
                          message: props.intl.formatMessage(kpiMessage.employee.dialog.approvalDescription),
                          labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                          labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                          } ||
                          undefined
                        }
                      />
                      {
                        props.kpiApprovalState.detail.response && 
                        props.kpiApprovalState.detail.response.data.statusType === WorkflowStatusType.Accepted &&
                        <Dialog
                          fullScreen={false}
                          open={props.isDialogOpen}
                          aria-labelledby="dialog-confirm-title"
                          aria-describedby="dialog-confirm-description"
                        >
                          <DialogTitle id="dialog-confirm-title">
                            {props.intl.formatMessage(kpiMessage.employee.dialog.approvalTitle)}
                          </DialogTitle>
      
                          <DialogContent>
                            <DialogContentText id="dialog-confirm-description">
                              {props.intl.formatMessage(kpiMessage.employee.confirm.finalDescription)}
                            </DialogContentText>
                            
                            <Field
                              name="isFinal"
                              render={({ field, form }: FieldProps<IKPIAssignFormValue>) => (
                                <FormControl component="fieldset">
                                  <FormLabel 
                                    filled
                                    error={form.touched.isFinal && Boolean(form.errors.isFinal)}
                                  >
                                  </FormLabel>
                                  <RadioGroup>
                                    <FormControlLabel
                                      key={'isFinal.true'}
                                      value={'true'} 
                                      label={props.intl.formatMessage(kpiMessage.employee.field.isFinalSetTrue)}
                                      control={
                                        <Radio 
                                          disabled={form.isSubmitting}
                                          value={true}
                                          checked={field.value} 
                                          onChange={(event: React.ChangeEvent, checked: boolean) => {
                                            if (checked) {
                                              formikBag.setFieldValue('isFinal', true);
                                            }
                                          }}
                                        /> 
                                      } 
                                    />
                                    <FormControlLabel
                                      key={'isFinal.false'}
                                      value={'false'} 
                                      label={props.intl.formatMessage(kpiMessage.employee.field.isFinalSetFalse)}
                                      control={
                                        <Radio 
                                          disabled={form.isSubmitting}
                                          value={false}
                                          checked={!field.value} 
                                          onChange={(event: React.ChangeEvent, checked: boolean) => {
                                            if (checked) {
                                              formikBag.setFieldValue('isFinal', false);
                                            }
                                          }}
                                        /> 
                                      } 
                                    />
                                  </RadioGroup>
                                  <FormHelperText 
                                    error={form.touched.isFinal && Boolean(form.errors.isFinal)}
                                  >
                                    {form.touched.isFinal && form.errors.isFinal}
                                  </FormHelperText>
                                </FormControl>
                              )}
                            />
                          </DialogContent>
                          
                          <DialogActions>
                            <Button fullWidth color="secondary" onClick={() => props.handleSetDialogOpen()} disabled={formikBag.isSubmitting}>
                              {props.intl.formatMessage(layoutMessage.action.discard)}
                            </Button>
                            <Button fullWidth color={formikBag.values.isFinal ? 'primary' : 'default'} onClick={() => formikBag.submitForm()} autoFocus disabled={formikBag.isSubmitting}>
                              {props.intl.formatMessage(formikBag.values.isFinal ? layoutMessage.action.submit : layoutMessage.action.draft)}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      }
                    </div>
                  }
                </div>

                <div className={props.classes.flexContent}>
                  <FormikJsonValues formikBag={formikBag} />
                </div>
              </div>
            </div>

            <div className={props.classes.flexRow}>
              <KPIApprovalItemPartialForm
                formikBag={formikBag}
                intl={props.intl}
                classes={props.classes}
              />
            </div>
          </Form>
        )}
      />
    }
  </PreviewPage>
);