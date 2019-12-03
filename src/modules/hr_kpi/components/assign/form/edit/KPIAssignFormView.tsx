import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { IKPIAssignFormValue, KPIAssignFormProps } from './KPIAssignForm';
import KPIAssignDetailPartialForm from './partial/KPIAssignDetailPartialForm';
import KPIHRInputItemPartialForm from './partial/KPIAssignItemPartialForm';

export const KPIAssignFormView: React.SFC<KPIAssignFormProps> = props => {
  const isMobile = isWidthDown('sm', props.width);
  
  return (
    <FormPage
      info={{
        uid: AppMenu.HRKPIAssign,
        parentUid: AppMenu.Lookup,
        parentUrl: `/kpi/assigns/${props.match.params.employeeUid}`,
        title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.assignNewTitle : kpiMessage.employee.page.assignModifyTitle),
        description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.assignNewSubHeader : kpiMessage.employee.page.assignModifySubHeader)
      }}
      state={props.kpiAssignState.detail}
      onLoadApi={props.handleOnLoadDetail}
    >
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IKPIAssignFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <KPIAssignDetailPartialForm
                    formMode={props.formMode}
                    formikBag={formikBag}
                    intl={props.intl}
                    filterLookupCompany={props.filterLookupCompany}
                    filterKPITemplate={props.filterKPITemplate}
                    handleSetTemplateFilter={props.handleSetTemplateFilter}
                    handleLoadTemplate={props.handleLoadTemplate}
                  />
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <SubmissionForm
                    title={props.intl.formatMessage(kpiMessage.employee.submission.form)}
                    className={props.classes.flexContent}
                    formikProps={formikBag}
                    handleSubmitAction={props.handleSetDialogOpen}
                    buttonLabelProps={{
                      reset: props.intl.formatMessage(layoutMessage.action.reset),
                      submit: props.intl.formatMessage(formikBag.values.isFinal ? layoutMessage.action.submit : layoutMessage.action.draft),
                      processing: props.intl.formatMessage(layoutMessage.text.processing)
                    }}
                  />
                  <Dialog
                    fullScreen={false}
                    open={props.isDialogOpen}
                    aria-labelledby="dialog-confirm-title"
                    aria-describedby="dialog-confirm-description"
                  >
                    <DialogTitle id="dialog-confirm-title">
                      {props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.dialog.createTitle : kpiMessage.employee.dialog.modifyTitle)}
                    </DialogTitle>

                    <DialogContent>
                      <DialogContentText id="dialog-confirm-description">
                        {props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.dialog.createDescription : kpiMessage.employee.confirm.finalDescription)}
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
                                label={props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue)}
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
                                label={props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse)}
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

                      {
                        formikBag.values.isFinal &&
                        <DialogContentText id="dialog-confirm-is-final">
                          {props.intl.formatMessage(kpiMessage.employee.confirm.finalIsFinal)}
                        </DialogContentText>
                      }
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
                </div>

                <div className={props.classes.flexContent}>
                  <FormikJsonValues formikBag={formikBag} />
                </div>
              </div>
            </div>

            <div className={props.classes.flexRow}>
              <KPIHRInputItemPartialForm
                formikBag={formikBag}
                loadItem={props.loadItem}
                templateNotes={props.templateNotes}
                listItem={props.listItem}
                handleSetLoadItem={props.handleSetLoadItem}
                formMode={props.formMode}
                intl={props.intl}
                classes={props.classes}
                filterKPICategory={props.filterKPICategory}
                filterKPIMeasurement={props.filterKPIMeasurement}
                isDialogFullScreen={isMobile}
              />
            </div>
          </Form>
        )}
      />
    </FormPage>
  );
};