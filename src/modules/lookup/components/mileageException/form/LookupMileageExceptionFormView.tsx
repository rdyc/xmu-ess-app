import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IMileageExceptionFormValue, MileageExceptionFormProps } from './LookupMileageExceptionForm';
import LookupMileageExceptionDetailPartialForm from './partial/LookupMileageExceptionDetailPartialForm';

export const LookupMileageExceptionFormView: React.SFC<MileageExceptionFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/mileageexceptions',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.mileageException.page.newTitle : lookupMessage.mileageException.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.mileageException.page.newSubHeader : lookupMessage.mileageException.page.modifySubHeader)
    }}
    state={props.mileageExceptionState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IMileageExceptionFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LookupMileageExceptionDetailPartialForm 
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCompany={props.filterLookupCompany}
                  filterProject={props.filterProject}
                  filterProjectSite={props.filterProjectSite}
                  handleFilterProject={props.handleFilterProject}
                  handleFilterProjectSite={props.handleFilterProjectSite}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(lookupMessage.shared.submission.form, {state: 'Mileage Exception'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createTitle : lookupMessage.shared.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createDescription : lookupMessage.shared.confirm.modifyDescription, {state: 'Mileage Exception'}),
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
  </FormPage>
);