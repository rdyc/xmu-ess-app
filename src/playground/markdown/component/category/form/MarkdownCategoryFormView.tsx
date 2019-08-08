import { FormMode } from '@generic/types';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { AppBar, Dialog, DialogContent, Divider, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { IMarkdownCategoryFormValue, MarkdownCategoryFormProps } from './MarkdownCategoryForm';
import MarkdownCategoryPartialForm from './partial/MarkdownCategoryPartialForm';

export const MarkdownCategoryFormView: React.SFC<MarkdownCategoryFormProps> = props => { 
  
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        disableBackdropClick
        open={props.isOpen}
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
              Add Category
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
            render={(formikBag: FormikProps<IMarkdownCategoryFormValue>) => (
              <Form>
                <div className={props.classes.flexRow}>
                  <div className={props.classes.flexColumn}>
                    <div className={props.classes.flexContent}>
                      <MarkdownCategoryPartialForm 
                        intl={props.intl}
                        formikBag={formikBag}
                      />
                    </div>
                  </div>

                  <div className={props.classes.flexColumn}>
                    <div className={props.classes.flexContent}>
                      <SubmissionForm 
                        title={'Submit category'}
                        className={props.classes.flexContent}
                        formikProps={formikBag}
                        buttonLabelProps={{
                          reset: props.intl.formatMessage(layoutMessage.action.reset),
                          submit: props.intl.formatMessage(layoutMessage.action.submit),
                          processing: props.intl.formatMessage(layoutMessage.text.processing)
                        }}
                        confirmationDialogProps={{
                          title: props.formMode === FormMode.New ? 'New Category' : 'Modify Category',
                          message: props.formMode === FormMode.New ? 'Category new desc' : 'Category modify desc',
                          labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                          labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                        }} 
                      />
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
};