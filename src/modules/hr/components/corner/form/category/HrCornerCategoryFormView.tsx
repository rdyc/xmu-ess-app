import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { AppBar, Dialog, DialogContent, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HrCornerCategoryFormProps, ICornerCategoryFormValue } from './HrCornerCategoryForm';
import HrCornerCategoryPartial from './HrCornerCategoryPartial';

export const HrCornerCategoryFormView: React.SFC<HrCornerCategoryFormProps> = props => (
  <React.Fragment>
    <Dialog
      fullScreen
      disableBackdropClick
      open={props.isFormOpen}
      className={props.classes.shift}
      onClose={props.onClose}
    >
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: 'Corner Category'})}
          </Typography>

        </Toolbar>
      </AppBar>

      <Divider/>

      <DialogContent style={{marginTop: '20px'}}>
        <Formik
          enableReinitialize
          initialValues={props.initialValues}
          validationSchema={props.validationSchema}
          onSubmit={props.handleOnSubmit}
          render={(formikBag: FormikProps<ICornerCategoryFormValue>) => (
            <Form>
              <div className={props.classes.flexRow}>
                <div className={props.classes.flexColumn}>
                  <div className={props.classes.flexContent}>
                    <HrCornerCategoryPartial 
                      formMode={props.formMode}
                      intl={props.intl}
                      formikBag={formikBag}
                    />
                  </div>
                </div>

                <div className={props.classes.flexColumn}>
                  <div className={props.classes.flexContent}>
                    <SubmissionForm 
                      title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: 'Corner Category'})}
                      className={props.classes.flexContent}
                      formikProps={formikBag}
                      buttonLabelProps={{
                        reset: props.intl.formatMessage(layoutMessage.action.reset),
                        submit: props.intl.formatMessage(layoutMessage.action.submit),
                        processing: props.intl.formatMessage(layoutMessage.text.processing)
                      }}
                      confirmationDialogProps={{
                        title: props.dialogTitle,
                        message: props.dialogMessage,
                        labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                        labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                      }} 
                    />
                  </div>
                </div>

                <div className={props.classes.flexColumn}>
                  <div className={props.classes.flexContent}>
                    <FormikJsonValues formikBag={formikBag} />
                  </div>
                </div>

              </div>
            </Form>
          )}
        />
      </DialogContent>
    </Dialog>

  </React.Fragment>
);