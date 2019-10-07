import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Grid } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HrCornerPageContentForm } from './HrCornerPageContentForm';
import { HrCornerPageFormProps, ICornerPageFormValue } from './HrCornerPageForm';
import { HrCornerPagePartial } from './HrCornerPagePartial';

export const HrCornerPageFormView: React.SFC<HrCornerPageFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.HRCorner,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/corner/page',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: 'Corner Page'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: 'Corner Page'})
    }}
    state={props.hrCornerPageState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICornerPageFormValue>) => (
        <Form>
            <Grid container spacing={16}>
              <Grid item xs={12} md={3} xl={3}>
                <HrCornerPagePartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterCategory={props.filterCategory}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <HrCornerPageContentForm 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <SubmissionForm 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: 'Corner Page'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createTitle : hrMessage.shared.confirm.modifyTitle, {state: 'Corner Page'}),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createDescription : hrMessage.shared.confirm.modifyDescription, {state: 'Corner page'}),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <FormikJsonValues formikBag={formikBag} />
              </Grid>
            </Grid>
        </Form>
      )}
    />
  </FormPage>
);