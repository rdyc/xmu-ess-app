import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { commonMessage } from '@common/locales/messages/commonMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { CommonFormProps, ICommonFormValue } from './CommonForm';
import CommonDetailPartialForm from './partials/CommonDetailPartialForm';

export const CommonFormView: React.SFC<CommonFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.Common,
      parentUid: AppMenu.Lookup,
      parentUrl: `/common/system/${props.match.params.category}`,
      title: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.page.createTitle : commonMessage.system.page.editTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.page.createSubTitle : commonMessage.system.page.editSubTitle)
    }}
    state={props.commonSystemState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICommonFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CommonDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  category={props.match.params.category}
                  handleSetFilterCommonSystem={props.handleSetFilterCommonSystem}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCompany={props.filterLookupCompany}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>

              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(commonMessage.system.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.dialog.createTitle : commonMessage.system.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.dialog.createDescription : commonMessage.system.dialog.modifyDescription),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </div>
              
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