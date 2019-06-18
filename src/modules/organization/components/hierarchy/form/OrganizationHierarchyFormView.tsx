import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IOrganizationHierarchyFormValue, OrganizationHierarchyFormProps } from './OrganizationHierarchyForm';
import HierarchyDetailPartialForm from './partials/HierarchyDetailPartialForm';
import HierarchyItemPartialForm from './partials/HierarchyItemPartialForm';

export const OrganizationHierarchyFormView: React.SFC<OrganizationHierarchyFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupApprovalHierarchy,
      parentUid: AppMenu.Lookup,
      parentUrl: '/organization/hierarchy',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.page.newTitle : organizationMessage.hierarchy.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.page.newSubHeader : organizationMessage.hierarchy.page.modifySubHeader)
    }}
    state={props.organizationHierarchyState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IOrganizationHierarchyFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HierarchyDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  filterLookupCompany={props.filterLookupCompany}
                  setPositionFilter={props.handleSetPositionFilter}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <HierarchyItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                filterLookupPosition={props.filterLookupPosition}
                filterCommonSystem={props.filterCommonSystem}
                classes={{
                  flexContent: props.classes.flexContent,
                  marginFarRight: props.classes.marginFarRight
                }}
              />
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(organizationMessage.hierarchy.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.dialog.createTitle : organizationMessage.hierarchy.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.dialog.createDescription : organizationMessage.hierarchy.dialog.modifyDescription),
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