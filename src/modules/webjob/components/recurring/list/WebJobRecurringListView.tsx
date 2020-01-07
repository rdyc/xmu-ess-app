import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { IWebJobRecurring } from '@webjob/classes/response';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { SubmissionTrigger } from '../form/trigger/submission/SubmissionTrigger';

import { IRecurringTriggerFormValue, WebJobRecurringListProps } from './WebJobRecurringList';
import { WebjobRecurringSummary } from './WebJobRecurringSummary';

export const WebJobRecurringListView: React.SFC<WebJobRecurringListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.WebJob,
        parentUid: AppMenu.Home,
        title: props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Recurring'}),
      }}

      // state & fields
      state={props.webJobRecurringState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IWebJobRecurring) => ( 
        <WebjobRecurringSummary data={item}/>
      )}
      actionComponent={(item: IWebJobRecurring) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => {
              props.setInitialValues({
                jobUid: item.uid,
                name: item.name
              });
              props.setOpen();
            }} 
          >
            {props.intl.formatMessage(layoutMessage.action.trigger)}
          </Button>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/webjob/recurrings/form`, {uid: item.uid})} 
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/webjob/recurrings/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="webjob.recurrings"
          default={props.webJobRecurringState.all.request && props.webJobRecurringState.all.request.filter && props.webJobRecurringState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/webjob/recurrings/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />

    {/* Trigger Form */}
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IRecurringTriggerFormValue>) => (
        <Form>

          {/* Submission for trigger */}
          <SubmissionTrigger
            className={props.classes.dialogActions}
            buttonLabelProps={{
              reset: props.intl.formatMessage(layoutMessage.action.reset),
              submit: props.intl.formatMessage(layoutMessage.action.submit),
              processing: props.intl.formatMessage(layoutMessage.text.processing)
            }}
            formikProps={formikBag}
            confirmationDialogProps={{
              title: props.intl.formatMessage(webJobMessage.shared.confirm.triggerTitle, {state: 'Recurring'}),
              message: props.intl.formatMessage(webJobMessage.shared.confirm.triggerDescription, {state: formikBag.values.name, uid: formikBag.values.jobUid}),
              labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
              labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
            }} 
            isOpenDialog={props.isTriggerOpen}
            setOpen={props.setOpen}
          />             
        </Form>
      )}
    />
  </React.Fragment>
);