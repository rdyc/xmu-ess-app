import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IOrganizationStructureFormValue, OrganizationStructureFormProps } from './OrganizationStructureForm';
import StructureDetailPartialForm from './partials/StructureDetailPartialForm';
import StructureItemPartialForm from './partials/StructureItemPartialForm';

export const OrganizationHierarchyFormView: React.SFC<OrganizationStructureFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupOrganizationStructure,
      parentUid: AppMenu.Lookup,
      parentUrl: '/organization/structure',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.page.newTitle : organizationMessage.structure.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.page.newSubHeader : organizationMessage.structure.page.modifySubHeader)
    }}
    state={props.organizationStructureState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IOrganizationStructureFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <StructureDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  filterLookupCompany={props.filterLookupCompany}
                  filterLookupPosition={props.filterLookupPosition}
                  setPositionFilter={props.handleSetPositionFilter}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <StructureItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                filterLookupPosition={props.filterLookupPosition}
                classes={{
                  flexContent: props.classes.flexContent,
                  marginFarRight: props.classes.marginFarRight
                }}
              />
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(organizationMessage.structure.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.dialog.createTitle : organizationMessage.structure.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.dialog.createDescription : organizationMessage.structure.dialog.modifyDescription),
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