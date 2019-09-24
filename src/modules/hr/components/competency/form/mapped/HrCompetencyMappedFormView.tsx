import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HrCompetencyMappedCategoriesForm } from './HrCompetencyMappedCategoriesForm';
import { HrCompetencyMappedFormProps, IMappedFormValue } from './HrCompetencyMappedForm';
import HrCompetencyMappedPartial from './HrCompetencyMappedPartial';
import { HrMappedLevelItem } from './HrMappedLevelItem';
// import { HrMappedCategoriesItem } from './HrMappedCategoriesItem';
// import { HrCompetencyMappedSummary } from './HrCompetencyMappedSummary';

export const HrCompetencyMappedFormView: React.SFC<HrCompetencyMappedFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupCompetencyMapped,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/competencymapped',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: 'Mapped'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: 'Mapped'})
    }}
    state={props.hrCompetencyMappedState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IMappedFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HrCompetencyMappedPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterCompany={props.filterCompany}
                />
              </div>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: 'Mapped'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createTitle : hrMessage.shared.confirm.modifyTitle, {state: 'Mapped'}),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createDescription : hrMessage.shared.confirm.modifyDescription, {state: 'Mapped'}),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HrCompetencyMappedCategoriesForm 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                {
                  props.hrCompetencyClusterState.list.response &&
                  props.hrCompetencyClusterState.list.response.data &&
                  <HrMappedLevelItem 
                    intl={props.intl}
                    formikBag={formikBag}
                    data={props.hrCompetencyClusterState.list.response.data}
                  />
                }
                <FormikJsonValues formikBag={formikBag} />
              </div>
            </div>

          </div>
        </Form>
      )}
    />
  </FormPage>
);