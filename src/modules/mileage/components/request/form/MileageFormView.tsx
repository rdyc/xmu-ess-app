import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { MileageRequestItemForm } from '../editor/forms/MileageRequestItemForm';
import { IMileageFormValue, MileageFormProps } from './MileageForm';
import MileageDetailPartialForm from './partial/MileageDetailPartialForm';

export const MileageFormView: React.SFC<MileageFormProps> = props => (
  <Formik
    enableReinitialize
    initialValues={props.initialValues}
    validationSchema={props.validationSchema}
    onSubmit={props.handleOnSubmit}
    render={(formikBag: FormikProps<IMileageFormValue>) => (
      <Form>
        <div className={props.classes.flexRow}>
          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <MileageDetailPartialForm 
                formikBag={formikBag}
                intl={props.intl}
              />
            </div>
          </div>

          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <MileageRequestItemForm year={Number(formikBag.values.year)} month={Number(formikBag.values.month)} formikBag={formikBag} handleSetInitialValues={props.handleSetInitialValue}/>
            </div>
          </div>
          
          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <SubmissionForm 
                title={props.intl.formatMessage(mileageMessage.request.submission.form)}
                className={props.classes.flexContent}
                formikProps={formikBag}
                buttonLabelProps={{
                  reset: props.intl.formatMessage(layoutMessage.action.reset),
                  submit: props.intl.formatMessage(layoutMessage.action.submit),
                  processing: props.intl.formatMessage(layoutMessage.text.processing)
                }}
                confirmationDialogProps={{
                  title: props.intl.formatMessage(mileageMessage.request.confirm.createTitle),
                  message: props.intl.formatMessage(mileageMessage.request.confirm.createDescription),
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
);