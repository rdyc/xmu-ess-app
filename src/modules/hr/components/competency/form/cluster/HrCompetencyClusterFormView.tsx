import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HrCompetencyClusterFormProps, IClusterFormValue } from './HrCompetencyClusterForm';
import HrCompetencyClusterPartial from './HrCompetencyClusterPartial';

export const HrCompetencyClusterFormView: React.SFC<HrCompetencyClusterFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/company',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: 'Cluster'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: 'Cluster'})
    }}
    state={props.hrCompetencyClusterState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IClusterFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HrCompetencyClusterPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: 'Cluster'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createTitle : hrMessage.shared.confirm.modifyTitle, {state: 'Cluster'}),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createDescription : hrMessage.shared.confirm.modifyDescription, {state: 'Cluster'}),
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