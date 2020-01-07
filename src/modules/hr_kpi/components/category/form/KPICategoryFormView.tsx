import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { KPIMeasurementForm } from '@kpi/components/measurement/Form/KPIMeasurementForm';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IKPICategoryFormValue, KPICategoryFormProps  } from './KPICategoryForm';
import KPICategoryDetailPartialForm from './partial/KPICategoryDetailPartialForm';

export const KPICategoryFormView: React.SFC<KPICategoryFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.KPICategory,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/categories',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.page.newTitle : kpiMessage.category.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.page.newSubHeader : kpiMessage.category.page.modifySubHeader)
    }}
    state={props.kpiCategoryState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IKPICategoryFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <KPICategoryDetailPartialForm
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
            </div>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm
                  title={props.intl.formatMessage(kpiMessage.category.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.dialog.createTitle : kpiMessage.category.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.category.dialog.createDescription : kpiMessage.category.dialog.modifyDescription),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }}
                  disableButtons={props.isItemEditing || (props.formMode === FormMode.New && props.initialValues.items.length === 0)}
                />
              </div>
              <div className={props.classes.flexContent}>
                <FormikJsonValues formikBag={formikBag} />
              </div>
            </div>
          </div>
          <div className={props.classes.flexRow}>
            <KPIMeasurementForm 
              categoryUid={props.initialValues.uid}
              categoryGroup={formikBag.values.group}
              isItemEditing={props.isItemEditing}
              handleSetIsItemEditing={props.handleSetIsItemEditing}
              parentFormMode={props.formMode}
              handleAddItem={props.handleAddItem}
              handleRemoveItem={props.handleRemoveItem}
              handleSaveItem={props.handleSaveItem}
            />
          </div>
        </Form>
      )}
    />
  </FormPage>
);