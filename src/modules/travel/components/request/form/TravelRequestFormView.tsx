import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import TravelRequestDetailPartialForm from './partial/TravelRequestDetailPartialForm';
import TravelRequestItemPartialForm from './partial/TravelRequestItemPartialForm';
import { ITravelRequestFormValue, TravelRequestFormProps } from './TravelRequestForm';

export const TravelRequestFormView: React.SFC<TravelRequestFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.Travel,
      parentUrl: '/travel/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.page.newTitle : travelMessage.request.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.page.newSubHeader : travelMessage.request.page.modifySubHeader)
    }}
    state={props.travelRequestState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    {
      !props.travelRequestState.allowed.isLoading &&
      (props.travelRequestState.allowed &&
      props.travelRequestState.allowed.response &&
      props.travelRequestState.allowed.response.data &&
      !props.travelRequestState.allowed.response.data.isAllowed &&
      props.formMode === FormMode.New ?
      <div className={props.classes.flexRow}>
        <div className={props.classes.flexColumn}>
          <div className={props.classes.flexContent}>
            <Card square> 
              <CardHeader
                title={props.intl.formatMessage(travelMessage.request.section.unable)}
              // subheader={props.intl.formatMessage(travelMessage.request.section.infoSubHeader)}
              />
              <CardContent>
                <Typography>
                  {props.intl.formatMessage(travelMessage.request.section.unableMessage)}
                </Typography>
                <br/>
                <Typography>
                  Please click <Link to="/travel/settlement/requests" style={{textDecoration: 'none', fontWeight: 'bold'}}>here</Link> to submit Travel Settlement.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      :
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<ITravelRequestFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <TravelRequestDetailPartialForm
                    formikBag={formikBag}
                    formMode={props.formMode}
                    intl={props.intl}
                    filterCommonSystem={props.filterCommonSystem}
                    filterLookupCustomer={props.filterLookupCustomer}
                    diemData={props.diemData}
                    filterProject={props.filterProject}
                    setProjectFilter={props.handleSetProjectFilter}
                    SetProjectSiteFilter={props.handleSetProjectSiteFilter}
                    filterProjectSite={props.filterProjectSite}
                  />
                </div>
              </div>
              <div className={props.classes.flexColumn}>
                <TravelRequestItemPartialForm
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  classes={{
                    flexContent: props.classes.flexContent,
                    marginFarRight: props.classes.marginFarRight
                  }}
                  filterAccountEmployee={props.filterAccountEmployee}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
  
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <SubmissionForm
                    title={props.intl.formatMessage(travelMessage.request.submission.form)}
                    className={props.classes.flexContent}
                    formikProps={formikBag}
                    buttonLabelProps={{
                      reset: props.intl.formatMessage(layoutMessage.action.reset),
                      submit: props.intl.formatMessage(layoutMessage.action.submit),
                      processing: props.intl.formatMessage(layoutMessage.text.processing)
                    }}
                    confirmationDialogProps={{
                      title: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.dialog.createTitle : travelMessage.request.dialog.modifyTitle),
                      message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.request.dialog.createDescription : travelMessage.request.dialog.editDescription),
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
      />)
    }
  </FormPage>
);