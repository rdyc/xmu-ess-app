import AppMenu from '@constants/AppMenu';
import { IKPIEmployeeDetail } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';

import { WorkflowStatusType } from '@common/classes/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import { IKPIApprovalFormValue, KPIApprovalDetailProps } from './KPIApprovalDetail';
import { KPIApprovalInformation } from './partial/KPIApprovalInformation';
import KPIApprovalItemPartialForm from './partial/KPIApprovalItemPartialForm';
import KPIApprovalPartialForm from './partial/KPIApprovalPartialForm';

export const KPIApprovalDetailView: React.SFC<KPIApprovalDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.HRKPIInput,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/kpi/approvals`,
      title: props.intl.formatMessage(kpiMessage.employee.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.employee.page.detailSubHeader),
    }}
    state={props.kpiApprovalState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPIEmployeeDetail) => ([])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-approval-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    {
      !props.kpiApprovalState.detail.isLoading &&
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IKPIApprovalFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                {
                  props.kpiApprovalState.detail.response &&
                  props.kpiApprovalState.detail.response.data &&
                  <KPIApprovalInformation 
                    data={props.kpiApprovalState.detail.response.data} 
                    formikBag={formikBag}
                  />
                }
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  {
                    !props.initialValues.isFinal &&
                    <KPIApprovalPartialForm
                      formikBag={formikBag}
                      intl={props.intl}
                    />
                  }
                </div>
                <div className={props.classes.flexContent}>
                  {
                    !props.initialValues.isFinal &&
                    <SubmissionForm
                      title={props.intl.formatMessage(kpiMessage.employee.submission.approvalForm)}
                      className={props.classes.flexContent}
                      formikProps={formikBag}
                      buttonLabelProps={{
                        reset: props.intl.formatMessage(layoutMessage.action.reset),
                        submit: props.kpiApprovalState.detail.response && props.kpiApprovalState.detail.response.data && 
                          props.kpiApprovalState.detail.response.data.statusType === WorkflowStatusType.Submitted &&
                          props.intl.formatMessage(layoutMessage.action.accept) ||
                          props.intl.formatMessage(layoutMessage.action.submit),
                        processing: props.intl.formatMessage(layoutMessage.text.processing)
                      }}
                      confirmationDialogProps={{
                        title: props.intl.formatMessage(kpiMessage.employee.dialog.approvalTitle),
                        message: props.intl.formatMessage(kpiMessage.employee.dialog.approvalDescription),
                        labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                        labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                      }}
                    />
                  }
                </div>

                <div className={props.classes.flexContent}>
                  <FormikJsonValues formikBag={formikBag} />
                </div>
              </div>
            </div>

            <div className={props.classes.flexRow}>
              <KPIApprovalItemPartialForm
                formikBag={formikBag}
                intl={props.intl}
                classes={props.classes}
              />
            </div>
          </Form>
        )}
      />
    }
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </PreviewPage>
);